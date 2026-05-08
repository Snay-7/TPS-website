import Link from "next/link";
import type { Metadata } from "next";
import { GraduationIcon, ArrowRightIcon } from "@/components/Icons";

const WHATSAPP_URL = "https://chat.whatsapp.com/LNmC6iFAlAT0b6C3fwX9fM?mode=gi_t";

export const metadata: Metadata = {
  title: "Property Education Hub | UK R2R, HMO & Investment Guides",
  description: "Free property education for UK landlords and investors. Guides on R2R, R2SA, R2HMO, social housing, deal sourcing, and more. Daily insights via WhatsApp.",
};

export default function EducationPage() {
  return (
    <>
      <section className="bg-navy text-white pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-yellow px-4 py-2 rounded-full text-sm mb-6 font-bold uppercase tracking-wider">
              <GraduationIcon className="w-4 h-4" /> Education Hub
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6">Learn property. Build wealth.</h1>
            <p className="text-xl text-white/70 leading-relaxed">Free guides, market insights, and expert tips for UK landlords and investors at every stage.</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-gradient-to-br from-[#1a3a5c] to-navy-dark border border-white/10 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden mb-16">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#25D366]/15 rounded-full blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#25D366]/20 text-[#25D366] px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase mb-6">Daily Deals on WhatsApp</div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Daily property deals delivered to your phone.</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-6">Off-market deals, market insights, education content, and expert tips. Free to join. No spam.</p>
              </div>
              <div className="md:text-right">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb558] text-white px-8 py-4 rounded-lg font-bold transition-all hover:-translate-y-0.5 hover:shadow-2xl">
                  Join Free Community →
                </a>
              </div>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Coming Soon</h2>
            <p className="text-gray-600">We are building a comprehensive library of guides, calculators, and courses. Join the WhatsApp community to be first to know.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "R2R Foundation Course", desc: "Free 7-day course covering R2R fundamentals." },
              { title: "Investment Calculators", desc: "R2SA, R2HMO and Single Let profitability calculators." },
              { title: "Market Reports", desc: "Quarterly UK regional rental and yield analysis." },
              { title: "Deal Analysis Templates", desc: "Spreadsheets for analysing any property deal." },
              { title: "Legal Guides", desc: "Renters' Rights Act, HMO licensing, contracts explained." },
              { title: "Strategy Comparisons", desc: "BTL vs HMO vs SA vs Social Housing — which is right for you?" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-100 opacity-75">
                <div className="text-xs font-bold uppercase text-brand-blue mb-3">Coming Soon</div>
                <h3 className="text-xl font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-dark text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Try our calculators now</h2>
          <p className="text-xl text-white/70 mb-10">Run the numbers on any R2R deal in seconds.</p>
          <Link href="/calculators" className="inline-flex items-center gap-2 bg-brand-yellow text-navy px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all">
            Open Calculators <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
