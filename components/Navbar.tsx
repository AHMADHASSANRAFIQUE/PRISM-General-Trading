"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Mail, MapPin, Building, ShieldCheck, Phone } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Our Brands", href: "/partners" },
  { name: "Distribution", href: "/distribution" },
  { name: "Marketing & Brand Development", href: "/marketing" },
  { name: "Careers", href: "/careers" },
  { name: "News & Events", href: "/news-and-events", badge: "Soon" },
  { name: "Contact Us", href: "/contact-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Executive Strip (Desktop) */}
      <div className="bg-prism-navy text-slate-300 text-xs py-2.5 px-4 sm:px-6 lg:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-slate-300 font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Established 1994 • Dubai, United Arab Emirates
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-light">
              FMCG, Vitamins & Healthcare Distribution Across All 7 Emirates
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="tel:+97142515753"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-prism-sky" />
              <span className="font-mono text-[11px] tracking-wide">+971 4 251 5753</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="mailto:info@prismintl.co"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-prism-sky" />
              <span className="font-mono text-[11px] tracking-wide">info@prismintl.co</span>
            </a>
            <span className="text-slate-600">|</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-white font-medium text-[11px]">
              <Building className="w-3 h-3 text-prism-sky" />
              <span>4,000+ Customer Locations</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-prism-navy/5 border-b border-slate-200"
            : "bg-white border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Official Logo Brandmark */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prism-blue rounded-lg py-1 interactive-tap"
              aria-label="Prism General Trading - Home"
            >
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image
                  src="/images/prism-logo.png"
                  alt="Prism General Trading Official Logo"
                  width={44}
                  height={44}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl font-bold tracking-tight text-prism-charcoal group-hover:text-prism-primary transition-colors">
                    PRISM
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20 rounded">
                    Est. 1994
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-slate-500">
                  General Trading
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5" aria-label="Main Corporate Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`inline-flex items-center gap-1.5 px-2 xl:px-2.5 py-2 text-[12.5px] xl:text-[13.5px] font-medium transition-all rounded-lg relative ${
                      isActive
                        ? "text-prism-primary font-semibold bg-prism-ice/60"
                        : "text-slate-600 hover:text-prism-primary hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20 rounded">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-1 left-2 xl:left-2.5 right-2 xl:right-2.5 h-[2px] bg-prism-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Contact CTA */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/contact-us"
                className="animate-sheen inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-prism-primary hover:bg-prism-blue rounded-xl transition-all duration-200 shadow-md hover:shadow-lg interactive-tap"
              >
                <span>Partner With Us</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Actions Button */}
            <div className="flex lg:hidden items-center gap-2.5">
              <Link
                href="/contact-us"
                className="touch-target px-4 py-2 text-xs font-semibold text-white bg-prism-primary rounded-lg interactive-tap shadow-xs"
              >
                Contact
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="touch-target p-2 rounded-lg text-slate-700 hover:text-prism-primary hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prism-blue"
                aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-prism-primary" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Navigation Drawer (Placed outside header to prevent backdrop-blur containing block issue) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-[#0A192F] text-white border-t border-white/10 flex flex-col justify-between overflow-y-auto overscroll-contain animate-fade-in shadow-2xl h-[calc(100dvh-80px)]">
          <div className="px-5 py-6 space-y-3">
            <div className="pb-3 border-b border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Corporate Sections</span>
              <span className="text-prism-sky font-bold">Prism UAE</span>
            </div>
            <nav className="space-y-1.5 pt-2" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all touch-target ${
                      isActive
                        ? "bg-white text-prism-navy font-bold shadow-md"
                        : "text-white hover:text-prism-sky hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="tracking-wide">{link.name}</span>
                      {link.badge && (
                        <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        isActive ? "text-prism-navy" : "text-slate-400 group-hover:text-prism-sky"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-5 border-t border-white/10 bg-[#071324] space-y-4">
            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="animate-sheen flex items-center justify-center gap-2 w-full py-3.5 text-base font-semibold text-white bg-prism-primary hover:bg-prism-blue rounded-xl shadow-md interactive-tap touch-target border border-white/10"
            >
              <span>Initiate Business Enquiry</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>

            <div className="space-y-2 text-xs">
              <a
                href="tel:+97142515753"
                className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2.5 text-white hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-prism-sky flex-shrink-0" />
                <span className="font-mono font-medium text-white tracking-wide">+971 4 251 5753</span>
              </a>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="mailto:info@prismintl.co"
                  className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Mail className="w-4 h-4 text-prism-sky flex-shrink-0" />
                  <span className="truncate font-mono text-[11px] text-white">info@prismintl.co</span>
                </a>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 text-slate-200">
                  <MapPin className="w-4 h-4 text-prism-sky flex-shrink-0" />
                  <span className="truncate text-slate-300">Dubai, UAE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
