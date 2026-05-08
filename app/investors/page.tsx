import Link from "next/link";
import type { Metadata } from "next";
import { CheckIcon, ArrowRightIcon, TargetIcon, TrendingIcon, ShieldIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Off-Market Property Deals for UK Investors | Bespoke Sourcing",
  description: "Skip the open market. Register your investment criteria once and we'll match you to verified, off-market UK property deals. R2R, BTL, BRRR, HMO and more.",
};

export default function InvestorsPage() {
  return (
    <>
      <section className="relative bg-navy text-white pt-32 pb-32 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-brand-yellow/15 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-yellow px-4 py-2 rounded-full text-sm mb-8 backdrop-blur-sm font-bold uppercase tracking-wider">
              <TargetIcon className="w-4 h-4" /> For Investors
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-8">
              Off-Market Deals.<br/><span className="gradient-text">Premium Returns.</span>
            </h1>
            <p className="text-xl text-white/70 mb-10 max-w-2xl font-light leading-relaxed">
              Tell us your criteria. We do the heavy lifting — sourcing, vetting, due diligence — and present only the deals that match your strategy. No open-market noise.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register-criteria" className="bg-brand-yellow text-navy px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all hover:-translate-y-0.5 hover:shadow-2xl flex items-center gap-2">
                Register Your Criteria <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link href="/calculators" className="border-2 border-white/20 px-8 py-4 rounded-lg font-semibold hover:border-white hover:bg-white/5 transition-all">
                Try Our Calculators
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-3">Investment Strategies</div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">Strategies we specialise in</h2>
            <p className="text-gray-600">Whether you are starting your portfolio or scaling to 50+ units, we have a model that fits.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Buy-to-Let (BTL)", desc: "Single-tenant rentals with stable yields. Ideal for first-time investors." },
              { title: "HMO", desc: "Multi-occupancy properties for premium yields in student and professional markets." },
              { title: "Serviced Accommodation", desc: "Short-stay lets with nightly rates 2-3x traditional letting." },
              { title: "BRRR", desc: "Buy-Refurb-Refinance-Rent. Recycle your capital across multiple properties." },
              { title: "Flips", desc: "Short-term capital gains projects. Below-market entry, value-add exit." },
              { title: "Commercial Conversion", desc: "Convert offices and shops into residential — high margin opportunities." },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <TrendingIcon className="w-8 h-8 text-brand-blue mb-4" />
                <h3 className="text-xl font-bold text-navy mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-3">Why Register With TPS</div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">Built for serious investors</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Off-Market First", desc: "See deals before they hit Rightmove. Members get 14 days exclusive access." },
              { title: "Full Due Diligence", desc: "Comparable sales, rental analysis, refurb estimates, ROI projections — all included." },
              { title: "Matched to Criteria", desc: "We only contact you about deals that match your budget, strategy, region and yield requirements." },
              { title: "First Refusal Rights", desc: "Active members get first option on every matching deal. No bidding wars." },
              { title: "Education Included", desc: "Free access to our courses, calculators, and market reports." },
              { title: "No Spam", desc: "Quality over quantity. We send fewer, better deals." },
            ].map((b) => (
              <div key={b.title} className="bg-cream rounded-2xl p-8 border border-gray-100">
                <ShieldIcon className="w-7 h-7 text-brand-green mb-4" />
                <h3 className="text-xl font-bold text-navy mb-2">{b.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-dark text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to see better deals?</h2>
          <p className="text-xl text-white/70 mb-10">Takes 5 minutes. No obligation. We will be in touch when we find your next deal.</p>
          <Link href="/register-criteria" className="inline-flex items-center gap-2 bg-brand-yellow text-navy px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all">
            Register Now <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
