import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TPS",
  description: "TPS privacy policy. How we collect, use, and protect your personal data in compliance with UK GDPR.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="bg-white pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-8">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>

        <div className="prose prose-lg text-gray-700 leading-relaxed space-y-6">
          <h2 className="text-2xl font-bold text-navy">1. Who We Are</h2>
          <p>TPS (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a UK property sourcing and rent-to-rent service. We can be contacted at contact@thepropertysourcegroup.com.</p>

          <h2 className="text-2xl font-bold text-navy">2. What Data We Collect</h2>
          <p>When you use our forms (register criteria, landlord enquiry, calculators), we collect: your name, email, mobile number, property details, and investment preferences as relevant to the form.</p>

          <h2 className="text-2xl font-bold text-navy">3. How We Use Your Data</h2>
          <p>We use your data to: respond to your enquiry, match you with relevant property opportunities, send you market updates if you opt in, and comply with legal obligations.</p>

          <h2 className="text-2xl font-bold text-navy">4. Legal Basis</h2>
          <p>We process your data based on: (a) your consent when you submit a form, (b) our legitimate interest in providing services, and (c) compliance with UK legal obligations.</p>

          <h2 className="text-2xl font-bold text-navy">5. Data Storage</h2>
          <p>Your data is stored securely with industry-standard providers (Supabase, hosted within the EU). We retain data only as long as necessary for the purposes described.</p>

          <h2 className="text-2xl font-bold text-navy">6. Your Rights Under UK GDPR</h2>
          <p>You have the right to: access your data, request correction or deletion, object to processing, request data portability, and lodge a complaint with the ICO (ico.org.uk).</p>

          <h2 className="text-2xl font-bold text-navy">7. Third Parties</h2>
          <p>We do not sell your data. We share it only with trusted service providers (hosting, email delivery) under data processing agreements. We may share with regulatory bodies if legally required.</p>

          <h2 className="text-2xl font-bold text-navy">8. Cookies</h2>
          <p>Our website uses minimal essential cookies for site functionality. We do not use tracking cookies without consent.</p>

          <h2 className="text-2xl font-bold text-navy">9. Contact</h2>
          <p>For any privacy questions or to exercise your rights, contact us at contact@thepropertysourcegroup.com.</p>
        </div>
      </div>
    </section>
  );
}
