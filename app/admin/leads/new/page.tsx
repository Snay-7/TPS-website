"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin-client";

export default function NewLeadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const supabase = createAdminClient();

    const { data, error: insertError } = await supabase
      .from("leads_properties")
      .insert({
        source: String(formData.get("source") || "manual"),
        source_url: String(formData.get("source_url") || ""),
        property_address: String(formData.get("property_address") || ""),
        postcode: String(formData.get("postcode") || ""),
        borough: String(formData.get("borough") || ""),
        bedrooms: Number(formData.get("bedrooms") || 0) || null,
        property_type: String(formData.get("property_type") || ""),
        listed_rent: Number(formData.get("listed_rent") || 0) || null,
        days_on_market: Number(formData.get("days_on_market") || 0) || null,
        is_reduced: formData.get("is_reduced") === "on",
        vacant_signal: formData.get("vacant_signal") === "on",
        status: "new",
      })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    // Create landlord record if email/phone provided
    const landlordEmail = String(formData.get("landlord_email") || "");
    const landlordPhone = String(formData.get("landlord_phone") || "");
    const landlordName = String(formData.get("landlord_name") || "");

    if (landlordEmail || landlordPhone || landlordName) {
      await supabase.from("leads_landlords").insert({
        property_id: data.id,
        full_name: landlordName || null,
        email: landlordEmail || null,
        phone: landlordPhone || null,
        source: "manual",
      });
    }

    router.push(`/admin/leads/${data.id}`);
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Link href="/admin/leads" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-navy mb-4">
        ← Back to leads
      </Link>

      <h1 className="text-2xl font-bold text-navy mb-1">Add Lead Manually</h1>
      <p className="text-gray-500 text-sm mb-6">Use this form to add leads found offline (referrals, networking, etc.)</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <Section title="Property">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Property Address *" name="property_address" required placeholder="123 Acton Way" />
            <Input label="Postcode *" name="postcode" required placeholder="W3 8DR" />
            <Input label="Borough" name="borough" placeholder="Ealing" />
            <Select label="Property Type" name="property_type" options={["Studio", "Flat", "House", "HMO", "Bungalow", "Other"]} />
            <Input label="Bedrooms" name="bedrooms" type="number" placeholder="3" />
            <Input label="Listed Rent (£/mo)" name="listed_rent" type="number" placeholder="2400" />
            <Input label="Days on Market" name="days_on_market" type="number" placeholder="47" />
            <div className="grid grid-cols-2 gap-2 items-end pb-1">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="is_reduced" className="w-4 h-4 accent-navy" />
                Price reduced
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="vacant_signal" className="w-4 h-4 accent-navy" />
                Vacant signal
              </label>
            </div>
          </div>
        </Section>

        <Section title="Source">
          <div className="grid grid-cols-2 gap-4">
            <Select label="Source" name="source" options={["manual", "rightmove", "zoopla", "openrent", "referral", "other"]} />
            <Input label="Source URL" name="source_url" type="url" placeholder="https://rightmove.co.uk/..." />
          </div>
        </Section>

        <Section title="Landlord (optional)">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name" name="landlord_name" placeholder="John Smith" />
            <Input label="Email" name="landlord_email" type="email" placeholder="john@example.com" />
            <div className="col-span-2">
              <Input label="Phone" name="landlord_phone" type="tel" placeholder="07712 345 678" />
            </div>
          </div>
        </Section>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy text-white py-3 rounded-lg font-bold hover:bg-navy-dark disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Lead"}
        </button>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-bold text-navy uppercase tracking-wider mb-3">{title}</div>
      {children}
    </div>
  );
}

function Input({ label, name, type = "text", required = false, placeholder = "" }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-navy mb-1.5">{label}</label>
      <input type={type} name={name} required={required} placeholder={placeholder} className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue text-sm" />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-navy mb-1.5">{label}</label>
      <select name={name} className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue bg-white text-sm">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}