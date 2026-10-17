"use client";

import React, { useState, useEffect } from "react";
import { X, ShieldCheck } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-prism-navy/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-prism-primary">
            <ShieldCheck className="w-5 h-5" />
            <h2 id="privacy-modal-title" className="text-lg font-semibold text-prism-charcoal">
              Privacy Notice & Data Protection Policy
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Close privacy notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-prism-muted leading-relaxed">
          <p className="font-medium text-prism-charcoal">
            Prism General Trading (“Prism”, “we”, “our”, or “us”), Dubai, United Arab Emirates, is committed to safeguarding the privacy and confidentiality of personal data provided through this corporate website in accordance with UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection (PDPL).
          </p>

          <h3 className="font-semibold text-prism-charcoal text-base pt-2">1. Collection of Business & Personal Information</h3>
          <p>
            When you submit an enquiry via our website, we may collect your full name, organization/company name, professional email address, telephone number, and specific business enquiry details. We collect this information solely to assess, respond to, and process business development, trade, partnership, or career enquiries.
          </p>

          <h3 className="font-semibold text-prism-charcoal text-base pt-2">2. Lawful Basis and Purpose of Processing</h3>
          <p>
            Information submitted is processed strictly for the performance of preliminary communications, potential commercial agreements, or legitimate business interests relating to distribution, brand marketing, and regulatory facilitation within the UAE.
          </p>

          <h3 className="font-semibold text-prism-charcoal text-base pt-2">3. Data Confidentiality & Sharing</h3>
          <p>
            We do not sell, rent, or lease your personal or company data to third parties. Information may only be accessed by authorized commercial personnel at Prism General Trading responsible for managing relevant brand, customer, or employment relationships.
          </p>

          <h3 className="font-semibold text-prism-charcoal text-base pt-2">4. Data Security & Retention</h3>
          <p>
            We maintain technical, administrative, and physical measures designed to protect information from unauthorized access, disclosure, or destruction. Data is retained only for as long as required to fulfill the commercial purpose for which it was collected.
          </p>

          <h3 className="font-semibold text-prism-charcoal text-base pt-2">5. Your Rights and Inquiries</h3>
          <p>
            Under UAE data protection regulations, you have the right to request access, verification, correction, or deletion of your personal data held by Prism General Trading. To exercise these rights or for any privacy-related queries, please contact our team directly at{" "}
            <a href="mailto:info@prismintl.co" className="text-prism-blue font-medium underline hover:text-prism-primary">
              info@prismintl.co
            </a>.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-prism-primary hover:bg-prism-blue rounded-lg transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
