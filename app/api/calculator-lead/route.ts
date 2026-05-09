import { NextResponse } from "next/server";
import { createAnonClient } from "@/lib/supabase/anon";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { CalculatorPDF } from "@/lib/pdf/CalculatorPDF";
import React from "react";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const supabase = createAnonClient();

    const { data: lead, error } = await supabase
      .from("calculator_leads")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error("Calculator lead insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let pdfBuffer: Buffer | null = null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfBuffer = await renderToBuffer(React.createElement(CalculatorPDF, { data }) as any);
    } catch (pdfErr) {
      console.error("Calculator PDF generation failed:", pdfErr);
    }

    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const safeEmail = String(data.email || "lead").replace(/[^a-zA-Z0-9]/g, "_");
      const filename = "TPS_Calculation_" + safeEmail + "_" + new Date().toISOString().split("T")[0] + ".pdf";
      const attachments = pdfBuffer ? [{ filename, content: pdfBuffer }] : undefined;

      const calcType = data.calculator_type === "r2sa" ? "R2SA" : data.calculator_type === "r2hmo" ? "R2HMO" : "Single Let";
      const monthlyProfit = Math.round(Number(data.results?.monthlyProfit || 0));
      const annualProfit = Math.round(Number(data.results?.annualProfit || 0));
      const companyName = String(data.inputs?.company_name || "");
      const propertyTitle = String(data.inputs?.property_title || "");
      const propertyAddress = String(data.inputs?.property_address || "");

      try {
        await resend.emails.send({
          from: "TPS Calculator <onboarding@resend.dev>",
          to: process.env.NOTIFICATION_EMAIL,
          subject: "New " + calcType + " Calculation: " + (companyName || data.email) + " - GBP " + monthlyProfit.toLocaleString() + "/mo",
          html: '<div style="font-family:Arial,sans-serif;max-width:600px;color:#1a2332;"><h2 style="color:#0a1f3a;">New Calculator Lead</h2><p><strong>Calculator:</strong> ' + calcType + '</p><p><strong>Email:</strong> ' + data.email + '</p>' + (data.full_name ? '<p><strong>Name:</strong> ' + data.full_name + '</p>' : "") + (companyName ? '<p><strong>Company:</strong> ' + companyName + '</p>' : "") + (propertyTitle ? '<p><strong>Property:</strong> ' + propertyTitle + '</p>' : "") + (propertyAddress ? '<p><strong>Address:</strong> ' + propertyAddress + '</p>' : "") + '<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" /><p><strong>Monthly Profit:</strong> GBP ' + monthlyProfit.toLocaleString() + '</p><p><strong>Annual Profit:</strong> GBP ' + annualProfit.toLocaleString() + '</p>' + (pdfBuffer ? '<p style="font-size:13px;color:#6b7785;margin-top:16px;">Full calculation PDF attached.</p>' : "") + '</div>',
          attachments,
        });
      } catch (e) {
        console.error("Calculator notification email failed:", e);
      }

      try {
        await resend.emails.send({
          from: "TPS <onboarding@resend.dev>",
          to: data.email,
          subject: "Your " + calcType + " Calculation - TPS",
          html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a2332;"><div style="background:#0a1f3a;color:white;padding:32px;border-radius:12px 12px 0 0;"><h1 style="margin:0;font-size:24px;">TPS</h1><p style="margin:8px 0 0;opacity:0.8;font-size:14px;">The Property Source Group</p></div><div style="background:#fafaf7;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none;"><h2 style="color:#0a1f3a;margin:0 0 16px;">Your ' + calcType + ' Calculation</h2><p style="line-height:1.6;color:#4a5568;">Thank you' + (data.full_name ? ", " + data.full_name : "") + '. Your calculation has been saved.</p>' + (pdfBuffer ? '<p style="line-height:1.6;color:#4a5568;">A full PDF copy of your calculation is attached for your records.</p>' : "") + '<div style="background:white;padding:20px;border-radius:8px;margin:24px 0;border:1px solid #e5e7eb;"><p style="margin:0 0 8px;color:#6b7785;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Headline Result</p><p style="margin:0;color:#0a1f3a;font-size:28px;font-weight:bold;">GBP ' + monthlyProfit.toLocaleString() + '<span style="font-size:14px;color:#6b7785;font-weight:normal;"> / month</span></p></div><p style="line-height:1.6;color:#4a5568;">We will be in touch when off-market deals matching these numbers come up. Want to register full investment criteria? <a href="https://thepropertysourcegroup.com/register-criteria" style="color:#3da5f5;">Register here</a>.</p><p style="font-size:13px;color:#6b7785;line-height:1.6;margin-top:24px;">All figures are estimates based on the inputs you provided. Always conduct full due diligence before any investment decision.</p><hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" /><p style="font-size:13px;color:#6b7785;margin:0;">Questions? Contact <a href="mailto:contact@thepropertysourcegroup.com" style="color:#3da5f5;">contact@thepropertysourcegroup.com</a></p></div></div>',
          attachments,
        });
      } catch (e) {
        console.error("Calculator client email failed:", e);
      }
    }

    return NextResponse.json({ success: true, id: lead.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Calculator lead error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
