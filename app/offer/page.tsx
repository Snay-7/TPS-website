"use client";
import { useState } from "react";
import Link from "next/link";

export default function OfferForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    if (!formData.get("agree_terms") || !formData.get("agree_contact") || !formData.get("agree_fee")) {
      setError("Please confirm all declarations to submit your offer.");
      setSubmitting(false);
      return;
    }

    const data = {
      full_name: String(formData.get("full_name") || ""),
      company_name: String(formData.get("company_name") || ""),
      email: String(formData.get("email") || ""),
      mobile: String(formData.get("mobile") || ""),
      property_address: String(formData.get("property_address") || ""),
      viewing_date: String(formData.get("viewing_date") || ""),
      property_type: String(formData.get("property_type") || ""),
      bedrooms: Number(formData.get("bedrooms") || 0),
      rent_offered: Number(formData.get("rent_offered") || 0),
      lease_length: String(formData.get("lease_length") || ""),
      start_date: String(formData.get("start_date") || ""),
      intended_use: String(formData.get("intended_use") || ""),
      bills_included: String(formData.get("bills_included") || ""),
      sourcing_fee: Number(formData.get("sourcing_fee") || 0),
      sourcing_fee_terms: String(formData.get("sourcing_fee_terms") || ""),
      comments: String(formData.get("comments") || ""),
      signature: String(formData.get("signature") || ""),
    };

    try {
      const res = await fetch("/api/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong. Please try again or email contact@thepropertysourcegroup.com directly.");
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
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Offer Submitted</h2>
          <p className="text-gray-600 mb-2 leading-relaxed">Thank you. Your offer has been received and we will respond within 2 working days.</p>
          <p className="text-gray-500 text-sm mb-8">A confirmation copy has been emailed to you for your records.</p>
          <Link href="/" className="inline-block bg-navy text-white px-8 py-4 rounded-lg font-semibold hover:bg-navy-dark transition-colors">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-3">R2R Offer Submission</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-4 leading-tight">Submit Your Offer</h1>
          <p className="text-gray-600 text-lg">Complete this form to formally submit your Rent-to-Rent offer. We will respond within 2 working days.</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

          <Section num="1" color="bg-brand-blue" title="Applicant Details">
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Full Name *" name="full_name" required />
              <Input label="Trading / Company Name" name="company_name" />
              <Input label="Email Address *" name="email" type="email" required />
              <Input label="Mobile Number *" name="mobile" type="tel" required />
            </div>
          </Section>

          <Section num="2" color="bg-brand-yellow text-navy" title="Property Details">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2"><Input label="Property Address *" name="property_address" required placeholder="Full property address including postcode" /></div>
              <Input label="Date of Viewing *" name="viewing_date" type="date" required />
              <Input label="Number of Bedrooms *" name="bedrooms" type="number" required />
              <div className="md:col-span-2">
                <Select label="Property Type *" name="property_type" required options={["Studio", "1 Bedroom Flat", "2 Bedroom Flat", "3 Bedroom House", "4 Bedroom House", "5+ Bedroom House (HMO)", "Other"]} />
              </div>
            </div>
          </Section>

          <Section num="3" color="bg-brand-green" title="Offer Terms">
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Monthly Rent Offered (£) *" name="rent_offered" type="number" required placeholder="1500" />
              <Select label="Proposed Lease Length *" name="lease_length" required options={["3 Years", "4 Years", "5 Years", "6 Years", "7+ Years"]} />
              <Input label="Proposed Start Date *" name="start_date" type="date" required />
              <Select label="Bills Included in Rent? *" name="bills_included" required options={["No", "Yes - all included", "Partial"]} />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-navy mb-3">Intended Use of Property *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {["HMO", "Serviced Accommodation", "Single Let", "Corporate Let", "Social Housing", "Supported Living"].map((o) => (
                  <label key={o} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-brand-blue cursor-pointer has-[:checked]:bg-navy has-[:checked]:text-white has-[:checked]:border-navy transition-colors">
                    <input type="radio" name="intended_use" value={o} required className="hidden" />
                    <span className="text-sm font-medium">{o}</span>
                  </label>
                ))}
              </div>
            </div>
          </Section>

          <Section num="4" color="bg-brand-yellow text-navy" title="Sourcing Fee Agreement">
            <div className="bg-cream rounded-xl p-5 mb-6 border-l-4 border-brand-yellow">
              <p className="font-semibold text-navy mb-2 text-sm">About sourcing fees</p>
              <p className="text-xs text-gray-700 leading-relaxed">A sourcing fee is the fee payable to TPS for sourcing this property opportunity. This is in addition to monthly rent and is payable as agreed below.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Input label="Sourcing Fee Offered (£) *" name="sourcing_fee" type="number" required placeholder="2500" />
              <Select label="Fee Payment Terms *" name="sourcing_fee_terms" required options={[
                "On exchange of contracts",
                "On signing of lease",
                "50% on offer acceptance, 50% on completion",
                "Within 7 days of lease signing",
                "Within 14 days of lease signing",
                "Other (specify in comments)"
              ]} />
            </div>
          </Section>

          <Section num="5" color="bg-navy" title="Additional Comments">
            <label className="block text-sm font-semibold text-navy mb-2">Refurbishment plans, special terms, or anything else we should know</label>
            <textarea name="comments" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors" placeholder="Optional. Describe any works you intend to carry out, additional terms, or supporting information." />
          </Section>

          <Section num="6" color="bg-navy" title="Declaration & Signature">
            <div className="bg-cream rounded-xl p-5 mb-6 border-l-4 border-brand-yellow">
              <p className="font-semibold text-navy mb-3 text-sm">By submitting, you confirm and agree:</p>
              <ul className="text-xs text-gray-700 space-y-2 leading-relaxed">
                <li>The information provided is true, accurate and complete to the best of your knowledge.</li>
                <li>This offer is submitted in good faith and is subject to contract, references, and landlord approval.</li>
                <li>You have the legal right and financial capacity to enter into a Rent-to-Rent agreement on these terms.</li>
                <li>The sourcing fee stated above is non-refundable once the lease is signed.</li>
                <li>TPS reserves the right to accept, reject, or counter this offer at its sole discretion.</li>
                <li>This offer does not constitute a binding tenancy agreement until a formal contract is signed.</li>
                <li>You consent to TPS conducting credit, identity, and reference checks.</li>
                <li>Personal data will be processed in accordance with our Privacy Policy and UK GDPR.</li>
              </ul>
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-brand-blue transition-colors">
                <input type="checkbox" name="agree_terms" required className="mt-1 w-4 h-4 accent-navy" />
                <span className="text-sm text-gray-700">I confirm I have read and accept the declaration above, and all information I have provided is accurate. <span className="text-red-600">*</span></span>
              </label>
              <label className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-brand-blue transition-colors">
                <input type="checkbox" name="agree_fee" required className="mt-1 w-4 h-4 accent-navy" />
                <span className="text-sm text-gray-700">I agree to pay the sourcing fee stated above according to the payment terms specified. <span className="text-red-600">*</span></span>
              </label>
              <label className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-brand-blue transition-colors">
                <input type="checkbox" name="agree_contact" required className="mt-1 w-4 h-4 accent-navy" />
                <span className="text-sm text-gray-700">I consent to TPS contacting me regarding this offer and conducting necessary checks. <span className="text-red-600">*</span></span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Signature (Type your full legal name) *</label>
              <input type="text" name="signature" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none" style={{ fontFamily: "Brush Script MT, cursive", fontSize: "20px" }} placeholder="Type your full name" />
            </div>
          </Section>

          <div className="bg-cream p-8 border-t border-gray-100">
            <button type="submit" disabled={submitting} className="w-full bg-navy text-white py-4 rounded-lg font-bold text-lg hover:bg-navy-dark disabled:opacity-50 transition-colors">
              {submitting ? "Submitting Offer..." : "Submit Offer"}
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">A copy will be emailed to you for your records.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

function Section({ num, color, title, children }: { num: string; color: string; title: string; children: React.ReactNode }) {
  return (
    <div className="p-8 border-b border-gray-100 last:border-b-0">
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
