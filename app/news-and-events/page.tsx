import React from "react";
import Link from "next/link";
import {
  Calendar,
  Newspaper,
  Megaphone,
  Sparkles,
  Clock,
  Mail,
  ArrowRight,
  Building2,
  Globe2,
  TrendingUp,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "News & Events | Prism General Trading UAE",
  description:
    "Corporate announcements, trade fair participations, brand launches, and industry insights from Prism General Trading UAE.",
};

const PLANNED_MODULES = [
  {
    title: "Trade Fairs & Industry Exhibitions",
    desc: "Upcoming presence, booth schedules, and executive meetings across premier regional exhibitions including Beautyworld Middle East, Gulfood, and Arab Health.",
    icon: Calendar,
    tag: "Exhibitions & Events",
    accent: "text-amber-600 bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "Brand Launches & Portfolio Milestones",
    desc: "Official press announcements for newly onboarded international FMCG principals, modern trade expansions, and localized product launches.",
    icon: Megaphone,
    tag: "Brand Announcements",
    accent: "text-prism-primary bg-prism-ice border-prism-primary/20",
  },
  {
    title: "Regional Expansion & Market Insights",
    desc: "Progress reports and market entry milestones across our pipeline territories in Jordan (January 2027), KSA (March 2027), and Singapore (May 2027).",
    icon: Globe2,
    tag: "Market Milestones",
    accent: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
];

export default function NewsAndEventsPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 01. Hero Viewport */}
      <section className="prism-mesh-bg text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 prism-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal direction="down" duration={500}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-dark text-xs font-semibold uppercase tracking-widest text-prism-sky">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Media Center & Events • Under Preparation</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100} duration={600}>
            <h1 className="text-fluid-h1 font-serif font-bold tracking-tight text-white max-w-4xl leading-tight">
              News & Events
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200} duration={600}>
            <p className="text-lg sm:text-xl text-slate-200 max-w-3xl font-light leading-relaxed">
              Official corporate announcements, brand partnership milestones, trade exhibition schedules, and commercial distribution insights from Prism General Trading.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 02. Flagship Inactive / In Preparation Notice */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <ScrollReveal direction="up" duration={600}>
          <div className="bg-gradient-to-br from-slate-50 via-white to-prism-ice/30 rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 border border-amber-500/20 flex items-center justify-center shadow-xs">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Section Inactive & In Preparation
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-prism-charcoal mt-1">
                    Press & Events Portal Launching Soon
                  </h2>
                </div>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Scheduled for Full Activation
              </div>
            </div>

            <div className="space-y-4 max-w-3xl text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                Our media and events archive is currently being curated. We are preparing our comprehensive calendar of industry trade appearances, press releases for upcoming FMCG brand launches, and key milestone reports.
              </p>
              <p className="text-sm text-slate-500">
                Detailed event announcements, booth schedules, and media kit downloads will be published here directly once finalized by our corporate communications team.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 03. Preview of Upcoming Modules */}
        <div className="space-y-8">
          <ScrollReveal direction="up" duration={600}>
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-prism-primary">
                Portal Scope
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-prism-charcoal">
                What Will Be Featured Here
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {PLANNED_MODULES.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <ScrollReveal key={mod.title} direction="up" delay={idx * 100} duration={500}>
                  <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-subtle hover:shadow-hover transition-all duration-300 space-y-4 h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-prism-ice text-prism-primary flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${mod.accent}`}>
                          {mod.tag}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-lg text-prism-charcoal">
                        {mod.title}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {mod.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Details to be published soon</span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* 04. Media & Press Inquiries Banner */}
        <ScrollReveal direction="up" delay={200} duration={600}>
          <div className="bg-gradient-to-r from-prism-navy via-[#112240] to-prism-charcoal text-white rounded-3xl p-8 sm:p-12 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-prism-sky">
                Media & Communications
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Require Immediate Press or Exhibition Information?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                For journalist inquiries, brand partnership coverage, or meeting requests during regional trade fairs, please contact our corporate communications office.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="mailto:info@prismintl.co?subject=Media%20%26%20Event%20Enquiry%20-%20Prism%20General%20Trading"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white text-prism-navy hover:bg-slate-100 text-sm font-semibold transition-all shadow-md interactive-tap touch-target"
              >
                <Mail className="w-4 h-4 text-prism-primary" />
                <span>Contact Press Office</span>
              </a>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 text-white text-sm font-medium transition-colors touch-target"
              >
                <span>General Enquiries</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
