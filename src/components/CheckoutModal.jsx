import React, { useState } from 'react';
import { X, CheckCircle2, Truck, CreditCard, Lock, ArrowRight } from 'lucide-react';
export const CheckoutModal = ({ isOpen, onClose, items, subtotal, discountAmount, shippingCost, total, promoCode, onOrderComplete }) => {
    const [step, setStep] = useState('form');
    const [formData, setFormData] = useState({
        firstName: 'Eleanor',
        lastName: 'Vance',
        email: 'eleanor.vance@example.com',
        address: '742 Evergreen Terrace',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94107',
        cardNumber: '•••• •••• •••• 4242',
        expDate: '12/28',
        cvv: '•••'
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderId, setOrderId] = useState('');
    if (!isOpen)
        return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            const placedNumber = onOrderComplete ? onOrderComplete({
                shippingAddress: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    street: formData.address,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.postalCode,
                    country: 'United States'
                },
                paymentMethod: 'Credit Card (•••• 4242)'
            }) : `SMLX-${Math.floor(100000 + Math.random() * 900000)}`;
            setOrderId(placedNumber || `SMLX-${Math.floor(100000 + Math.random() * 900000)}`);
            setStep('success');
        }, 800);
    };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity" onClick={step === 'form' ? onClose : undefined}/>

      {/* Modal Card */}
      <div id="checkout-dialog-modal" className="relative bg-white w-full max-w-2xl rounded-[4px] shadow-2xl z-10 border border-[#E8E3DE] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-6 bg-[#F8F6F3] border-b border-[#E8E3DE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C8A87C]"/>
            <h3 className="font-serif text-lg md:text-xl font-bold text-[#1A1A1A]">
              {step === 'form' ? 'Express Secure Checkout' : 'Order Confirmed'}
            </h3>
          </div>
          {step === 'form' && (<button onClick={onClose} className="p-1.5 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-200">
              <X className="w-5 h-5"/>
            </button>)}
        </div>

        {step === 'form' ? (<form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Order Mini-Recap */}
            <div className="bg-[#F8F6F3] p-4 rounded-xs border border-[#E8E3DE] flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-[#1A1A1A]">
                  Order Total ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
                </span>
                {promoCode && (<span className="text-[#C8A87C] block text-[11px] font-mono">
                    Coupon: {promoCode} (15% OFF)
                  </span>)}
              </div>
              <span className="text-base font-bold text-[#1A1A1A]">₹{total.toFixed(2)}</span>
            </div>

            {/* Shipping Information */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C8A87C]"/>
                <span>1. Shipping Address</span>
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">First Name</label>
                  <input required type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-3 py-2 text-xs bg-white border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"/>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">Last Name</label>
                  <input required type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-3 py-2 text-xs bg-white border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"/>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">Email Address</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 text-xs bg-white border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"/>
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">Street Address</label>
                <input required type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-3 py-2 text-xs bg-white border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"/>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">City</label>
                  <input required type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-3 py-2 text-xs bg-white border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"/>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">State / Province</label>
                  <input required type="text" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full px-3 py-2 text-xs bg-white border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"/>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">ZIP / Postal</label>
                  <input required type="text" value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} className="w-full px-3 py-2 text-xs bg-white border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"/>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-3 pt-2 border-t border-[#E8E3DE]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#C8A87C]"/>
                <span>2. Payment Details</span>
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">Card Number</label>
                  <input required type="text" value={formData.cardNumber} onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })} className="w-full px-3 py-2 text-xs bg-white border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] font-mono"/>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">Expires (MM/YY)</label>
                    <input required type="text" value={formData.expDate} onChange={(e) => setFormData({ ...formData, expDate: e.target.value })} className="w-full px-3 py-2 text-xs bg-white border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] font-mono"/>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">CVV / CVC</label>
                    <input required type="text" value={formData.cvv} onChange={(e) => setFormData({ ...formData, cvv: e.target.value })} className="w-full px-3 py-2 text-xs bg-white border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] font-mono"/>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" disabled={isProcessing} className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50">
              {isProcessing ? (<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>) : (<>
                  <span>Place Order • ₹{total.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4"/>
                </>)}
            </button>
          </form>) : (
        /* Order Confirmation Screen */
        <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10"/>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C8A87C]">
                Order Reference #{orderId}
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                Thank You for Your Order
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-md mx-auto">
                We have received your order and dispatched confirmation to{' '}
                <strong className="text-[#1A1A1A]">{formData.email}</strong>. Your artisanal garments are being prepared with care.
              </p>
            </div>

            <div className="p-4 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE] text-left text-xs space-y-1.5 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Estimated Delivery:</span>
                <span className="font-semibold text-[#1A1A1A]">3–5 Business Days (Express)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Shipping To:</span>
                <span className="font-semibold text-[#1A1A1A]">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#E8E3DE]">
                <span className="text-[#6B6B6B]">Amount Paid:</span>
                <span className="font-bold text-[#1A1A1A]">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button onClick={() => {
                onClose();
                window.location.href = '/account/orders';
              }} className="w-full sm:w-auto px-6 py-3 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors cursor-pointer">
                View in My Orders →
              </button>
              <button onClick={onClose} className="w-full sm:w-auto px-6 py-3 bg-white border border-[#E8E3DE] hover:bg-[#F8F6F3] text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors cursor-pointer">
                Continue Shopping
              </button>
            </div>
          </div>)}
      </div>
    </div>);
};
