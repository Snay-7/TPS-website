import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckIcon, ArrowRightIcon } from "@/components/Icons";

const services: Record<string, { title: string; tagline: string; description: string; benefits: string[]; idealFor: string[]; meta: { title: string; description: string } }> = {
  "deal-sourcing": {
    title: "Deal Sourcing",
    tagline: "Hand-picked, due-diligence-ready property deals.",
    description: "Our deal sourcing service finds, vets, and presents UK property opportunities matched precisely to your investment criteria. Every deal comes with full due diligence — comparable sales, rental analysis, refurb estimates, and ROI projections.",
    benefits: ["Below-market valuations (BMV)", "Full due diligence on every deal", "Off-market exclusivity for members", "Comparable sales and rental analysis", "Refurb estimates included", "End-to-end transaction support", "First refusal rights for active members"],
    idealFor: ["Cash buyers seeking BTL or HMO", "Investors building portfolios", "BRRR strategy investors", "Limited time to source themselves"],
    meta: { title: "Property Deal Sourcing UK | Off-Market & BMV Deals", description: "Hand-picked UK property deal sourcing for investors. BMV, off-market, full due diligence. BTL, HMO, BRRR strategies." },
  },
  "r2sa": {
    title: "R2SA — Rent-to-Serviced Accommodation",
    tagline: "Premium nightly lets. Hands-off operation.",
    description: "We take properties on long-term leases and operate them as serviced accommodation — earning premium nightly rates from short-stay guests, contractors, and corporate clients. Landlords get guaranteed monthly rent. Operators get scalable cashflow.",
    benefits: ["2-3x traditional rental income potential", "Professional cleaning and management", "Multi-platform listings (Airbnb, Booking.com, Vrbo)", "Dynamic pricing for maximum occupancy", "Corporate and contractor client base", "Guaranteed rent for landlords"],
    idealFor: ["Properties near transport hubs and city centres", "Tourist destinations and business cities", "Landlords wanting hands-off premium income", "Operators scaling SA portfolios"],
    meta: { title: "R2SA UK | Rent-to-Serviced Accommodation Specialists", description: "Professional R2SA operations across the UK. Premium nightly lets, guaranteed landlord rent, scalable operator income." },
  },
  "r2hmo": {
    title: "R2HMO — Rent-to-HMO",
    tagline: "Multi-occupancy income. Compliant management.",
    description: "We lease properties from landlords and operate them as Houses in Multiple Occupation (HMOs), letting individual rooms to professionals or students. Higher gross yields, full compliance management, and guaranteed rent for landlords.",
    benefits: ["Higher gross yields than single lets", "HMO licensing and compliance handled", "Fire safety and standards maintained", "Tenant referencing and management", "Bills-included contracts", "Professional and student markets"],
    idealFor: ["3+ bedroom properties in cities", "Student towns and professional hubs", "Landlords wanting higher yield without complexity", "Areas with strong room-rental demand"],
    meta: { title: "R2HMO UK | Rent-to-HMO Operations & Management", description: "Professional R2HMO management across the UK. Higher yields, full compliance, guaranteed rent for landlords." },
  },
  "social-housing": {
    title: "Social Housing",
    tagline: "Long-term contracts. Guaranteed rent.",
    description: "We partner with local authorities and registered providers (RPs) to deliver social housing across the UK. Landlords benefit from long-term, council-backed rental contracts — typically 3-7 years — with guaranteed rent regardless of occupancy.",
    benefits: ["3-7 year council-backed contracts", "Guaranteed monthly rent", "No void periods", "Property maintained to Decent Homes Standard", "Direct partnership with local authorities", "Stable, ethical income stream"],
    idealFor: ["Landlords seeking stability over peak yield", "Properties in housing-need areas", "Limited company landlords", "Hands-off long-term investors"],
    meta: { title: "Social Housing Investment UK | Council-Backed Rental Contracts", description: "Long-term social housing contracts with UK councils and registered providers. Guaranteed rent, ethical income." },
  },
  "supported-living": {
    title: "Supported Living",
    tagline: "Specialist accommodation. Ethical returns.",
    description: "We work with care providers to deliver Supported Living accommodation for adults with learning disabilities, mental health needs, or physical disabilities. Stable, long-term, ethical income with social purpose.",
    benefits: ["Long-term care provider contracts", "Higher rents than standard lets", "Specialist tenant placements", "Property adaptations supported", "Government-backed funding stream", "Genuine social impact"],
    idealFor: ["Properties suitable for adaptation", "Investors prioritising ethical income", "Limited companies and SSAS pensions", "Stable long-term yield seekers"],
    meta: { title: "Supported Living Property UK | Specialist Accommodation Investment", description: "UK supported living property partnerships with care providers. Ethical, stable, long-term income." },
  },
};

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug];
  if (!service) return {};
  return { title: service.meta.title, description: service.meta.description };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services[slug];
  if (!service) notFound();

  return (
    <>
      <section className="bg-navy text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <Link href="/services" className="text-brand-yellow text-sm font-semibold mb-6 inline-flex items-center gap-1 hover:gap-2 transition-all">← All Services</Link>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">{service.title}</h1>
          <p className="text-2xl text-white/80 font-light leading-relaxed">{service.tagline}</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-xl text-gray-700 leading-relaxed mb-12">{service.description}</p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">Key Benefits</h2>
              <ul className="space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">Ideal For</h2>
              <ul className="space-y-3">
                {service.idealFor.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-brand-blue flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-dark text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Interested in {service.title}?</h2>
          <p className="text-xl text-white/70 mb-10">Get in touch for a free consultation.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register-criteria" className="bg-brand-yellow text-navy px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all">Investors: Register</Link>
            <Link href="/landlord-enquiry" className="border-2 border-white/20 px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all">Landlords: Enquire</Link>
          </div>
        </div>
      </section>
    </>
  );
}
