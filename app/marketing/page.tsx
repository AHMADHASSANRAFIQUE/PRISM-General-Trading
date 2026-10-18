import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Megaphone,
  ShoppingBag,
  Share2,
  Calendar,
  Stethoscope,
  BarChart3,
  CheckCircle2,
  LineChart,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "FMCG Marketing & Brand Development UAE | Prism",
  description:
    "Explore Prism’s trade marketing, consumer campaigns, digital marketing and brand-development capabilities.",
};

const MARKETING_CAPABILITIES = [
  {
    title: "Market Research & Brand Strategy",
    desc: "Consumer and competitor analysis, market opportunity assessment, brand positioning, go-to-market planning, and pricing and promotional strategy.",
    icon: Target,
  },
  {
    title: "Brand Launch Campaigns",
    desc: "Coordinated launch activity designed to introduce products to the right channels and audiences, with distribution and marketing aligned around defined priorities.",
    icon: Megaphone,
  },
  {
    title: "Trade Marketing & Retail Activation",
    desc: "Retail promotions, in-store visibility, merchandising coordination, point-of-sale materials, sampling, demonstrations and execution monitoring.",
    icon: ShoppingBag,
  },
  {
    title: "Digital & Consumer Marketing",
    desc: "Social media management, digital advertising across relevant platforms including Meta, Google and TikTok, influencer and creator collaborations, and consumer awareness campaigns.",
    icon: Share2,
  },
  {
    title: "PR, Events & Consumer Engagement",
    desc: "Brand events, media relations, consumer activations and other campaign activities that support awareness and market engagement.",
    icon: Calendar,
  },
  {
    title: "Healthcare & Institutional Marketing",
    desc: "Relevant product education and communication initiatives for pharmacists, healthcare professionals and institutional audiences, aligned with applicable product and advertising requirements.",
    icon: Stethoscope,
  },
  {
    title: "Marketing Performance & Reporting",
    desc: "Campaign evaluation using commercial and marketing indicators, with a focus on understanding outcomes and improving future activity.",
    icon: BarChart3,
  },
];

const EXECUTION_STEPS = [
  {
    step: "01",
    title: "Understand the Landscape",
    text: "Understand the product, target consumer and competitive environment.",
  },
  {
    step: "02",
    title: "Align Priorities",
    text: "Agree launch, distribution and marketing priorities with the brand principal.",
  },
  {
    step: "03",
    title: "Coordinate Activation",
    text: "Coordinate trade activation and consumer-facing marketing activities.",
  },
  {
    step: "04",
    title: "Monitor Performance",
    text: "Monitor execution, market response and measurable commercial indicators.",
  },
  {
    step: "05",
    title: "Refine & Scale",
    text: "Refine activities based on performance and evolving opportunities.",
  },
];

const INTELLIGENCE_AREAS = [
  "Sales analysis by SKU, category, customer and channel",
  "Distribution coverage & weighted reach across Emirates",
  "New account listings & category shelf placements",
  "Product availability and out-of-stock insights",
  "Merchandising observations & shelf compliance tracking",
  "Competitor pricing and promotional intelligence",
  "Campaign performance & activation feedback",
  "Inventory movement & demand replenishment forecasts",
];

export default function MarketingPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Header */}
      <section className="prism-mesh-bg text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 prism-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal direction="down" duration={500}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-dark text-xs font-semibold uppercase tracking-widest text-prism-sky">
              <span>Integrated Brand Growth</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100} duration={600}>
            <h1 className="text-fluid-h1 font-serif font-bold tracking-tight text-white max-w-4xl leading-tight">
              Building Demand. <br className="hidden sm:inline" />
              Strengthening Brands.
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200} duration={600}>
            <p className="text-lg sm:text-xl text-slate-200 max-w-3xl font-light leading-relaxed">
              Successful market development requires more than product placement. Prism combines distribution with trade and consumer marketing to help brands build awareness, secure relevant visibility and convert market access into sustained commercial performance.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Strategic Collaboration Philosophy */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={600}>
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm max-w-4xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-prism-primary">
              Joint Commercial Strategy
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-prism-charcoal">
              Collaborative Strategy & Investment Models
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Working closely with each brand principal, we develop marketing priorities around brand positioning, category dynamics, consumer behavior and commercial objectives. Campaign investment and execution models are agreed according to the needs of each brand.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 7 Marketing Capabilities Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal direction="up" duration={600}>
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
              Full-Spectrum Execution
            </span>
            <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal">
              Our Marketing Capabilities
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MARKETING_CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <ScrollReveal key={cap.title} direction="up" delay={idx * 60} duration={500}>
                <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-subtle hover:shadow-hover transition-all duration-300 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-prism-ice text-prism-primary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-prism-charcoal">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 5-Step Methodology: From Planning to Execution */}
      <section className="py-24 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <ScrollReveal direction="up" duration={600}>
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
                Systematic Framework
              </span>
              <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal">
                From Planning to Execution
              </h2>
              <p className="text-slate-600 text-base font-normal">
                A disciplined, phased approach ensuring marketing drives tangible retail sales and long-term brand equity.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
            {EXECUTION_STEPS.map((item, idx) => (
              <ScrollReveal key={item.step} direction="up" delay={idx * 80} duration={500}>
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between h-full hover:border-prism-sky/50 transition-colors">
                  <div>
                    <span className="font-serif font-black text-3xl text-prism-primary/30 block mb-3">
                      {item.step}
                    </span>
                    <h3 className="font-serif font-bold text-base text-prism-charcoal mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Intelligence Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="right" duration={600}>
              <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
                Commercial Transparency
              </span>
              <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal mt-2">
                Information That Supports Better Decisions
              </h2>
              <p className="text-base text-slate-700 leading-relaxed font-normal mt-4">
                Depending on the brand and channel, Prism can provide comprehensive commercial intelligence to give brand owners clear visibility into their UAE market performance:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                {INTELLIGENCE_AREAS.map((area) => (
                  <div key={area} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-prism-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium">{area}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6">
            <ScrollReveal direction="left" duration={600}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-card border border-slate-200 group">
                <Image
                  src="/images/beauty-vitamins-activation.jpg"
                  alt="Curated beauty, skincare, and dietary vitamins brand activation in UAE"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prism-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[11px] uppercase font-bold tracking-widest text-prism-sky">
                    Beauty, Personal Care & Vitamin Marketing
                  </span>
                  <p className="text-sm font-medium text-slate-200">
                    Coordinated retail marketing, in-store activation, and brand development across UAE modern trade and specialty channels.
                  </p>
                </div>
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
              Connect Your Brand with a UAE Partner That Understands Both Distribution and Demand Generation
            </h2>
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
