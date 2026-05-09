import { NextResponse } from "next/server";
import { createAnonClient } from "@/lib/supabase/anon";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const supabase = createAnonClient();

    const { data: enquiry, error } = await supabase
      .from("landlord_enquiries")
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
          from: "TPS Website <noreply@thepropertysourcegroup.com>",
          to: process.env.NOTIFICATION_EMAIL,
          subject: `New Landlord Enquiry: ${data.property_postcode}`,
          html: `
            <h2>New Landlord Enquiry</h2>
            <p><strong>${data.full_name}</strong></p>
            <p>Email: ${data.email}<br/>Mobile: ${data.mobile}</p>
            <hr/>
            <p><strong>Property:</strong> ${data.property_address}, ${data.property_postcode}</p>
            <p><strong>Type:</strong> ${data.property_type} - ${data.bedrooms} bed</p>
            <p><strong>Status:</strong> ${data.current_status}</p>
            <p><strong>Expected Rent:</strong> £${data.monthly_rent_expected || "Not specified"}</p>
            <p><strong>Preferred Strategy:</strong> ${data.preferred_strategy || "Open to suggestions"}</p>
            <p><strong>Available From:</strong> ${data.available_from || "Flexible"}</p>
            <p><strong>Notes:</strong> ${data.additional_info || "None"}</p>
          `,
        });
      } catch (emailErr) {
        console.error("Email failed (data saved):", emailErr);
      }
    }

    return NextResponse.json({ success: true, id: enquiry.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Landlord enquiry error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
