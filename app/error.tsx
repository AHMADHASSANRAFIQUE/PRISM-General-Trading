"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error on client without exposing internal details to visitor
    console.error("[PRISM CLIENT ERROR]", error.message);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
      <div className="max-w-xl w-full text-center space-y-8 bg-white border border-slate-200/80 rounded-2xl p-8 sm:p-12 shadow-card">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-rose-600">
            System Notice
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-prism-charcoal">
            An Unexpected Error Occurred
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
            We apologize for the inconvenience. Our technical team has been notified. You can try refreshing the page or navigating back to the homepage.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-prism-primary hover:bg-prism-blue rounded-xl transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
