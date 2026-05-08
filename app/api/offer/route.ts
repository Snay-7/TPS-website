import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { OfferPDF } from "@/lib/pdf/OfferPDF";
import React from "react";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const supabase = await createClient();

    const { data: offer, error } = await supabase
      .from("offers")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error("Offer insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const fee = Number(data.sourcing_fee || 0);
    const deposit = fee * 0.3;
    const completion = fee * 0.7;

    // Generate PDF
    let pdfBuffer: Buffer | null = null;
    try {
      pdfBuffer = await renderToBuffer(React.createElement(OfferPDF, { data }) as React.ReactElement);
    } catch (pdfErr) {
      console.error("PDF generation failed:", pdfErr);
    }

    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const safeName = data.full_name.replace(/[^a-zA-Z0-9]/g, "_");
      const filename = `TPS_Offer_${safeName}_${new Date().toISOString().split("T")[0]}.pdf`;

      const offerSummary = `
        <h2 style="color:#0a1f3a;margin-bottom:8px;">R2R Offer Submitted</h2>
        <p style="color:#6b7785;margin:0 0 16px;">Submitted on ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} at ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
        <hr style="border:none;border-top:1px solid #d8dde5;margin:16px 0;" />
        <h3 style="color:#0a1f3a;font-size:16px;margin:24px 0 8px;">Applicant</h3>
        <p style="margin:4px 0;"><strong>${data.full_name}</strong>${data.company_name ? ` (${data.company_name})` : ""}</p>
        <p style="margin:4px 0;">Email: ${data.email}</p>
        <p style="margin:4px 0;">Mobile: ${data.mobile}</p>
        <h3 style="color:#0a1f3a;font-size:16px;margin:24px 0 8px;">Property</h3>
        <p style="margin:4px 0;"><strong>${data.property_address}</strong></p>
        <p style="margin:4px 0;">Type: ${data.property_type} - ${data.bedrooms} bed</p>
        <p style="margin:4px 0;">Viewing Date: ${data.viewing_date}</p>
        <h3 style="color:#0a1f3a;font-size:16px;margin:24px 0 8px;">Offer Terms</h3>
        <p style="margin:4px 0;"><strong>Monthly Rent: £${Number(data.rent_offered).toLocaleString()}</strong></p>
        <p style="margin:4px 0;">Lease Length: ${data.lease_length}</p>
        <p style="margin:4px 0;">Break Clause: ${data.break_clause || "Not specified"}</p>
        <p style="margin:4px 0;">Proposed Start: ${data.start_date}</p>
        <p style="margin:4px 0;">Intended Use: ${data.intended_use}</p>
        <p style="margin:4px 0;">Bills Included: ${data.bills_included}</p>
        <h3 style="color:#0a1f3a;font-size:16px;margin:24px 0 8px;">Sourcing Fee</h3>
        <p style="margin:4px 0;"><strong>Total Fee: £${fee.toLocaleString()}</strong></p>
        <p style="margin:4px 0;">30% on offer acceptance: <strong>£${deposit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong></p>
        <p style="margin:4px 0;">70% on completion: <strong>£${completion.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong></p>
        ${data.comments ? `<h3 style="color:#0a1f3a;font-size:16px;margin:24px 0 8px;">Additional Comments</h3><p style="margin:4px 0;">${data.comments}</p>` : ""}
        <hr style="border:none;border-top:1px solid #d8dde5;margin:24px 0 16px;" />
        <p style="margin:4px 0;font-size:13px;color:#6b7785;">Signed by: <strong>${data.signature}</strong></p>
      `;

      const attachments = pdfBuffer ? [{ filename, content: pdfBuffer }] : undefined;

      try {
        await resend.emails.send({
          from: "TPS Offers <onboarding@resend.dev>",
          to: process.env.NOTIFICATION_EMAIL,
          subject: `New R2R Offer: ${data.full_name} - £${Number(data.rent_offered).toLocaleString()}/mo + £${fee.toLocaleString()} fee`,
          html: offerSummary + (pdfBuffer ? '<p style="font-size:13px;color:#6b7785;margin-top:16px;">📎 Full offer PDF attached.</p>' : ""),
          attachments,
        });
      } catch (e) {
        console.error("Notification email failed:", e);
      }

      try {
        await resend.emails.send({
          from: "TPS <onboarding@resend.dev>",
          to: data.email,
          subject: "Your R2R Offer to TPS - Confirmation",
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a2332;">
              <div style="background:#0a1f3a;color:white;padding:32px;border-radius:12px 12px 0 0;">
                <h1 style="margin:0;font-size:24px;">TPS</h1>
                <p style="margin:8px 0 0;opacity:0.8;font-size:14px;">The Property Source Group</p>
              </div>
              <div style="background:#fafaf7;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none;">
                <h2 style="color:#0a1f3a;margin:0 0 16px;">Thank you, ${data.full_name}</h2>
                <p style="line-height:1.6;color:#4a5568;">We have received your offer for <strong>${data.property_address}</strong>. Our team will review and respond within 2 working days.</p>
                ${pdfBuffer ? '<p style="line-height:1.6;color:#4a5568;">📎 A full PDF copy of your offer is attached to this email for your records.</p>' : ""}
                <div style="background:white;padding:24px;border-radius:8px;margin:24px 0;border:1px solid #e5e7eb;">
                  ${offerSummary}
                </div>
                <p style="font-size:13px;color:#6b7785;line-height:1.6;">This offer is submitted in good faith and is subject to contract, references, and landlord approval. The sourcing fee is paid 30% on offer acceptance and 70% on completion. The 30% deposit is non-refundable once the offer is accepted.</p>
                <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
                <p style="font-size:13px;color:#6b7785;margin:0;">Questions? Reply to this email or contact <a href="mailto:contact@thepropertysourcegroup.com" style="color:#3da5f5;">contact@thepropertysourcegroup.com</a></p>
              </div>
            </div>
          `,
          attachments,
        });
      } catch (e) {
        console.error("Client confirmation email failed:", e);
      }
    }

    return NextResponse.json({ success: true, id: offer.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Offer submission error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}