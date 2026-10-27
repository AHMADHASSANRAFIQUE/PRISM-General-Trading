"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Building2,
  RefreshCw,
  ArrowRight,
  UploadCloud,
  ChevronDown,
  ChevronUp,
  FileText,
  Mail,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { DEFAULT_OPENINGS, JobOpening } from "@/lib/jobsData";
import JobApplicationModal from "./JobApplicationModal";

export default function JobOpenings() {
  const [jobs, setJobs] = useState<JobOpening[]>(DEFAULT_OPENINGS);
  const [activeDept, setActiveDept] = useState("All Departments");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isGoogleSheetsSource, setIsGoogleSheetsSource] = useState(false);

  // Application Modal State
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobOpening | null>(null);

  // Client-side fetch from /api/jobs to pick up any real-time Google Sheets changes
  useEffect(() => {
    let isMounted = true;
    async function syncJobs() {
      setIsSyncing(true);
      try {
        const res = await fetch(`/api/jobs?t=${Date.now()}`, { cache: "no-store" });
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
        console.warn("[JOBS CLIENT] Sync status:", err);
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

  const handleOpenApplyModal = (job: JobOpening | null, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedJobForApply(job);
    setApplyModalOpen(true);
  };

  const toggleExpand = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

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
            Click on any position to view the full role description and submit your CV directly to our Talent Acquisition team.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500">
            {jobs.length > 0 ? (
              <>
                Showing <strong className="text-prism-charcoal">{filteredOpenings.length}</strong> active position{filteredOpenings.length === 1 ? "" : "s"}
              </>
            ) : (
              <span>0 active listings</span>
            )}
          </span>
          {isSyncing && (
            <RefreshCw className="w-3.5 h-3.5 text-slate-400 animate-spin" />
          )}
        </div>
      </div>

      {/* When NO active jobs are published */}
      {jobs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-8 sm:p-14 text-center max-w-3xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-prism-ice text-prism-primary flex items-center justify-center mx-auto shadow-sm">
            <Briefcase className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-serif font-bold text-prism-charcoal">
              No Public Openings at Present
            </h3>
            <p className="text-base text-slate-600 leading-relaxed font-normal max-w-xl mx-auto">
              There are currently no advertised positions on our portal. However, Prism General Trading continuously evaluates talented professionals across FMCG commercial sales, key accounts, brand marketing, and supply chain logistics.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleOpenApplyModal(null)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-prism-primary hover:bg-prism-blue text-white text-sm font-semibold transition-all shadow-md interactive-tap touch-target"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Submit Speculative CV</span>
            </button>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-sm font-semibold text-slate-700 transition-colors touch-target"
            >
              <span>Contact Talent Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* When Jobs exist */
        <>
          {/* Department Filter Pills */}
          {departments.length > 2 && (
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
          )}

          {/* Job Listings Cards */}
          <div className="space-y-6">
            {filteredOpenings.map((job) => {
              const isExpanded = expandedJobId === job.id;

              return (
                <div
                  key={job.id}
                  className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? "border-prism-primary/50 shadow-md ring-1 ring-prism-primary/20"
                      : "border-slate-200/90 shadow-subtle hover:shadow-hover hover:border-slate-300"
                  }`}
                >
                  {/* Card Header (Clickable to Expand / View Full Description) */}
                  <div
                    onClick={() => toggleExpand(job.id)}
                    className="p-6 sm:p-8 cursor-pointer select-none space-y-4 hover:bg-slate-50/50 transition-colors"
                  >
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
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-prism-charcoal flex items-center gap-2">
                          <span>{job.title}</span>
                        </h3>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0">
                        <button
                          type="button"
                          onClick={(e) => handleOpenApplyModal(job, e)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-prism-primary hover:bg-prism-blue text-white text-xs sm:text-sm font-semibold transition-all shadow-sm interactive-tap touch-target"
                        >
                          <UploadCloud className="w-4 h-4" />
                          <span>Apply & Upload CV</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(job.id);
                          }}
                          className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm font-medium text-slate-700 transition-colors touch-target"
                          aria-label={isExpanded ? "Collapse role description" : "Expand full role description"}
                        >
                          <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Summary Preview */}
                    {job.summary && (
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {job.summary}
                      </p>
                    )}
                  </div>

                  {/* Expanded Full Role Description */}
                  {isExpanded && (
                    <div className="px-6 pb-8 sm:px-8 border-t border-slate-100 bg-slate-50/40 pt-6 space-y-6 animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Key Responsibilities */}
                        {job.responsibilities && job.responsibilities.length > 0 && (
                          <div className="space-y-3.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-prism-primary flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-prism-primary" />
                              <span>Key Responsibilities & Scope</span>
                            </h4>
                            <ul className="space-y-2.5">
                              {job.responsibilities.map((resp, i) => (
                                <li key={i} className="text-sm text-slate-700 flex items-start gap-2.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-prism-primary mt-2 shrink-0" />
                                  <span className="leading-relaxed">{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Candidate Requirements */}
                        {job.requirements && job.requirements.length > 0 && (
                          <div className="space-y-3.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-prism-sky flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-prism-primary" />
                              <span>Candidate Qualifications</span>
                            </h4>
                            <ul className="space-y-2.5">
                              {job.requirements.map((req, i) => (
                                <li key={i} className="text-sm text-slate-700 flex items-start gap-2.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                                  <span className="leading-relaxed">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* In-Drawer Apply Call-To-Action Banner */}
                      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-prism-primary">
                            Ready to Join Prism General Trading?
                          </span>
                          <p className="text-xs sm:text-sm text-slate-600">
                            Upload your CV directly or submit your application to our recruitment committee.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleOpenApplyModal(job)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-prism-primary hover:bg-prism-blue text-white text-sm font-semibold transition-all shadow-md interactive-tap touch-target shrink-0"
                        >
                          <UploadCloud className="w-4 h-4" />
                          <span>Apply & Upload CV for {job.title}</span>
                        </button>
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

            <button
              onClick={() => handleOpenApplyModal(null)}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white text-prism-navy hover:bg-slate-100 text-sm font-semibold transition-all shadow-md shrink-0 interactive-tap touch-target"
            >
              <UploadCloud className="w-4 h-4 text-prism-primary" />
              <span>Upload Speculative CV</span>
            </button>
          </div>
        </>
      )}

      {/* CV Upload & Job Application Modal */}
      <JobApplicationModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        job={selectedJobForApply}
      />
    </div>
  );
}
