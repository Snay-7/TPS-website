import { NextResponse } from "next/server";
import { createAnonClient } from "@/lib/supabase/anon";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const supabase = createAnonClient();

    const { data: criteria, error } = await supabase
      .from("investor_criteria")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "TPS Website <onboarding@resend.dev>",
          to: process.env.NOTIFICATION_EMAIL,
          subject: `New Investor: ${data.full_name} - £${Number(data.budget_min).toLocaleString()} to £${Number(data.budget_max).toLocaleString()}`,
          html: `
            <h2>New Investor Criteria Registration</h2>
            <p><strong>${data.full_name}</strong></p>
            <p>Email: ${data.email}<br/>Mobile: ${data.mobile}</p>
            <hr/>
            <p><strong>Budget:</strong> £${Number(data.budget_min).toLocaleString()} - £${Number(data.budget_max).toLocaleString()}</p>
            <p><strong>Funding:</strong> ${data.funding_method}</p>
            <p><strong>Timeline:</strong> ${data.timeline}</p>
            <p><strong>Strategies:</strong> ${(data.strategies || []).join(", ")}</p>
            <p><strong>Regions:</strong> ${(data.preferred_regions || []).join(", ")}</p>
            <p><strong>Min Yield:</strong> ${data.min_yield || "N/A"}%</p>
            <p><strong>Notes:</strong> ${data.additional_notes || "None"}</p>
          `,
        });
      } catch (emailErr) {
        console.error("Email failed (data saved):", emailErr);
      }
    }

    return NextResponse.json({ success: true, id: criteria.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Criteria submission error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
