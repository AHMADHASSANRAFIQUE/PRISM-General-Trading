import React from "react";
import Image from "next/image";
import { Mail, MapPin, Building2, CheckCircle2, Clock, ShieldCheck, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Contact Prism General Trading | UAE",
  description:
    "Contact Prism General Trading for distribution, marketing and other business enquiries in the UAE.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Header */}
      <section className="prism-mesh-bg text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 prism-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal direction="down" duration={500}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-dark text-xs font-semibold uppercase tracking-widest text-prism-sky">
              <span>Commercial Engagement</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100} duration={600}>
            <h1 className="text-fluid-h1 font-serif font-bold tracking-tight text-white max-w-4xl leading-tight">
              Let’s Start a Conversation
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200} duration={600}>
            <p className="text-lg sm:text-xl text-slate-200 max-w-3xl font-light leading-relaxed">
              Whether you represent an international brand exploring UAE distribution, an established customer or an organization seeking commercial collaboration, Prism General Trading welcomes your enquiry.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content & Interactive Form Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Official Contact Details & Credentials */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="right" duration={600}>
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
                  Commercial Headquarters
                </span>
                <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal">
                  Contact Details
                </h2>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  Connect with our commercial partnerships and distribution management team directly.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm space-y-6 mt-6">
                <div className="space-y-1">
                  <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                    Company
                  </span>
                  <p className="font-serif font-bold text-2xl text-prism-charcoal">
                    Prism General Trading
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                    Location
                  </span>
                  <div className="flex items-start gap-3 pt-1 text-slate-700">
                    <MapPin className="w-5 h-5 text-prism-primary flex-shrink-0 mt-0.5" />
                    <span className="text-base font-medium">Dubai, United Arab Emirates</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                    Corporate Telephone
                  </span>
                  <div className="flex items-center gap-3 pt-1 text-slate-700">
                    <Phone className="w-5 h-5 text-prism-primary flex-shrink-0" />
                    <a
                      href="tel:+97142515753"
                      className="text-base font-semibold text-prism-primary hover:text-prism-blue font-mono text-sm"
                    >
                      +971 4 251 5753
                    </a>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                    Corporate Email
                  </span>
                  <div className="flex items-center gap-3 pt-1 text-slate-700">
                    <Mail className="w-5 h-5 text-prism-primary flex-shrink-0" />
                    <a
                      href="mailto:info@prismintl.co"
                      className="text-base font-semibold text-prism-primary hover:text-prism-blue underline underline-offset-4 font-mono text-sm"
                    >
                      info@prismintl.co
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                  <Clock className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                  <span>Enquiries routed to appropriate division within 1 business day.</span>
                </div>
              </div>

              {/* Partnership Scope Factcard */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-4 mt-6">
                <h3 className="font-serif font-bold text-lg text-prism-charcoal">
                  Partnership Scope
                </h3>
                <ul className="space-y-3 text-sm text-slate-600 font-normal">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-prism-primary flex-shrink-0 mt-0.5" />
                    <span>Established in 1994 with 30+ years of UAE market depth.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-prism-primary flex-shrink-0 mt-0.5" />
                    <span>Serving over 4,000 retail, pharmacy, and trade locations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-prism-primary flex-shrink-0 mt-0.5" />
                    <span>Full commercial coverage across all seven Emirates.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: General Business Enquiry Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" delay={150} duration={600}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
