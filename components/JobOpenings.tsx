"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Briefcase, MapPin, Clock, Mail, CheckCircle2, Building2, RefreshCw } from "lucide-react";
import { DEFAULT_OPENINGS, JobOpening } from "@/lib/jobsData";

export default function JobOpenings() {
  const [jobs, setJobs] = useState<JobOpening[]>(DEFAULT_OPENINGS);
  const [activeDept, setActiveDept] = useState("All Departments");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isGoogleSheetsSource, setIsGoogleSheetsSource] = useState(false);

  // Client-side fetch from /api/jobs to pick up any real-time Google Sheets changes
  useEffect(() => {
    let isMounted = true;
    async function syncJobs() {
      setIsSyncing(true);
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data.jobs) && data.jobs.length > 0) {
            setJobs(data.jobs);
            if (data.source === "google_sheets") {
              setIsGoogleSheetsSource(true);
            }
          }
        }
      } catch (err) {
        console.warn("[JOBS CLIENT] Falling back to default openings:", err);
      } finally {
        if (isMounted) setIsSyncing(false);
      }
    }

    syncJobs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute dynamic departments list from active jobs
  const departments = useMemo(() => {
    const depts = new Set<string>();
    jobs.forEach((job) => {
      if (job.department) depts.add(job.department);
    });
    return ["All Departments", ...Array.from(depts)];
  }, [jobs]);

  const filteredOpenings =
    activeDept === "All Departments"
      ? jobs
      : jobs.filter((job) => job.department === activeDept);

  return (
    <div id="openings" className="space-y-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prism-ice text-prism-primary text-xs font-semibold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Current Opportunities</span>
            </div>
            {isGoogleSheetsSource && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Cloud Sync
              </span>
            )}
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
          {isSyncing && (
            <RefreshCw className="w-3.5 h-3.5 text-slate-400 animate-spin" />
          )}
        </div>
      </div>

      {/* Department Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {departments.map((dept) => {
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
              {job.summary && (
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {job.summary}
                </p>
              )}

              {/* Expandable Details */}
              {isExpanded && (
                <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                  {job.responsibilities && job.responsibilities.length > 0 && (
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
                  )}

                  {job.requirements && job.requirements.length > 0 && (
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
                  )}
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
