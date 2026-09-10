import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ChevronRight, Headphones, ArrowRight, Clock, PackageCheck, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ShippingPolicyPage = () => {
  const { freeShippingThreshold } = useCart();

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 lg:py-16 animate-fade-in font-sans text-[#1D241C]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#687163]">
          <Link to="/" className="hover:text-[#1D241C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1D241C] font-semibold">Shipping &amp; Delivery Policy</span>
        </nav>

        {/* Header Hero Card */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#506040]/15 text-[#506040] text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg border border-[#506040]/30">
              <Truck className="w-3.5 h-3.5 text-[#506040]" />
              Safe &amp; Reliable Delivery
            </span>
            <span className="text-[11px] text-[#687163] font-mono">
              Last Updated: September 1, 2026
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D241C]">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] max-w-2xl leading-relaxed">
            We aim to deliver your orders safely and on time. This policy provides basic information about order processing, shipping, and delivery.
          </p>
        </div>

        {/* 2-Column Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Charges */}
          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#1D241C]">
              Shipping Charges
            </h3>
            <p className="text-xs sm:text-sm text-[#687163] leading-relaxed">
              Shipping charges, if applicable, will be displayed during checkout before you place your order.
              {typeof freeShippingThreshold === 'number' && freeShippingThreshold > 0 && (
                <span className="block mt-2 text-[#506040] font-semibold">
                  Free shipping applies automatically on qualifying orders above ₹{freeShippingThreshold.toLocaleString('en-IN')}.
                </span>
              )}
            </p>
          </div>

          {/* Delivery Time */}
          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#1D241C]">
              Delivery Time
            </h3>
            <p className="text-xs sm:text-sm text-[#687163] leading-relaxed">
              Delivery time may vary depending on your location, product availability, and other delivery conditions. The estimated delivery information will be shown during checkout or after the order is placed, where available.
            </p>
          </div>

          {/* Order Processing */}
          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#1D241C]">
              Order Processing
            </h3>
            <p className="text-xs sm:text-sm text-[#687163] leading-relaxed">
              Orders are processed after successful order confirmation. Processing and dispatch times may vary depending on the product and order details.
            </p>
          </div>

          {/* Order Tracking */}
          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#1D241C]">
              Order Tracking
            </h3>
            <p className="text-xs sm:text-sm text-[#687163] leading-relaxed">
              If tracking information is available, it will be provided through your order details or delivery notifications.
            </p>
          </div>
        </div>

        {/* Delivery Issues Full-Width Card */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#1D241C]">
            Delivery Issues
          </h3>
          <p className="text-xs sm:text-sm text-[#687163] leading-relaxed">
            If your order is delayed, damaged, or not delivered as expected, please contact our support team with your order details so we can assist you.
          </p>
        </div>

        {/* Contact Support Help Box */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#506040]/10 flex items-center justify-center text-[#506040] shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#1D241C]">
                Need Help With Your Delivery?
              </h3>
              <p className="text-xs text-[#687163] mt-0.5">
                Contact our support team if you have questions about shipping or your order.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1D241C] hover:bg-[#506040] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
