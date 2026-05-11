import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Concierge / R2SA killer keywords - auto-reject if any found
const BLOCKED_KEYWORDS = [
  "concierge",
  "24 hour",
  "24-hour",
  "24hr",
  "24hrs",
  "porter",
  "head porter",
  "porterage",
  "doorman",
  "doorperson",
  "no airbnb",
  "no short let",
  "no short-let",
  "no sublet",
  "no holiday let",
  "no short stay",
  "12 month minimum",
  "12-month minimum",
  "long term only",
  "long-term only",
  "ast only",
  "ast tenancy only",
  "no business use",
  "company let restricted",
];

// Borough mapping from outcode (London postcodes)
const OUTCODE_TO_BOROUGH: Record<string, string> = {
  W8: "Kensington and Chelsea", SW3: "Kensington and Chelsea", SW5: "Kensington and Chelsea", SW7: "Kensington and Chelsea", SW10: "Kensington and Chelsea", W14: "Kensington and Chelsea",
  W1: "Westminster", SW1: "Westminster", SW1A: "Westminster", SW1E: "Westminster", SW1H: "Westminster", SW1P: "Westminster", SW1V: "Westminster", SW1W: "Westminster", SW1X: "Westminster", SW1Y: "Westminster", W2: "Westminster", W9: "Westminster", NW1: "Westminster", NW8: "Westminster", W10: "Westminster",
  N1: "Islington", N4: "Islington", N5: "Islington", N7: "Islington", N19: "Islington", EC1V: "Islington", EC1R: "Islington", EC1M: "Islington", EC1N: "Islington", EC1Y: "Islington",
  NW3: "Camden", NW5: "Camden", NW6: "Camden", N6: "Camden", WC1: "Camden", WC1A: "Camden", WC1B: "Camden", WC1E: "Camden", WC1H: "Camden", WC1N: "Camden", WC1R: "Camden", WC1V: "Camden", WC1X: "Camden",
};

type ApifyProperty = {
  id?: string | number;
  url?: string;
  title?: string;
  displayAddress?: string;
  outcode?: string;
  incode?: string;
  bathrooms?: number;
  bedrooms?: number;
  agent?: string;
  agentPhone?: string;
  agentDisplayAddress?: string;
  agentProfileUrl?: string;
  propertyType?: string;
  price?: string;
  secondaryPrice?: string;
  coordinates?: { latitude?: number; longitude?: number };
  letAvailableDate?: string;
  furnishType?: string;
  description?: string;
  features?: string[];
  images?: string[];
  nearestStations?: unknown[];
  listingUpdateReason?: string;
  listingUpdateDate?: string;
  firstVisibleDate?: string;
};

function parseRent(priceStr?: string): number | null {
  if (!priceStr) return null;
  const match = priceStr.match(/£([\d,]+)/);
  if (!match) return null;
  return parseInt(match[1].replace(/,/g, ""), 10);
}

function hasBlockedKeyword(property: ApifyProperty): { blocked: boolean; matched?: string } {
  const text = [
    property.description || "",
    property.title || "",
    ...(property.features || []),
  ].join(" ").toLowerCase();

  for (const keyword of BLOCKED_KEYWORDS) {
    if (text.includes(keyword)) {
      return { blocked: true, matched: keyword };
    }
  }
  return { blocked: false };
}

function calculateDaysOnMarket(firstVisibleDate?: string): number | null {
  if (!firstVisibleDate) return null;
  const first = new Date(firstVisibleDate);
  const now = new Date();
  const diffMs = now.getTime() - first.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export async function POST(req: NextRequest) {
  try {
    // Authenticate via secret header
    const providedSecret = req.headers.get("x-apify-secret");
    const expectedSecret = process.env.APIFY_WEBHOOK_SECRET;

    if (!expectedSecret || providedSecret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse incoming data
    const body = await req.json();
    
    // Apify sends data as { resource: { defaultDatasetId: "..." }, eventData: {...} }
    // OR directly as { items: [...] } if pushed via custom webhook
    // We support both formats
    let properties: ApifyProperty[] = [];

    if (Array.isArray(body)) {
      properties = body;
    } else if (Array.isArray(body.items)) {
      properties = body.items;
    } else if (body.resource?.defaultDatasetId) {
      // Apify default webhook - we need to fetch the dataset
      const datasetId = body.resource.defaultDatasetId;
      const apifyToken = process.env.APIFY_API_TOKEN;
      
      if (!apifyToken) {
        return NextResponse.json({ error: "APIFY_API_TOKEN not configured" }, { status: 500 });
      }

      const datasetUrl = `https://api.apify.com/v2/datasets/${datasetId}/items?token=${apifyToken}&format=json`;
      const fetchRes = await fetch(datasetUrl);
      
      if (!fetchRes.ok) {
        return NextResponse.json({ error: "Failed to fetch Apify dataset" }, { status: 500 });
      }
      
      properties = await fetchRes.json();
    }

    if (properties.length === 0) {
      return NextResponse.json({ message: "No properties received", processed: 0 });
    }

    // Server-side Supabase client (bypasses RLS using service role key)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let saved = 0;
    let rejected = 0;
    let duplicates = 0;
    const errors: string[] = [];

    for (const prop of properties) {
      try {
        if (!prop.url) {
          errors.push("Skipped: no URL");
          continue;
        }

        // Concierge / restriction filter - auto-reject
        const blockCheck = hasBlockedKeyword(prop);
        if (blockCheck.blocked) {
          rejected++;
          continue;
        }

        // Check for duplicate by source_url
        const { data: existing } = await supabase
          .from("leads_properties")
          .select("id")
          .eq("source_url", prop.url)
          .maybeSingle();

        if (existing) {
          duplicates++;
          continue;
        }

        // Determine borough from outcode
        const outcode = prop.outcode || "";
        const borough = OUTCODE_TO_BOROUGH[outcode] || null;

        // Calculate days on market
        const daysOnMarket = calculateDaysOnMarket(prop.firstVisibleDate);

        // Check if price-reduced signal
        const isReduced = prop.listingUpdateReason === "price_reduced";

        // Vacant signal: available immediately or in past
        let vacantSignal = false;
        if (prop.letAvailableDate) {
          const availDate = prop.letAvailableDate.split("/").reverse().join("-");
          vacantSignal = new Date(availDate) <= new Date();
        }

        // Insert property
        const { data: insertedProp, error: insertError } = await supabase
          .from("leads_properties")
          .insert({
            source: "rightmove",
            source_url: prop.url,
            property_address: prop.displayAddress || prop.title || null,
            postcode: outcode + (prop.incode ? " " + prop.incode : ""),
            borough: borough,
            bedrooms: prop.bedrooms || null,
            property_type: prop.propertyType || null,
            listed_rent: parseRent(prop.price),
            days_on_market: daysOnMarket,
            is_reduced: isReduced,
            vacant_signal: vacantSignal,
            raw_data: prop as never,
            status: "new",
          })
          .select()
          .single();

        if (insertError || !insertedProp) {
          errors.push("Insert failed: " + (insertError?.message || "unknown"));
          continue;
        }

        // Insert landlord/agent contact record
        if (prop.agent || prop.agentPhone) {
          await supabase.from("leads_landlords").insert({
            property_id: insertedProp.id,
            full_name: prop.agent || null,
            phone: prop.agentPhone || null,
            is_company: true,
            company_name: prop.agent || null,
            source: "rightmove",
            lead_temp: isReduced ? "warm" : "cold",
          });
        }

        saved++;

        // Trigger AI scoring (fire-and-forget, don't block)
        // We use the server's URL to call our own scoring endpoint
        const scoringUrl = new URL("/api/admin/leads/score", req.url).toString();
        fetch(scoringUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-apify-secret": expectedSecret,
          },
          body: JSON.stringify({ leadId: insertedProp.id }),
        }).catch(() => {
          // Silently ignore - scoring failure shouldn't break ingest
        });

      } catch (err) {
        errors.push("Property error: " + (err as Error).message);
      }
    }

    return NextResponse.json({
      message: "Ingest complete",
      received: properties.length,
      saved,
      rejected_concierge: rejected,
      duplicates,
      errors: errors.length > 0 ? errors.slice(0, 10) : undefined,
    });

  } catch (err) {
    console.error("Ingest error:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "TPS Lead Ingest endpoint is live" });
}
