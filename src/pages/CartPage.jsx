import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Sparkles, ShieldCheck, Tag, ArrowLeft, Truck, RotateCcw, AlertCircle } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { resolveImageUrl } from '../utils/productAdapter';

export const CartPage = ({
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  promoCode: propPromoCode,
  onApplyPromoCode,
  discountRate: propDiscountRate = 0,
  allProducts = [],
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const navigate = useNavigate();
  const {
    freeShippingThreshold = 5000,
    shippingCost = 30,
    shippingFee = 30,
    cartSubtotal,
    cartTotal,
    discountAmount: ctxDiscountAmount,
    discountRate: ctxDiscountRate,
    promoCode: ctxPromoCode,
    applyPromoCode,
    storeSettings
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [orderNote, setOrderNote] = useState('');

  const activePromoCode = propPromoCode || ctxPromoCode;
  const activeDiscountRate = propDiscountRate || ctxDiscountRate || 0;

  const hasOutOfStockItems = items.some((item) => item.product?.isStockAvailable === false);

  // Subtotal only sums in-stock items
  const subtotal = cartSubtotal !== undefined
    ? cartSubtotal
    : items.reduce((acc, item) => {
        if (item.product?.isStockAvailable === false) return acc;
        return acc + (Number(item.product.price) || 0) * item.quantity;
      }, 0);

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const discountAmount = ctxDiscountAmount !== undefined ? ctxDiscountAmount : (subtotal * activeDiscountRate);
  const calculatedShipping = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : (shippingCost !== undefined ? shippingCost : shippingFee);
  const total = subtotal > 0 ? subtotal - discountAmount + calculatedShipping : 0;

  const handleApplyPromo = async (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    setIsApplyingPromo(true);
    let result;
    if (onApplyPromoCode) {
      result = await onApplyPromoCode(promoInput.trim());
    } else {
      result = await applyPromoCode(promoInput.trim());
    }
    setIsApplyingPromo(false);

    if (result && (result === true || result.success)) {
      setPromoMessage({ text: result.message || 'Promo applied successfully!', isError: false });
    } else {
      setPromoMessage({
        text: result?.message || `Invalid promo code. Try using ${storeSettings?.promoCode || 'SUMI15'}`,
        isError: true
      });
    }
  };

  const recommendedProducts = allProducts.filter((p) => p.isFeatured || p.badge === 'BESTSELLER').slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 lg:py-12 animate-fade-in text-[#1D241C]">
      <div className="max-w-7xl mx-auto px-5">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DC] mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#687163] uppercase tracking-wider mb-1 font-mono">
              <span className="cursor-pointer hover:text-[#1D241C]" onClick={() => navigate('/')}>Home</span>
              <span>/</span>
              <span className="text-[#1D241C] font-semibold">Shopping Bag</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1D241C] tracking-tight flex items-center gap-3">
              <span>Shopping Bag</span>
              <span className="text-base md:text-lg font-sans font-normal text-[#687163]">
                ({items.reduce((acc, i) => acc + i.quantity, 0)} {items.length === 1 ? 'item' : 'items'})
              </span>
            </h1>
          </div>

          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1D241C] hover:text-[#C69E58] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {items.length === 0 ? (
          /* Empty Bag State */
          <div className="bg-white rounded-[4px] border border-[#E8E4DC] p-12 text-center max-w-xl mx-auto my-12 shadow-2xs space-y-6">
            <div className="w-20 h-20 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto text-[#C69E58]">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-[#1D241C]">
                Your Shopping Bag is Empty
              </h2>
              <p className="text-sm text-[#687163] max-w-sm mx-auto">
                Looks like you haven't added any luxury pieces to your cart yet.
              </p>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-bold uppercase tracking-widest transition-all rounded-xs shadow-md cursor-pointer"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Active Cart Workspace */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Progress Meter */}
              <div className="bg-white p-5 rounded-[4px] border border-[#E8E4DC] shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1D241C]">
                  {amountNeeded > 0 ? (
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#C69E58]" />
                      <span>
                        Add <strong className="text-[#1D241C]">₹{amountNeeded.toFixed(2)}</strong> more to qualify for <strong>Free Shipping</strong>
                      </span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-emerald-800 font-bold">
                      <Sparkles className="w-4 h-4 text-[#C69E58]" />
                      <span>Congratulations! You have unlocked Free Shipping!</span>
                    </span>
                  )}
                  <span className="font-mono text-[#687163]">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-[#FAF8F5] border border-[#E8E4DC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C69E58] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items Table / Cards */}
              <div className="bg-white rounded-[4px] border border-[#E8E4DC] overflow-hidden shadow-2xs divide-y divide-[#E8E4DC]">
                {items.map((item) => (
                  <div
                    key={item.id}
                    id={`cart-item-${item.id}`}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between hover:bg-[#FAF8F5]/40 transition-colors"
                  >
                    {/* Item Image & Details */}
                    <div className="flex gap-4 items-start sm:items-center">
                      <img
                        src={resolveImageUrl(item.product?.image || item.product?.images?.[0])}
                        alt={item.product?.name || 'Product'}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900';
                        }}
                        className="w-20 h-26 object-cover rounded-xs bg-[#FAF8F5] border border-[#E8E4DC] flex-shrink-0"
                      />
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#C69E58]">
                          {item.product.category || 'Luxury Haute'}
                        </span>
                        <h3 className="font-serif text-base font-bold text-[#1D241C] leading-snug">
                          {item.product.name}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-[#687163] pt-0.5">
                          <span>Size: <strong className="text-[#1D241C]">{item.selectedSize}</strong></span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            Color:
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-neutral-300 inline-block"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <strong className="text-[#1D241C]">{item.selectedColor.name}</strong>
                          </span>
                        </div>

                        {/* Out of Stock Warning Tag */}
                        {item.product?.isStockAvailable === false && (
                          <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold rounded-xs">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>Unavailable • Out of stock</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity Modifier & Subtotal */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E8E4DC]">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#E8E4DC] rounded-xs bg-[#FAF8F5]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#1D241C] hover:bg-[#E8E4DC] transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold font-mono text-[#1D241C]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={item.product?.isStockAvailable === false}
                          className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#1D241C] hover:bg-[#E8E4DC] transition-colors cursor-pointer disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right min-w-[90px]">
                        <span className="font-sans text-base font-bold text-[#1D241C] block">
                          ₹{((item.product.price || 0) * item.quantity).toFixed(2)}
                        </span>
                        <span className="text-[11px] text-[#687163] font-mono block">
                          ₹{(item.product.price || 0).toFixed(2)} each
                        </span>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#687163] hover:text-rose-600 p-1.5 transition-colors cursor-pointer"
                        title="Remove piece"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Cart Action Buttons */}
                <div className="p-4 bg-[#FAF8F5] flex items-center justify-between">
                  <button
                    onClick={onClearCart}
                    className="text-xs font-semibold uppercase tracking-wider text-rose-700 hover:text-rose-900 transition-colors cursor-pointer"
                  >
                    Clear Shopping Bag
                  </button>
                  <button
                    onClick={() => navigate('/products')}
                    className="text-xs font-semibold uppercase tracking-wider text-[#1D241C] hover:text-[#C69E58] cursor-pointer"
                  >
                    + Add More Items
                  </button>
                </div>
              </div>

              {/* Delivery Instructions Note */}
              <div className="bg-white p-5 rounded-[4px] border border-[#E8E4DC] space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1D241C] block">
                  Delivery Notes / Special Instructions
                </label>
                <textarea
                  rows={2}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Enter any delivery instructions for our courier partners..."
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xs focus:outline-none focus:border-[#C69E58]"
                />
              </div>
            </div>

            {/* Right Column: Order Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-[4px] border border-[#E8E4DC] shadow-xs space-y-5 sticky top-24">
                <h3 className="font-serif text-xl font-bold text-[#1D241C] pb-4 border-b border-[#E8E4DC]">
                  Order Summary
                </h3>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#1D241C] block">
                    Promotional Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        placeholder={storeSettings?.promoCode || 'SUMI15'}
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xs focus:outline-none focus:border-[#C69E58] uppercase font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isApplyingPromo}
                      className="px-4 py-2 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-bold uppercase rounded-xs transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isApplyingPromo ? 'Applying...' : 'Apply'}
                    </button>
                  </div>

                  {promoMessage && (
                    <p className={`text-[11px] ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-700 font-medium'}`}>
                      {promoMessage.text}
                    </p>
                  )}
                </form>

                {/* Summary Lines */}
                <div className="space-y-2.5 text-xs text-[#687163] pt-4 border-t border-[#E8E4DC]">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-[#1D241C]">₹{subtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Discount ({activePromoCode || storeSettings?.promoCode || 'PROMO'})</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {calculatedShipping === 0 ? (
                        <strong className="text-emerald-700 uppercase tracking-wide">Free</strong>
                      ) : (
                        `₹${Number(calculatedShipping).toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-sans font-bold text-[#1D241C] pt-3 border-t border-[#E8E4DC]">
                    <span>Total Amount</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Out of Stock Warning */}
                {hasOutOfStockItems && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xs font-medium space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-700" />
                      <span>Out-of-Stock Items in Bag</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      One or more items in your cart are currently unavailable. Please remove them to proceed with checkout.
                    </p>
                  </div>
                )}

                {/* Proceed to Checkout CTA */}
                <button
                  onClick={onProceedToCheckout}
                  disabled={hasOutOfStockItems}
                  className={`w-full py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-xs transition-all shadow-md group ${
                    hasOutOfStockItems
                      ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed shadow-none'
                      : 'bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] cursor-pointer'
                  }`}
                >
                  <span>{hasOutOfStockItems ? 'Remove Unavailable Items' : 'Proceed to Checkout'}</span>
                  {!hasOutOfStockItems && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                </button>

                {/* Trust & Guarantee */}
                <div className="pt-2 border-t border-[#E8E4DC] space-y-2 text-[11px] text-[#687163]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>256-Bit SSL Encrypted & Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-[#C69E58]" />
                    <span>Complimentary 14-day hassle-free returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* You May Also Like / Curated Recommendations */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#E8E4DC]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C69E58] block">
                  Curated Haute Additions
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#1D241C]">
                  Complete Your Look
                </h2>
              </div>
              <button
                onClick={() => navigate('/products')}
                className="text-xs font-semibold uppercase tracking-wider text-[#1D241C] hover:text-[#C69E58] cursor-pointer"
              >
                View Full Collection →
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
