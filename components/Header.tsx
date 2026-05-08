"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "/landlords", label: "Landlords" },
    { href: "/investors", label: "Investors" },
    { href: "/services", label: "Services" },
    { href: "/education", label: "Education" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 max-w-7xl flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className={`w-10 h-10 ${scrolled ? "text-navy" : "text-white"} transition-colors`} />
          <div className={`font-display font-bold text-xl tracking-tight ${scrolled ? "text-navy" : "text-white"} transition-colors`}>
            TPS
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-gray-700 hover:text-navy" : "text-white/80 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/register-criteria"
            className="bg-brand-yellow text-navy px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white hover:shadow-lg transition-all"
          >
            Register Criteria
          </Link>
        </div>

        <button
          className={`lg:hidden ${scrolled ? "text-navy" : "text-white"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-100">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 font-medium py-2"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/register-criteria"
              onClick={() => setMobileOpen(false)}
              className="bg-brand-yellow text-navy px-5 py-3 rounded-lg font-semibold text-center mt-2"
            >
              Register Criteria
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}