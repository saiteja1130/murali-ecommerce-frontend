import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Sparkles, ShieldCheck, Tag, ArrowLeft, Truck, RotateCcw, Gift } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
export const CartPage = ({ items, onUpdateQuantity, onRemoveItem, onClearCart, onProceedToCheckout, promoCode, onApplyPromoCode, discountRate, allProducts, onAddToCart, onToggleWishlist, wishlistIds }) => {
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);
  const [orderNote, setOrderNote] = useState('');
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 100;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const discountAmount = subtotal * discountRate;
  const shippingCost = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 15.0;
  const giftWrapCost = isGiftWrap ? 5.0 : 0;
  const total = subtotal - discountAmount + shippingCost + giftWrapCost;
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim())
      return;
    const success = onApplyPromoCode(promoInput.trim());
    if (success) {
      setPromoMessage({ text: 'Promo code SUMI15 applied (15% OFF)!', isError: false });
    }
    else {
      setPromoMessage({ text: 'Invalid promo code. Use code SUMI15 for 15% off.', isError: true });
    }
  };
  const recommendedProducts = allProducts.filter((p) => p.isFeatured || p.badge === 'BESTSELLER').slice(0, 4);
  return (<div className="min-h-screen bg-[#F8F6F3] py-8 lg:py-12 animate-fade-in">
    <div className="max-w-7xl mx-auto px-5">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E3DE] mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-2">
            <button onClick={() => navigate('/')} className="hover:text-[#1A1A1A]">Home</button>
            <span>/</span>
            <span className="text-[#1A1A1A] font-semibold">Shopping Bag</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            Your Shopping Bag
          </h1>
        </div>

        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#C8A87C] self-start sm:self-auto">
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {items.length > 0 ? (<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Free Shipping Progress Meter */}
          <div className="bg-[#E8D5D0]/30 p-4 sm:p-5 rounded-[4px] border border-[#E8E3DE]">
            <div className="flex items-center justify-between text-xs font-medium text-[#1A1A1A] mb-2">
              {amountNeeded > 0 ? (<span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C8A87C]" />
                <span>
                  Add <strong className="text-[#1A1A1A]">₹{amountNeeded.toFixed(2)}</strong> more to qualify for <strong>Complimentary Worldwide Shipping</strong>
                </span>
              </span>) : (<span className="flex items-center gap-2 text-emerald-800 font-semibold">
                <Sparkles className="w-4 h-4 text-[#C8A87C]" />
                <span>Congratulations! You have unlocked Free Global Express Shipping.</span>
              </span>)}
              <span className="font-mono text-xs text-[#6B6B6B]">{progressPercent}%</span>
            </div>

            <div className="w-full h-2 bg-[#E8E3DE] rounded-full overflow-hidden">
              <div className="h-full bg-[#C8A87C] transition-all duration-500 rounded-full" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {/* Items Table Container */}
          <div className="bg-white rounded-[4px] border border-[#E8E3DE] overflow-hidden shadow-2xs">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-[#F8F6F3] border-b border-[#E8E3DE] text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
              <div className="col-span-6">Garment & Specification</div>
              <div className="col-span-2 text-center">Unit Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>

            {/* Items List */}
            <div className="divide-y divide-[#E8E3DE]">
              {items.map((item) => (<div key={item.id} className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Product Thumbnail & Details (Col 6) */}
                <div className="sm:col-span-6 flex gap-4">
                  <img src={item.product.image} alt={item.product.name} onClick={() => navigate(`/product/${item.product.id}`)} className="w-20 h-26 object-cover rounded-xs bg-[#F4EFEA] flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity" />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C8A87C]">
                        {item.product.category}
                      </span>
                      <h3 onClick={() => navigate(`/product/${item.product.id}`)} className="font-serif text-sm sm:text-base font-bold text-[#1A1A1A] hover:text-[#C8A87C] cursor-pointer truncate">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-[#6B6B6B] mt-1">
                        <span>Size: <strong className="text-[#1A1A1A]">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          Color:
                          <span className="w-2.5 h-2.5 rounded-full border border-neutral-300 inline-block" style={{ backgroundColor: item.selectedColor.hex }} />
                          <strong className="text-[#1A1A1A]">{item.selectedColor.name}</strong>
                        </span>
                      </div>
                    </div>

                    <button onClick={() => onRemoveItem(item.id)} className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-rose-600 transition-colors self-start mt-2">
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Unit Price (Col 2) */}
                <div className="sm:col-span-2 text-left sm:text-center text-xs font-semibold text-[#1A1A1A]">
                  <span className="sm:hidden text-[#6B6B6B] font-normal mr-2">Price:</span>
                  ₹{item.product.price.toFixed(2)}
                </div>

                {/* Quantity Stepper (Col 2) */}
                <div className="sm:col-span-2 flex items-center sm:justify-center">
                  <span className="sm:hidden text-xs text-[#6B6B6B] mr-2">Quantity:</span>
                  <div className="flex items-center border border-[#E8E3DE] rounded-xs bg-[#F8F6F3]">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#1A1A1A] hover:bg-[#E8E3DE]" aria-label="Decrease">
                      −
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#1A1A1A]">
                      {item.quantity}
                    </span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#1A1A1A] hover:bg-[#E8E3DE]" aria-label="Increase">
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal (Col 2) */}
                <div className="sm:col-span-2 text-left sm:text-right font-serif text-sm sm:text-base font-bold text-[#1A1A1A]">
                  <span className="sm:hidden text-xs font-sans text-[#6B6B6B] font-normal mr-2">Total:</span>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>))}
            </div>

            {/* Table Footer Actions */}
            <div className="p-4 bg-[#F8F6F3] border-t border-[#E8E3DE] flex items-center justify-between">
              <button onClick={onClearCart} className="text-xs text-neutral-500 hover:text-rose-600 font-medium transition-colors">
                Clear All Items
              </button>

              <button onClick={() => navigate('/')} className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#C8A87C]">
                + Add More Items
              </button>
            </div>
          </div>

          {/* Order Notes & Gift Box */}
          <div className="bg-white p-5 rounded-[4px] border border-[#E8E3DE] space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
              <Gift className="w-4 h-4 text-[#C8A87C]" />
              <span>Complimentary Gift Packaging & Personal Note</span>
            </div>

            <label className="flex items-center gap-2.5 text-xs text-[#1A1A1A] cursor-pointer">
              <input type="checkbox" checked={isGiftWrap} onChange={(e) => setIsGiftWrap(e.target.checked)} className="rounded border-[#E8E3DE] text-[#C8A87C] focus:ring-[#C8A87C]" />
              <span>Include signature embossed black gift box & satin ribbon (+₹150.00)</span>
            </label>

            <div>
              <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">
                Special Instructions / Handwritten Gift Card Note
              </label>
              <textarea rows={2} value={orderNote} onChange={(e) => setOrderNote(e.target.value)} placeholder="Enter your personalized greeting message or special courier delivery instructions..." className="w-full px-3 py-2 text-xs bg-[#F8F6F3] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]" />
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-[4px] border border-[#E8E3DE] shadow-xs space-y-5 sticky top-24">
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] pb-4 border-b border-[#E8E3DE]">
              Order Summary
            </h3>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] block">
                Promotional Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input type="text" placeholder="SUMI15" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} className="w-full pl-8 pr-3 py-2 text-xs bg-[#F8F6F3] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] uppercase font-mono" />
                </div>
                <button type="submit" className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-bold uppercase rounded-xs transition-colors">
                  Apply
                </button>
              </div>

              {promoMessage && (<p className={`text-[11px] ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-700 font-medium'}`}>
                {promoMessage.text}
              </p>)}
            </form>

            {/* Summary Lines */}
            <div className="space-y-2.5 text-xs text-[#6B6B6B] pt-4 border-t border-[#E8E3DE]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#1A1A1A]">₹{subtotal.toFixed(2)}</span>
              </div>

              {discountRate > 0 && (<div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount ({promoCode || 'SUMI15'})</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>)}

              {isGiftWrap && (<div className="flex justify-between text-[#1A1A1A]">
                <span>Luxury Gift Packaging</span>
                <span>₹150.00</span>
              </div>)}

              <div className="flex justify-between">
                <span>Worldwide Express Shipping</span>
                <span>
                  {shippingCost === 0 ? (<strong className="text-emerald-700 uppercase tracking-wide">Complimentary</strong>) : (`$₹{shippingCost.toFixed(2)}`)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Duties & Taxes</span>
                <span className="text-neutral-500">Calculated at checkout</span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#1A1A1A] pt-4 border-t border-[#E8E3DE]">
                <span>Estimated Total</span>
                <span className="font-serif text-xl">₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button id="cart-page-checkout-btn" onClick={onProceedToCheckout} className="w-full py-4 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-xs transition-all shadow-md group">
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Security Assurances */}
            <div className="pt-3 border-t border-[#E8E3DE] space-y-2 text-[11px] text-[#6B6B6B]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>256-bit SSL Secure Checkout Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-700" />
                <span>30-Day Hassle-Free Returns with Prepaid Label</span>
              </div>
            </div>
          </div>
        </div>
      </div>) : (
        /* Empty Cart State */
        <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-12 text-center max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#F8F6F3] border border-[#E8E3DE] flex items-center justify-center mx-auto text-neutral-400">
            <ShoppingBag className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Your Shopping Bag is Empty
            </h2>
            <p className="text-xs text-[#6B6B6B] max-w-md mx-auto">
              Explore our curated architectural tailoring, certified organic cotton essentials, and Italian leather accessories to begin styling your wardrobe.
            </p>
          </div>

          <button onClick={() => navigate('/')} className="px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-bold uppercase tracking-widest rounded-xs transition-colors shadow-md">
            Discover Seasonal Collections
          </button>
        </div>)}

      {/* Recommended Items Carousel at Bottom */}
      <section className="pt-16 mt-16 border-t border-[#E8E3DE]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A87C]">
              Curated Recommendations
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mt-1">
              You May Also Admire
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((prod) => (<ProductCard key={prod.id} product={prod} onAddToCart={(p) => onAddToCart(p)} onToggleWishlist={(p) => onToggleWishlist(p)} isWishlisted={wishlistIds.includes(prod.id)} onClickProduct={(p) => navigate(`/product/${p.id}`)} />))}
        </div>
      </section>
    </div>
  </div>);
};
