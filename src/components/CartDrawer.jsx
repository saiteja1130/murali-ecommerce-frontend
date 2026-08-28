import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles, Tag, ShieldCheck } from 'lucide-react';
export const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onProceedToCheckout, promoCode, onApplyPromoCode, discountRate }) => {
    const [promoInput, setPromoInput] = useState('');
    const [promoMessage, setPromoMessage] = useState(null);
    if (!isOpen)
        return null;
    const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const freeShippingThreshold = 100;
    const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
    const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
    const discountAmount = subtotal * discountRate;
    const shippingCost = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 15.0;
    const total = subtotal - discountAmount + shippingCost;
    const handleApplyPromo = (e) => {
        e.preventDefault();
        if (!promoInput.trim())
            return;
        const success = onApplyPromoCode(promoInput.trim());
        if (success) {
            setPromoMessage({ text: 'Promo code SUMI15 applied (15% OFF)!', isError: false });
        }
        else {
            setPromoMessage({ text: 'Invalid promo code. Use SUMI15 for 15% off.', isError: true });
        }
    };
    return (<div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in" onClick={onClose}/>

      {/* Drawer Panel */}
      <div id="cart-slide-drawer" className="relative w-full max-w-md bg-[#F8F6F3] h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-slide-in-right">
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E8E3DE] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#1A1A1A]"/>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
              Your Shopping Bag
            </h3>
            <span className="px-2 py-0.5 bg-[#F8F6F3] text-xs font-semibold rounded-full border border-[#E8E3DE]">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button id="close-cart-drawer-btn" onClick={onClose} className="p-1.5 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-100 transition-colors" aria-label="Close cart">
            <X className="w-5 h-5"/>
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-[#E8D5D0]/30 px-6 py-3 border-b border-[#E8E3DE]">
          <div className="flex items-center justify-between text-xs font-medium text-[#1A1A1A] mb-1.5">
            {amountNeeded > 0 ? (<span>
                Add <strong className="text-[#1A1A1A]">₹{amountNeeded.toFixed(2)}</strong> more for <strong>FREE Global Shipping</strong>
              </span>) : (<span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A87C]"/>
                You&apos;ve unlocked Free Worldwide Shipping!
              </span>)}
            <span className="text-[11px] font-mono text-[#6B6B6B]">{progressPercent}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-[#E8E3DE] rounded-full overflow-hidden">
            <div className="h-full bg-[#C8A87C] transition-all duration-500 rounded-full" style={{ width: `${progressPercent}%` }}/>
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length > 0 ? (items.map((item) => (<div key={item.id} id={`cart-item-${item.id}`} className="bg-white p-3.5 rounded-[4px] border border-[#E8E3DE] flex gap-3.5 relative group shadow-2xs">
                {/* Thumbnail */}
                <img src={item.product.image} alt={item.product.name} className="w-18 h-22 object-cover rounded-xs bg-[#F4EFEA] flex-shrink-0"/>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-[#1A1A1A] leading-snug truncate">
                        {item.product.name}
                      </h4>
                      <button onClick={() => onRemoveItem(item.id)} className="text-neutral-400 hover:text-rose-600 p-1 transition-colors" aria-label="Remove item">
                        <Trash2 className="w-3.5 h-3.5"/>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#6B6B6B] mt-1">
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        Color:
                        <span className="w-2.5 h-2.5 rounded-full border border-neutral-300 inline-block" style={{ backgroundColor: item.selectedColor.hex }}/>
                        <strong>{item.selectedColor.name}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8E3DE]/60">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#E8E3DE] rounded-xs bg-[#F8F6F3]">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#1A1A1A] hover:bg-[#E8E3DE]" aria-label="Decrease quantity">
                        −
                      </button>
                      <span className="w-7 text-center text-xs font-semibold text-[#1A1A1A]">
                        {item.quantity}
                      </span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#1A1A1A] hover:bg-[#E8E3DE]" aria-label="Increase quantity">
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[#1A1A1A]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>))) : (<div className="py-16 text-center text-[#6B6B6B] flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-white border border-[#E8E3DE] flex items-center justify-center mb-4 text-neutral-400">
                <ShoppingBag className="w-6 h-6"/>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#1A1A1A] mb-1">
                Your bag is currently empty
              </h4>
              <p className="text-xs max-w-xs mb-6">
                Discover our curated new arrivals and timeless essentials to begin styling your wardrobe.
              </p>
              <button onClick={onClose} className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider transition-colors rounded-xs">
                Continue Shopping
              </button>
            </div>)}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (<div className="p-6 bg-white border-t border-[#E8E3DE] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"/>
                  <input id="promo-code-input" type="text" placeholder="Coupon (e.g. SUMI15)" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8F6F3] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] uppercase font-mono"/>
                </div>
                <button type="submit" className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors">
                  Apply
                </button>
              </div>

              {promoMessage && (<p className={`text-[11px] ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-700 font-medium'}`}>
                  {promoMessage.text}
                </p>)}
            </form>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#6B6B6B] pt-2 border-t border-[#E8E3DE]/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1A1A1A]">₹{subtotal.toFixed(2)}</span>
              </div>

              {discountRate > 0 && (<div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount ({promoCode || 'SUMI15'})</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>)}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>
                  {shippingCost === 0 ? (<strong className="text-emerald-700 uppercase tracking-wide">Free</strong>) : (`$₹{shippingCost.toFixed(2)}`)}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-[#1A1A1A] pt-2 border-t border-[#E8E3DE]">
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button id="proceed-checkout-btn" onClick={onProceedToCheckout} className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-xs transition-all shadow-md group">
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6B6B6B]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700"/>
              <span>Encrypted 256-bit SSL Secure Checkout</span>
            </div>
          </div>)}
      </div>
    </div>);
};
