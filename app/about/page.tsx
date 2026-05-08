import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, ShieldIcon, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About TPS | UK Property Sourcing & Rent-to-Rent Specialists",
  description: "Learn about TPS — professional property sourcing, R2R operators, and educators serving UK landlords and investors. Our story, mission, and values.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6">About TPS</h1>
            <p className="text-xl text-white/70 leading-relaxed">Professional property sourcing, rent-to-rent specialists, and educators committed to transparent, ethical UK property partnerships.</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Our Story</h2>
          <div className="prose prose-lg text-gray-700 space-y-6 leading-relaxed">
            <p>TPS was founded on a simple frustration: UK landlords were tired of unreliable tenants, void periods, and management headaches. Investors were drowning in open-market noise, paying retail prices for retail returns.</p>
            <p>We built TPS to bridge that gap — connecting motivated landlords with professional operators, and serious investors with verified off-market opportunities. Every relationship is built on transparency, due diligence, and long-term thinking.</p>
            <p>Today we operate across the UK, with specialisations in serviced accommodation, HMOs, social housing, and supported living. We do not chase volume. We chase quality, longevity, and outcomes that genuinely benefit every party.</p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-cream rounded-2xl p-8">
              <ShieldIcon className="w-8 h-8 text-brand-green mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">Transparent</h3>
              <p className="text-gray-600 text-sm">No hidden fees. No fine print. Every deal explained in plain English.</p>
            </div>
            <div className="bg-cream rounded-2xl p-8">
              <CheckIcon className="w-8 h-8 text-brand-green mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">Verified</h3>
              <p className="text-gray-600 text-sm">Every property, every operator, every deal — fully due-diligenced before we share it.</p>
            </div>
            <div className="bg-cream rounded-2xl p-8">
              <ShieldIcon className="w-8 h-8 text-brand-green mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">Ethical</h3>
              <p className="text-gray-600 text-sm">Long-term partnerships over short-term wins. We win when our clients win.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-dark text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Work with us</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-brand-yellow text-navy px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all">Contact TPS</Link>
            <Link href="/services" className="border-2 border-white/20 px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all">Our Services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
