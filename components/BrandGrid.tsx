"use client";

import React from "react";
import Image from "next/image";

export interface BrandItem {
  id: string;
  name: string;
  logoSrc?: string;
  isCustomBadge?: boolean;
}

export const APPROVED_BRANDS: BrandItem[] = [
  { id: "myra-e", name: "Myra E", logoSrc: "/images/brands/myra-e.png" },
  { id: "biogesic", name: "Biogesic", logoSrc: "/images/brands/biogesic.jpeg" },
  { id: "ceelin", name: "Ceelin", logoSrc: "/images/brands/ceelin.png" },
  { id: "enervon", name: "Enervon", isCustomBadge: true },
  { id: "brilliant-skin", name: "Brilliant Skin Essentials", logoSrc: "/images/brands/brilliant-skin.png" },
  { id: "katinko", name: "Katinko", logoSrc: "/images/brands/katinko.png" },
  { id: "belo", name: "Belo", logoSrc: "/images/brands/belo.png" },
  { id: "green-cross", name: "Green Cross", logoSrc: "/images/brands/green-cross.png" },
  { id: "zonrox", name: "Zonrox", logoSrc: "/images/brands/zonrox.jpeg" },
  { id: "del", name: "Del", logoSrc: "/images/brands/del.jpeg" },
];

export default function BrandGrid() {
  return (
    <div className="w-full">
      {/* Museum-Grade Responsive Brand Logo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-6">
        {APPROVED_BRANDS.map((brand) => (
          <div
            key={brand.id}
            className="group relative flex flex-col items-center justify-between p-6 bg-white rounded-2xl border border-slate-200/90 shadow-subtle hover:border-prism-sky/50 hover:shadow-hover transition-all duration-300 min-h-[170px] text-center"
          >
            {/* Soft Ambient Radial Light on Hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-prism-ice/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Brand Logo Container */}
            <div className="relative w-full h-20 flex items-center justify-center my-auto">
              {brand.logoSrc ? (
                <Image
                  src={brand.logoSrc}
                  alt={`${brand.name} official brand mark`}
                  width={160}
                  height={80}
                  className="max-h-16 w-auto max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                /* Editorial Typographic Badge for Enervon */
                <div className="flex flex-col items-center justify-center px-4 py-2.5 border border-amber-600/30 bg-amber-50/50 rounded-xl group-hover:border-amber-600 group-hover:bg-amber-100/60 transition-all duration-300">
                  <span className="font-sans font-black tracking-wider text-amber-700 text-lg uppercase">
                    ENERVON<sup className="text-[10px] ml-0.5 font-normal">®</sup>
                  </span>
                  <span className="text-[9px] tracking-widest text-amber-800/70 uppercase font-semibold">
                    Multivitamins
                  </span>
                </div>
              )}
            </div>

            {/* Clean Brand Name Label */}
            <div className="relative mt-2 pt-3 border-t border-slate-100 w-full text-center">
              <span className="text-xs font-semibold text-slate-700 group-hover:text-prism-primary transition-colors block truncate">
                {brand.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
