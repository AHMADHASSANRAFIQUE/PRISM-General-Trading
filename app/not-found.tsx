import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
      <div className="max-w-xl w-full text-center space-y-8 bg-white border border-slate-200/80 rounded-2xl p-8 sm:p-12 shadow-card">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-prism-primary">
            404 — Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-prism-charcoal">
            The Requested Page Could Not Be Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
            The page you are looking for may have been moved, renamed, or is currently unavailable. Please return to the homepage or explore our main corporate sections.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-prism-primary hover:bg-prism-blue rounded-xl transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/contact-us"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Prism</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
