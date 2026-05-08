import Link from "next/link";
import type { Metadata } from "next";
import { CheckIcon, ArrowRightIcon, ShieldIcon, HouseIcon, StarIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Guaranteed Rent for Landlords | Hands-Off Property Management UK",
  description: "Get guaranteed monthly rent — paid even when your property is vacant. TPS takes care of tenants, maintenance, compliance and voids. 3-7 year leases for UK landlords.",
};

export default function LandlordsPage() {
  return (
    <>
      <section className="relative bg-navy text-white pt-32 pb-32 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-float" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />For Landlords
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-8">
              Guaranteed Rent.<br/><span className="gradient-text">Zero Hassle.</span>
            </h1>
            <p className="text-xl text-white/70 mb-10 max-w-2xl font-light leading-relaxed">
              We take your property on a long-term lease, pay your rent every month — guaranteed — and handle absolutely everything. No tenants to chase. No voids. No maintenance calls.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/landlord-enquiry" className="bg-brand-yellow text-navy px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all hover:-translate-y-0.5 hover:shadow-2xl flex items-center gap-2">
                Get Your Free Quote <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link href="#how-it-works" className="border-2 border-white/20 px-8 py-4 rounded-lg font-semibold hover:border-white hover:bg-white/5 transition-all">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-3">Why Landlords Choose TPS</div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">Property income, simplified.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Guaranteed Monthly Rent", desc: "Your rent hits your account on the 1st every month. Even if the property is vacant. Even during refurbishment." },
              { title: "All Bills Paid", desc: "We cover council tax, utilities, maintenance, insurance, and compliance. Your income is truly net." },
              { title: "3-7 Year Secure Leases", desc: "Long-term commitment from a professional operator. Predictable income for years, not months." },
              { title: "Property Returned in Same Condition", desc: "We treat your property as if it were our own. Routine inspections, premium tenants, full insurance." },
              { title: "No Agent Fees, Ever", desc: "No setup fees. No management fees. No exit fees. The rent we agree is the rent you receive." },
              { title: "Renters' Rights Act Compliant", desc: "We handle all new 2025 regulations including Decent Homes Standard, Section 21 changes, and ombudsman registration." },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all">
                <CheckIcon className="w-8 h-8 text-brand-green mb-4" />
                <h3 className="text-xl font-bold text-navy mb-3">{b.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-3">How It Works</div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">From enquiry to first rent in 30 days.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Submit Enquiry", desc: "Tell us about your property. Takes 2 minutes online." },
              { num: "02", title: "Free Valuation", desc: "We assess your property and propose a guaranteed rent figure." },
              { num: "03", title: "Sign Lease", desc: "Simple, transparent commercial lease. We handle the paperwork." },
              { num: "04", title: "Rent Starts", desc: "Your first guaranteed payment lands in your bank account." },
            ].map((s) => (
              <div key={s.num} className="bg-cream rounded-2xl p-8 border border-gray-100">
                <div className="text-5xl font-bold text-brand-blue/30 mb-4 font-display">{s.num}</div>
                <h4 className="text-xl font-bold text-navy mb-2">{s.title}</h4>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-dark text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for guaranteed rent?</h2>
          <p className="text-xl text-white/70 mb-10">Free property valuation. No obligation. Response within 24 hours.</p>
          <Link href="/landlord-enquiry" className="inline-flex items-center gap-2 bg-brand-yellow text-navy px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all">
            Get Free Quote <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
