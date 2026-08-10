'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, MapPin, ShoppingBag, Check, ShieldCheck, Heart } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    wishlist 
  } = useShop();

  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = wishlist.includes(product.id);
  const currentImage = activeImage || product.image;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-black/80 animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div 
        className="relative flex w-full max-w-4xl max-h-[90vh] flex-col overflow-y-auto rounded-[32px] border border-white/20 bg-[#141412] p-6 text-white shadow-2xl no-scrollbar md:flex-row md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-neutral-900/80 text-neutral-300 backdrop-blur-md transition-colors hover:border-amber-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Gallery Column */}
        <div className="flex flex-col md:w-1/2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-neutral-900 border border-white/10">
            <img
              src={currentImage}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 rounded-full border border-amber-400/40 bg-black/70 px-3 py-1 backdrop-blur-md text-xs font-semibold text-amber-300">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="mt-3 flex gap-2.5 overflow-x-auto">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(imgUrl)}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition-all ${
                    currentImage === imgUrl ? 'border-amber-400 scale-105' : 'border-white/15 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="mt-6 flex flex-col justify-between md:mt-0 md:w-1/2 md:pl-8">
          <div>
            {/* Category & Origin */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <span>{product.categoryLabel}</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-neutral-300">
                <MapPin className="h-3 w-3 text-amber-400" />
                <span>{product.origin}</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="mt-2 text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {product.name}
            </h2>

            {/* Rating & Stock */}
            <div className="mt-3 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="h-4 w-4 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-neutral-400">({product.reviewCount} customer reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="h-4 w-4" />
                <span>Authentic Ethiopian Origin</span>
              </div>
            </div>

            {/* Price Tag */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-amber-400">
                {formatPrice(product.priceETB, product.priceUSD)}
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/10 pt-4">
              {product.description}
            </p>

            {/* Specs Details List */}
            {product.details && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-neutral-900/60 p-3.5 text-xs">
                <h4 className="font-semibold text-amber-300 mb-2 uppercase tracking-wider text-[10px]">
                  Product Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-neutral-300">
                  {Object.entries(product.details).map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-[10px] text-neutral-400">{key}:</span>
                      <span className="font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row (Quantity & Add to Cart) */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-neutral-400">Quantity:</span>
              <div className="flex items-center rounded-full border border-white/20 bg-neutral-900 px-3 py-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-lg font-bold text-neutral-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 text-sm font-extrabold text-amber-400">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-lg font-bold text-neutral-400 hover:text-white"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                  isWishlisted 
                    ? 'border-amber-400 bg-amber-400 text-neutral-950' 
                    : 'border-white/20 bg-neutral-900 text-white hover:border-amber-400'
                }`}
                title="Wishlist"
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-neutral-950' : ''}`} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 py-3 text-sm font-extrabold text-neutral-950 shadow-lg transition-transform hover:bg-amber-300 active:scale-98"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add {quantity} to Cart ({formatPrice(product.priceETB * quantity, product.priceUSD * quantity)})</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
