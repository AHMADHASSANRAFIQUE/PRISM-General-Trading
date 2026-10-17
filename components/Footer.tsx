"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Shield, ArrowUpRight, Building, Globe, CheckCircle2, Phone } from "lucide-react";
import PrivacyModal from "./PrivacyModal";

const FOOTER_NAV = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Our Brands", href: "/partners" },
  { name: "Distribution", href: "/distribution" },
  { name: "Marketing & Brand Development", href: "/marketing" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact-us" },
];

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="bg-prism-navy text-slate-300 border-t border-slate-800 relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-prism-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-prism-azure/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Column 1: Company Profile */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3.5">
                <div className="relative w-11 h-11 flex-shrink-0 bg-white rounded-xl p-1.5 shadow-md">
                  <Image
                    src="/images/prism-logo.png"
                    alt="Prism General Trading Logo"
                    width={38}
                    height={38}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-2xl font-bold tracking-tight text-white">
                      PRISM
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded">
                      Est. 1994
                    </span>
                  </div>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-prism-sky">
                    General Trading
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                Established in 1994, Prism General Trading is an established UAE distribution and marketing company connecting international consumer brands with more than 4,000 customer locations across all seven Emirates.
              </p>

              <div className="space-y-2.5 pt-2 text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-prism-sky flex-shrink-0" />
                  <span>Dubai, United Arab Emirates</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-prism-sky flex-shrink-0" />
                  <a
                    href="tel:+97142515753"
                    className="hover:text-white transition-colors font-mono text-xs text-prism-sky"
                  >
                    +971 4 251 5753
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-prism-sky flex-shrink-0" />
                  <a
                    href="mailto:info@prismintl.co"
                    className="hover:text-white transition-colors underline underline-offset-4 font-mono text-xs text-prism-sky"
                  >
                    info@prismintl.co
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-prism-sky" />
                <span>Site Navigation</span>
              </h3>
              <ul className="space-y-2.5 text-sm">
                {FOOTER_NAV.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Commercial Proof Points & Direct Action */}
            <div className="lg:col-span-4 space-y-5">
              <h3 className="text-xs uppercase tracking-wider font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-prism-sky" />
                <span>Commercial Credentials</span>
              </h3>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-prism-sky mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">4,000+ Customer Locations</strong> across modern trade, traditional groceries, pharmacies, and institutions.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-prism-sky mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">All Seven Emirates:</strong> Dubai, Abu Dhabi & Al Ain, Sharjah, Ajman, RAK, Fujairah, and UAQ.
                  </p>
                </div>
              </div>

              <div>
                <Link
                  href="/contact-us"
                  className="animate-sheen inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-white bg-prism-primary hover:bg-prism-blue rounded-xl transition-all shadow-md interactive-tap touch-target"
                >
                  <span>Initiate Partnership Enquiry</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Privacy */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              © {new Date().getFullYear()} Prism General Trading. All rights reserved. Dubai, United Arab Emirates.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setPrivacyOpen(true)}
                className="hover:text-white transition-colors underline flex items-center gap-1.5 text-slate-400 touch-target"
              >
                <Shield className="w-3.5 h-3.5 text-prism-sky" />
                <span>Privacy Notice & PDPL Compliance</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Accessible Privacy Modal */}
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
}
