import React, { useState } from 'react';
import { X, CheckCircle2, Truck, CreditCard, Lock, ArrowRight } from 'lucide-react';

export const CheckoutModal = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discountAmount,
  shippingCost,
  total,
  promoCode,
  onOrderComplete,
  currentUser,
}) => {
  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState({
    firstName: currentUser?.name?.split(' ')[0] || '',
    lastName: currentUser?.name?.split(' ')[1] || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const placedNumber = onOrderComplete
        ? onOrderComplete({
            shippingAddress: {
              name: `${formData.firstName} ${formData.lastName}`.trim() || currentUser?.name || 'Customer',
              street: formData.address,
              city: formData.city,
              state: formData.state,
              postalCode: formData.postalCode,
              country: formData.country || 'India',
              phone: formData.phone || currentUser?.phone || '',
            },
            paymentMethod: 'Credit Card',
          })
        : `SMLX-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(placedNumber || `SMLX-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep('success');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={step === 'form' ? onClose : undefined}
      />

      {/* Modal Card */}
      <div
        id="checkout-dialog-modal"
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl z-10 border border-[#E8E4DC] overflow-hidden animate-fade-in text-[#1D241C]"
      >
        {/* Header */}
        <div className="p-6 bg-[#FAF8F5] border-b border-[#E8E4DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#506040]" />
            <h3 className="font-serif text-lg md:text-xl font-bold text-[#1D241C]">
              {step === 'form' ? 'Quick Checkout' : 'Order Confirmed'}
            </h3>
          </div>
          {step === 'form' && (
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Delivery Address */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D241C] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#506040]" />
                <span>1. Delivery Address</span>
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-[#687163] block mb-1">First Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-[#687163] block mb-1">Last Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-[#687163] block mb-1">Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-[#687163] block mb-1">Phone Number *</label>
                  <input
                    required
                    type="tel"
                    placeholder="10-digit mobile"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#687163] block mb-1">Street Address *</label>
                <input
                  required
                  type="text"
                  placeholder="Flat, House No., Building, Street"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-[#687163] block mb-1">City *</label>
                  <input
                    required
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-[#687163] block mb-1">State *</label>
                  <input
                    required
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-[#687163] block mb-1">PIN Code *</label>
                  <input
                    required
                    type="text"
                    placeholder="6-digit PIN"
                    pattern="[0-9]{6}"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-3 pt-2 border-t border-[#E8E4DC]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D241C] flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#506040]" />
                <span>2. Payment Details</span>
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-[#687163] block mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="16-digit card number"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-[#687163] block mb-1">Expires (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expDate}
                      onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#687163] block mb-1">CVV</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Place Order • ₹{Number(total || 0).toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Order Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#506040]">
                Order Reference #{orderId}
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1D241C]">
                Thank You for Your Order
              </h2>
              <p className="text-xs sm:text-sm text-[#687163] max-w-md mx-auto">
                We have received your order and dispatched confirmation to{' '}
                <strong className="text-[#1D241C]">{formData.email}</strong>.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E4DC] text-left text-xs space-y-1.5 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-[#687163]">Estimated Delivery:</span>
                <span className="font-semibold text-[#1D241C]">3–5 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#687163]">Shipping To:</span>
                <span className="font-semibold text-[#1D241C]">
                  {formData.address}, {formData.city}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#E8E4DC]">
                <span className="text-[#687163]">Amount Paid:</span>
                <span className="font-bold text-[#1D241C]">₹{Number(total || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  window.location.href = '/account/orders';
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
              >
                View in My Orders →
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-white border border-[#E8E4DC] hover:bg-[#FAF8F5] text-[#1D241C] text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
