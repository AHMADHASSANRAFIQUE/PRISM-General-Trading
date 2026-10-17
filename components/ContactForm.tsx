"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send, Mail, ShieldCheck } from "lucide-react";
import PrivacyModal from "./PrivacyModal";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    telephone: "",
    enquiryType: "Brand Partnership",
    message: "",
    privacyAgreed: false,
    honeypot: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [enquiryId, setEnquiryId] = useState<string | null>(null);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      if (checked) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next.privacyAgreed;
          return next;
        });
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (fieldErrors[name]) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    }
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = "Please provide a valid business email address.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Please enter your message (at least 10 characters).";
    } else if (formData.message.length > 3000) {
      errors.message = "Message exceeds the maximum limit of 3,000 characters.";
    }

    if (!formData.privacyAgreed) {
      errors.privacyAgreed = "You must acknowledge and accept the privacy notice to submit.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerErrorMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      setEnquiryId(data.enquiryId || null);
      setSubmitSuccess(true);
    } catch (err: any) {
      setServerErrorMessage(
        err.message ||
          "An unexpected error occurred. Please contact us directly at info@prismintl.co."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div
        role="region"
        aria-live="polite"
        className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-8 sm:p-12 text-center animate-fade-in space-y-5"
      >
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-bold text-slate-900">
            Enquiry Received
          </h3>
          <p className="text-base text-slate-700 max-w-md mx-auto leading-relaxed">
            Thank you for contacting Prism General Trading. Your enquiry has been received.
          </p>
          {enquiryId && (
            <p className="text-xs font-mono text-slate-500 pt-1">
              Reference ID: {enquiryId}
            </p>
          )}
        </div>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              setSubmitSuccess(false);
              setEnquiryId(null);
              setFormData({
                fullName: "",
                company: "",
                email: "",
                telephone: "",
                enquiryType: "Brand Partnership",
                message: "",
                privacyAgreed: false,
                honeypot: "",
              });
              setFieldErrors({});
            }}
            className="px-6 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prism-blue"
          >
            Submit Another Enquiry
          </button>
          <a
            href="mailto:info@prismintl.co"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-prism-primary rounded-lg hover:bg-prism-blue transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prism-blue"
          >
            <Mail className="w-4 h-4" />
            <span>EMAIL US</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-card space-y-6"
        noValidate
        aria-label="General Business Enquiry Form"
      >
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-serif font-bold text-prism-charcoal">
            Send Us an Enquiry
          </h2>
          <p className="mt-1 text-sm text-prism-muted">
            Tell us a little about your business and how we can assist. We will direct your enquiry to the appropriate contact.
          </p>
        </div>

        {/* Honeypot Spam Protection */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_url">Website URL (leave blank)</label>
          <input
            id="website_url"
            name="honeypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={handleChange}
          />
        </div>

        {/* Global Server Error Announcement */}
        {serverErrorMessage && (
          <div
            role="alert"
            className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-800 text-sm animate-fade-in"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600" />
            <div>
              <strong className="font-semibold">Notice: </strong>
              <span>{serverErrorMessage}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="fullName"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Full name <span className="text-rose-500" aria-label="required">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.fullName}
              aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
              maxLength={100}
              placeholder="e.g. David Vance"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border text-sm text-slate-900 placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prism-blue transition-all ${
                fieldErrors.fullName ? "border-rose-400 bg-rose-50/20" : "border-slate-300"
              }`}
            />
            {fieldErrors.fullName && (
              <p id="fullName-error" className="text-xs text-rose-600 mt-1">
                {fieldErrors.fullName}
              </p>
            )}
          </div>

          {/* Company / Organization */}
          <div className="space-y-1.5">
            <label
              htmlFor="company"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Company / organization
            </label>
            <input
              id="company"
              name="company"
              type="text"
              maxLength={120}
              placeholder="e.g. Healthcare Laboratories Ltd"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prism-blue transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Email Address */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Email address <span className="text-rose-500" aria-label="required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              maxLength={120}
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border text-sm text-slate-900 placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prism-blue transition-all ${
                fieldErrors.email ? "border-rose-400 bg-rose-50/20" : "border-slate-300"
              }`}
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-xs text-rose-600 mt-1">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Telephone */}
          <div className="space-y-1.5">
            <label
              htmlFor="telephone"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Telephone <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="telephone"
              name="telephone"
              type="tel"
              maxLength={40}
              placeholder="+971 50 123 4567"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prism-blue transition-all"
            />
          </div>
        </div>

        {/* Enquiry Type Dropdown */}
        <div className="space-y-1.5">
          <label
            htmlFor="enquiryType"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            Type of enquiry <span className="text-rose-500" aria-label="required">*</span>
          </label>
          <select
            id="enquiryType"
            name="enquiryType"
            value={formData.enquiryType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prism-blue transition-all cursor-pointer"
          >
            <option value="Brand Partnership">Brand Partnership</option>
            <option value="Trade & Distribution">Trade & Distribution</option>
            <option value="Careers">Careers</option>
            <option value="General">General</option>
          </select>
        </div>

        {/* Message with Character Counter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="message"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Message <span className="text-rose-500" aria-label="required">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              {formData.message.length} / 3000
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            rows={5}
            maxLength={3000}
            placeholder="Please summarize your product category, commercial goals, or specific enquiry..."
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border text-sm text-slate-900 placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prism-blue transition-all resize-y ${
              fieldErrors.message ? "border-rose-400 bg-rose-50/20" : "border-slate-300"
            }`}
          />
          {fieldErrors.message && (
            <p id="message-error" className="text-xs text-rose-600 mt-1">
              {fieldErrors.message}
            </p>
          )}
        </div>

        {/* Privacy Checkbox */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-start gap-3">
            <input
              id="privacyAgreed"
              name="privacyAgreed"
              type="checkbox"
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.privacyAgreed}
              aria-describedby={fieldErrors.privacyAgreed ? "privacy-error" : undefined}
              checked={formData.privacyAgreed}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-prism-primary focus-visible:ring-2 focus-visible:ring-prism-blue cursor-pointer"
            />
            <label htmlFor="privacyAgreed" className="text-xs text-slate-600 leading-normal cursor-pointer">
              I acknowledge that the information provided will be used by Prism General Trading to respond to this commercial enquiry in accordance with the{" "}
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="text-prism-blue font-semibold underline hover:text-prism-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-prism-blue rounded"
              >
                website privacy notice
              </button>
              . <span className="text-rose-500" aria-label="required">*</span>
            </label>
          </div>
          {fieldErrors.privacyAgreed && (
            <p id="privacy-error" className="text-xs text-rose-600 pl-7">
              {fieldErrors.privacyAgreed}
            </p>
          )}
        </div>

        {/* Submit Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-semibold text-white bg-prism-primary hover:bg-prism-blue rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prism-blue focus-visible:ring-offset-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>SEND ENQUIRY</span>
              </>
            )}
          </button>

          <a
            href="mailto:info@prismintl.co"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-prism-primary transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-prism-blue rounded"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>EMAIL US (info@prismintl.co)</span>
          </a>
        </div>
      </form>

      <PrivacyModal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
    </>
  );
}
