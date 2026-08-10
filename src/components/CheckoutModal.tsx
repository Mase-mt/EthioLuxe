'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, CheckCircle2, ShieldCheck, CreditCard, Smartphone, Building2, Sparkles, Truck } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    clearCart, 
    formatPrice, 
    discountedTotalETB, 
    discountedTotalUSD 
  } = useShop();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'telebirr' | 'chapa' | 'cbe' | 'card'>('telebirr');
  
  // Form fields
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Addis Ababa',
    address: '',
  });

  const [orderId, setOrderId] = useState<string>('ETH-749201');

  if (!isCheckoutOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    setOrderId(`ETH-${Math.floor(100000 + Math.random() * 900000)}`);
    setStep('confirmed');
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-black/85 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-xl rounded-[32px] border border-white/20 bg-[#141412] p-6 text-white shadow-2xl overflow-hidden sm:p-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-neutral-900 text-neutral-300 transition-colors hover:border-amber-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* STEP 1: Customer Details */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Truck className="h-4 w-4" />
                <span>Step 1 of 2: Shipping & Delivery</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">Delivery Address</h2>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Abebe Bikila"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-neutral-900 p-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="+251 911 234 567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-neutral-900 p-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">City / Region</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-neutral-900 p-2.5 text-xs text-white outline-none focus:border-amber-400"
                  >
                    <option value="Addis Ababa">Addis Ababa</option>
                    <option value="Bole">Bole, Addis Ababa</option>
                    <option value="Kazanchis">Kazanchis, Addis Ababa</option>
                    <option value="Hawassa">Hawassa</option>
                    <option value="Dire Dawa">Dire Dawa</option>
                    <option value="International Shipping">International Shipping (DHL/FedEx)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Detailed Street Address / Landmark</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. House No. 452, Near Friendship Heights"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-neutral-900 p-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase">Order Total</span>
                <p className="text-base font-extrabold text-amber-400">
                  {formatPrice(discountedTotalETB, discountedTotalUSD)}
                </p>
              </div>
              <button
                type="submit"
                className="rounded-full bg-amber-400 px-6 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment Selection */}
        {step === 'payment' && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <CreditCard className="h-4 w-4" />
                <span>Step 2 of 2: Select Local Payment Method</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">Payment Gateway</h2>
            </div>

            <div className="space-y-2.5 pt-1">
              
              {/* Telebirr Option */}
              <div
                onClick={() => setPaymentMethod('telebirr')}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 backdrop-blur-md transition-all ${
                  paymentMethod === 'telebirr'
                    ? 'border-amber-400 bg-amber-400/10'
                    : 'border-white/15 bg-neutral-900/60 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 font-extrabold text-xs">
                    telebirr
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Telebirr Mobile Payment</h4>
                    <p className="text-[11px] text-neutral-400">Instant Ethio Telecom QR & USSD Pay</p>
                  </div>
                </div>
                <div className={`h-4 w-4 rounded-full border ${paymentMethod === 'telebirr' ? 'border-amber-400 bg-amber-400' : 'border-white/30'}`} />
              </div>

              {/* Chapa Option */}
              <div
                onClick={() => setPaymentMethod('chapa')}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 backdrop-blur-md transition-all ${
                  paymentMethod === 'chapa'
                    ? 'border-amber-400 bg-amber-400/10'
                    : 'border-white/15 bg-neutral-900/60 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-extrabold text-xs">
                    Chapa
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Chapa Ethiopia Gateway</h4>
                    <p className="text-[11px] text-neutral-400">Cards, CBE Birr, Telebirr & Amole</p>
                  </div>
                </div>
                <div className={`h-4 w-4 rounded-full border ${paymentMethod === 'chapa' ? 'border-amber-400 bg-amber-400' : 'border-white/30'}`} />
              </div>

              {/* CBE Birr Option */}
              <div
                onClick={() => setPaymentMethod('cbe')}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 backdrop-blur-md transition-all ${
                  paymentMethod === 'cbe'
                    ? 'border-amber-400 bg-amber-400/10'
                    : 'border-white/15 bg-neutral-900/60 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">CBE Birr / Commercial Bank</h4>
                    <p className="text-[11px] text-neutral-400">Direct account transfer & CBE mobile app</p>
                  </div>
                </div>
                <div className={`h-4 w-4 rounded-full border ${paymentMethod === 'cbe' ? 'border-amber-400 bg-amber-400' : 'border-white/30'}`} />
              </div>

              {/* International Card Option */}
              <div
                onClick={() => setPaymentMethod('card')}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 backdrop-blur-md transition-all ${
                  paymentMethod === 'card'
                    ? 'border-amber-400 bg-amber-400/10'
                    : 'border-white/15 bg-neutral-900/60 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">International Credit / Debit Card</h4>
                    <p className="text-[11px] text-neutral-400">Visa, Mastercard & American Express</p>
                  </div>
                </div>
                <div className={`h-4 w-4 rounded-full border ${paymentMethod === 'card' ? 'border-amber-400 bg-amber-400' : 'border-white/30'}`} />
              </div>

            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-neutral-400 hover:text-white"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleCompleteOrder}
                className="rounded-full bg-amber-400 px-6 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors shadow-lg"
              >
                Pay {formatPrice(discountedTotalETB, discountedTotalUSD)} Now
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Order Confirmed Screen */}
        {step === 'confirmed' && (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-4 animate-bounce">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Ameseginalehu! Order Confirmed 🎉</h2>
            <p className="mt-2 text-xs text-neutral-300 max-w-sm leading-relaxed">
              Your order has been placed successfully via <strong className="text-amber-400 uppercase">{paymentMethod}</strong>.
              We are preparing your authentic Ethiopian goods for delivery to <strong className="text-amber-300">{formData.city}</strong>.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-900 p-4 text-xs w-full text-left space-y-1">
              <div className="flex justify-between text-neutral-400">
                <span>Order Reference:</span>
                <span className="font-mono text-amber-300 font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Customer:</span>
                <span className="text-white">{formData.fullName || 'Valued Customer'}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Status:</span>
                <span className="text-emerald-400 font-bold">Processing Dispatch</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="mt-6 rounded-full bg-amber-400 px-8 py-3 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
