import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-white pt-32 pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
            Now accepting investor partnerships
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8 max-w-4xl">
            Professional Property
            <span className="block bg-gradient-to-r from-brand-yellow to-brand-green bg-clip-text text-transparent">
              Sourcing Services
            </span>
            Built for Investors & Operators
          </h1>

          <p className="text-xl text-white/70 mb-10 max-w-2xl font-light leading-relaxed">
            TPS connects landlords, investors, and operators with high-quality
            property opportunities — backed by expert sourcing, transparent
            management, and industry-leading education.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#criteria"
              className="bg-brand-yellow text-navy px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Register for Bespoke Deals →
            </Link>
            <Link
              href="#services"
              className="border-2 border-white/20 px-8 py-4 rounded-lg font-semibold hover:border-white hover:bg-white/5 transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-brand-blue text-sm font-bold tracking-widest uppercase mb-3">
              What We Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy tracking-tight mb-4">
              Comprehensive property solutions
            </h2>
            <p className="text-lg text-gray-600">
              Whether you&apos;re investing, operating, or learning — tailored
              services at every stage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Deal Sourcing */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                  <path d="M11 8v6M8 11h6" />
                </svg>
              </div>
              <div className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">
                Investment
              </div>
              <h3 className="text-2xl font-bold text-navy mb-3">
                Deal Sourcing
              </h3>
              <p className="text-gray-600 mb-6">
                Hand-picked, due-diligence-ready property deals matched
                precisely to your investment criteria.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Below-market valuations",
                  "Full due diligence",
                  "BMV & off-market deals",
                  "End-to-end support",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <svg
                      className="w-4 h-4 text-brand-green"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 6 9 17l-5-5"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <span className="text-brand-blue font-semibold text-sm">
                Coming soon →
              </span>
            </div>

            {/* R2R Featured */}
            <div className="bg-navy text-white p-8 rounded-2xl relative overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21h18M5 21V8l7-5 7 5v13M9 9h6M9 13h6M9 17h6" />
                  </svg>
                </div>
                <div className="text-xs font-bold tracking-wider text-brand-yellow uppercase mb-3">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold mb-3">Rent-to-Rent (R2R)</h3>
                <p className="text-white/70 mb-6">
                  Multi-strategy R2R solutions — guaranteed rent for landlords,
                  scalable income for operators.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    "R2SA — Serviced Accommodation",
                    "R2HMO — Multi-Occupancy",
                    "Social Housing partnerships",
                    "Supported Living schemes",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-white/80"
                    >
                      <svg
                        className="w-4 h-4 text-brand-yellow"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 6 9 17l-5-5"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="text-brand-yellow font-semibold text-sm">
                  Learn more below ↓
                </span>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-brand-yellow/10 text-brand-yellow flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
                </svg>
              </div>
              <div className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">
                Learn & Grow
              </div>
              <h3 className="text-2xl font-bold text-navy mb-3">
                Education & Information
              </h3>
              <p className="text-gray-600 mb-6">
                Master the property game with comprehensive courses, mentoring,
                and live workshops.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Step-by-step training",
                  "1-to-1 mentorship",
                  "Industry insights",
                  "Community access",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <svg
                      className="w-4 h-4 text-brand-green"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 6 9 17l-5-5"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <span className="text-brand-blue font-semibold text-sm">
                Coming soon →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Deals */}
      <section id="criteria" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-gradient-to-br from-navy to-navy-dark rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-yellow px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6">
                  Bespoke Deal Service
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                  Tell us your criteria.
                  <br />
                  <span className="text-brand-yellow">
                    We&apos;ll find your deal.
                  </span>
                </h2>
                <p className="text-white/70 text-lg mb-8">
                  Register your investment criteria and join our exclusive deal
                  flow. We match qualified buyers to off-market properties
                  before they hit the open market.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Off-market deals first",
                    "Matched to your exact criteria",
                    "No obligation",
                    "First refusal rights",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-navy"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 6 9 17l-5-5"
                          />
                        </svg>
                      </div>
                      <span className="text-white/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 bg-brand-yellow text-navy px-8 py-4 rounded-lg font-bold">
                  Registration form coming soon
                </span>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="space-y-4">
                    {[
                      { label: "Budget", value: "£250K — £500K" },
                      { label: "Strategy", value: "R2HMO + BTL" },
                      { label: "Region", value: "Manchester, Leeds" },
                      { label: "Timeline", value: "Ready now" },
                      { label: "Min Yield", value: "8% gross" },
                    ].map((r) => (
                      <div
                        key={r.label}
                        className="flex justify-between border-b border-white/10 pb-3 last:border-0"
                      >
                        <span className="text-white/60 text-sm">{r.label}</span>
                        <span className="font-semibold">{r.value}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 pt-2 text-brand-green text-sm">
                      <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
                      3 matching deals available
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R2R Types */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-brand-blue text-sm font-bold tracking-widest uppercase mb-3">
              R2R Specialisms
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy tracking-tight mb-4">
              Four strategies. One trusted partner.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "R2SA",
                sub: "Serviced Accommodation",
                desc: "Short-stay & corporate lets with premium yields.",
              },
              {
                title: "R2HMO",
                sub: "Multi-Occupancy",
                desc: "Maximised income through professional, compliant management.",
              },
              {
                title: "Social Housing",
                sub: "Council & RP Contracts",
                desc: "Long-term contracts with local authorities. Guaranteed rent.",
              },
              {
                title: "Supported Living",
                sub: "Care Provider Schemes",
                desc: "Specialist accommodation. Stable, ethical income.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white p-8 rounded-xl border border-gray-200 hover:border-brand-blue hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 mb-5 rounded-lg bg-navy text-white flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21V9l9-6 9 6v12" />
                    <path d="M3 21h18" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-navy mb-1">{c.title}</h4>
                <div className="text-sm text-gray-500 mb-3">{c.sub}</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy-dark text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Register your criteria for bespoke deals or get in touch with our
            team.
          </p>
          
            href="mailto:contact@tps.com"
            className="inline-block bg-brand-yellow text-navy px-8 py-4 rounded-lg font-semibold hover:bg-white transition-colors"
          >
            Email Our Team
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-dark border-t border-white/10 text-white/70 py-12">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="text-2xl font-bold text-white mb-3 tracking-tight">
            TPS
          </div>
          <p className="text-sm mb-6">Professional Property Services</p>
          <p className="text-xs opacity-60">
            © 2026 TPS. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}