'use client';

import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { Sparkles, Coffee, Shirt, Flame, ShoppingBag, Palette } from 'lucide-react';

const iconMap = {
  Sparkles,
  Coffee,
  Shirt,
  Flame,
  ShoppingBag,
  Palette
};

export const CategoryPills: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useShop();

  return (
    <div className="relative z-10 my-4 w-full overflow-hidden">
      {/* Gradient Fades for horizontal scroll */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-8 bg-gradient-to-r from-[#0E0E0D] to-transparent sm:w-12" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-8 bg-gradient-to-l from-[#0E0E0D] to-transparent sm:w-12" />

      <div className="no-scrollbar w-full overflow-x-auto whitespace-nowrap px-4 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 py-2">
          {CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.icon as keyof typeof iconMap] || Sparkles;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`tactile flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-tight transition-all duration-200 ${
                  isSelected
                    ? 'border border-amber-400 bg-amber-400 text-neutral-950 shadow-md scale-105'
                    : 'border border-white/12 bg-card/70 text-neutral-300 backdrop-blur-md hover:border-white/30 hover:bg-card hover:text-white'
                }`}
              >
                <IconComponent className={`h-3.5 w-3.5 ${isSelected ? 'text-neutral-950' : 'text-amber-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
