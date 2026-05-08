"use client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterCriteria() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    type SubmissionData = {
      full_name: string;
      email: string;
      mobile: string;
      company_name: string;
      investor_type: string;
      experience_level: string;
      budget_min: number;
      budget_max: number;
      funding_method: string;
      timeline: string;
      strategies: string[];
      property_types: string[];
      preferred_regions: string[];
      postcodes: string;
      min_yield: number | null;
      bedrooms_min: number | null;
      bedrooms_max: number | null;
      additional_notes: string;
    };

    const data: SubmissionData = {
      full_name: String(formData.get("full_name") || ""),
      email: String(formData.get("email") || ""),
      mobile: String(formData.get("mobile") || ""),
      company_name: String(formData.get("company_name") || ""),
      investor_type: String(formData.get("investor_type") || ""),
      experience_level: String(formData.get("experience_level") || ""),
      budget_min: Number(formData.get("budget_min") || 0),
      budget_max: Number(formData.get("budget_max") || 0),
      funding_method: String(formData.get("funding_method") || ""),
      timeline: String(formData.get("timeline") || ""),
      strategies: formData.getAll("strategies").map(String),
      property_types: formData.getAll("property_types").map(String),
      preferred_regions: formData.getAll("preferred_regions").map(String),
      postcodes: String(formData.get("postcodes") || ""),
      min_yield: formData.get("min_yield") ? Number(formData.get("min_yield")) : null,
      bedrooms_min: formData.get("bedrooms_min") ? Number(formData.get("bedrooms_min")) : null,
      bedrooms_max: formData.get("bedrooms_max") ? Number(formData.get("bedrooms_max")) : null,
      additional_notes: String(formData.get("additional_notes") || ""),
    };

    try {
      const res = await fetch("/api/criteria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-24 px-6 flex items-center">
        <div className="bg-white rounded-3xl p-12 max-w-xl w-full mx-auto text-center shadow-2xl">
          <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Criteria Registered</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">Thanks. We have added your profile to our deal flow system. We will be in touch as soon as we have a property matching your criteria.</p>
          <Link href="/" className="inline-block bg-navy text-white px-8 py-4 rounded-lg font-semibold hover:bg-navy-dark transition-colors">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-3">Bespoke Deal Service</div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-navy mb-4 leading-tight">Register Your Investment Criteria</h1>
          <p className="text-gray-600 text-lg">Tell us exactly what you are looking for. We will match you to off-market deals before they hit the open market.</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <FormSection num="1" color="bg-brand-blue" title="Your Details">
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Full Name *" name="full_name" required />
              <Input label="Company Name" name="company_name" />
              <Input label="Email *" name="email" type="email" required />
              <Input label="Mobile *" name="mobile" type="tel" required />
              <Select label="Investor Type *" name="investor_type" required options={["Private Investor", "Limited Company", "SSAS or SIPP", "Family Office", "Other"]} />
              <Select label="Experience Level" name="experience_level" options={["First-Time Investor", "1-3 Properties", "4-10 Properties", "10+ Portfolio", "Professional/Full-Time"]} />
            </div>
          </FormSection>

          <FormSection num="2" color="bg-brand-green" title="Investment Profile">
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Budget Min (£) *" name="budget_min" type="number" required placeholder="100000" />
              <Input label="Budget Max (£) *" name="budget_max" type="number" required placeholder="500000" />
              <Select label="Funding Method *" name="funding_method" required options={["Cash Buyer", "Mortgage", "Bridging Finance", "Mixed/Hybrid", "Joint Venture"]} />
              <Select label="Timeline *" name="timeline" required options={["Ready Now", "Within 1 Month", "Within 3 Months", "Within 6 Months", "6+ Months"]} />
            </div>
          </FormSection>

          <FormSection num="3" color="bg-brand-yellow text-navy" title="Strategy & Property Types">
            <CheckGroup label="Strategies of Interest *" name="strategies" options={["Buy-to-Let (BTL)", "HMO", "Serviced Accommodation", "BRRR", "Flips", "Social Housing", "Supported Living", "Commercial Conversion"]} />
            <CheckGroup label="Property Types" name="property_types" options={["Terraced", "Semi-Detached", "Detached", "Flat/Apartment", "Bungalow", "Block of Flats", "Commercial", "Land"]} />
            <CheckGroup label="Preferred Regions *" name="preferred_regions" options={["London", "South East", "South West", "Midlands", "North West", "North East", "Yorkshire", "Wales", "Scotland"]} />
            <Input label="Specific Postcodes (optional)" name="postcodes" placeholder="e.g. M14, M16, LS6, B16" />
          </FormSection>

          <FormSection num="4" color="bg-navy" title="Return Requirements">
            <div className="grid md:grid-cols-3 gap-4">
              <Input label="Min Gross Yield (%)" name="min_yield" type="number" step="0.1" placeholder="8" />
              <Input label="Min Bedrooms" name="bedrooms_min" type="number" placeholder="2" />
              <Input label="Max Bedrooms" name="bedrooms_max" type="number" placeholder="6" />
            </div>
          </FormSection>

          <div className="p-8 border-b border-gray-100">
            <label className="block text-sm font-semibold text-navy mb-3">Additional Notes</label>
            <textarea name="additional_notes" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors" placeholder="Any specific requirements, deal types, or context we should know..." />
          </div>

          <div className="bg-cream p-8 border-t border-gray-100">
            <button type="submit" disabled={submitting} className="w-full bg-navy text-white py-4 rounded-lg font-bold text-lg hover:bg-navy-dark disabled:opacity-50 transition-colors">
              {submitting ? "Registering..." : "Register My Criteria"}
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">By submitting, you consent to TPS contacting you about matching deals. We never share your data.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormSection({ num, color, title, children }: { num: string; color: string; title: string; children: React.ReactNode }) {
  return (
    <div className="p-8 border-b border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <span className={`w-8 h-8 ${color} text-white rounded-full flex items-center justify-center text-sm font-bold`}>{num}</span>
        <h2 className="text-xl font-bold text-navy">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Input({ label, name, type = "text", required = false, placeholder = "", step }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; step?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy mb-2">{label}</label>
      <input type={type} name={name} required={required} placeholder={placeholder} step={step} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors" />
    </div>
  );
}

function Select({ label, name, required, options }: { label: string; name: string; required?: boolean; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy mb-2">{label}</label>
      <select name={name} required={required} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-white transition-colors">
        <option value="">Select...</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function CheckGroup({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-navy mb-3">{label}</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-brand-blue cursor-pointer has-[:checked]:bg-navy has-[:checked]:text-white has-[:checked]:border-navy transition-colors">
            <input type="checkbox" name={name} value={o} className="hidden" />
            <span className="text-sm font-medium">{o}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
