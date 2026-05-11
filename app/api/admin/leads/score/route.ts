import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type RawData = {
  description?: string;
  features?: string[];
  letAvailableDate?: string;
  furnishType?: string;
  letType?: string;
  nearestStations?: Array<{ name?: string; distance?: number; types?: string[] }>;
  agent?: string;
  agentPhone?: string;
  listingUpdateReason?: string;
  firstVisibleDate?: string;
  coordinates?: { latitude?: number; longitude?: number };
};

export async function POST(req: NextRequest) {
  try {
    const providedSecret = req.headers.get("x-apify-secret");
    if (providedSecret !== process.env.APIFY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { leadId } = await req.json();
    if (!leadId) {
      return NextResponse.json({ error: "leadId required" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch the lead
    const { data: lead, error: fetchError } = await supabase
      .from("leads_properties")
      .select("*")
      .eq("id", leadId)
      .single();

    if (fetchError || !lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const raw = (lead.raw_data || {}) as RawData;

    // Build property summary for Claude
    const stations = (raw.nearestStations || [])
      .map((s) => `${s.name} (${s.distance ? s.distance.toFixed(2) + "mi" : "?"})`)
      .join(", ");

    const propertyContext = `
Property: ${lead.property_address}
Postcode: ${lead.postcode}
Borough: ${lead.borough}
Bedrooms: ${lead.bedrooms}
Type: ${lead.property_type}
Listed rent: £${lead.listed_rent} PCM
Days on market: ${lead.days_on_market}
Price reduced: ${lead.is_reduced ? "YES (motivated seller signal)" : "No"}
Available from: ${raw.letAvailableDate || "Unknown"}
Furnish: ${raw.furnishType || "Unknown"}
Let type: ${raw.letType || "Unknown"}
Nearest stations: ${stations || "Unknown"}
Listing reason: ${raw.listingUpdateReason || "Unknown"}
Features: ${(raw.features || []).slice(0, 8).join("; ")}
Description excerpt: ${(raw.description || "").substring(0, 500)}
`.trim();

    const systemPrompt = `You are a property analyst scoring UK residential rental listings on a 0-100 scale based on objective property data only.

Scoring criteria (weight each fairly):
- Days on market (longer = lower demand = higher motivation = higher score)
- Price reduction signal (reduced = highly motivated)
- Location quality (proximity to transport, central London)
- Property condition signals from description (modern/refurbished = better)
- Property type (1-2 bed flats in Zone 1/2 score highest)
- Vacant availability (available immediately = higher score)
- Furnish flexibility (flexible/furnished = better for sub-letting)

Scoring scale:
- 85-100: Exceptional opportunity. Multiple positive signals.
- 70-84: Strong lead. Worth direct outreach.
- 50-69: Decent. Worth a calls if capacity allows.
- 30-49: Marginal. Low priority.
- 0-29: Poor fit. Skip.

Respond ONLY with valid JSON in this exact structure:
{
  "score": <number 0-100>,
  "reasoning": "<2-3 sentence explanation of the score>",
  "suggested_strategy": "<one of: R2SA | R2HMO | Single Let | Skip>"
}

Do not include any text outside the JSON.`;

    const userPrompt = `Score this property:\n\n${propertyContext}`;

    // Call Claude API
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
    }

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 500,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      return NextResponse.json({ error: "Claude API error: " + errText }, { status: 500 });
    }

    const claudeData = await anthropicRes.json();
    const responseText = claudeData.content?.[0]?.text || "";

    // Parse JSON response
    let parsed: { score: number; reasoning: string; suggested_strategy: string };
    try {
      // Strip markdown fences if Claude added them
      const cleaned = responseText.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json({ error: "Failed to parse Claude response: " + responseText.substring(0, 200) }, { status: 500 });
    }

    // Update the lead with score
    const { error: updateError } = await supabase
      .from("leads_properties")
      .update({
        ai_score: parsed.score,
        ai_reasoning: parsed.reasoning,
        ai_suggested_strategy: parsed.suggested_strategy,
      })
      .eq("id", leadId);

    if (updateError) {
      return NextResponse.json({ error: "Update failed: " + updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Lead scored successfully",
      leadId,
      score: parsed.score,
      strategy: parsed.suggested_strategy,
    });

  } catch (err) {
    console.error("Score error:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
