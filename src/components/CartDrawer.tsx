'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    currency, 
    formatPrice, 
    cartTotalETB, 
    cartTotalUSD,
    discountedTotalETB,
    discountedTotalUSD,
    appliedPromo,
    applyPromoCode,
    setIsCheckoutOpen
  } = useShop();

  const [promoInput, setPromoInput] = useState<string>('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoMessage({ text: 'Promo code ETHIO10 applied (10% OFF)!', isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: 'Invalid code. Try "ETHIO10" for 10% off.', isError: true });
    }
  };

  // Free shipping threshold: 5,000 ETB or $40 USD
  const freeThresholdETB = 5000;
  const currentTotalETB = cartTotalETB;
  const freeProgressPct = Math.min(100, Math.round((currentTotalETB / freeThresholdETB) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden backdrop-blur-md bg-black/70 animate-in fade-in duration-200">
      <div 
        className="absolute inset-0" 
        onClick={() => setIsCartOpen(false)} 
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-white/15 bg-[#141412] text-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-amber-400" />
              <h2 className="font-serif text-lg font-bold">Shopping Cart</h2>
              <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-xs font-bold text-amber-300">
                {cart.length} items
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-neutral-900/80 px-6 py-3 border-b border-white/10 text-xs">
            <div className="flex items-center justify-between text-neutral-300 mb-1 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-amber-400" />
                {freeProgressPct >= 100 ? (
                  <span className="text-emerald-400 font-bold">🎉 You qualify for FREE Nationwide Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-amber-300">{formatPrice(freeThresholdETB - currentTotalETB, (freeThresholdETB - currentTotalETB)/125)}</strong> for free shipping
                  </span>
                )}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300" 
                style={{ width: `${freeProgressPct}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-3.5 rounded-2xl border border-white/10 bg-neutral-900/60 p-3 backdrop-blur-md transition-all hover:border-white/20"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover border border-white/10"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="line-clamp-1 text-xs font-bold text-white">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-neutral-500 hover:text-rose-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-neutral-400">
                        📍 {item.product.origin.split(',')[0]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-extrabold text-amber-400">
                        {formatPrice(item.product.priceETB * item.quantity, item.product.priceUSD * item.quantity)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center rounded-full border border-white/15 bg-neutral-800 px-2 py-0.5 text-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-1.5 font-bold text-neutral-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold text-white">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-1.5 font-bold text-neutral-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <ShoppingBag className="h-12 w-12 text-neutral-600 mb-3" />
                <p className="text-sm font-bold text-neutral-300">Your cart is empty</p>
                <p className="text-xs text-neutral-500 mt-1">Explore our Ethiopian coffee, Habesha dresses, and spices!</p>
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-white/10 bg-neutral-900/90 p-6 space-y-3">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. ETHIO10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full rounded-full border border-white/15 bg-neutral-800 py-1.5 pl-8 pr-3 text-xs text-white placeholder-neutral-500 outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-400 hover:text-neutral-950 transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] font-semibold ${promoMessage.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {promoMessage.text}
                </p>
              )}

              {/* Price Calculation Summary */}
              <div className="space-y-1 text-xs text-neutral-300 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotalETB, cartTotalUSD)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount ({appliedPromo.code} -{appliedPromo.discountPct}%)</span>
                    <span>-{formatPrice(cartTotalETB * (appliedPromo.discountPct/100), cartTotalUSD * (appliedPromo.discountPct/100))}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-amber-400 text-base">
                    {formatPrice(discountedTotalETB, discountedTotalUSD)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 py-3.5 text-sm font-extrabold text-neutral-950 shadow-xl transition-all hover:bg-amber-300 active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 pt-1">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                <span>Protected by 256-bit Encrypted Local Payment Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
