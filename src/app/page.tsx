'use client';

import React from 'react';
import { CategoryPills } from '../components/CategoryPills';
import { HeroRail } from '../components/HeroRail';
import { ProductGrid } from '../components/ProductGrid';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Coffee } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 pt-2 sm:pt-4">
      
      {/* Hero Welcome Banner */}
      <section className="mx-4 sm:mx-6 lg:mx-8 relative overflow-hidden rounded-[32px] border border-white/12 bg-gradient-to-br from-[#1A1A18] via-[#141412] to-[#0E0E0D] p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 backdrop-blur-md text-xs font-bold text-amber-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Habesha Heritage & Luxury E-Commerce</span>
          </div>

          <h1 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
            Authentic Ethiopian <br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent italic">
              Crafts, Coffee & Attire
            </span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
            Sourced directly from Yirgacheffe coffee estates, Shiromeda master weavers, and historic Lalibela artisans. Experience world-class Ethiopian products delivered to your doorstep.
          </p>

          {/* Quick Value Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-300 pt-4 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-amber-400" />
              <span>Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>100% Genuine Origin</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="h-4 w-4 text-amber-400" />
              <span>Telebirr & Chapa Supported</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Navigation Bar */}
      <CategoryPills />

      {/* Phonofilm Style Trending Featured Rail */}
      <HeroRail />

      {/* Full Catalog Product Grid */}
      <ProductGrid />

      {/* Footer */}
      <footer className="mt-16 mx-4 sm:mx-6 lg:mx-8 border-t border-white/10 pt-10 pb-8 text-xs text-neutral-400">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30">
              <Coffee className="h-4 w-4" />
            </div>
            <span className="font-serif font-bold text-white text-base">EthioLuxe Marketplace</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 text-neutral-400">
            <span>Payment Options:</span>
            <span className="rounded bg-neutral-900 border border-white/10 px-2 py-0.5 text-sky-400 font-bold">telebirr</span>
            <span className="rounded bg-neutral-900 border border-white/10 px-2 py-0.5 text-emerald-400 font-bold">Chapa</span>
            <span className="rounded bg-neutral-900 border border-white/10 px-2 py-0.5 text-purple-400 font-bold">CBE Birr</span>
            <span className="rounded bg-neutral-900 border border-white/10 px-2 py-0.5 text-white font-bold">Visa / Mastercard</span>
          </div>

          <p className="text-[11px] text-neutral-500" suppressHydrationWarning>
            © 2026 EthioLuxe. Crafted with Ethiopian pride.
          </p>
        </div>
      </footer>

    </div>
  );
}
