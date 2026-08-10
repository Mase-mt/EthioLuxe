'use client';

import React, { useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, Star, ArrowRight, MapPin } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    searchQuery, 
    setSearchQuery, 
    products, 
    formatPrice, 
    setQuickViewProduct 
  } = useShop();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const matches = searchQuery.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.origin.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 backdrop-blur-xl bg-black/80 animate-in fade-in duration-150">
      
      <div 
        className="absolute inset-0"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/20 bg-[#161614] text-white shadow-2xl z-10">
        
        {/* Search input header */}
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <Search className="h-5 w-5 text-amber-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Ethiopian coffee, Habesha kemis, berbere spice, crafts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-neutral-500 hover:text-white"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="rounded-full p-1 text-neutral-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 no-scrollbar space-y-2">
          <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            {searchQuery ? `Search Matches (${matches.length})` : 'Popular Ethiopian Products'}
          </div>

          {matches.length > 0 ? (
            matches.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setQuickViewProduct(product);
                  setIsSearchOpen(false);
                }}
                className="group flex cursor-pointer items-center justify-between rounded-2xl border border-transparent p-2.5 transition-all hover:border-amber-400/30 hover:bg-neutral-900"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded-xl object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      {product.name}
                    </h4>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-neutral-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-amber-400" />
                        {product.origin.split(',')[0]}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-amber-400 font-medium">
                        <Star className="h-3 w-3 fill-amber-400" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-amber-400">
                    {formatPrice(product.priceETB, product.priceUSD)}
                  </span>
                  <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          ) : (
            <p className="py-8 text-center text-xs text-neutral-400">
              No results found for &quot;{searchQuery}&quot;.
            </p>
          )}
        </div>

      </div>

    </div>
  );
};
