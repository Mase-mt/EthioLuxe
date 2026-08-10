'use client';

import React from 'react';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Star, Eye, ShoppingBag, Heart, MapPin } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    wishlist, 
    setQuickViewProduct 
  } = useShop();

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative flex flex-col rounded-[24px] border border-white/12 bg-card/80 p-2.5 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-card hover:shadow-2xl">
      
      {/* Aspect Ratio 4/3 Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-neutral-900">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover brightness-[1.03] transition-transform duration-700 group-hover:scale-108"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category / Tag Badge */}
        {product.tag ? (
          <span className="absolute top-2.5 left-2.5 z-10 rounded-full border border-amber-400/30 bg-black/60 px-2.5 py-0.5 backdrop-blur-md text-[10px] font-semibold text-amber-300">
            {product.tag}
          </span>
        ) : (
          <span className="absolute top-2.5 left-2.5 z-10 rounded-full border border-white/15 bg-black/50 px-2.5 py-0.5 backdrop-blur-md text-[10px] font-medium text-neutral-300">
            {product.categoryLabel}
          </span>
        )}

        {/* Quick Action Floating Buttons */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-90 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/20 backdrop-blur-md transition-colors ${
              isWishlisted 
                ? 'bg-amber-400 text-neutral-950 border-amber-400' 
                : 'bg-black/50 text-white hover:border-amber-400 hover:text-amber-300'
            }`}
            title="Wishlist"
          >
            <Heart className={`h-3.5 w-3.5 ${isWishlisted ? 'fill-neutral-950' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setQuickViewProduct(product)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:border-amber-400 hover:text-amber-300"
            title="Quick View"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Bottom Score & Origin Info inside image */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 backdrop-blur-md text-[11px] font-semibold text-amber-300 border border-white/10">
            <Star className="h-3 w-3 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-[10px] text-neutral-400">({product.reviewCount})</span>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-medium text-neutral-300 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-md border border-white/10">
            <MapPin className="h-2.5 w-2.5 text-amber-400" />
            <span className="line-clamp-1 max-w-[100px]">{product.origin.split(',')[0]}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3 flex flex-1 flex-col justify-between px-1 pb-1">
        <div>
          <h3 
            onClick={() => setQuickViewProduct(product)}
            className="cursor-pointer text-sm font-bold text-white transition-colors hover:text-amber-300 line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-neutral-400 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400">Price</span>
            <span className="text-sm font-extrabold text-amber-400">
              {formatPrice(product.priceETB, product.priceUSD)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300 transition-all hover:bg-amber-400 hover:text-neutral-950 active:scale-95"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

    </div>
  );
};
