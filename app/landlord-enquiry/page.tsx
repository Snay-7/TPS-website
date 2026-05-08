"use client";
import { useState } from "react";
import Link from "next/link";

export default function LandlordEnquiry() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    type LandlordData = {
      full_name: string;
      email: string;
      mobile: string;
      property_address: string;
      property_postcode: string;
      property_type: string;
      bedrooms: number;
      current_status: string;
      monthly_rent_expected: number | null;
      preferred_strategy: string;
      available_from: string | null;
      additional_info: string;
    };

    const data: LandlordData = {
      full_name: String(formData.get("full_name") || ""),
      email: String(formData.get("email") || ""),
      mobile: String(formData.get("mobile") || ""),
      property_address: String(formData.get("property_address") || ""),
      property_postcode: String(formData.get("property_postcode") || ""),
      property_type: String(formData.get("property_type") || ""),
      bedrooms: Number(formData.get("bedrooms") || 0),
      current_status: String(formData.get("current_status") || ""),
      monthly_rent_expected: formData.get("monthly_rent_expected") ? Number(formData.get("monthly_rent_expected")) : null,
      preferred_strategy: String(formData.get("preferred_strategy") || ""),
      available_from: formData.get("available_from") ? String(formData.get("available_from")) : null,
      additional_info: String(formData.get("additional_info") || ""),
    };

    try {
      const res = await fetch("/api/landlord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong. Please try again or email contact@thepropertysourcegroup.com.");
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
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Enquiry Received</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">Thanks. We will review your property details and respond within 24 hours with a guaranteed rent quote.</p>
          <Link href="/" className="inline-block bg-navy text-white px-8 py-4 rounded-lg font-semibold hover:bg-navy-dark transition-colors">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-3">For Landlords</div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-navy mb-4 leading-tight">Get a Free Guaranteed Rent Quote</h1>
          <p className="text-gray-600 text-lg">Tell us about your property and we will respond within 24 hours with a no-obligation guaranteed rent offer.</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <FormSection num="1" color="bg-brand-blue" title="Your Details">
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Full Name *" name="full_name" required />
              <Input label="Email *" name="email" type="email" required />
              <Input label="Mobile *" name="mobile" type="tel" required />
            </div>
          </FormSection>

          <FormSection num="2" color="bg-brand-yellow text-navy" title="Your Property">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2"><Input label="Property Address *" name="property_address" required placeholder="Street, City" /></div>
              <Input label="Postcode *" name="property_postcode" required placeholder="M14 5JQ" />
              <Select label="Property Type *" name="property_type" required options={["Studio", "1 Bedroom Flat", "2 Bedroom Flat", "3 Bedroom House", "4 Bedroom House", "5+ Bedroom House", "HMO Ready", "Other"]} />
              <Input label="Number of Bedrooms *" name="bedrooms" type="number" required placeholder="3" />
              <Select label="Current Status *" name="current_status" required options={["Vacant", "Currently Tenanted", "Available within 1 month", "Available within 3 months", "Just Acquiring"]} />
            </div>
          </FormSection>

          <FormSection num="3" color="bg-brand-green" title="Your Preferences">
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Expected Monthly Rent (£)" name="monthly_rent_expected" type="number" placeholder="1500" />
              <Select label="Preferred Strategy" name="preferred_strategy" options={["Open to suggestions", "R2HMO", "R2SA Serviced Accommodation", "Social Housing", "Supported Living", "Single Let R2R"]} />
              <Input label="Available From" name="available_from" type="date" />
            </div>
          </FormSection>

          <div className="p-8 border-b border-gray-100">
            <label className="block text-sm font-semibold text-navy mb-3">Anything Else?</label>
            <textarea name="additional_info" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors" placeholder="Recent refurbishment, special features, current rental income, etc..." />
          </div>

          <div className="bg-cream p-8 border-t border-gray-100">
            <button type="submit" disabled={submitting} className="w-full bg-navy text-white py-4 rounded-lg font-bold text-lg hover:bg-navy-dark disabled:opacity-50 transition-colors">
              {submitting ? "Submitting..." : "Get My Free Quote"}
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">No obligation. Response within 24 hours. We never share your data.</p>
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

function Input({ label, name, type = "text", required = false, placeholder = "" }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy mb-2">{label}</label>
      <input type={type} name={name} required={required} placeholder={placeholder} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors" />
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
