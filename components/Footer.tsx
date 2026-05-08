import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70 pt-20 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Logo className="w-10 h-10 text-white" />
              <div className="font-display font-bold text-2xl text-white tracking-tight">TPS</div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Professional property sourcing, rent-to-rent solutions, and education for UK landlords and investors.
            </p>
            <a href="mailto:contact@tps.com" className="text-sm hover:text-brand-yellow transition-colors block mb-1">
              contact@tps.com
            </a>
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
          <p className="text-xs">© 2026 TPS. All rights reserved.</p>
          <p className="text-xs">Built with care for UK property professionals.</p>
        </div>
      </div>
    </footer>
  );
}