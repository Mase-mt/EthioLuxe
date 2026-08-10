'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Currency = 'ETB' | 'USD';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  currency: Currency;
  selectedCategory: string;
  searchQuery: string;
  quickViewProduct: Product | null;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isCheckoutOpen: boolean;
  appliedPromo: { code: string; discountPct: number } | null;
  isMounted: boolean;
  
  // Actions
  setCurrency: (c: Currency) => void;
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  setQuickViewProduct: (p: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  applyPromoCode: (code: string) => boolean;
  
  // Computed
  cartTotalETB: number;
  cartTotalUSD: number;
  discountedTotalETB: number;
  discountedTotalUSD: number;
  itemCount: number;
  formatPrice: (priceETB: number, priceUSD: number) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currency, setCurrency] = useState<Currency>('ETB');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPct: number } | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Load initial cart & wishlist from localStorage on client
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCart = localStorage.getItem('ethio_luxe_cart');
      const savedWishlist = localStorage.getItem('ethio_luxe_wishlist');
      const savedCurr = localStorage.getItem('ethio_luxe_currency');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedCurr === 'ETB' || savedCurr === 'USD') setCurrency(savedCurr);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('ethio_luxe_cart', JSON.stringify(cart));
      localStorage.setItem('ethio_luxe_wishlist', JSON.stringify(wishlist));
      localStorage.setItem('ethio_luxe_currency', currency);
    } catch (e) {
      console.error(e);
    }
  }, [cart, wishlist, currency]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ETHIO10' || clean === 'HABESHA10') {
      setAppliedPromo({ code: clean, discountPct: 10 });
      return true;
    } else if (clean === 'VIP20') {
      setAppliedPromo({ code: clean, discountPct: 20 });
      return true;
    }
    return false;
  };

  const cartTotalETB = cart.reduce((sum, item) => sum + (item.product.priceETB * item.quantity), 0);
  const cartTotalUSD = cart.reduce((sum, item) => sum + (item.product.priceUSD * item.quantity), 0);
  
  const discountMultiplier = appliedPromo ? (100 - appliedPromo.discountPct) / 100 : 1;
  const discountedTotalETB = cartTotalETB * discountMultiplier;
  const discountedTotalUSD = cartTotalUSD * discountMultiplier;

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (priceETB: number, priceUSD: number) => {
    if (currency === 'ETB') {
      return `${priceETB.toLocaleString()} ETB`;
    }
    return `$${priceUSD.toFixed(2)}`;
  };

  return (
    <ShopContext.Provider value={{
      products: PRODUCTS,
      cart,
      wishlist,
      currency,
      selectedCategory,
      searchQuery,
      quickViewProduct,
      isCartOpen,
      isSearchOpen,
      isCheckoutOpen,
      appliedPromo,
      isMounted,
      
      setCurrency,
      setSelectedCategory,
      setSearchQuery,
      setQuickViewProduct,
      setIsCartOpen,
      setIsSearchOpen,
      setIsCheckoutOpen,
      
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      applyPromoCode,
      
      cartTotalETB,
      cartTotalUSD,
      discountedTotalETB,
      discountedTotalUSD,
      itemCount,
      formatPrice
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
