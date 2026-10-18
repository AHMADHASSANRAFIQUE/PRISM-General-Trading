import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowRight, ShieldCheck, Users, Target, Sparkles, Building, HeartHandshake } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import JobOpenings from "@/components/JobOpenings";

export const metadata = {
  title: "Careers | Prism General Trading UAE",
  description:
    "Explore career enquiries and professional opportunities with Prism General Trading.",
};

const VALUES = [
  {
    title: "Professionalism",
    desc: "Upholding high standards of commercial ethics, operational rigor, and reliability in all market interactions.",
    icon: ShieldCheck,
  },
  {
    title: "Accountability",
    desc: "Taking ownership of customer outcomes, brand growth, and timely commercial execution across channels.",
    icon: Target,
  },
  {
    title: "Collaboration",
    desc: "Working in close alignment with brand principals, retail customers, and cross-functional teams.",
    icon: Users,
  },
  {
    title: "Continuous Improvement",
    desc: "Constantly enhancing category knowledge, retail responsiveness, and service excellence.",
    icon: Sparkles,
  },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Header */}
      <section className="prism-mesh-bg text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 prism-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal direction="down" duration={500}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-dark text-xs font-semibold uppercase tracking-widest text-prism-sky">
              <span>Talent & Commercial Excellence</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100} duration={600}>
            <h1 className="text-fluid-h1 font-serif font-bold tracking-tight text-white max-w-4xl leading-tight">
              Build Your Career with Prism
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200} duration={600}>
            <p className="text-lg sm:text-xl text-slate-200 max-w-3xl font-light leading-relaxed">
              Prism General Trading operates in a dynamic market where consumer needs, retail channels and brands continue to evolve. We value professionalism, accountability, collaboration and a commitment to continuous improvement.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Careers Content & Philosophy */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <ScrollReveal direction="up" duration={600}>
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm max-w-4xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-prism-primary">
              Opportunities & Introductions
            </span>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              If you are interested in career opportunities in FMCG distribution, healthcare consumer products, sales, marketing or related business functions, we welcome an introduction.
            </p>
          </div>
        </ScrollReveal>

        {/* Current Job Openings Section */}
        <ScrollReveal direction="up" duration={600}>
          <JobOpenings />
        </ScrollReveal>

        {/* Culture & Values Grid */}
        <div className="space-y-10">
          <ScrollReveal direction="up" duration={600}>
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
                Work Culture
              </span>
              <h2 className="text-fluid-h2 font-serif font-bold text-prism-charcoal">
                Our Work Culture & Values
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <ScrollReveal key={val.title} direction="up" delay={idx * 80} duration={500}>
                  <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-subtle hover:shadow-hover transition-all duration-300 space-y-4 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-prism-ice text-prism-primary flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif font-bold text-lg text-prism-charcoal">
                        {val.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Direct Career Enquiries Card */}
        <ScrollReveal direction="up" delay={200} duration={600}>
          <div className="bg-gradient-to-br from-slate-50 to-prism-ice/40 border border-slate-200/90 rounded-3xl p-8 sm:p-14 max-w-4xl shadow-sm">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
                  Direct Talent Introduction
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-prism-charcoal">
                  Career Enquiries
                </h2>
              </div>
              <p className="text-base text-slate-700 leading-relaxed font-normal">
                Please email <strong className="text-prism-charcoal font-semibold">info@prismintl.co</strong> with the subject line{" "}
                <span className="font-mono bg-white px-2.5 py-1 rounded-md border border-slate-300 text-sm text-prism-primary font-semibold">
                  “Career Enquiry”
                </span>{" "}
                and a brief introduction.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="mailto:info@prismintl.co?subject=Career%20Enquiry"
                  className="animate-sheen inline-flex items-center gap-2.5 px-9 py-4 text-sm font-semibold text-white bg-prism-primary hover:bg-prism-blue rounded-xl transition-all shadow-md interactive-tap touch-target"
                >
                  <Mail className="w-4 h-4" />
                  <span>EMAIL PRISM</span>
                </a>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-prism-primary transition-colors py-2 touch-target"
                >
                  <span>Or use our general contact form</span>
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
