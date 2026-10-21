import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Award,
  Clock,
  Building,
  Target,
  Sparkles,
  FileCheck2,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "About Prism General Trading | UAE FMCG Partner",
  description:
    "Learn about Prism General Trading, established in 1994, with nationwide distribution and integrated brand marketing capabilities.",
};

const TIMELINE = [
  {
    year: "1994",
    title: "Foundation in Dubai, UAE",
    desc: "Established with a focus on high-quality FMCG and healthcare consumer product distribution.",
  },
  {
    year: "2000s",
    title: "Modern Trade Expansion",
    desc: "Rapid expansion across major UAE hypermarkets, cooperative societies, and pharmacy chains.",
  },
  {
    year: "2010s",
    title: "Integrated Marketing Capabilities",
    desc: "Introduction of in-house trade marketing, retail activation, and regulatory compliance pathways.",
  },
  {
    year: "Present",
    title: "Nationwide Market Leadership",
    desc: "Serving more than 4,000 active customer locations across all seven UAE Emirates.",
  },
];

const WHY_PRISM_POINTS = [
  {
    title: "Market Presence Since 1994",
    desc: "More than three decades of deep operational and commercial relationships in the UAE market.",
    icon: Clock,
  },
  {
    title: "Nationwide Reach (4,000+ Locations)",
    desc: "Active supply to modern trade, community retail, pharmacies, hospitals, and institutions across all 7 Emirates.",
    icon: Building,
  },
  {
    title: "Integrated Marketing & Distribution",
    desc: "Combining physical channel placement with active consumer demand generation and trade marketing.",
    icon: TrendingUp,
  },
  {
    title: "Access to Retail & Healthcare Channels",
    desc: "Established listing pathways with major hypermarket chains, cooperatives, and pharmacy networks.",
    icon: Target,
  },
  {
    title: "Regulatory & Compliance Support",
    desc: "Product registration facilitation with Dubai Municipality, MOHAP/EDE, and customs coordination.",
    icon: ShieldCheck,
  },
  {
    title: "Long-Term Commitment to Brand Growth",
    desc: "A partnership-first philosophy prioritizing sustainable brand equity over short-term volume.",
    icon: Award,
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Editorial Page Header */}
      <section className="prism-mesh-bg text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 prism-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal direction="down" duration={500}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-dark text-xs font-semibold uppercase tracking-widest text-prism-sky">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Corporate Heritage • Established 1994</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100} duration={600}>
            <h1 className="text-fluid-h1 font-serif font-bold tracking-tight max-w-4xl leading-tight text-white">
              A Legacy of Market Expertise. <br className="hidden sm:inline" />
              A Focus on What Comes Next.
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200} duration={600}>
            <p className="text-lg sm:text-xl text-slate-200 max-w-3xl font-light leading-relaxed">
              Founded in 1994, Headquartered in the UAE, Prism General Trading specializes in the distribution and marketing of FMCG, Beauty and Personal Care, house care, Food, Vitamins, dietary supplements and Healthcare consumer products.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Narrative & Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-8 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            <ScrollReveal direction="up" duration={600}>
              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-prism-primary">
                  Three Decades of Growth
                </span>
                <p className="text-slate-700 leading-relaxed font-normal">
                  Over more than three decades, our business has developed around a clear principle: strong distribution is built on understanding brands, customers and the markets they serve. Today, Prism connects international and regional brands with more than 4,000 customer locations across all seven Emirates.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100} duration={600}>
              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-prism-primary">
                  End-to-End Execution
                </span>
                <p className="text-slate-700 leading-relaxed font-normal">
                  Our capabilities bring together market entry, regulatory coordination, commercial planning, sales execution, distribution, trade marketing and consumer engagement. We work closely with brand principals to develop the right route to market and support long-term commercial performance.
                </p>
              </div>
            </ScrollReveal>

            {/* Strategic Pillars: Our Approach */}
            <div className="pt-6 space-y-6">
              <ScrollReveal direction="up" delay={200} duration={600}>
                <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal">
                  Our Approach
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <ScrollReveal direction="up" delay={250} duration={600}>
                  <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-prism-ice text-prism-primary flex items-center justify-center">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif font-bold text-xl text-prism-charcoal">
                        Brand Development
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        We believe distribution and marketing should work together. From positioning to retail execution, we aim to build awareness, availability and relevance for the brands we represent.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={300} duration={600}>
                  <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-prism-ice text-prism-primary flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif font-bold text-xl text-prism-charcoal">
                        Disciplined Execution
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        We focus on account development, merchandising, promotional follow-through, product availability and commercially meaningful reporting.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>

          {/* Right Visual & Key Statistics Column */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="left" duration={600}>
              <div className="relative rounded-3xl overflow-hidden shadow-card border border-slate-200 aspect-[4/3] group">
                <Image
                  src="/images/about-team.jpg"
                  alt="Prism General Trading corporate strategy"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>

            {/* Historical Milestones */}
            <ScrollReveal direction="left" delay={150} duration={600}>
              <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-xl text-prism-charcoal pb-4 border-b border-slate-100">
                  Chronicle of Market Depth
                </h3>
                <div className="space-y-6">
                  {TIMELINE.map((item) => (
                    <div key={item.year} className="flex items-start gap-4">
                      <span className="font-serif font-black text-lg text-prism-primary w-14 flex-shrink-0">
                        {item.year}
                      </span>
                      <div className="space-y-0.5">
                        <strong className="text-sm text-prism-charcoal block font-bold">
                          {item.title}
                        </strong>
                        <p className="text-xs text-slate-500 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WHY MANUFACTURERS WORK WITH PRISM */}
      <section className="py-24 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <ScrollReveal direction="up" duration={600}>
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
                Value Proposition
              </span>
              <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal">
                Why Manufacturers Work with Prism
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Our difference is the combination of market presence since 1994, nationwide reach across 4,000+ customer locations, integrated marketing and distribution, access to retail and healthcare channels, regulatory support and a long-term commitment to brand growth. We align commercial execution with clear reporting and close collaboration with our principals.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_PRISM_POINTS.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <ScrollReveal key={pt.title} direction="up" delay={idx * 80} duration={500}>
                  <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-card hover:border-prism-sky/40 transition-all duration-300 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-prism-ice text-prism-primary flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif font-bold text-lg text-prism-charcoal">
                        {pt.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal direction="up" delay={300} duration={600}>
            <div className="pt-4 flex justify-center">
              <Link
                href="/contact-us"
                className="animate-sheen inline-flex items-center gap-2.5 px-9 py-4 text-base font-semibold text-white bg-prism-primary hover:bg-prism-blue rounded-xl transition-all shadow-md interactive-tap touch-target"
              >
                <span>DISCUSS A PARTNERSHIP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
