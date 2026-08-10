'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export const ProductGrid: React.FC = () => {
  const { products, selectedCategory, searchQuery, currency } = useShop();
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Filter products by category & search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return currency === 'ETB' ? a.priceETB - b.priceETB : a.priceUSD - b.priceUSD;
    }
    if (sortBy === 'price-desc') {
      return currency === 'ETB' ? b.priceETB - a.priceETB : b.priceUSD - a.priceUSD;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return (a.rank || 99) - (b.rank || 99);
  });

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-4">
      {/* Header bar with counter & sorting */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            Catalog Exploration
            <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs font-semibold text-amber-400 border border-white/10">
              {sortedProducts.length} Items
            </span>
          </h2>
          {searchQuery && (
            <p className="mt-1 text-xs text-neutral-400">
              Showing results for &quot;<span className="text-amber-300">{searchQuery}</span>&quot;
            </p>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs font-medium text-neutral-400 flex items-center gap-1.5">
            <ArrowUpDown className="h-3.5 w-3.5 text-amber-400" />
            Sort By:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-full border border-white/15 bg-card px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md outline-none focus:border-amber-400"
          >
            <option value="featured">Curated & Featured</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid Display */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800/80 text-amber-400 border border-white/10">
            <SlidersHorizontal className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-base font-bold text-white">No Ethiopian items found</h3>
          <p className="mt-1 text-xs text-neutral-400 max-w-sm">
            Try adjusting your search terms or switching to another category pill above.
          </p>
        </div>
      )}
    </section>
  );
};
