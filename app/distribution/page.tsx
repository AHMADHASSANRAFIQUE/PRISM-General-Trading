import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Store,
  Building,
  HeartPulse,
  Coffee,
  Globe2,
  FileCheck2,
  CheckCircle,
  MapPin,
  Briefcase,
  Users,
  ShieldCheck,
  Building2,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "UAE FMCG & Healthcare Distribution | Prism",
  description:
    "Discover Prism’s UAE distribution reach across retail, pharmacies, hospitals, HORECA, government and institutional channels.",
};

const CHANNELS = [
  {
    title: "Hypermarkets & Supermarkets",
    desc: "Supporting brand presence in major modern retail environments through listing opportunities, commercial planning, order management, promotions and product availability.",
    icon: Store,
    category: "Modern Trade",
  },
  {
    title: "Traditional Trade",
    desc: "Serving neighborhood groceries, minimarkets and other general trade customers to support everyday accessibility and repeat purchase.",
    icon: Building,
    category: "General Trade",
  },
  {
    title: "Specialty & Ethnic Retail",
    desc: "Connecting brands with specialist retailers serving targeted consumer needs and communities across the UAE.",
    icon: Users,
    category: "Community Retail",
  },
  {
    title: "Pharmacies",
    desc: "Supporting the distribution and commercial development of relevant health, wellness, vitamins and other appropriately registered healthcare consumer products through pharmacy channels.",
    icon: HeartPulse,
    category: "Healthcare",
  },
  {
    title: "Hospitals & Clinics",
    desc: "Serving healthcare-related customer requirements for suitable product categories, subject to relevant purchasing and regulatory requirements.",
    icon: HeartPulse,
    category: "Clinical",
  },
  {
    title: "HORECA",
    desc: "Working with hotels, restaurants and cafés on relevant consumer, hygiene and other FMCG product requirements.",
    icon: Coffee,
    category: "Hospitality",
  },
  {
    title: "Government & Public Sector",
    desc: "Participating in relevant government and public-sector procurement opportunities, subject to tender requirements and product eligibility.",
    icon: Briefcase,
    category: "Tenders",
  },
  {
    title: "Institutions & Corporate Customers",
    desc: "Supporting institutional and corporate procurement needs through tailored commercial engagement and relevant product assortments.",
    icon: Building2,
    category: "Institutional",
  },
  {
    title: "E-Commerce",
    desc: "Complementing physical distribution through suitable digital retail and online sales channels.",
    icon: Globe2,
    category: "Digital Retail",
  },
];

const EMIRATES_DETAILS = [
  { name: "Dubai", role: "Commercial Headquarters & Central Hub" },
  { name: "Abu Dhabi", role: "Capital City & Al Ain Metropolitan Coverage" },
  { name: "Sharjah", role: "Extensive Modern & Traditional Trade Network" },
  { name: "Ajman", role: "Rapid Urban & Community Retail Coverage" },
  { name: "Ras Al Khaimah", role: "Northern Emirates Channel Distribution" },
  { name: "Fujairah", role: "Eastern Coastline Commercial Coverage" },
  { name: "Umm Al Quwain", role: "Local Community & Specialty Accessibility" },
];

const REGULATORY_POINTS = [
  "Dubai Municipality submissions, food classification, and product clearance",
  "MOHAP or Emirates Drug Establishment procedures (where applicable)",
  "Food supplement, dietary, and nutritional classification approvals",
  "Product labeling compliance, mandatory Arabic text localization, and barcode standards",
  "Import documentation, permits, and customs clearance coordination",
];

export default function DistributionPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Header */}
      <section className="prism-mesh-bg text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 prism-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal direction="down" duration={500}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-dark text-xs font-semibold uppercase tracking-widest text-prism-sky">
              <span>Nationwide Infrastructure</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100} duration={600}>
            <h1 className="text-fluid-h1 font-serif font-bold tracking-tight text-white max-w-4xl leading-tight">
              Nationwide Distribution. <br className="hidden sm:inline" />
              Focused Market Execution.
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200} duration={600}>
            <p className="text-lg sm:text-xl text-slate-200 max-w-3xl font-light leading-relaxed">
              Prism provides nationwide distribution and commercial support for FMCG, vitamins, dietary supplements and healthcare consumer products. Our customer network reaches more than 4,000 locations across all seven Emirates, enabling brands to serve a wide range of consumers and professional channels.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Tailored Channel Coverage Intro */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={600}>
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm max-w-4xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-prism-primary">
              Channel Strategy
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-prism-charcoal">
              Tailored Market Coverage
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              We tailor market coverage to each brand’s category, target audience and commercial objectives, combining customer development with retail execution and ongoing account management.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 9 Distribution Channels Directory */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal direction="up" duration={600}>
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
              Multi-Channel Spectrum
            </span>
            <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal">
              Our Distribution Channels
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CHANNELS.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <ScrollReveal key={ch.title} direction="up" delay={idx * 60} duration={500}>
                <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-subtle hover:shadow-hover transition-all duration-300 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-prism-ice text-prism-primary flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {ch.category}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-xl text-prism-charcoal">
                      {ch.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {ch.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Coverage Across the UAE — 7 Emirates Grid */}
      <section className="py-24 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal direction="up" duration={600}>
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
                Geographic Presence
              </span>
              <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal">
                Coverage Across the UAE
              </h2>
              <p className="text-slate-600 text-base font-normal">
                Our distribution network serves Dubai, Abu Dhabi (including Al Ain), Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {EMIRATES_DETAILS.map((em, idx) => (
              <ScrollReveal key={em.name} direction="up" delay={idx * 70} duration={500}>
                <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-prism-sky/50 transition-all flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-prism-primary flex-shrink-0" />
                      <h3 className="font-serif font-bold text-lg text-prism-charcoal">
                        {em.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {em.role}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Regional Expansion Pipeline */}
          <ScrollReveal direction="up" delay={200} duration={600}>
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1 max-w-md">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-800 text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>Expansion Pipeline</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-prism-charcoal">
                  Strategic Regional Market Entry
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Extending our proven commercial distribution model to high-growth regional and international markets.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Jordan</span>
                  <span className="text-prism-primary font-mono text-[11px] font-bold">(January 2027)</span>
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>KSA</span>
                  <span className="text-prism-primary font-mono text-[11px] font-bold">(March 2027)</span>
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Singapore</span>
                  <span className="text-prism-primary font-mono text-[11px] font-bold">(May 2027)</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Commercial Execution & Regulatory Support */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Commercial Execution Column */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="right" duration={600}>
              <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
                Operational Rigor
              </span>
              <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal mt-2">
                Commercial Execution
              </h2>
              <p className="text-slate-700 text-base leading-relaxed font-normal mt-4">
                Our approach combines customer acquisition, account management, retail listing negotiations, promotional planning, merchandising, shelf monitoring and ongoing assessment of product performance. We also support forecasting, replenishment planning, credit management and customer collections to maintain commercially sustainable growth.
              </p>
              <div className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-sm border border-slate-200 mt-6 group">
                <Image
                  src="/images/retail-modern-trade.jpg"
                  alt="Modern retail merchandising execution across UAE stores"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Registration & Market Entry Column */}
          <div id="regulatory" className="lg:col-span-6 space-y-6 scroll-mt-24">
            <ScrollReveal direction="left" duration={600}>
              <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
                Compliance Gateway
              </span>
              <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal mt-2">
                Registration, Compliance & Market Entry
              </h2>
              <p className="text-slate-700 text-base leading-relaxed font-normal mt-4">
                Entering the UAE market requires alignment between commercial objectives and local product requirements. Prism supports principals with relevant product registration and market-entry processes:
              </p>

              <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4 mt-6">
                <ul className="space-y-3.5 text-sm text-slate-700 font-normal">
                  {REGULATORY_POINTS.map((pt) => (
                    <li key={pt} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-prism-primary flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 italic">
                Applicable regulatory pathways depend on the specific product classification and the requirements of the competent authority.
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 prism-mesh-bg text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal direction="up" duration={600}>
            <h2 className="text-fluid-h2 font-serif font-bold">
              Seeking an Established Partner for UAE-Wide Distribution?
            </h2>
            <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto font-light">
              Contact us to discuss your brand and commercial objectives.
            </p>
            <div className="pt-4">
              <Link
                href="/contact-us"
                className="animate-sheen inline-flex items-center gap-2.5 px-9 py-4 text-base font-semibold text-prism-navy bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md interactive-tap touch-target"
              >
                <span>CONTACT US</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
