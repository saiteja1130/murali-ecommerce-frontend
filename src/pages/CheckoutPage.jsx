import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Lock,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  Tag,
  Clock,
  Globe,
  MapPin,
  Check,
  Smartphone,
  QrCode
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../context/api';

export const CheckoutPage = ({
  items = [],
  onClearCart,
  promoCode: propPromoCode,
  onApplyPromoCode,
  discountRate: propDiscountRate,
  onPlaceOrder,
  currentUser
}) => {
  const navigate = useNavigate();
  const {
    freeShippingThreshold,
    shippingFee,
    shippingCost: ctxShippingCost,
    cartSubtotal: ctxCartSubtotal,
    discountAmount: ctxDiscountAmount,
    discountRate: ctxDiscountRate,
    promoCode: ctxPromoCode,
    applyPromoCode,
    storeSettings
  } = useCart();

  // Form State
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [saveInfo, setSaveInfo] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  // Direct manual shipping address state for each order
  const [shippingAddress, setShippingAddress] = useState({
    firstName: currentUser?.name?.split(' ')[0] || '',
    lastName: currentUser?.name?.split(' ').slice(1).join(' ') || '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  });

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  // Promo Code State
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Processing & Confirmation State
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Sync profile details if available
  useEffect(() => {
    if (currentUser) {
      if (!email && currentUser.email) setEmail(currentUser.email);
      if (!phone && currentUser.phone) setPhone(currentUser.phone);
      setShippingAddress((prev) => ({
        ...prev,
        firstName: prev.firstName || currentUser.name?.split(' ')[0] || '',
        lastName: prev.lastName || currentUser.name?.split(' ').slice(1).join(' ') || ''
      }));
    }
  }, [currentUser]);

  // Calculations
  const hasOOS = items.some((item) => item.product?.isStockAvailable === false);
  const subtotal = ctxCartSubtotal !== undefined
    ? ctxCartSubtotal
    : items.reduce((acc, item) => {
      if (item.product?.isStockAvailable === false) return acc;
      return acc + (Number(item.product?.price) || 0) * item.quantity;
    }, 0);

  const activeDiscountRate = propDiscountRate !== undefined ? propDiscountRate : (ctxDiscountRate || 0);
  const discountAmount = ctxDiscountAmount !== undefined ? ctxDiscountAmount : (subtotal * activeDiscountRate);

  // Dynamic standard shipping fee from backend settings
  const shippingCost = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : (shippingFee || 30.0);
  const total = subtotal > 0 ? subtotal - discountAmount + shippingCost : 0;

  const activePromoCode = propPromoCode || ctxPromoCode;

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
        text: result?.message || `Invalid promo code. Try ${storeSettings?.promoCode || 'SUMI15'}`,
        isError: true
      });
    }
  };

  const handleCompleteOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (hasOOS) {
      alert('Some items in your cart are currently out of stock. Please return to the bag and remove unavailable items before placing an order.');
      return;
    }
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode) {
      alert('Please provide a complete shipping address.');
      return;
    }

    setIsProcessing(true);

    const orderPayload = {
      items: items.map((item) => ({
        id: item.product?._id || item.product?.id || item.id,
        quantity: item.quantity,
        selectedSize: item.selectedSize || 'Standard',
        selectedColor: item.selectedColor || { name: 'Standard', hex: '#1D241C' },
        price: item.product?.price,
        name: item.product?.name,
        image: item.product?.image || item.product?.images?.[0],
      })),
      shippingAddress: {
        fullName: `${shippingAddress.firstName} ${shippingAddress.lastName}`.trim() || currentUser?.name || 'Customer',
        phone: phone || currentUser?.phone || '',
        street: shippingAddress.apartment
          ? `${shippingAddress.street}, ${shippingAddress.apartment}`
          : shippingAddress.street,
        apartment: shippingAddress.apartment || '',
        city: shippingAddress.city,
        state: shippingAddress.state || '',
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country || 'India',
        addressType: 'home'
      },
      promoCode: activePromoCode || '',
    };

    try {
      // RAZORPAY UPI & SECURE ONLINE PAYMENT GATEWAY
      const orderRes = await api.post('/api/orders/create-razorpay-order', orderPayload);
      if (!orderRes.data?.status || !orderRes.data?.data) {
        throw new Error(orderRes.data?.message || 'Failed to initiate Razorpay order');
      }

      const { razorpayOrderId, amount, key_id, currency, orderNumber, orderId } = orderRes.data.data;

      // Check if Razorpay script is loaded
      if (typeof window.Razorpay !== 'function') {
        // Fallback or script load retry
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve) => { script.onload = resolve; });
      }

      const rzpOptions = {
        key: key_id,
        amount: amount,
        currency: currency || 'INR',
        name: "Murari's Glam & Glow",
        description: `Order #${orderNumber}`,
        image: '/assets/images/Logo.png',
        order_id: razorpayOrderId,
        prefill: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`.trim() || currentUser?.name || '',
          email: email || currentUser?.email || '',
          contact: phone || currentUser?.phone || '',
        },
        theme: {
          color: '#C69E58',
          backdrop_color: '#FAF8F5',
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: 'Pay via UPI',
                instruments: [
                  {
                    method: 'upi',
                    flows: ['collect', 'intent', 'qr'],
                    apps: ['google_pay', 'phonepe', 'paytm', 'bhim'],
                  },
                ],
              },
            },
            sequence: ['block.upi'],
            preferences: {
              show_default_blocks: false,
            },
          },
        },
        handler: async function (response) {
          try {
            const verifyRes = await api.post('/api/orders/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderNumber: orderNumber,
              items: orderPayload.items,
              shippingAddress: orderPayload.shippingAddress,
              promoCode: activePromoCode || '',
              notes: '',
            });

            if (verifyRes.data?.status && verifyRes.data?.data) {
              if (onClearCart) onClearCart();
              setConfirmedOrder(verifyRes.data.data);
              setIsProcessing(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              setErrorMessage(verifyRes.data?.message || 'Payment signature verification failed');
              setIsProcessing(false);
            }
          } catch (verifyErr) {
            console.error('Payment verification error:', verifyErr);
            setErrorMessage(verifyErr.response?.data?.message || 'Payment verification failed');
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      if (typeof window.Razorpay !== 'function') {
        throw new Error('Razorpay checkout script failed to load. Please refresh the page and try again.');
      }

      const rzp = new window.Razorpay(rzpOptions);
      rzp.on('payment.failed', function (response) {
        console.error('Razorpay Payment Failed:', response.error);
        setErrorMessage(`Payment failed: ${response.error?.description || response.error?.reason || 'Transaction could not be processed'}. Please try again.`);
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Order placement failed:', err);
      setErrorMessage(err.response?.data?.message || err.message || 'Failed to place order. Please try again.');
      setIsProcessing(false);
    }
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
                Thank You for Your Order
              </h1>
              <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-lg mx-auto leading-relaxed">
                We have received your order and sent a confirmation email to{' '}
                <strong className="text-[#1A1A1A]">{confirmedOrder.email || currentUser?.email || 'your email'}</strong>. We are preparing your items for delivery.
              </p>
            </div>

            {/* Delivery & Tracking Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left text-xs bg-[#FAF8F5] p-5 rounded-[4px] border border-[#E8E3DE]">
              <div>
                <div className="text-[#6B6B6B] text-[11px]">Estimated Delivery</div>
                <div className="font-bold text-[#1A1A1A] mt-0.5">
                  2 – 4 Business Days (Express)
                </div>
                <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
                  {confirmedOrder.trackingNumber ? `Tracking: ${confirmedOrder.trackingNumber}` : 'Tracking Active'}
                </div>
              </div>

              <div>
                <div className="text-[#6B6B6B] text-[11px]">Delivery Address</div>
                <div className="font-bold text-[#1A1A1A] mt-0.5 truncate">
                  {confirmedOrder.shippingAddress?.fullName || confirmedOrder.shippingAddress?.name || currentUser?.name || 'Customer'}
                </div>
                <div className="text-[11px] text-[#6B6B6B] truncate">
                  {confirmedOrder.shippingAddress?.street || ''}{confirmedOrder.shippingAddress?.city ? `, ${confirmedOrder.shippingAddress.city}` : ''}
                </div>
              </div>

              <div>
                <div className="text-[#6B6B6B] text-[11px]">Payment Method</div>
                <div className="font-bold text-[#1A1A1A] mt-0.5">
                  {confirmedOrder.paymentMethod === 'upi' ? 'UPI (Instant Transfer)' : confirmedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : confirmedOrder.paymentMethod || 'Pay via UPI'}
                </div>
                <div className="text-sm font-bold font-mono text-[#1A1A1A] mt-0.5">₹{Number(confirmedOrder.total || 0).toFixed(2)}</div>
              </div>
            </div>

            {/* Purchased Items Recap */}
            <div className="border-t border-[#E8E3DE] pt-6 text-left space-y-4">
              <h3 className="font-serif text-base font-bold text-[#1A1A1A]">
                Your Items ({Array.isArray(confirmedOrder.items) ? confirmedOrder.items.reduce((acc, i) => acc + (Number(i.quantity) || 1), 0) : 0})
              </h3>
              <div className="divide-y divide-[#F2EFE9] border border-[#E8E3DE] rounded-[4px] overflow-hidden bg-white">
                {(confirmedOrder.items || []).map((item, idx) => {
                  const itemImg = item.image || item.product?.image || (Array.isArray(item.product?.images) && item.product.images[0]) || '';
                  const itemName = item.name || item.product?.name || 'Garment Piece';
                  const itemSize = item.selectedSize || item.size || 'Standard';
                  const itemColor = typeof item.selectedColor === 'object' ? item.selectedColor?.name : (item.selectedColor || item.color || 'Standard');
                  const itemPrice = Number(item.price !== undefined ? item.price : (item.product?.price || 0));
                  const itemQty = Number(item.quantity || 1);

                  return (
                    <div key={idx} className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={itemImg || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900'}
                          alt={itemName}
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900';
                          }}
                          className="w-14 h-16 object-cover rounded-xs border border-[#E8E3DE] shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-xs text-[#1A1A1A] truncate">{itemName}</div>
                          <div className="text-[11px] text-[#6B6B6B] flex items-center gap-2 mt-0.5">
                            <span>Size: {itemSize}</span>
                            <span>•</span>
                            <span>Color: {itemColor}</span>
                            <span>•</span>
                            <span>Qty: {itemQty}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right font-mono font-semibold text-xs text-[#1A1A1A]">
                        ₹{(itemPrice * itemQty).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="border-t border-[#E8E3DE] pt-4 text-left space-y-2 text-xs">
              <div className="flex justify-between text-[#6B6B6B]">
                <span>Subtotal</span>
                <span className="font-mono text-[#1A1A1A]">
                  ₹{Number(confirmedOrder.subtotal !== undefined ? confirmedOrder.subtotal : (confirmedOrder.total || 0)).toFixed(2)}
                </span>
              </div>
              {Number(confirmedOrder.discount || 0) > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount {confirmedOrder.promoCode ? `(${confirmedOrder.promoCode})` : ''}</span>
                  <span className="font-mono">-₹{Number(confirmedOrder.discount).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6B6B6B]">
                <span>Shipping</span>
                <span className="font-mono text-[#1A1A1A]">
                  {Number(confirmedOrder.shippingCost || 0) === 0 ? (
                    <span className="text-emerald-700 font-semibold uppercase">Free</span>
                  ) : (
                    `₹${Number(confirmedOrder.shippingCost).toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#E8E3DE] font-bold text-sm text-[#1A1A1A]">
                <span>Total Paid</span>
                <span className="font-mono text-base">₹{Number(confirmedOrder.total || 0).toFixed(2)}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/account')}
                className="px-8 py-3.5 bg-white border border-[#E8E3DE] hover:bg-[#FAF8F5] text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors cursor-pointer"
              >
                View Account & Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. MAIN ACTIVE CHECKOUT WORKSPACE
  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 lg:py-12 animate-fade-in font-sans text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E3DE] mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6B6B6B] uppercase tracking-wider mb-1 font-mono">
              <Link to="/cart" className="hover:text-black">Shopping Bag</Link>
              <span>/</span>
              <span className="text-[#1A1A1A] font-semibold">Secure Checkout</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#1A1A1A] flex items-center gap-2.5">
              <Lock className="w-6 h-6 text-[#C8A87C]" />
              <span>Express Checkout</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#6B6B6B]">
            <span className="flex items-center gap-1 text-emerald-700">
              <ShieldCheck className="w-4 h-4" /> 256-Bit SSL Encrypted
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Multi-Step Checkout Form (7 cols) */}
          <form onSubmit={handleCompleteOrder} className="lg:col-span-7 space-y-8">
            {/* Step 1: Contact Information */}
            <div className="bg-white p-6 sm:p-8 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E3DE] pb-3">
                <h2 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white text-xs flex items-center justify-center font-mono">
                    1
                  </span>
                  <span>Contact Information</span>
                </h2>
                {!currentUser && (
                  <Link to="/login" className="text-xs text-[#C8A87C] hover:underline font-medium">
                    Already have an account? Log In
                  </Link>
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
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-[#6B6B6B] cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="rounded border-[#E8E3DE] text-[#C8A87C] focus:ring-[#C8A87C]"
                />
                <span>Email me about new luxury arrivals and private sales</span>
              </label>
            </div>

            {/* Step 2: Shipping Address & Residence */}
            <div className="bg-white p-6 sm:p-8 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-5">
              <div className="border-b border-[#E8E3DE] pb-3 flex items-center justify-between">
                <h2 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white text-xs flex items-center justify-center font-mono">
                    2
                  </span>
                  <span>Shipping Address</span>
                </h2>

              </div>

              {/* Direct Manual Shipping Address Form */}
              <div className="space-y-4 text-xs">
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
                      placeholder="First Name"
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
                      placeholder="Last Name"
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
                    placeholder="Flat / House No., Building Name, Street / Locality"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      Apartment / Suite / Landmark
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.apartment}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, apartment: e.target.value })}
                      placeholder="Suite / Landmark (Optional)"
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
                      placeholder="e.g. Mumbai"
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
                      placeholder="e.g. Maharashtra"
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

            {/* Step 3: Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-5">
              <div className="border-b border-[#E8E3DE] pb-3 flex items-center justify-between">
                <h2 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white text-xs flex items-center justify-center font-mono">
                    3
                  </span>
                  <span>Payment Method</span>
                </h2>
                <span className="text-[11px] text-[#6B6B6B] flex items-center gap-1 font-mono">
                  <Lock className="w-3 h-3 text-[#C8A87C]" />
                  Secure SSL Checkout
                </span>
              </div>

              {/* Instant UPI & Online Payment Card */}
              <div className="space-y-3 text-xs">
                <div
                  className="p-4 rounded-xl border border-[#506040] bg-[#FAF8F5] ring-2 ring-[#506040]/20 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#506040] text-white flex items-center justify-center text-xs shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1A1A] flex items-center gap-2">
                        <span>Instant UPI &amp; Online Payment</span>
                        <span className="text-[9px] font-mono uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                          100% Secure
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6B6B6B] mt-0.5">
                        Google Pay, PhonePe, Paytm, BHIM, UPI QR via Razorpay
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-neutral-400 font-mono text-[10px]">
                    <Smartphone className="w-4 h-4 text-[#C8A87C]" />
                    <span>UPI / CARDS / QR</span>
                  </div>
                </div>
              </div>

              {/* Error Banner if payment fails */}
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="space-y-4">
              <button
                type="submit"
                disabled={isProcessing || hasOOS}
                className={`w-full py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-xs shadow-lg transition-all ${hasOOS || isProcessing
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed shadow-none'
                  : 'bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] cursor-pointer'
                  }`}
              >
                {isProcessing ? (
                  <span>Securing Order &amp; Connecting Gateway...</span>
                ) : hasOOS ? (
                  <span>Unavailable Items in Cart</span>
                ) : (
                  <>
                    <span>Proceed to Online Payment • ₹{total.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-6 text-[11px] text-[#6B6B6B]">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#C8A87C]" /> Express Courier Delivery
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Razorpay 256-Bit SSL Protection
                </span>
              </div>
            </div>
          </form>

          {/* Right Column: Order Summary Sticky Panel (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-[4px] border border-[#E8E3DE] shadow-xs space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-[#E8E3DE] pb-4">
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Order Summary</h3>
                <span className="text-xs text-[#6B6B6B] font-mono">
                  {items.reduce((acc, i) => acc + i.quantity, 0)} Items
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center justify-between text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={item.product?.image || item.product?.images?.[0] || item.image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900'}
                          alt={item.product?.name || item.name || 'Product'}
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900';
                          }}
                          className="w-14 h-16 object-cover rounded-xs border border-[#E8E3DE] bg-[#FAF8F5]"
                        />
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#1A1A1A] text-white rounded-full text-[9px] font-bold flex items-center justify-center font-mono">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-[#1A1A1A] truncate">{item.product.name}</h4>
                        <div className="text-[11px] text-[#6B6B6B] mt-0.5">
                          Size: {item.selectedSize} • {item.selectedColor?.name || 'Standard'}
                        </div>
                        {item.product?.isStockAvailable === false && (
                          <div className="text-[10px] text-rose-700 font-bold mt-0.5">Out of Stock</div>
                        )}
                      </div>
                    </div>
                    <div className="font-mono font-bold text-right text-[#1A1A1A] shrink-0">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pt-2 border-t border-[#E8E3DE] space-y-2">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder={storeSettings?.promoCode || 'SUMI15'}
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isApplyingPromo}
                    className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isApplyingPromo ? '...' : 'Apply'}
                  </button>
                </form>

                {promoMessage && (
                  <p className={`text-[11px] ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-700 font-medium'}`}>
                    {promoMessage.text}
                  </p>
                )}
                {activePromoCode && (
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#A68758] font-mono">
                    <Tag className="w-3 h-3" />
                    <span>Active code: <strong>{activePromoCode}</strong> ({(activeDiscountRate * 100).toFixed(0)}% OFF)</span>
                  </div>
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
                    <span>Discount ({(activeDiscountRate * 100).toFixed(0)}% OFF)</span>
                    <span className="font-mono">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Standard Shipping</span>
                  <span className="font-mono text-[#1A1A1A]">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 uppercase font-semibold">Free</span>
                    ) : (
                      `₹${Number(shippingCost).toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Import Duties & VAT</span>
                  <span className="font-mono text-[#1A1A1A]">₹0.00 (Inclusive)</span>
                </div>

                <div className="flex justify-between items-baseline pt-4 border-t-2 border-[#1A1A1A] text-[#1A1A1A]">
                  <span className="font-bold text-sm">Total </span>
                  <div className="text-right">
                    <span className="font-sans text-2xl font-bold">₹{total.toFixed(2)}</span>
                    <span className="text-[10px] text-[#6B6B6B] block font-mono">Inclusive of all taxes</span>
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
