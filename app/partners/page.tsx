import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import BrandGrid from "@/components/BrandGrid";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Partners | Prism General Trading",
  description:
    "Explore the international and regional brands represented by Prism General Trading in the UAE.",
};

export default function PartnersPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Header */}
      <section className="prism-mesh-bg text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 prism-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal direction="down" duration={500}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-dark text-xs font-semibold uppercase tracking-widest text-prism-sky">
              <span>Authorized Brand Portfolio</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100} duration={600}>
            <h1 className="text-fluid-h1 font-serif font-bold tracking-tight text-white leading-tight">
              Brands We Represent
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200} duration={600}>
            <p className="text-lg sm:text-xl text-slate-200 max-w-3xl font-light leading-relaxed">
              Our portfolio includes established international and regional consumer brands across FMCG, personal care, health, wellness, and household essentials.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Brand Grid Pavilion */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <ScrollReveal direction="up" duration={600}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400">
                Official Brand Portfolio
              </h2>
              <p className="text-sm font-semibold text-prism-charcoal mt-1">
                Authorized UAE Marketing & Distribution
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Authorized International Marks</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={150} duration={600}>
          <BrandGrid />
        </ScrollReveal>

        {/* Closing Inquiry Section */}
        <ScrollReveal direction="up" delay={250} duration={600}>
          <div className="pt-12 border-t border-slate-200">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-sm text-center max-w-3xl mx-auto space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-prism-ice text-prism-primary flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-prism-charcoal">
                Portfolio Inquiries & Brand Representation
              </h3>
              <p className="text-base text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
                For enquiries about our brand portfolio or distribution partnerships, please contact Prism General Trading.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact-us"
                  className="animate-sheen inline-flex items-center gap-2 px-9 py-4 text-sm font-semibold text-white bg-prism-primary hover:bg-prism-blue rounded-xl transition-all shadow-md interactive-tap touch-target"
                >
                  <span>CONTACT US</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
