import Link from "next/link";
import Logo from "./Logo";

const WHATSAPP_URL = "https://chat.whatsapp.com/LNmC6iFAlAT0b6C3fwX9fM?mode=gi_t";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70 pt-20 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-gradient-to-br from-[#1a3a5c] to-navy-dark border border-white/10 rounded-2xl p-8 md:p-10 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/10 rounded-full blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.297-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /></svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Daily Deals on WhatsApp</h3>
              </div>
              <p className="text-white/70 leading-relaxed">Get daily property deals, market insights, and expert tips straight to your phone. Join our free community of UK landlords and investors.</p>
            </div>
            <div className="flex md:justify-end">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb558] text-white px-8 py-4 rounded-lg font-bold transition-all hover:-translate-y-0.5 hover:shadow-2xl">Join Free Community</a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Logo className="w-10 h-10 text-white" />
              <div className="font-display font-bold text-2xl text-white tracking-tight">TPS</div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">Professional property sourcing, rent-to-rent solutions, and education for UK landlords and investors.</p>
            <a href="mailto:contact@thepropertysourcegroup.com" className="text-sm hover:text-brand-yellow transition-colors block mb-1">contact@thepropertysourcegroup.com</a>
            <p className="text-sm">United Kingdom</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services/deal-sourcing" className="text-sm hover:text-white transition-colors">Deal Sourcing</Link></li>
              <li><Link href="/services/r2sa" className="text-sm hover:text-white transition-colors">R2SA</Link></li>
              <li><Link href="/services/r2hmo" className="text-sm hover:text-white transition-colors">R2HMO</Link></li>
              <li><Link href="/services/social-housing" className="text-sm hover:text-white transition-colors">Social Housing</Link></li>
              <li><Link href="/services/supported-living" className="text-sm hover:text-white transition-colors">Supported Living</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">For You</h4>
            <ul className="space-y-3">
              <li><Link href="/landlords" className="text-sm hover:text-white transition-colors">For Landlords</Link></li>
              <li><Link href="/investors" className="text-sm hover:text-white transition-colors">For Investors</Link></li>
              <li><Link href="/register-criteria" className="text-sm hover:text-white transition-colors">Register Criteria</Link></li>
              <li><Link href="/landlord-enquiry" className="text-sm hover:text-white transition-colors">Landlord Enquiry</Link></li>
              <li><Link href="/calculators" className="text-sm hover:text-white transition-colors">Calculators</Link></li>
              <li><Link href="/education" className="text-sm hover:text-white transition-colors">Education Hub</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm hover:text-white transition-colors">About TPS</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">Copyright {new Date().getFullYear()} TPS. All rights reserved.</p>
          <p className="text-xs">Built by <a href="https://kleper.studio" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:text-white transition-colors font-semibold">Kleper.Studio</a></p>
        </div>
      </div>
    </footer>
  );
}
