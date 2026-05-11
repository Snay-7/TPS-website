import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const maxDuration = 60;

const BLOCKED_KEYWORDS = [
  "concierge", "24 hour", "24-hour", "24hr", "24hrs",
  "porter", "head porter", "porterage",
  "doorman", "doorperson",
  "no airbnb", "no short let", "no short-let", "no sublet",
  "no holiday let", "no short stay",
  "12 month minimum", "12-month minimum",
  "long term only", "long-term only",
  "ast only", "ast tenancy only",
  "no business use", "company let restricted",
];

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
  bedrooms?: number;
  agent?: string;
  agentPhone?: string;
  propertyType?: string;
  price?: string;
  letAvailableDate?: string;
  description?: string;
  features?: string[];
  listingUpdateReason?: string;
  firstVisibleDate?: string;
};

function parseRent(priceStr?: string): number | null {
  if (!priceStr) return null;
  const match = priceStr.match(/£([\d,]+)/);
  if (!match) return null;
  return parseInt(match[1].replace(/,/g, ""), 10);
}

function hasBlockedKeyword(property: ApifyProperty): boolean {
  const text = [
    property.description || "",
    property.title || "",
    ...(property.features || []),
  ].join(" ").toLowerCase();
  return BLOCKED_KEYWORDS.some((kw) => text.includes(kw));
}

function calculateDaysOnMarket(firstVisibleDate?: string): number | null {
  if (!firstVisibleDate) return null;
  const first = new Date(firstVisibleDate);
  const diffMs = Date.now() - first.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

async function processProperties(properties: ApifyProperty[], expectedSecret: string, requestUrl: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  for (const prop of properties) {
    try {
      if (!prop.url) continue;
      if (hasBlockedKeyword(prop)) continue;

      const { data: existing } = await supabase
        .from("leads_properties")
        .select("id")
        .eq("source_url", prop.url)
        .maybeSingle();
      if (existing) continue;

      const outcode = prop.outcode || "";
      const { data: insertedProp } = await supabase
        .from("leads_properties")
        .insert({
          source: "rightmove",
          source_url: prop.url,
          property_address: prop.displayAddress || prop.title || null,
          postcode: outcode + (prop.incode ? " " + prop.incode : ""),
          borough: OUTCODE_TO_BOROUGH[outcode] || null,
          bedrooms: prop.bedrooms || null,
          property_type: prop.propertyType || null,
          listed_rent: parseRent(prop.price),
          days_on_market: calculateDaysOnMarket(prop.firstVisibleDate),
          is_reduced: prop.listingUpdateReason === "price_reduced",
          vacant_signal: false,
          raw_data: prop as never,
          status: "new",
        })
        .select()
        .single();

      if (!insertedProp) continue;

      if (prop.agent || prop.agentPhone) {
        await supabase.from("leads_landlords").insert({
          property_id: insertedProp.id,
          full_name: prop.agent || null,
          phone: prop.agentPhone || null,
          is_company: true,
          company_name: prop.agent || null,
          source: "rightmove",
          lead_temp: prop.listingUpdateReason === "price_reduced" ? "warm" : "cold",
        });
      }

      const scoringUrl = new URL("/api/admin/leads/score", requestUrl).toString();
      fetch(scoringUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-apify-secret": expectedSecret },
        body: JSON.stringify({ leadId: insertedProp.id }),
      }).catch(() => {});

    } catch (err) {
      console.error("Property processing error:", err);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const providedSecret = req.headers.get("x-apify-secret");
    const expectedSecret = process.env.APIFY_WEBHOOK_SECRET;

    if (!expectedSecret || providedSecret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    let properties: ApifyProperty[] = [];

    if (Array.isArray(body)) {
      properties = body;
    } else if (Array.isArray(body.items)) {
      properties = body.items;
    } else if (body.resource?.defaultDatasetId) {
      const datasetId = body.resource.defaultDatasetId;
      const apifyToken = process.env.APIFY_API_TOKEN;
      if (!apifyToken) {
        return NextResponse.json({ error: "APIFY_API_TOKEN not configured" }, { status: 500 });
      }
      const fetchRes = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${apifyToken}&format=json`);
      if (fetchRes.ok) {
        properties = await fetchRes.json();
      }
    }

    if (properties.length === 0) {
      return NextResponse.json({ message: "No properties received", processed: 0 });
    }

    const requestUrl = req.url;
    processProperties(properties, expectedSecret, requestUrl).catch((err) => {
      console.error("Background processing error:", err);
    });

    return NextResponse.json({
      message: "Ingest started",
      received: properties.length,
      note: "Processing in background. Check /admin/leads in 1-2 minutes.",
    });

  } catch (err) {
    console.error("Ingest error:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "TPS Lead Ingest endpoint is live" });
}
