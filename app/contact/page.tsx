import type { Metadata } from "next";

const WHATSAPP_URL = "https://chat.whatsapp.com/LNmC6iFAlAT0b6C3fwX9fM?mode=gi_t";

export const metadata: Metadata = {
  title: "Contact TPS | Get in Touch with Our UK Property Team",
  description: "Contact TPS for property sourcing, R2R partnerships, or general enquiries. Email, WhatsApp community, or use our enquiry forms.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy text-white pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6">Get in Touch</h1>
            <p className="text-xl text-white/70 leading-relaxed">Email us, join our WhatsApp community, or use one of our forms below.</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <a href="mailto:contact@thepropertysourcegroup.com" className="bg-cream rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
              <div className="text-xs font-bold uppercase text-brand-blue mb-2">Email</div>
              <div className="text-2xl font-bold text-navy mb-2">Direct Email</div>
              <div className="text-gray-600">contact@thepropertysourcegroup.com</div>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/10 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 border border-[#25D366]/20">
              <div className="text-xs font-bold uppercase text-[#25D366] mb-2">WhatsApp</div>
              <div className="text-2xl font-bold text-navy mb-2">Daily Deals Community</div>
              <div className="text-gray-600">Join our free WhatsApp group</div>
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <a href="/landlord-enquiry" className="bg-navy text-white rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-xs font-bold uppercase text-brand-yellow mb-2">For Landlords</div>
              <div className="text-2xl font-bold mb-2">Property Enquiry</div>
              <div className="text-white/70">Get a free guaranteed rent quote</div>
            </a>
            <a href="/register-criteria" className="bg-navy text-white rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-xs font-bold uppercase text-brand-yellow mb-2">For Investors</div>
              <div className="text-2xl font-bold mb-2">Register Criteria</div>
              <div className="text-white/70">Join our deal flow</div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
