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

// HARD REJECT - never engage, corporate policy blocks R2R
const BLOCKED_AGENCIES = [
  "foxtons",
  "savills",
  "knight frank",
  "knightfrank",
  "hamptons",
  "strutt & parker",
  "strutt and parker",
  "chestertons",
  "john d wood",
  "john d. wood",
  "jll",
  "cluttons",
  "douglas & gordon",
  "douglas and gordon",
  "kfh",
  "kinleigh folkard",
];

// DOWNRANK - sometimes flexible, mark as cold
const DOWNRANK_AGENCIES = [
  "winkworth",
  "marsh & parsons",
  "marsh and parsons",
  "greene & co",
  "greene and co",
  "anscombe & ringland",
  "anscombe and ringland",
  "benham & reeves",
  "benham and reeves",
  "dexters",
  "ludlow thompson",
  "kinleigh folkard hayward",
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
  return match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
}

function hasBlockedKeyword(property: ApifyProperty): boolean {
  const text = [property.description || "", property.title || "", ...(property.features || [])].join(" ").toLowerCase();
  return BLOCKED_KEYWORDS.some((kw) => text.includes(kw));
}

function isBlockedAgency(agent?: string): boolean {
  if (!agent) return false;
  const agentLower = agent.toLowerCase();
  return BLOCKED_AGENCIES.some((blocked) => agentLower.includes(blocked));
}

function isDownrankAgency(agent?: string): boolean {
  if (!agent) return false;
  const agentLower = agent.toLowerCase();
  return DOWNRANK_AGENCIES.some((dr) => agentLower.includes(dr));
}

function isDirectLandlord(agent?: string): boolean {
  if (!agent) return false;
  const agentLower = agent.toLowerCase();
  return agentLower.includes("openrent") || agentLower.includes("private landlord") || agentLower.includes("direct from landlord");
}

function calculateDaysOnMarket(firstVisibleDate?: string): number | null {
  if (!firstVisibleDate) return null;
  return Math.floor((Date.now() - new Date(firstVisibleDate).getTime()) / 86400000);
}

async function processBatch(properties: ApifyProperty[]) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  let saved = 0, rejectedConcierge = 0, rejectedAgency = 0, duplicates = 0;
  const errors: string[] = [];

  for (const prop of properties) {
    try {
      if (!prop.url) continue;
      if (hasBlockedKeyword(prop)) { rejectedConcierge++; continue; }
      if (isBlockedAgency(prop.agent)) { rejectedAgency++; continue; }

      const { data: existing } = await supabase.from("leads_properties").select("id").eq("source_url", prop.url).maybeSingle();
      if (existing) { duplicates++; continue; }

      const outcode = prop.outcode || "";
      const { data: insertedProp, error: insertError } = await supabase.from("leads_properties").insert({
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
      }).select().single();

      if (insertError || !insertedProp) { errors.push("Insert: " + (insertError?.message || "?")); continue; }

      // Determine lead temperature based on agency type + signals
      let leadTemp = "cold";
      if (isDirectLandlord(prop.agent)) {
        leadTemp = "hot";
      } else if (isDownrankAgency(prop.agent)) {
        leadTemp = "cold";
      } else if (prop.listingUpdateReason === "price_reduced") {
        leadTemp = "warm";
      } else {
        leadTemp = "warm";
      }

      if (prop.agent || prop.agentPhone) {
        await supabase.from("leads_landlords").insert({
          property_id: insertedProp.id,
          full_name: prop.agent || null,
          phone: prop.agentPhone || null,
          is_company: true,
          company_name: prop.agent || null,
          source: "rightmove",
          lead_temp: leadTemp,
        });
      }

      saved++;
    } catch (err) {
      errors.push("Prop: " + (err as Error).message);
    }
  }

  console.log(`Batch done: saved=${saved}, concierge=${rejectedConcierge}, agency=${rejectedAgency}, duplicates=${duplicates}, errors=${errors.length}`);
  return { saved, rejectedConcierge, rejectedAgency, duplicates, errors };
}

export async function POST(req: NextRequest) {
  try {
    const providedSecret = req.headers.get("x-apify-secret");
    if (!process.env.APIFY_WEBHOOK_SECRET || providedSecret !== process.env.APIFY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    let properties: ApifyProperty[] = [];

    if (Array.isArray(body)) properties = body;
    else if (Array.isArray(body.items)) properties = body.items;
    else if (body.resource?.defaultDatasetId) {
      const apifyToken = process.env.APIFY_API_TOKEN;
      if (!apifyToken) return NextResponse.json({ error: "APIFY_API_TOKEN missing" }, { status: 500 });
      const fetchRes = await fetch(`https://api.apify.com/v2/datasets/${body.resource.defaultDatasetId}/items?token=${apifyToken}&format=json`);
      if (!fetchRes.ok) return NextResponse.json({ error: "Apify fetch failed: " + fetchRes.status }, { status: 500 });
      properties = await fetchRes.json();
    }

    if (properties.length === 0) return NextResponse.json({ message: "No properties", saved: 0 });
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY missing" }, { status: 500 });

    // Small batch (test curl): sync return
    if (properties.length <= 5) {
      const result = await processBatch(properties);
      return NextResponse.json({ message: "Ingest complete", received: properties.length, ...result });
    }

    // Large batch (Apify webhook): waitUntil pattern
    const { waitUntil } = await import("@vercel/functions");
    waitUntil(processBatch(properties));

    return NextResponse.json({
      message: "Ingest accepted",
      received: properties.length,
      note: "Processing in background. Properties will appear in 1-2 minutes.",
    });

  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "TPS Lead Ingest endpoint is live - with agency filter" });
}
