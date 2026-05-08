import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | TPS",
  description: "TPS terms of service for using our website, forms, calculators, and services.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <section className="bg-white pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-8">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>

        <div className="prose prose-lg text-gray-700 leading-relaxed space-y-6">
          <h2 className="text-2xl font-bold text-navy">1. Acceptance</h2>
          <p>By using this website (tps-website-one.vercel.app or related domains), you agree to these terms. If you do not agree, please do not use the site.</p>

          <h2 className="text-2xl font-bold text-navy">2. Service Description</h2>
          <p>TPS provides property sourcing, rent-to-rent operations, and educational content. All services are subject to separate written agreements.</p>

          <h2 className="text-2xl font-bold text-navy">3. No Financial Advice</h2>
          <p>Information on this website is for general guidance only. It does not constitute financial, legal, or tax advice. Consult qualified professionals before making investment decisions.</p>

          <h2 className="text-2xl font-bold text-navy">4. Calculator Disclaimer</h2>
          <p>Our calculators provide estimates based on inputs you supply. Actual results vary. We make no guarantees about accuracy or returns. Use calculators as a guide only.</p>

          <h2 className="text-2xl font-bold text-navy">5. Subject to Contract</h2>
          <p>Any offer or enquiry submitted through our forms is subject to contract, references, and our acceptance. Submission does not create a binding agreement.</p>

          <h2 className="text-2xl font-bold text-navy">6. Intellectual Property</h2>
          <p>All content, design, logos, and materials on this site are owned by TPS or used under licence. You may not copy or reuse without permission.</p>

          <h2 className="text-2xl font-bold text-navy">7. Limitation of Liability</h2>
          <p>To the fullest extent permitted by UK law, TPS is not liable for indirect, consequential, or financial losses arising from website use or information provided.</p>

          <h2 className="text-2xl font-bold text-navy">8. Governing Law</h2>
          <p>These terms are governed by the laws of England and Wales. Disputes are subject to the exclusive jurisdiction of the courts of England and Wales.</p>

          <h2 className="text-2xl font-bold text-navy">9. Changes</h2>
          <p>We may update these terms at any time. Continued use of the site means acceptance of the latest version.</p>

          <h2 className="text-2xl font-bold text-navy">10. Contact</h2>
          <p>For terms questions: contact@thepropertysourcegroup.com</p>
        </div>
      </div>
    </section>
  );
}
