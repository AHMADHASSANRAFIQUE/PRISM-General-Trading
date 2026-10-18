import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Store,
  Layers,
  Sparkles,
  HeartPulse,
  Pill,
  Sparkle,
  Home as HomeIcon,
  ShoppingBag,
  Award,
  CheckCircle2,
  ChevronRight,
  Globe2,
} from "lucide-react";
import BrandGrid from "@/components/BrandGrid";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Prism General Trading | FMCG Distribution & Marketing UAE",
  description:
    "Established in 1994, Prism provides FMCG, vitamins and supplements distribution and marketing across all seven Emirates.",
};

const PROOF_POINTS = [
  {
    label: "ESTABLISHED",
    value: "1994",
    detail: "Over 30 years of continuous commercial presence in the UAE",
    tag: "30+ Years",
  },
  {
    label: "CUSTOMER REACH",
    value: "4,000+",
    detail: "Active customer ordering locations across all trade channels",
    tag: "Nationwide",
  },
  {
    label: "MARKET COVERAGE",
    value: "All 7 Emirates",
    detail: "Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah & UAQ",
    tag: "100% UAE",
    pipeline: "Pipeline: KSA (March 2027), Singapore (May 2027), Jordan (January 2027)",
  },
];

const CATEGORIES = [
  {
    title: "Beauty & Personal Care",
    desc: "Everyday hygiene, dermatological care, and personal grooming essentials.",
    image: "/images/categories/beauty.jpg",
    accent: "Cosmetic & Personal Care",
  },
  {
    title: "Skincare & Cosmetics",
    desc: "Advanced aesthetic skincare, dermatological solutions, and cosmetic care.",
    image: "/images/categories/personal-care.jpg",
    accent: "Aesthetic & Skin Health",
  },
  {
    title: "Food Products",
    desc: "Packaged consumer foods, culinary staples, gourmet ingredients, and everyday pantry FMCG essentials.",
    image: "/images/categories/food.jpg",
    accent: "Packaged Goods & Pantry",
  },
  {
    title: "Vitamins & Dietary Supplements",
    desc: "Essential multivitamins, nutritional boosters, and functional dietary supplements.",
    image: "/images/categories/vitamins.jpg",
    accent: "Nutritional Science",
  },
  {
    title: "Health & Wellness",
    desc: "Holistic wellness, active lifestyle essentials, and preventive self-care items.",
    image: "/images/categories/wellness.jpg",
    accent: "Preventive Care",
  },
  {
    title: "Household Cleaning & Hygiene",
    desc: "Surface sanitizers, household cleaning agents, and home hygiene products.",
    image: "/images/categories/household.jpg",
    accent: "Hygiene & Sanitation",
  },
  {
    title: "OTC Healthcare Products",
    desc: "Registered over-the-counter therapeutic remedies and healthcare essentials.",
    image: "/images/categories/otc.jpg",
    accent: "Pharmacy & OTC",
  },
];

const RETAIL_CHANNELS = [
  { name: "Carrefour", type: "Hypermarket & Supermarket Chain", badge: "Modern Trade" },
  { name: "Lulu Hypermarket", type: "Nationwide Supermarket Network", badge: "Modern Trade" },
  { name: "Union Coop", type: "Major Cooperative Society", badge: "Cooperative" },
  { name: "West Zone", type: "Community Supermarket Chain", badge: "Supermarkets" },
  { name: "Metro Manila", type: "Specialty & Ethnic Retail", badge: "Specialty" },
  { name: "New Era", type: "Consumer Retail & Groceries", badge: "Retail" },
  { name: "Traditional Trade", type: "General Trade & Groceries", badge: "Traditional" },
  { name: "GT Retail", type: "Convenience & Minimarkets", badge: "General Trade" },
  { name: "Pharmacies", type: "Community & Clinical Drugstores", badge: "Healthcare" },
  { name: "Government Tenders", type: "Institutional & Public Sector", badge: "Institutional" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 01. HERO VIEWPORT */}
      <section className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center prism-mesh-bg text-white overflow-hidden py-20 lg:py-32">
        {/* Ambient Geometric Grid Pattern */}
        <div className="absolute inset-0 prism-grid-pattern opacity-30 pointer-events-none" />

        {/* Ambient Faceted Prism Gradient Accents */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-prism-azure/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-prism-primary/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-8">
              <ScrollReveal direction="down" duration={500}>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel-dark text-prism-sky text-xs font-semibold tracking-wider uppercase shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>UAE Distribution Partner • Est. 1994</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100} duration={600}>
                <h1 className="text-fluid-hero font-serif font-bold text-white tracking-tight leading-[1.08]">
                  Building Brands. <br className="hidden sm:inline" />
                  Expanding Reach. <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-prism-sky via-blue-200 to-white">
                    Delivering Growth.
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200} duration={600}>
                <p className="text-lg sm:text-xl font-medium text-slate-200/90 leading-snug max-w-2xl">
                  Beauty & Personal Care, Cosmetics, Food Products, Housecare, Laundrycare, FMCG and Pharmaceuticals & Healthcare
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300} duration={600}>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
                  Established in 1994, Prism General Trading is a UAE distribution and marketing company connecting international consumer brands with customers across all the UAE. Combining nationwide market access, focused commercial execution and integrated marketing capabilities, we help brands build visibility, expand distribution and achieve sustainable growth.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400} duration={600}>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    href="/contact-us"
                    className="animate-sheen inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-white bg-prism-primary hover:bg-prism-blue rounded-xl transition-all shadow-elevated interactive-tap touch-target"
                  >
                    <span>CONTACT US</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/partners"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-medium text-slate-200 hover:text-white glass-panel-dark hover:bg-white/15 rounded-xl transition-all interactive-tap touch-target"
                  >
                    <span>Explore Represented Brands</span>
                    <ChevronRight className="w-4 h-4 text-prism-sky" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Architectural Facet Visual Column */}
            <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center">
              <ScrollReveal direction="left" delay={300} duration={700}>
                <div className="relative w-80 h-80 flex items-center justify-center">
                  {/* Subtle Rotating Ring */}
                  <div className="absolute inset-0 rounded-full border border-prism-sky/20 border-dashed animate-[spin_60s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-white/10" />

                  {/* Centered Large Emblem Plinth */}
                  <div className="relative w-56 h-56 glass-panel-dark rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border border-white/20">
                    <div className="relative w-24 h-24 mb-3">
                      <Image
                        src="/images/prism-logo.png"
                        alt="Prism Official Emblem"
                        fill
                        className="object-contain filter drop-shadow-[0_10px_20px_rgba(46,134,222,0.3)]"
                        priority
                      />
                    </div>
                    <span className="font-serif text-2xl font-bold tracking-tight text-white">PRISM</span>
                    <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-prism-sky mt-1">
                      DUBAI • EST. 1994
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF POINTS STRIP — Architectural Glass Plinths */}
      <section className="relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <ScrollReveal direction="up" delay={200} duration={600}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 bg-white rounded-2xl shadow-elevated border border-slate-200/90 p-6 sm:p-8">
            {PROOF_POINTS.map((item, idx) => (
              <div
                key={item.label}
                className={`flex flex-col justify-between space-y-3 p-3 ${
                  idx !== PROOF_POINTS.length - 1
                    ? "md:border-r md:border-slate-200/80"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400">
                    {item.label}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-prism-ice text-prism-primary border border-prism-border">
                    {item.tag}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-serif font-black text-prism-primary tracking-tight">
                  {item.value}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {item.detail}
                </p>
                {item.pipeline && (
                  <div className="pt-2.5 border-t border-slate-100 mt-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-800 text-[11px] font-semibold tracking-wide border border-amber-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span>{item.pipeline}</span>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 02. SECTION 2 / INTRODUCTION — Brand-Building Mindset */}
      <section className="py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="right" duration={600}>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-prism-primary">
                <span className="w-8 h-[2px] bg-prism-primary" />
                <span>Commercial Philosophy</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100} duration={600}>
              <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal tracking-tight">
                A Distribution Partner with a Brand-Building Mindset
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200} duration={600}>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                Distribution is more than making products available. It is about placing the right brands in the right channels, developing consistent consumer demand and sustaining performance over time. Prism combines nationwide distribution with trade and consumer marketing to support brands throughout their UAE growth journey.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300} duration={600}>
              <div className="pt-2">
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-prism-primary hover:text-prism-blue group interactive-tap touch-target"
                >
                  <span>Read more about our approach</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6">
            <ScrollReveal direction="left" delay={200} duration={700}>
              <div className="relative rounded-3xl overflow-hidden shadow-card border border-slate-200 aspect-[4/3] group">
                <Image
                  src="/images/about-team.jpg"
                  alt="Prism General Trading commercial consultation team in Dubai UAE"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prism-navy/85 via-prism-navy/25 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-[11px] uppercase font-bold tracking-widest text-prism-sky">
                    Disciplined Market Execution
                  </span>
                  <p className="text-sm font-medium text-slate-200 leading-snug">
                    Aligning customer acquisition, promotional follow-through, and shelf velocity across all seven Emirates.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 03. SECTION 3 / WHAT WE DO — Asymmetric Capabilities Layout */}
      <section className="py-24 bg-slate-100/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <ScrollReveal direction="up" duration={600}>
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
                Integrated Commercial Scope
              </span>
              <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal">
                What We Do
              </h2>
              <p className="text-slate-600 text-base">
                Connecting brand principals with nationwide market access, demand generation, and regulatory compliance.
              </p>
            </div>
          </ScrollReveal>

          {/* Asymmetric 1-Hero + 2-Stack Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Flagship Large Capability: Nationwide Distribution */}
            <div className="lg:col-span-6 flex flex-col">
              <ScrollReveal direction="up" delay={100} duration={600} className="h-full">
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm prism-card-interactive h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-prism-primary text-white flex items-center justify-center shadow-md">
                      <Store className="w-7 h-7" />
                    </div>
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-prism-sky bg-prism-navy px-2.5 py-1 rounded">
                        Flagship Reach
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-prism-charcoal">
                        Nationwide Distribution
                      </h3>
                      <p className="text-base text-slate-700 leading-relaxed font-normal">
                        We connect consumer brands with modern trade, traditional retail, specialty stores, pharmacies, hospitals, HORECA, government and institutional channels, and e-commerce customers across the UAE.
                      </p>
                    </div>

                    {/* Integrated Channel Tags */}
                    <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                      <span className="px-3 py-1 bg-slate-100 rounded-lg">Hypermarkets</span>
                      <span className="px-3 py-1 bg-slate-100 rounded-lg">Supermarkets</span>
                      <span className="px-3 py-1 bg-slate-100 rounded-lg">Traditional Trade</span>
                      <span className="px-3 py-1 bg-slate-100 rounded-lg">Pharmacies</span>
                      <span className="px-3 py-1 bg-slate-100 rounded-lg">HORECA</span>
                      <span className="px-3 py-1 bg-slate-100 rounded-lg">Institutions</span>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-slate-100">
                    <Link
                      href="/distribution"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-prism-primary hover:text-prism-blue group touch-target"
                    >
                      <span>Explore Distribution Network</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Stacked Cards: Marketing & Regulatory */}
            <div className="lg:col-span-6 flex flex-col gap-8 justify-between">
              {/* Marketing & Brand Development */}
              <ScrollReveal direction="up" delay={200} duration={600}>
                <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm prism-card-interactive flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-prism-ice text-prism-primary flex items-center justify-center">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Demand Generation
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-prism-charcoal">
                      Marketing & Brand Development
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      From market insight and launch planning to trade promotions, consumer activation, digital campaigns and performance evaluation, we support the commercial growth of the brands we represent.
                    </p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <Link
                      href="/marketing"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-prism-primary hover:text-prism-blue group touch-target"
                    >
                      <span>View Marketing Capabilities</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* Regulatory & Market Entry Support */}
              <ScrollReveal direction="up" delay={300} duration={600}>
                <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm prism-card-interactive flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-prism-ice text-prism-primary flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Compliance & Entry
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-prism-charcoal">
                      Regulatory & Market Entry Support
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      We help principals navigate relevant product registration, compliance, import and market-entry requirements, alongside commercial launch planning.
                    </p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <Link
                      href="/distribution#regulatory"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-prism-primary hover:text-prism-blue group touch-target"
                    >
                      <span>View Regulatory Pathways</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 04. SECTION 4 / PRODUCT CATEGORIES — Visual Lookbook */}
      <section className="py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <ScrollReveal direction="up" duration={600}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
              Portfolio Diversity
            </span>
            <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal">
              Expertise Across Essential Consumer Categories
            </h2>
            <p className="text-slate-600 text-base font-normal">
              Our portfolio covers established international and regional consumer brands in the following categories:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <ScrollReveal key={cat.title} direction="up" delay={idx * 100} duration={500}>
              <div className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-subtle hover:shadow-hover transition-all duration-500 flex flex-col h-full">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-prism-navy/90 via-prism-navy/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white rounded-full border border-white/20">
                      {cat.accent}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <h3 className="font-serif font-bold text-xl leading-tight text-white">
                      {cat.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {cat.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 05. SECTION 5 / RETAIL ACCESS — Segmented Channel Matrix */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal direction="right" duration={600}>
                <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
                  Market Reach & Channel Density
                </span>
                <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal tracking-tight mt-2">
                  Access to the Markets That Matter
                </h2>
                <p className="text-base text-slate-600 leading-relaxed font-normal mt-4">
                  With a reach extending to more than 4,000 customer locations across all seven Emirates, Prism supports brand access to a broad range of retail, healthcare, hospitality and institutional channels. Our commercial approach is shaped around product-market fit, channel opportunity and ongoing execution.
                </p>
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs mt-6 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-prism-primary block">
                    Nationwide Coverage
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Customer relationships active across Dubai, Abu Dhabi (including Al Ain), Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/distribution"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-prism-primary hover:bg-prism-blue rounded-xl transition-colors shadow-sm interactive-tap touch-target"
                  >
                    <span>View All Distribution Channels</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7">
              <ScrollReveal direction="left" delay={200} duration={600}>
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-card">
                  <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                    <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400">
                      Representative Retail & Trade Accounts
                    </h3>
                    <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Active Ordering Locations
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6">
                    {RETAIL_CHANNELS.map((channel) => (
                      <div
                        key={channel.name}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-prism-sky/50 hover:bg-white transition-all flex items-start justify-between gap-3 group"
                      >
                        <div>
                          <span className="font-serif font-bold text-base text-prism-charcoal group-hover:text-prism-primary transition-colors block">
                            {channel.name}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                            {channel.type}
                          </span>
                        </div>
                        <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 flex-shrink-0">
                          {channel.badge}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 text-[11px] text-slate-400 italic">
                    Note: Retail customer names reflect channel relationships and ongoing retail execution across the UAE market.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 06. SECTION 6 / OUR BRANDS PREVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal direction="up" duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
                Authorized Representation
              </span>
              <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal">
                Brands We Represent
              </h2>
              <p className="text-slate-600 text-base font-normal">
                Our portfolio includes established international and regional consumer brands across FMCG, personal care, health, wellness, and household essentials.
              </p>
            </div>
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 text-sm font-semibold text-prism-primary hover:text-prism-blue group touch-target"
            >
              <span>View Full Brand Portfolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200} duration={600}>
          <BrandGrid />
        </ScrollReveal>
      </section>

      {/* 07. SECTION 7 / CLOSING MANUFACTURER CTA */}
      <section className="py-24 bg-gradient-to-br from-prism-navy via-prism-dark to-prism-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 prism-grid-pattern opacity-25 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" duration={600}>
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-dark text-prism-sky text-xs font-semibold tracking-wider uppercase">
                Manufacturer & Brand Principal Partnerships
              </span>
              <h2 className="text-fluid-h2 font-serif font-bold tracking-tight text-white">
                Your UAE Growth Partner
              </h2>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
                Looking for an established partner to distribute and market your brand in the UAE? We welcome enquiries from manufacturers seeking a committed, long-term distribution relationship.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact-us"
                  className="animate-sheen w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 text-base font-semibold text-prism-navy bg-white hover:bg-slate-100 rounded-xl transition-all shadow-elevated interactive-tap touch-target"
                >
                  <span>GET IN TOUCH</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="mailto:info@prismintl.co"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-slate-200 hover:text-white glass-panel-dark hover:bg-white/15 rounded-xl transition-all touch-target"
                >
                  <span>info@prismintl.co</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
