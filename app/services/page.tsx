import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, BuildingIcon, HouseIcon, ShieldIcon, HeartIcon, SearchIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Property Services UK | Deal Sourcing, R2R, R2SA, R2HMO & More",
  description: "Comprehensive UK property services: deal sourcing, rent-to-rent, serviced accommodation, HMOs, social housing, and supported living for landlords and investors.",
};

const services = [
  { slug: "deal-sourcing", icon: SearchIcon, title: "Deal Sourcing", desc: "Hand-picked, due-diligence-ready property deals matched to your criteria." },
  { slug: "r2sa", icon: BuildingIcon, title: "R2SA", desc: "Rent-to-Serviced Accommodation. Premium nightly lets in tourist and business hubs." },
  { slug: "r2hmo", icon: HouseIcon, title: "R2HMO", desc: "Rent-to-HMO. Maximised income through multi-occupancy management." },
  { slug: "social-housing", icon: ShieldIcon, title: "Social Housing", desc: "Council and registered provider contracts with guaranteed long-term rent." },
  { slug: "supported-living", icon: HeartIcon, title: "Supported Living", desc: "Specialist accommodation partnerships with care providers. Stable, ethical income." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy text-white pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6">Our Services</h1>
            <p className="text-xl text-white/70 leading-relaxed">Five specialised services covering every angle of UK property investment and management.</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="group bg-cream rounded-2xl p-8 border border-gray-100 hover:border-brand-blue hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-navy text-white flex items-center justify-center mb-6 group-hover:bg-brand-blue transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-3">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{s.desc}</p>
                  <div className="text-brand-blue font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
