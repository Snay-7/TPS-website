import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const supabase = await createClient();

    const { data: lead, error } = await supabase
      .from("calculator_leads")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, id: lead.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Calculator lead error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
