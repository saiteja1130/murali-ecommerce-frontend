import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Lock,
  Truck,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Gift,
  ChevronRight,
  Tag,
  Clock,
  Globe,
  MapPin,
  Check,
  Building,
  UserCheck
} from 'lucide-react';

export const CheckoutPage = ({
  items,
  onClearCart,
  promoCode,
  onApplyPromoCode,
  discountRate,
  onPlaceOrder,
  currentUser,
  addresses = []
}) => {
  const navigate = useNavigate();

  // Form State
  const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(defaultAddr?.phone || currentUser?.phone || '');
  const [saveInfo, setSaveInfo] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  // Selected Saved Address or Custom Input
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddr ? (defaultAddr.id || defaultAddr._id) : 'custom');

  const [shippingAddress, setShippingAddress] = useState({
    firstName: defaultAddr?.fullName?.split(' ')[0] || defaultAddr?.name?.split(' ')[0] || currentUser?.name?.split(' ')[0] || '',
    lastName: defaultAddr?.fullName?.split(' ').slice(1).join(' ') || defaultAddr?.name?.split(' ').slice(1).join(' ') || currentUser?.name?.split(' ').slice(1).join(' ') || '',
    street: defaultAddr?.street || '',
    apartment: defaultAddr?.apartment || '',
    city: defaultAddr?.city || '',
    state: defaultAddr?.state || '',
    postalCode: defaultAddr?.postalCode || '',
    country: defaultAddr?.country || 'India'
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState('express'); // 'express' | 'priority' | 'chauffeur'

  // Payment Method
  const [paymentMethodTab, setPaymentMethodTab] = useState('card'); // 'card' | 'applepay' | 'klarna'
  const [cardData, setCardData] = useState({
    nameOnCard: currentUser?.name || '',
    cardNumber: '•••• •••• •••• 8821',
    expDate: '09/29',
    cvv: '882'
  });
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // Promo Code State
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);

  // Processing & Confirmation State
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // If user selects a saved address, update fields
  const handleSelectSavedAddress = (addr) => {
    setSelectedAddressId(addr.id || addr._id);
    const fullNameStr = addr.fullName || addr.name || '';
    const parts = fullNameStr.split(' ');
    setShippingAddress({
      firstName: parts[0] || '',
      lastName: parts.slice(1).join(' ') || '',
      street: addr.street || '',
      apartment: addr.apartment || '',
      city: addr.city || '',
      state: addr.state || '',
      postalCode: addr.postalCode || '',
      country: addr.country || 'India'
    });
    if (addr.phone) setPhone(addr.phone);
  };

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * discountRate;

  let shippingCost = 0;
  if (shippingMethod === 'priority') {
    shippingCost = 20.0;
  } else if (shippingMethod === 'chauffeur') {
    shippingCost = 45.0;
  } else {
    // standard express: free over ₹5,000, else ₹250
    shippingCost = subtotal >= 100 || items.length === 0 ? 0 : 15.0;
  }

  const giftWrapCost = isGiftWrap ? 5.0 : 0;
  const total = subtotal - discountAmount + shippingCost + giftWrapCost;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    if (onApplyPromoCode) {
      const success = onApplyPromoCode(promoInput.trim());
      if (success) {
        setPromoMessage({ text: '15% discount applied (SUMI15)!', isError: false });
      } else {
        setPromoMessage({ text: 'Invalid promo code. Try SUMI15.', isError: true });
      }
    }
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      let paymentLabel = 'Credit Card (•••• 8821)';
      if (paymentMethodTab === 'applepay') paymentLabel = 'Apple Pay (•••• 4242)';
      if (paymentMethodTab === 'klarna') paymentLabel = 'Klarna 4x Installments';

      const orderPayload = {
        shippingAddress: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`.trim() || currentUser?.name || 'Customer',
          street: shippingAddress.apartment
            ? `${shippingAddress.street}, ${shippingAddress.apartment}`
            : shippingAddress.street,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country || 'India',
          phone: phone || currentUser?.phone || ''
        },
        paymentMethod: paymentLabel,
        items: items,
        total: total,
        shippingMethod: shippingMethod,
        giftWrap: isGiftWrap ? { note: giftNote } : null
      };

      const placedOrderNumber = onPlaceOrder ? onPlaceOrder(orderPayload) : `SMLX-${Math.floor(100000 + Math.random() * 900000)}`;

      setConfirmedOrder({
        orderNumber: placedOrderNumber || `SMLX-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        email: email,
        shippingAddress: orderPayload.shippingAddress,
        items: [...items],
        total: total,
        shippingMethod: shippingMethod,
        paymentMethod: paymentLabel
      });

      setIsProcessing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  // 1. ORDER CONFIRMATION SCREEN (WHEN ORDER IS PLACED)
  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-[#F8F6F3] py-10 lg:py-16 animate-fade-in font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-8 sm:p-14 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm animate-bounce-short">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5] border border-[#E8E3DE] text-[#C8A87C] text-xs font-mono font-bold tracking-widest uppercase rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                Order Confirmed • #{confirmedOrder.orderNumber}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                Thank You for Your Patronage
              </h1>
              <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-lg mx-auto leading-relaxed">
                We have received your order and dispatched an itemized confirmation receipt to{' '}
                <strong className="text-[#1A1A1A]">{confirmedOrder.email}</strong>. Our atelier tailors are preparing your garments for white-glove packaging.
              </p>
            </div>

            {/* Delivery & Tracking Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left text-xs bg-[#FAF8F5] p-5 rounded-[4px] border border-[#E8E3DE]">
              <div>
                <div className="text-[#6B6B6B] text-[11px]">Estimated Delivery</div>
                <div className="font-bold text-[#1A1A1A] mt-0.5">
                  {confirmedOrder.shippingMethod === 'priority'
                    ? '1 – 2 Business Days'
                    : confirmedOrder.shippingMethod === 'chauffeur'
                    ? 'Tomorrow Evening Window'
                    : '2 – 4 Business Days (Express)'}
                </div>
                <div className="text-[10px] text-emerald-700 font-medium mt-0.5">DHL Air Telemetry Active</div>
              </div>

              <div>
                <div className="text-[#6B6B6B] text-[11px]">Destination Residence</div>
                <div className="font-bold text-[#1A1A1A] mt-0.5 truncate">{confirmedOrder.shippingAddress.name}</div>
                <div className="text-[11px] text-[#6B6B6B] truncate">
                  {confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}
                </div>
              </div>

              <div>
                <div className="text-[#6B6B6B] text-[11px]">Payment Method</div>
                <div className="font-bold text-[#1A1A1A] mt-0.5">{confirmedOrder.paymentMethod}</div>
                <div className="text-sm font-bold font-mono text-[#1A1A1A] mt-0.5">₹{confirmedOrder.total.toFixed(2)}</div>
              </div>
            </div>

            {/* Purchased Items Recap */}
            <div className="border-t border-[#E8E3DE] pt-6 text-left space-y-4">
              <h3 className="font-serif text-base font-bold text-[#1A1A1A]">
                Acquired Pieces ({confirmedOrder.items.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
              <div className="divide-y divide-[#F2EFE9] border border-[#E8E3DE] rounded-[4px] overflow-hidden bg-white">
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-16 object-cover rounded-xs border border-[#E8E3DE] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-xs text-[#1A1A1A] truncate">{item.product.name}</div>
                        <div className="text-[11px] text-[#6B6B6B] flex items-center gap-2 mt-0.5">
                          <span>Size: {item.selectedSize}</span>
                          <span>•</span>
                          <span>Color: {item.selectedColor?.name || 'Standard'}</span>
                          <span>•</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <div className="font-mono text-xs font-bold text-[#1A1A1A] shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#E8E3DE]">
              <button
                onClick={() => navigate('/account/orders')}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors cursor-pointer shadow-sm"
              >
                Track in My Orders →
              </button>
              <button
                onClick={() => navigate('/products')}
                className="w-full sm:w-auto px-8 py-3.5 bg-white border border-[#E8E3DE] hover:bg-[#FAF8F5] text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors cursor-pointer"
              >
                Continue Exploring Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. EMPTY BAG REDIRECT SCREEN
  if (!items || items.length === 0) {
    return (
      <div className="min-h-[75vh] bg-[#F8F6F3] flex items-center justify-center py-16 px-4 font-sans">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-[4px] border border-[#E8E3DE] shadow-sm animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#E8E3DE] flex items-center justify-center mx-auto text-[#C8A87C]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Your Shopping Bag is Empty</h1>
            <p className="text-xs text-[#6B6B6B]">
              Add garments from our signature collections before proceeding to secure checkout.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // 3. MAIN CHECKOUT WORKFLOW PAGE
  return (
    <div className="min-h-screen bg-[#F8F6F3] py-8 lg:py-14 animate-fade-in font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E3DE]">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-2">
              <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <Link to="/cart" className="hover:text-[#1A1A1A] transition-colors">Shopping Bag</Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-[#1A1A1A] font-semibold">Secure Checkout</span>
            </nav>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                Atelier Express Checkout
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-wider bg-[#FAF8F5] text-emerald-800 border border-emerald-300 font-bold">
                <Lock className="w-3 h-3 text-emerald-700" />
                TLS 1.3 256-Bit Encrypted
              </span>
            </div>
          </div>

          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#C8A87C] transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Bag</span>
          </Link>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: FORM SECTIONS (7 cols) */}
          <form onSubmit={handleCompleteOrder} className="lg:col-span-7 space-y-8">
            {/* Express Checkout Fast Button Banner */}
            <div className="bg-white p-6 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-3">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B] font-semibold">
                  Express 1-Touch Checkout
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethodTab('applepay');
                    setShippingMethod('express');
                  }}
                  className="py-3 bg-[#1A1A1A] text-white hover:bg-black rounded-xs text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
                >
                  <span>Apple Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethodTab('card');
                    setShippingMethod('express');
                  }}
                  className="py-3 bg-[#FAF8F5] hover:bg-[#F2EFE9] text-[#1A1A1A] border border-[#E8E3DE] rounded-xs text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-[#C8A87C]" />
                  <span>Patron 1-Click</span>
                </button>
              </div>
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-[#E8E3DE]" />
                <span className="flex-shrink mx-4 text-[10px] uppercase tracking-widest text-[#6B6B6B] font-mono">
                  Or Standard Atelier Dispatch
                </span>
                <div className="flex-grow border-t border-[#E8E3DE]" />
              </div>
            </div>

            {/* Step 1: Contact Information */}
            <div className="bg-white p-6 sm:p-8 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E3DE] pb-3">
                <h2 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white text-xs flex items-center justify-center font-mono">
                    1
                  </span>
                  <span>Contact Information</span>
                </h2>
                {currentUser && (
                  <span className="text-[11px] text-[#A68758] font-medium">
                    Signed in as {currentUser.name}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor.vance@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                  />
                  <span className="text-[10px] text-[#6B6B6B] mt-0.5 block">
                    Order confirmation & DHL tracking link sent here.
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                    Telephone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (415) 890-2144"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                  />
                  <span className="text-[10px] text-[#6B6B6B] mt-0.5 block">
                    For courier delivery scheduling and gate codes.
                  </span>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-[#6B6B6B] cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="rounded border-[#E8E3DE] text-[#C8A87C] focus:ring-[#C8A87C]"
                />
                <span>Email me private lookbook releases and tailored capsule announcements</span>
              </label>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="bg-white p-6 sm:p-8 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-5">
              <div className="border-b border-[#E8E3DE] pb-3">
                <h2 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white text-xs flex items-center justify-center font-mono">
                    2
                  </span>
                  <span>Shipping Address & Residence</span>
                </h2>
              </div>

              {/* Saved Address Quick Selector (If User has saved addresses) */}
              {addresses && addresses.length > 0 && (
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block">
                    Select Saved Delivery Address
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addresses.map((addr) => {
                      const isSelected = selectedAddressId === (addr.id || addr._id);
                      return (
                        <div
                          key={addr.id || addr._id}
                          onClick={() => handleSelectSavedAddress(addr)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs space-y-1 ${
                            isSelected
                              ? 'border-[#506040] bg-[#FAF8F5] ring-2 ring-[#506040]/30'
                              : 'border-[#E8E4DC] bg-white hover:border-[#C69E58]'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold text-[#1D241C]">
                            <span className="truncate">{addr.fullName || addr.name}</span>
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] font-mono uppercase bg-[#FAF8F5] border border-[#E8E4DC] text-[#687163] px-1.5 py-0.2 rounded">
                                {addr.addressType || 'Home'}
                              </span>
                              {addr.isDefault && (
                                <span className="text-[9px] font-mono uppercase bg-[#506040] text-white px-1.5 py-0.2 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-[#687163] text-[11px] truncate">
                            {addr.street} {addr.apartment ? `, ${addr.apartment}` : ''}
                          </div>
                          <div className="text-[#687163] text-[11px]">
                            {addr.city}, {addr.state} {addr.postalCode}
                          </div>
                          {addr.phone && (
                            <div className="text-[#1D241C] text-[10px] font-mono pt-0.5">
                              📞 {addr.phone}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Detailed Address Inputs */}
              <div className="space-y-4 text-xs pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      First Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={shippingAddress.firstName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      Last Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={shippingAddress.lastName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                    Street Address *
                  </label>
                  <input
                    required
                    type="text"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                    placeholder="742 Montgomery Street"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      Apartment / Suite
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.apartment}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, apartment: e.target.value })}
                      placeholder="Suite 1400 (Optional)"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      City *
                    </label>
                    <input
                      required
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      State / Province *
                    </label>
                    <input
                      required
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      PIN Code *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 400050"
                      pattern="[0-9]{6}"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      Country *
                    </label>
                    <select
                      value={shippingAddress.country}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                    >
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>United Arab Emirates</option>
                      <option>Singapore</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Shipping & Delivery Service Tiers */}
            <div className="bg-white p-6 sm:p-8 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-4">
              <div className="border-b border-[#E8E3DE] pb-3">
                <h2 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white text-xs flex items-center justify-center font-mono">
                    3
                  </span>
                  <span>Delivery Service Level</span>
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                {/* Standard Complimentary Express */}
                <label
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded-[4px] border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-[#1A1A1A] bg-[#FAF8F5] ring-1 ring-[#1A1A1A]'
                      : 'border-[#E8E3DE] hover:border-[#C8A87C]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping_tier"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="text-[#1A1A1A] focus:ring-[#1A1A1A]"
                    />
                    <div>
                      <div className="font-bold text-[#1A1A1A]">Complimentary Express Air</div>
                      <div className="text-[11px] text-[#6B6B6B]">2 – 4 Business Days • Insured Tracking</div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 uppercase">
                    {subtotal >= 100 ? 'Free' : '₹250.00'}
                  </span>
                </label>

                {/* Priority Next-Day */}
                <label
                  onClick={() => setShippingMethod('priority')}
                  className={`p-4 rounded-[4px] border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                    shippingMethod === 'priority'
                      ? 'border-[#1A1A1A] bg-[#FAF8F5] ring-1 ring-[#1A1A1A]'
                      : 'border-[#E8E3DE] hover:border-[#C8A87C]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping_tier"
                      checked={shippingMethod === 'priority'}
                      onChange={() => setShippingMethod('priority')}
                      className="text-[#1A1A1A] focus:ring-[#1A1A1A]"
                    />
                    <div>
                      <div className="font-bold text-[#1A1A1A]">Priority Next-Day Air Dispatch</div>
                      <div className="text-[11px] text-[#6B6B6B]">1 – 2 Business Days • Fast-Track Atelier Packing</div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#1A1A1A]">₹450.00</span>
                </label>

                {/* White Glove Chauffeur */}
                <label
                  onClick={() => setShippingMethod('chauffeur')}
                  className={`p-4 rounded-[4px] border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                    shippingMethod === 'chauffeur'
                      ? 'border-[#1A1A1A] bg-[#FAF8F5] ring-1 ring-[#1A1A1A]'
                      : 'border-[#E8E3DE] hover:border-[#C8A87C]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping_tier"
                      checked={shippingMethod === 'chauffeur'}
                      onChange={() => setShippingMethod('chauffeur')}
                      className="text-[#1A1A1A] focus:ring-[#1A1A1A]"
                    />
                    <div>
                      <div className="font-bold text-[#1A1A1A]">Private White-Glove Courier</div>
                      <div className="text-[11px] text-[#6B6B6B]">Hand-delivered with cedar garment bag & hanger</div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#1A1A1A]">₹950.00</span>
                </label>
              </div>
            </div>

            {/* Step 4: Payment Method & Details */}
            <div className="bg-white p-6 sm:p-8 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-5">
              <div className="border-b border-[#E8E3DE] pb-3 flex items-center justify-between">
                <h2 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white text-xs flex items-center justify-center font-mono">
                    4
                  </span>
                  <span>Payment Method</span>
                </h2>
                <span className="text-[11px] text-[#6B6B6B] flex items-center gap-1 font-mono">
                  <Lock className="w-3 h-3 text-[#C8A87C]" />
                  Encrypted Card Vault
                </span>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethodTab('card')}
                  className={`py-3 px-2 text-xs font-bold rounded-xs border text-center transition-all cursor-pointer ${
                    paymentMethodTab === 'card'
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-[#FAF8F5] text-[#6B6B6B] border-[#E8E3DE] hover:text-[#1A1A1A]'
                  }`}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethodTab('applepay')}
                  className={`py-3 px-2 text-xs font-bold rounded-xs border text-center transition-all cursor-pointer ${
                    paymentMethodTab === 'applepay'
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-[#FAF8F5] text-[#6B6B6B] border-[#E8E3DE] hover:text-[#1A1A1A]'
                  }`}
                >
                  Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethodTab('klarna')}
                  className={`py-3 px-2 text-xs font-bold rounded-xs border text-center transition-all cursor-pointer ${
                    paymentMethodTab === 'klarna'
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-[#FAF8F5] text-[#6B6B6B] border-[#E8E3DE] hover:text-[#1A1A1A]'
                  }`}
                >
                  Klarna 4x
                </button>
              </div>

              {paymentMethodTab === 'card' && (
                <div className="space-y-4 text-xs pt-1">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      Cardholder Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={cardData.nameOnCard}
                      onChange={(e) => setCardData({ ...cardData, nameOnCard: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      Card Number *
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        required
                        type="text"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        placeholder="•••• •••• •••• 8821"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                        Expiry Date (MM/YY) *
                      </label>
                      <input
                        required
                        type="text"
                        value={cardData.expDate}
                        onChange={(e) => setCardData({ ...cardData, expDate: e.target.value })}
                        placeholder="09/29"
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                        Security CVC / CVV *
                      </label>
                      <input
                        required
                        type="text"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        placeholder="882"
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethodTab === 'applepay' && (
                <div className="p-6 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE] text-center space-y-2 text-xs">
                  <div className="font-bold text-[#1A1A1A]">Apple Pay Express Authorization</div>
                  <p className="text-[#6B6B6B]">
                    Clicking "Complete Order" will prompt biometric Face ID / Touch ID authorization on your device.
                  </p>
                </div>
              )}

              {paymentMethodTab === 'klarna' && (
                <div className="p-6 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE] space-y-2 text-xs">
                  <div className="font-bold text-[#1A1A1A]">Pay in 4 Interest-Free Installments</div>
                  <p className="text-[#6B6B6B]">
                    Pay 4 bi-weekly payments of ${(total / 4).toFixed(2)}. No hidden interest or origination fees.
                  </p>
                </div>
              )}

              {/* Billing Address Toggle */}
              <div className="pt-3 border-t border-[#E8E3DE]">
                <label className="flex items-center gap-2 text-xs text-[#1A1A1A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={billingSameAsShipping}
                    onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                    className="rounded border-[#E8E3DE] text-[#C8A87C] focus:ring-[#C8A87C]"
                  />
                  <span>Billing address is identical to shipping residence</span>
                </label>
              </div>
            </div>

            {/* Complete Order Button CTA */}
            <div className="space-y-3">
              <button
                id="submit-checkout-order-btn"
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Order to Atelier...</span>
                  </div>
                ) : (
                  <>
                    <span>Place Order • ₹{total.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#6B6B6B] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>30-Day Effortless Returns</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[#C8A87C]" />
                  <span>Duties & Taxes Included (DDP)</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  <span>Secure 256-Bit SSL Checkout</span>
                </span>
              </div>
            </div>
          </form>

          {/* RIGHT COLUMN: STICKY ORDER SUMMARY (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-6 sm:p-8 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E3DE]">
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                  Order Summary ({items.reduce((acc, i) => acc + i.quantity, 0)} Items)
                </h3>
                <Link to="/cart" className="text-xs text-[#A68758] hover:underline font-medium">
                  Edit Bag
                </Link>
              </div>

              {/* Cart Item Row Previews */}
              <div className="divide-y divide-[#F2EFE9] max-h-[320px] overflow-y-auto pr-1 space-y-3">
                {items.map((item, index) => (
                  <div key={item.id || index} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-16 object-cover rounded-xs border border-[#E8E3DE]"
                        />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#1A1A1A] text-white text-[10px] flex items-center justify-center font-mono font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[#1A1A1A] truncate">{item.product.name}</div>
                        <div className="text-[11px] text-[#6B6B6B] mt-0.5">
                          {item.selectedSize} / {item.selectedColor?.name || 'Standard'}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-[#1A1A1A] shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input Box */}
              <div className="pt-2 border-t border-[#E8E3DE]">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Coupon code (e.g. SUMI15)"
                    className="flex-1 px-3 py-2 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#C8A87C]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </form>
                {promoMessage && (
                  <div
                    className={`mt-2 text-[11px] font-medium ${
                      promoMessage.isError ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {promoMessage.text}
                  </div>
                )}
                {promoCode && (
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#A68758] font-mono">
                    <Tag className="w-3 h-3" />
                    <span>Active code: <strong>{promoCode}</strong> (15% OFF)</span>
                  </div>
                )}
              </div>

              {/* Gift Wrap Packaging Option */}
              <div className="pt-2 border-t border-[#E8E3DE] space-y-2">
                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <span className="flex items-center gap-2 text-[#1A1A1A] font-medium">
                    <Gift className="w-4 h-4 text-[#C8A87C]" />
                    <span>Add Luxury Gold Foil Gift Box</span>
                  </span>
                  <span className="font-mono text-[#6B6B6B]">+₹150.00</span>
                  <input
                    type="checkbox"
                    checked={isGiftWrap}
                    onChange={(e) => setIsGiftWrap(e.target.checked)}
                    className="ml-2 rounded border-[#E8E3DE] text-[#C8A87C] focus:ring-[#C8A87C]"
                  />
                </label>

                {isGiftWrap && (
                  <textarea
                    rows={2}
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Handwritten calligraphy gift message note..."
                    className="w-full p-2 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs text-xs focus:outline-none focus:border-[#C8A87C] animate-fade-in"
                  />
                )}
              </div>

              {/* Cost Calculations Breakdown */}
              <div className="space-y-2.5 text-xs pt-3 border-t border-[#E8E3DE]">
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span className="font-mono text-[#1A1A1A]">₹{subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount Courtesy (15% OFF)</span>
                    <span className="font-mono">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Shipping ({shippingMethod === 'priority' ? 'Priority Air' : shippingMethod === 'chauffeur' ? 'White Glove' : 'Standard Express'})</span>
                  <span className="font-mono text-[#1A1A1A]">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 uppercase font-semibold">Free</span>
                    ) : (
                      `$₹{shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                {isGiftWrap && (
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>Luxury Gift Packaging</span>
                    <span className="font-mono text-[#1A1A1A]">₹150.00</span>
                  </div>
                )}

                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Import Duties & VAT</span>
                  <span className="font-mono text-[#1A1A1A]">₹0.00 (Inclusive)</span>
                </div>

                <div className="flex justify-between items-baseline pt-4 border-t-2 border-[#1A1A1A] text-[#1A1A1A]">
                  <span className="font-bold text-sm">Total Due</span>
                  <div className="text-right">
                    <span className="font-serif text-2xl font-bold">₹{total.toFixed(2)}</span>
                    <span className="text-[10px] text-[#6B6B6B] block font-mono">USD inclusive of all taxes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
