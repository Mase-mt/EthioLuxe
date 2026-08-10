'use client';

import React from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../data/products';
import { Star, Eye, ShoppingBag, Heart, ArrowRight } from 'lucide-react';

export const HeroRail: React.FC = () => {
  const { 
    products, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    wishlist, 
    setQuickViewProduct 
  } = useShop();

  const featured = products.filter(p => p.featured).slice(0, 4);

  return (
    <section className="mb-10 w-full px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
            Curated Treasures
          </h2>
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs font-medium text-amber-400">
            Ethiopian Masterpieces
          </span>
        </div>
      </div>

      {/* Horizontal Rail */}
      <div className="no-scrollbar flex overflow-x-auto scroll-smooth py-2">
        <div className="flex gap-4 sm:gap-5">
          {featured.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="group relative flex w-[80vw] max-w-[320px] shrink-0 flex-col rounded-[26px] border border-white/12 bg-card p-2 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-2xl sm:w-[300px] lg:w-[270px] xl:w-[290px]"
              >
                {/* Image Container with 16/10 aspect ratio */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-neutral-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover brightness-[1.04] transition-transform duration-700 group-hover:scale-108"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Tag Badge */}
                  {product.tag && (
                    <span className="absolute top-3 left-3 z-10 rounded-full border border-amber-400/30 bg-black/60 px-2.5 py-0.5 backdrop-blur-md text-[11px] font-semibold text-amber-300">
                      {product.tag}
                    </span>
                  )}

                  {/* Quick Action Floating Buttons */}
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-90 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/20 backdrop-blur-md transition-colors ${
                        isWishlisted 
                          ? 'bg-amber-400 text-neutral-950 border-amber-400' 
                          : 'bg-black/50 text-white hover:border-amber-400 hover:text-amber-300'
                      }`}
                      title="Add to Wishlist"
                    >
                      <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-neutral-950' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(product)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:border-amber-400 hover:text-amber-300"
                      title="Quick View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Rank Numeral Overlay & Title */}
                  <div className="absolute inset-x-3.5 bottom-3 flex items-end gap-3">
                    <span className="rank-numeral shrink-0 select-none">
                      {product.rank || 1}
                    </span>
                    <div className="min-w-0 flex-1 pb-1">
                      <h3 className="line-clamp-1 text-sm font-bold text-white drop-shadow-md">
                        {product.name}
                      </h3>
                      <div className="mt-0.5 flex items-center justify-between text-xs font-semibold text-neutral-300">
                        <span className="text-amber-300">
                          {formatPrice(product.priceETB, product.priceUSD)}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-amber-400">
                          <Star className="h-3 w-3 fill-amber-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="mt-2.5 flex items-center justify-between px-2 pb-1">
                  <span className="line-clamp-1 text-[11px] text-neutral-400">
                    📍 {product.origin}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 transition-all hover:bg-amber-400 hover:text-neutral-950"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
