"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import { JobOpening } from "@/lib/jobsData";

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobOpening | null;
}

export default function JobApplicationModal({
  isOpen,
  onClose,
  job,
}: JobApplicationModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [applicationRef, setApplicationRef] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (uploadedFile: File) => {
    setErrorMessage(null);
    const allowed = [".pdf", ".doc", ".docx"];
    const ext = "." + uploadedFile.name.split(".").pop()?.toLowerCase();

    if (!allowed.includes(ext)) {
      setErrorMessage("Please upload a valid CV document (PDF, DOC, or DOCX).");
      return;
    }

    if (uploadedFile.size > 10 * 1024 * 1024) {
      setErrorMessage("File exceeds 10MB limit. Please upload a smaller document.");
      return;
    }

    setFile(uploadedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!file) {
      setErrorMessage("Please upload your CV document to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("jobTitle", job ? job.title : "General Speculative Application");
      formData.append("jobId", job ? job.id : "general");
      formData.append("coverNote", coverNote.trim());
      formData.append("cv", file);

      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setIsSuccess(true);
      setApplicationRef(data.applicationRef || "RECEIVED");
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please email info@prismintl.co.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setErrorMessage(null);
    setFile(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setCoverNote("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-prism-navy/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Backdrop overlay for outside click */}
      <div className="fixed inset-0" onClick={resetAndClose} aria-hidden="true" />

      {/* Modal Dialog with strict max-height and internal scrolling */}
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90dvh] my-auto z-10 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinned Header */}
        <div className="bg-gradient-to-r from-prism-navy via-[#112240] to-prism-charcoal text-white p-5 sm:p-6 flex items-start justify-between shrink-0 border-b border-white/10">
          <div className="space-y-1.5 pr-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-prism-sky text-[11px] font-semibold tracking-wider uppercase">
              <Briefcase className="w-3 h-3" />
              <span>{job ? job.department : "Talent Application"}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
              {job ? `Apply for ${job.title}` : "Submit Speculative Application"}
            </h3>
            <p className="text-xs text-slate-300">
              Direct submission to Prism General Trading Talent Acquisition.
            </p>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-7 overflow-y-auto overscroll-contain flex-1">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-serif font-bold text-prism-charcoal">
                  Application Submitted
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong className="text-prism-charcoal">{fullName}</strong>! Your CV for the{" "}
                  <strong className="text-prism-primary">{job ? job.title : "talent roster"}</strong> has been securely delivered to our HR department.
                </p>
                {applicationRef && (
                  <p className="text-xs text-slate-400 font-mono pt-1">
                    Reference ID: <span className="text-slate-700 font-bold">{applicationRef}</span>
                  </p>
                )}
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-500 max-w-md mx-auto">
                Our commercial recruitment team reviews profiles continually and will contact shortlisted candidates directly for interviews.
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-8 py-3 rounded-xl bg-prism-primary text-white text-sm font-semibold hover:bg-prism-blue transition-colors shadow-sm"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tariq Mansoor"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-prism-primary/30 focus:border-prism-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-prism-primary/30 focus:border-prism-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Phone / WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+971 50 123 4567"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-prism-primary/30 focus:border-prism-primary"
                />
              </div>

              {/* Optional Cover Note */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  <span>Brief Introduction / Note</span>
                  <span className="text-slate-400 font-normal">Optional</span>
                </label>
                <textarea
                  rows={2}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Share a short note on your UAE experience, notice period, or key qualifications..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-prism-primary/30 focus:border-prism-primary resize-none"
                />
              </div>

              {/* File Upload Zone */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Upload CV / Resume <span className="text-red-500">*</span>
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="cv-file-upload"
                />

                {!file ? (
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 ${
                      dragActive
                        ? "border-prism-primary bg-prism-ice/40"
                        : "border-slate-300 hover:border-prism-primary hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center space-y-1.5">
                      <div className="w-9 h-9 rounded-xl bg-prism-ice text-prism-primary flex items-center justify-center">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-prism-charcoal">
                          Click to browse or drag & drop your CV here
                        </p>
                        <p className="text-[11px] text-slate-500">
                          PDF, DOC, or DOCX (Max 10MB)
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 rounded-xl bg-prism-primary/10 text-prism-primary flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-prism-charcoal truncate">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono">
                          {Math.round(file.size / 1024)} KB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Security Note */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Your information is handled securely according to our privacy guidelines.</span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs sm:text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-prism-primary hover:bg-prism-blue text-white text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Application & CV</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
