import Link from "next/link";
import {
  SearchIcon,
  BuildingIcon,
  GraduationIcon,
  ShieldIcon,
  TrendingIcon,
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  TargetIcon,
  HouseIcon,
  HeartIcon,
} from "@/components/Icons";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy text-white pt-32 pb-32 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-brand-green/15 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm mb-8 backdrop-blur-sm animate-fade-up">
              <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
              <span className="font-medium">Now accepting investor partnerships for 2026</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.02] mb-8 animate-fade-up">
              Professional Property
              <span className="block gradient-text mt-2 pb-2">Sourcing Services</span>
              <span className="block text-white/90 mt-2">for the UK&apos;s sharpest investors.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl font-light leading-relaxed animate-fade-up">
              TPS connects landlords with guaranteed rent and investors with off-market property opportunities. Specialists in R2R, R2SA, R2HMO, social housing, and supported living across the UK.
            </p>

            <div className="flex flex-wrap gap-4 mb-12 animate-fade-up">
              <Link href="/register-criteria" className="group bg-brand-yellow text-navy px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all hover:-translate-y-0.5 hover:shadow-2xl flex items-center gap-2">
                Investors: Register Criteria
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/landlord-enquiry" className="group border-2 border-white/20 px-8 py-4 rounded-lg font-semibold hover:border-white hover:bg-white/5 transition-all flex items-center gap-2">
                Landlords: Get Guaranteed Rent
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/60">
              <div className="flex items-center gap-2"><ShieldIcon className="w-4 h-4 text-brand-green" /> Verified UK Operator</div>
              <div className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-brand-green" /> No Upfront Fees</div>
              <div className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-brand-green" /> Free Consultation</div>
              <div className="flex items-center gap-2"><StarIcon className="w-4 h-4 text-brand-yellow" /> 5-Star Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white py-0 -mt-16 relative z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              <Stat number="50+" label="Properties Managed" />
              <Stat number="2M+" label="Annual Rental Value" />
              <Stat number="98%" label="Landlord Retention" />
              <Stat number="24h" label="Response Time" />
            </div>
          </div>
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="py-32 bg-cream">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-3">Choose Your Path</div>
            <h2 className="text-4xl md:text-6xl font-bold text-navy mb-6">Two clear paths. One trusted partner.</h2>
            <p className="text-lg text-gray-600">Whether you own property and want hassle-free income, or you are looking to invest in property without buying outright, we have built solutions for both.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-10 border border-gray-100 hover:shadow-2xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HouseIcon className="w-7 h-7" />
              </div>
              <div className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">For Landlords</div>
              <h3 className="text-3xl font-bold text-navy mb-4">Guaranteed Rent. Zero Hassle.</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">We take your property on a long-term lease, pay your rent every month, guaranteed, and handle everything: tenants, maintenance, compliance, voids.</p>
              <ul className="space-y-3 mb-10">
                <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" /><span className="text-gray-700">Guaranteed monthly rent (paid even if vacant)</span></li>
                <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" /><span className="text-gray-700">3-7 year secure leases available</span></li>
                <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" /><span className="text-gray-700">We pay all bills, council tax, utilities</span></li>
                <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" /><span className="text-gray-700">Property returned in same or better condition</span></li>
                <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" /><span className="text-gray-700">No agent fees, no management fees, ever</span></li>
              </ul>
              <Link href="/landlords" className="inline-flex items-center gap-2 text-navy font-bold hover:gap-3 transition-all">Learn how it works <ArrowRightIcon className="w-4 h-4" /></Link>
            </div>

            <div className="bg-navy text-white rounded-3xl p-10 relative overflow-hidden hover:shadow-2xl transition-all group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-brand-yellow flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingIcon className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold tracking-wider text-brand-yellow uppercase mb-3">For Investors</div>
                <h3 className="text-3xl font-bold mb-4">Off-Market Deals. Premium Returns.</h3>
                <p className="text-white/70 mb-8 leading-relaxed">Register your investment criteria. We match you to verified, due-diligenced property opportunities, before they hit the open market.</p>
                <ul className="space-y-3 mb-10">
                  <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" /><span className="text-white/90">Off-market and below-market-value deals</span></li>
                  <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" /><span className="text-white/90">Hand-picked, due diligence complete</span></li>
                  <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" /><span className="text-white/90">Multiple strategies: R2R, BTL, BRRR, HMO</span></li>
                  <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" /><span className="text-white/90">First refusal rights for members</span></li>
                  <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" /><span className="text-white/90">Education and ongoing portfolio support</span></li>
                </ul>
                <Link href="/investors" className="inline-flex items-center gap-2 text-brand-yellow font-bold hover:gap-3 transition-all">Explore investor services <ArrowRightIcon className="w-4 h-4" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-3">What We Offer</div>
            <h2 className="text-4xl md:text-6xl font-bold text-navy mb-6">Comprehensive property solutions</h2>
            <p className="text-lg text-gray-600">From sourcing your first investment to scaling a portfolio, tailored services at every stage.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard icon={<SearchIcon className="w-7 h-7" />} tag="Investment" title="Deal Sourcing" description="Hand-picked, due-diligence-ready property deals matched precisely to your investment criteria." features={["Below-market valuations", "Full due diligence", "BMV and off-market", "End-to-end support"]} href="/services/deal-sourcing" accent="blue" />
            <ServiceCard icon={<BuildingIcon className="w-7 h-7" />} tag="Most Popular" title="Rent-to-Rent" description="Multi-strategy R2R: guaranteed rent for landlords, scalable income for operators." features={["R2SA Serviced Accommodation", "R2HMO Multi-Occupancy", "Social Housing partnerships", "Supported Living schemes"]} href="/services" accent="featured" />
            <ServiceCard icon={<GraduationIcon className="w-7 h-7" />} tag="Learn and Grow" title="Education and Information" description="Master the property game with our courses, mentoring, guides, and live workshops." features={["Step-by-step training", "1-to-1 mentorship", "Free guides and calculators", "Community access"]} href="/education" accent="yellow" />
          </div>
        </div>
      </section>

      {/* R2R SPECIALISMS */}
      <section className="py-32 bg-stone">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-3">R2R Specialisms</div>
            <h2 className="text-4xl md:text-6xl font-bold text-navy mb-6">Four strategies. One trusted partner.</h2>
            <p className="text-lg text-gray-600">Every R2R opportunity is unique. We specialise in the four highest-performing models in the UK market.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <R2RCard icon={<BuildingIcon className="w-6 h-6" />} title="R2SA" sub="Serviced Accommodation" desc="Short-stay and corporate lets. Premium nightly rates in tourist and business hubs." href="/services/r2sa" />
            <R2RCard icon={<HouseIcon className="w-6 h-6" />} title="R2HMO" sub="Multi-Occupancy" desc="Professional, compliant management of multi-let properties for maximised yield." href="/services/r2hmo" />
            <R2RCard icon={<ShieldIcon className="w-6 h-6" />} title="Social Housing" sub="Council and RP Contracts" desc="Long-term contracts with local authorities and registered providers. Stable income." href="/services/social-housing" />
            <R2RCard icon={<HeartIcon className="w-6 h-6" />} title="Supported Living" sub="Care Provider Schemes" desc="Specialist accommodation partnerships. Stable, ethical, long-term income." href="/services/supported-living" />
          </div>
        </div>
      </section>

      {/* CALCULATOR PROMO */}
      <section className="py-32 bg-gradient-to-br from-navy via-navy-dark to-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-yellow px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase mb-6">
                Free Investment Tool
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.05]">
                Run the numbers on any deal — <span className="gradient-text">instantly.</span>
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-xl">
                Free profit calculators for R2SA, R2HMO, and Single Let strategies. Adjust rent, occupancy, room count and bills, and see your monthly profit, ROI, and payback period in real time.
              </p>
              <ul className="space-y-3 mb-10">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0"><CheckIcon className="w-3 h-3 text-navy" /></div>
                  <span className="text-white/90">R2SA — nightly rates, occupancy, platform fees</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0"><CheckIcon className="w-3 h-3 text-navy" /></div>
                  <span className="text-white/90">R2HMO — rooms, voids, maintenance budget</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0"><CheckIcon className="w-3 h-3 text-navy" /></div>
                  <span className="text-white/90">Single Let — fixed monthly margin</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0"><CheckIcon className="w-3 h-3 text-navy" /></div>
                  <span className="text-white/90">Save your calculation as a branded PDF</span>
                </li>
              </ul>
              <Link href="/calculators" className="inline-flex items-center gap-2 bg-brand-yellow text-navy px-8 py-4 rounded-lg font-bold hover:bg-white transition-all hover:-translate-y-0.5 hover:shadow-2xl">
                Open Calculators <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <p className="text-sm text-white/50 mt-4">No signup. No email required to use.</p>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-brand-yellow text-navy text-xs font-bold py-2 rounded text-center">R2SA</div>
                  <div className="bg-white/10 text-white/60 text-xs font-semibold py-2 rounded text-center">R2HMO</div>
                  <div className="bg-white/10 text-white/60 text-xs font-semibold py-2 rounded text-center">Single Let</div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60 text-sm">Monthly Rent (Landlord)</span>
                    <span className="font-semibold text-sm">£1,500</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60 text-sm">Nightly Rate</span>
                    <span className="font-semibold text-sm">£95</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60 text-sm">Occupancy</span>
                    <span className="font-semibold text-sm">75%</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60 text-sm">Setup Cost</span>
                    <span className="font-semibold text-sm">£6,000</span>
                  </div>
                </div>
                <div className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-5">
                  <div className="text-xs uppercase tracking-wider text-white/60 mb-1 font-semibold">Monthly Profit</div>
                  <div className="text-3xl font-bold text-brand-green">£1,847</div>
                </div>
                <div className="flex items-center gap-2 mt-4 text-brand-green text-xs font-semibold">
                  <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
                  Live preview, try it yourself
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BESPOKE DEALS */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-gradient-to-br from-navy via-navy-dark to-navy rounded-3xl p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-yellow px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase mb-8">
                  <TargetIcon className="w-4 h-4" /> Bespoke Deal Service
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.05]">Tell us your criteria. <span className="gradient-text">We will find your deal.</span></h2>
                <p className="text-white/70 text-lg mb-10 leading-relaxed">Skip the open market. Register your investment criteria once and we will match you to qualified, off-market deals, usually within 30 days.</p>
                <ul className="space-y-3 mb-10">
                  <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0"><CheckIcon className="w-3 h-3 text-navy" /></div><span className="text-white/90">Off-market deals before they go public</span></li>
                  <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0"><CheckIcon className="w-3 h-3 text-navy" /></div><span className="text-white/90">Matched precisely to your strategy</span></li>
                  <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0"><CheckIcon className="w-3 h-3 text-navy" /></div><span className="text-white/90">Verified, due-diligenced opportunities</span></li>
                  <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0"><CheckIcon className="w-3 h-3 text-navy" /></div><span className="text-white/90">First refusal for active members</span></li>
                </ul>
                <Link href="/register-criteria" className="inline-flex items-center gap-2 bg-brand-yellow text-navy px-8 py-4 rounded-lg font-bold hover:bg-white transition-all hover:-translate-y-0.5 hover:shadow-2xl">Register Your Criteria <ArrowRightIcon className="w-4 h-4" /></Link>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                  <div className="text-xs font-bold tracking-wider text-brand-green uppercase mb-4">Live Match Example</div>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-white/10 pb-3"><span className="text-white/60 text-sm">Budget</span><span className="font-semibold">250K to 500K</span></div>
                    <div className="flex justify-between border-b border-white/10 pb-3"><span className="text-white/60 text-sm">Strategy</span><span className="font-semibold">R2HMO + BTL</span></div>
                    <div className="flex justify-between border-b border-white/10 pb-3"><span className="text-white/60 text-sm">Region</span><span className="font-semibold">Manchester, Leeds</span></div>
                    <div className="flex justify-between border-b border-white/10 pb-3"><span className="text-white/60 text-sm">Timeline</span><span className="font-semibold">Ready now</span></div>
                    <div className="flex justify-between"><span className="text-white/60 text-sm">Min Yield</span><span className="font-semibold">8% gross</span></div>
                    <div className="flex items-center gap-2 pt-4 text-brand-green text-sm font-semibold"><span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />3 matching deals available now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-32 bg-cream">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-3">How It Works</div>
            <h2 className="text-4xl md:text-6xl font-bold text-navy mb-6">Simple. Transparent. Effective.</h2>
            <p className="text-lg text-gray-600">From first contact to signed contract in 4 clear steps.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"><div className="text-6xl font-bold text-brand-blue/20 mb-4 font-display">01</div><h4 className="text-xl font-bold text-navy mb-3">Register</h4><p className="text-gray-600 text-sm leading-relaxed">Tell us your goals. Landlords share property details. Investors share criteria.</p></div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"><div className="text-6xl font-bold text-brand-blue/20 mb-4 font-display">02</div><h4 className="text-xl font-bold text-navy mb-3">Match</h4><p className="text-gray-600 text-sm leading-relaxed">We source, vet, and match the right opportunity within days, not months.</p></div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"><div className="text-6xl font-bold text-brand-blue/20 mb-4 font-display">03</div><h4 className="text-xl font-bold text-navy mb-3">Review</h4><p className="text-gray-600 text-sm leading-relaxed">Full transparency. View, ask questions, and proceed only when you are ready.</p></div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"><div className="text-6xl font-bold text-brand-blue/20 mb-4 font-display">04</div><h4 className="text-xl font-bold text-navy mb-3">Complete</h4><p className="text-gray-600 text-sm leading-relaxed">We handle paperwork, compliance, and onboarding. Your deal, done right.</p></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-3">Trusted by Landlords and Investors</div>
            <h2 className="text-4xl md:text-6xl font-bold text-navy mb-6">What our clients say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-cream rounded-2xl p-8 border border-gray-100"><div className="flex gap-1 mb-5"><StarIcon className="w-4 h-4 text-brand-yellow" /><StarIcon className="w-4 h-4 text-brand-yellow" /><StarIcon className="w-4 h-4 text-brand-yellow" /><StarIcon className="w-4 h-4 text-brand-yellow" /><StarIcon className="w-4 h-4 text-brand-yellow" /></div><p className="text-gray-700 leading-relaxed mb-6">TPS took over my 3-bed in Manchester. I have not lifted a finger since, and the rent hits my account on the 1st every month. Genuinely set-and-forget.</p><div><div className="font-bold text-navy">Sarah M.</div><div className="text-sm text-gray-500">Landlord, Manchester</div></div></div>
            <div className="bg-cream rounded-2xl p-8 border border-gray-100"><div className="flex gap-1 mb-5"><StarIcon className="w-4 h-4 text-brand-yellow" /><StarIcon className="w-4 h-4 text-brand-yellow" /><StarIcon className="w-4 h-4 text-brand-yellow" /><StarIcon className="w-4 h-4 text-brand-yellow" /><StarIcon className="w-4 h-4 text-brand-yellow" /></div><p className="text-gray-700 leading-relaxed mb-6">Found my first R2SA deal through TPS within 3 weeks of registering. Cash flow is exactly what they projected. Due diligence pack was excellent.</p><div><div className="font-bold text-navy">James K.</div><div className="text-sm text-gray-500">Investor, London</div></div></div>
            <div className="bg-cream rounded-2xl p-8 border border-gray-100"><div className="flex gap-1 mb-5"><StarIcon className="w-4 h-4 text-brand-yellow" /><StarIcon className="w-4 h-4 text-brand-yellow" /><StarIcon className="w-4 h-4 text-brand-yellow" /><StarIcon className="w-4 h-4 text-brand-yellow" /><StarIcon className="w-4 h-4 text-brand-yellow" /></div><p className="text-gray-700 leading-relaxed mb-6">Professional, honest, and transparent. Not pushy salespeople. Properly vetted deals only, I trust their judgement.</p><div><div className="font-bold text-navy">Rachel D.</div><div className="text-sm text-gray-500">Portfolio Investor</div></div></div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-navy-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="container mx-auto px-6 max-w-4xl relative text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">Whether you own property or want to invest in it, we have helped hundreds. Let us help you next.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register-criteria" className="bg-brand-yellow text-navy px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all hover:-translate-y-0.5 hover:shadow-2xl">Investors: Register Now</Link>
            <Link href="/landlord-enquiry" className="border-2 border-white/20 px-8 py-4 rounded-lg font-semibold hover:border-white hover:bg-white/5 transition-all">Landlords: Get Quote</Link>
          </div>
          <p className="text-sm text-white/50 mt-10">Free consultation. No upfront fees. No obligation.</p>
        </div>
      </section>
    </>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-navy mb-1 font-display">{number}</div>
      <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-semibold">{label}</div>
    </div>
  );
}

function ServiceCard({ icon, tag, title, description, features, href, accent }: { icon: React.ReactNode; tag: string; title: string; description: string; features: string[]; href: string; accent: "blue" | "yellow" | "featured"; }) {
  const isFeatured = accent === "featured";
  return (
    <div className={"p-10 rounded-3xl transition-all hover:-translate-y-1 group " + (isFeatured ? "bg-navy text-white shadow-xl hover:shadow-2xl relative overflow-hidden" : "bg-white border border-gray-100 hover:shadow-2xl")}>
      {isFeatured && <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/20 rounded-full blur-3xl" />}
      <div className="relative">
        <div className={"w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 " + (isFeatured ? "bg-white/10 text-brand-yellow" : accent === "blue" ? "bg-brand-blue/10 text-brand-blue" : "bg-brand-yellow/10 text-brand-yellow")}>{icon}</div>
        <div className={"text-xs font-bold tracking-wider uppercase mb-3 " + (isFeatured ? "text-brand-yellow" : "text-gray-500")}>{tag}</div>
        <h3 className={"text-2xl font-bold mb-3 " + (isFeatured ? "" : "text-navy")}>{title}</h3>
        <p className={"mb-6 leading-relaxed " + (isFeatured ? "text-white/70" : "text-gray-600")}>{description}</p>
        <ul className="space-y-2 mb-8">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <CheckIcon className={"w-4 h-4 flex-shrink-0 " + (isFeatured ? "text-brand-yellow" : "text-brand-green")} />
              <span className={isFeatured ? "text-white/80" : "text-gray-700"}>{f}</span>
            </li>
          ))}
        </ul>
        <Link href={href} className={"inline-flex items-center gap-1 font-semibold text-sm group-hover:gap-2 transition-all " + (isFeatured ? "text-brand-yellow" : "text-brand-blue")}>Learn more <ArrowRightIcon className="w-4 h-4" /></Link>
      </div>
    </div>
  );
}

function R2RCard({ icon, title, sub, desc, href }: { icon: React.ReactNode; title: string; sub: string; desc: string; href: string; }) {
  return (
    <Link href={href} className="block bg-white p-8 rounded-2xl border border-gray-100 hover:border-brand-blue hover:shadow-xl transition-all hover:-translate-y-1 group">
      <div className="w-12 h-12 mb-5 rounded-xl bg-navy text-white flex items-center justify-center group-hover:bg-brand-blue transition-colors">{icon}</div>
      <h4 className="text-xl font-bold text-navy mb-1">{title}</h4>
      <div className="text-sm text-gray-500 mb-3 font-medium">{sub}</div>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{desc}</p>
      <div className="text-brand-blue text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">Learn more <ArrowRightIcon className="w-3 h-3" /></div>
    </Link>
  );
}