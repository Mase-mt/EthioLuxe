'use client';

import React from 'react';
import { useShop } from '../context/ShopContext';
import { Search, ShoppingBag, Heart, Sparkles, Globe, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currency, 
    setCurrency, 
    itemCount, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen,
    isMounted
  } = useShop();

  const activeCurrency = isMounted ? currency : 'ETB';
  const wishlistCount = isMounted ? wishlist.length : 0;
  const cartCount = isMounted ? itemCount : 0;

  return (
    <header className="sticky top-0 z-40 w-full pt-4 pb-2 transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <a href="#" className="group flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
            Ethio<span className="text-amber-400 italic font-medium ml-0.5">Luxe</span>
          </span>
        </a>

        {/* Central Search Bar Trigger (Phonofilm style pill bar) */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="group flex w-full items-center justify-between rounded-full border border-white/15 bg-card/80 px-5 py-2.5 backdrop-blur-md transition-all duration-300 hover:border-amber-400/40 hover:bg-card"
          >
            <div className="flex items-center gap-3 text-sm text-neutral-400 group-hover:text-neutral-200">
              <Search className="h-4 w-4 text-amber-400/80" />
              <span>Search Ethiopian coffee, Habesha kemis, berbere...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center rounded border border-white/20 bg-neutral-800 px-2 text-[10px] font-medium text-neutral-400">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions (Currency Toggle, Mobile Search, Wishlist, Cart) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-card/80 text-neutral-200 transition-colors hover:border-white/40"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Currency Switcher */}
          <div className="relative inline-flex rounded-full border border-white/15 bg-card/80 p-0.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setCurrency('ETB')}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-tight transition-all ${
                activeCurrency === 'ETB'
                  ? 'bg-amber-400 text-neutral-950 shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>🇪🇹 ETB</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-tight transition-all ${
                activeCurrency === 'USD'
                  ? 'bg-amber-400 text-neutral-950 shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>🇺🇸 USD</span>
            </button>
          </div>

          {/* Wishlist Count Badge */}
          <div className="relative">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-card/80 text-neutral-200 backdrop-blur-md transition-colors hover:border-amber-400/40 hover:text-amber-400"
              title="Saved Items"
            >
              <Heart className={`h-4 w-4 ${wishlistCount > 0 ? 'fill-amber-400 text-amber-400' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-neutral-950">
                  {wishlistCount}
                </span>
              )}
            </button>
          </div>

          {/* Shopping Cart Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex h-10 items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 text-amber-300 backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:bg-amber-500/20"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline text-xs font-semibold">Cart</span>
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[11px] font-bold text-neutral-950">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </nav>
    </header>
  );
};
