'use client';

import React, { useState } from 'react';
import { Sparkles, MessageSquare, X, ChevronRight, Coffee, Heart, Flame } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const StoryConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const { setSelectedCategory, setSearchQuery } = useShop();

  const topics = [
    {
      id: 'coffee',
      title: '☕ Ethiopian Coffee Rituals',
      subtitle: 'Why Yirgacheffe & Sidamo are world-famous',
      icon: Coffee,
      content: 'Ethiopia is the birthplace of Arabica coffee. Coffee ceremonies feature three classic brewing rounds: Abol (first/strongest), Tona (second), and Baraka (blessing).',
      actionLabel: 'Explore Organic Coffees',
      actionCategory: 'coffee'
    },
    {
      id: 'attire',
      title: '👗 Habesha Kemis & Tibeb',
      subtitle: 'Understanding handwoven silk & cotton dresses',
      icon: Heart,
      content: 'Traditional Habesha Kemis dresses are handwoven from organic Shemma cotton in Shiromeda, Addis Ababa. The colorful woven margins are called Tibeb.',
      actionLabel: 'Shop Habesha Attire',
      actionCategory: 'attire'
    },
    {
      id: 'spices',
      title: '🌶️ The Secret of Berbere',
      subtitle: 'Sun-dried Mareko red peppers & Korerima',
      icon: Flame,
      content: 'Authentic Ethiopian Berbere is slow-ground with over 12 organic spices including Korerima (black cardamom), Besobela (sacred basil), and garlic.',
      actionLabel: 'View Gourmet Spices',
      actionCategory: 'spices'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Floating Action Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 rounded-full border border-amber-400/40 bg-[#161614]/90 px-4 py-3 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-amber-400"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-neutral-950">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold tracking-tight">Heritage Guide</span>
        </button>
      )}

      {/* Concierge Modal Window */}
      {isOpen && (
        <div className="relative w-80 sm:w-96 rounded-[28px] border border-white/20 bg-[#161614] p-5 text-white shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-neutral-950">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="font-serif text-sm font-bold">Ethiopian Heritage Concierge</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-neutral-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2.5">
            {topics.map((t) => (
              <div
                key={t.id}
                onClick={() => setActiveTopic(activeTopic === t.id ? null : t.id)}
                className={`cursor-pointer rounded-2xl border p-3 transition-all ${
                  activeTopic === t.id
                    ? 'border-amber-400 bg-neutral-900'
                    : 'border-white/10 bg-neutral-900/50 hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">{t.title}</span>
                  <ChevronRight className={`h-4 w-4 text-neutral-400 transition-transform ${activeTopic === t.id ? 'rotate-90 text-amber-400' : ''}`} />
                </div>
                <p className="mt-0.5 text-[11px] text-neutral-400">{t.subtitle}</p>

                {activeTopic === t.id && (
                  <div className="mt-2.5 pt-2 border-t border-white/10 space-y-2.5 animate-in fade-in duration-150">
                    <p className="text-xs text-neutral-300 leading-relaxed">{t.content}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(t.actionCategory);
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline"
                    >
                      <span>{t.actionLabel}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
