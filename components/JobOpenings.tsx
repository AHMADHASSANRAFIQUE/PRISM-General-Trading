"use client";

import React, { useState } from "react";
import { Briefcase, MapPin, Clock, ArrowRight, Mail, CheckCircle2, Building2, ChevronRight } from "lucide-react";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

const OPENINGS: JobOpening[] = [
  {
    id: "kam-fmcg",
    title: "Key Account Manager – Modern Trade (FMCG)",
    department: "Commercial & Sales",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "4–6 Years UAE Experience",
    summary:
      "Drive commercial volume, listing agreements, and Joint Business Planning (JBP) with key national hypermarket and supermarket accounts including Carrefour, Lulu, Union Coop, and West Zone.",
    responsibilities: [
      "Manage tier-one modern trade accounts, planogram execution, and in-store promotional calendars.",
      "Analyze POS sell-through and SKU velocity to optimize replenishment cycles across store clusters.",
      "Lead commercial trading terms negotiations, promotional rebates, and new SKU listings.",
    ],
    requirements: [
      "Proven track record managing UAE modern trade accounts in FMCG, personal care, or food sectors.",
      "Valid UAE driving license and established commercial relationships with retail buying teams.",
      "Strong analytical skills, commercial numeracy, and presentation fluency.",
    ],
  },
  {
    id: "brand-marketing-exec",
    title: "Brand Marketing Executive – Beauty & Personal Care",
    department: "Marketing & Brand Development",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "3–5 Years Experience",
    summary:
      "Execute omnichannel brand activation, consumer campaigns, in-store merchandising guidelines, and digital brand presence for our international beauty and personal care portfolio.",
    responsibilities: [
      "Coordinate product launches, promotional displays, and retailer co-marketing campaigns.",
      "Manage influencer outreach, localized social media content calendars, and beauty press PR.",
      "Track marketing ROI, brand penetration metrics, and competitor benchmark analysis in the UAE market.",
    ],
    requirements: [
      "Demonstrated marketing experience within beauty, skincare, cosmetics, or FMCG brands in the GCC.",
      "Creative eye for visual merchandising and premium brand storytelling.",
      "Strong bilingual communication (English required; Arabic is an advantage).",
    ],
  },
  {
    id: "supply-chain-coord",
    title: "Supply Chain & Logistics Coordinator",
    department: "Supply Chain & Operations",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "3–5 Years Experience",
    summary:
      "Oversee inbound freight forwarding, customs clearance, warehouse receiving, inventory control, and multi-channel fulfillment across modern trade, general trade, and pharmacy networks in all 7 Emirates.",
    responsibilities: [
      "Coordinate with shipping lines, freight forwarders, and Dubai Customs / DP World for expedited clearance.",
      "Monitor stock holding levels, expiry tracking (FIFO/FEFO), and warehouse dispatch scheduling.",
      "Ensure regulatory compliance documentation for Dubai Municipality and MOHAP inbound shipments.",
    ],
    requirements: [
      "Extensive knowledge of UAE import/export documentation, Mirsal II, and customs protocols.",
      "Proficiency in ERP inventory modules and multi-warehouse stock management.",
      "Experience handling temperature-sensitive personal care, OTC, or FMCG goods.",
    ],
  },
  {
    id: "regulatory-specialist",
    title: "Regulatory Affairs Specialist – OTC & Healthcare",
    department: "Regulatory & Compliance",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "3–6 Years Experience",
    summary:
      "Spearhead product registration dossiers, label assessments, and regulatory approvals with the UAE Ministry of Health and Prevention (MOHAP) and Dubai Municipality (Montaji).",
    responsibilities: [
      "Compile, review, and submit technical dossiers for cosmetic, nutritional, and OTC healthcare products.",
      "Liaise directly with health authorities to expedite product classification and commercial clearance.",
      "Ensure ongoing compliance with regional GSO standards, ingredient bans, and mandatory Arabic labeling.",
    ],
    requirements: [
      "Bachelor's degree in Pharmacy, Biomedical Sciences, Chemistry, or relevant discipline.",
      "Proven direct experience with UAE MOHAP and Dubai Municipality Montaji portals.",
      "Deep understanding of GCC cosmetic regulations and dietary supplement frameworks.",
    ],
  },
  {
    id: "food-fmcg-sales",
    title: "Food & Beverage Category Sales Specialist",
    department: "Commercial & Sales",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "3–5 Years Experience",
    summary:
      "Spearhead distribution expansion for packaged food products, culinary staples, and pantry FMCG across regional cooperative societies, supermarkets, and specialty food retail channels.",
    responsibilities: [
      "Expand distribution footprint for ambient packaged foods and gourmet grocery lines across UAE retail.",
      "Coordinate shelf placement, promotional end-caps, and seasonal tasting activations.",
      "Monitor order fulfillment, credit cycles, and on-shelf availability.",
    ],
    requirements: [
      "Solid background in UAE food & beverage distribution or grocery modern/traditional trade.",
      "Knowledge of food safety norms, retail shelf dynamics, and consumer pantry purchasing behaviors.",
      "Self-driven with strong customer relationship management capability.",
    ],
  },
];

const DEPARTMENTS = [
  "All Departments",
  "Commercial & Sales",
  "Marketing & Brand Development",
  "Supply Chain & Operations",
  "Regulatory & Compliance",
];

export default function JobOpenings() {
  const [activeDept, setActiveDept] = useState("All Departments");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const filteredOpenings =
    activeDept === "All Departments"
      ? OPENINGS
      : OPENINGS.filter((job) => job.department === activeDept);

  return (
    <div id="openings" className="space-y-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prism-ice text-prism-primary text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Current Opportunities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-prism-charcoal">
            Current Openings
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            We are looking for exceptional commercial, marketing, operational, and regulatory talent to join our expanding UAE distribution platform.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500">
            Showing <strong className="text-prism-charcoal">{filteredOpenings.length}</strong> active position{filteredOpenings.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {/* Department Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {DEPARTMENTS.map((dept) => {
          const isActive = activeDept === dept;
          return (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 touch-target ${
                isActive
                  ? "bg-prism-primary text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
              }`}
            >
              {dept}
            </button>
          );
        })}
      </div>

      {/* Job Listings Cards */}
      <div className="space-y-5">
        {filteredOpenings.map((job) => {
          const isExpanded = selectedJob === job.id;
          const mailtoLink = `mailto:info@prismintl.co?subject=${encodeURIComponent(
            `Job Application - ${job.title}`
          )}&body=${encodeURIComponent(
            `Dear Prism Talent Acquisition Team,\n\nI am writing to express my interest in the ${job.title} position at Prism General Trading.\n\nPlease find attached my CV for your review.\n\nBest regards,\n[Your Name]\n[Your Contact Number]`
          )}`;

          return (
            <div
              key={job.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle hover:shadow-hover transition-all duration-300 p-6 sm:p-8 space-y-6"
            >
              {/* Card Header Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-prism-ice text-prism-primary">
                      {job.department}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {job.experience}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-prism-charcoal">
                    {job.title}
                  </h3>
                </div>

                {/* Apply Button */}
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={mailtoLink}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-prism-primary hover:bg-prism-blue text-white text-xs sm:text-sm font-semibold transition-all shadow-sm interactive-tap touch-target"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Apply for Role</span>
                  </a>
                  <button
                    onClick={() => setSelectedJob(isExpanded ? null : job.id)}
                    className="px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-700 transition-colors touch-target"
                  >
                    {isExpanded ? "Hide Details" : "View Details"}
                  </button>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {job.summary}
              </p>

              {/* Expandable Details */}
              {isExpanded && (
                <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-prism-primary flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-prism-primary mt-2 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-prism-sky flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-prism-primary" />
                      Candidate Requirements
                    </h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Speculative Application Banner */}
      <div className="bg-gradient-to-r from-prism-navy via-[#112240] to-prism-charcoal text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-prism-sky">
            General Talent Roster
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Don&apos;t see an exact match for your profile?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            We continuously welcome proactive introductions from experienced professionals across FMCG distribution, key account management, logistics, and brand marketing.
          </p>
        </div>

        <a
          href="mailto:info@prismintl.co?subject=Speculative%20Career%20Application%20-%20Prism%20Talent%20Roster"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white text-prism-navy hover:bg-slate-100 text-sm font-semibold transition-all shadow-md shrink-0 interactive-tap touch-target"
        >
          <Mail className="w-4 h-4 text-prism-primary" />
          <span>Submit Speculative CV</span>
        </a>
      </div>
    </div>
  );
}
