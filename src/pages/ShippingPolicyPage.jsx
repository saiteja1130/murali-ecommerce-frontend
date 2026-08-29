import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Globe, Clock, PackageCheck, ChevronRight, Sparkles } from 'lucide-react';

export const ShippingPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 lg:py-16 animate-fade-in font-sans text-[#1D241C]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#687163]">
          <Link to="/" className="hover:text-[#1D241C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1D241C] font-semibold">Shipping Policy</span>
        </nav>

        {/* Header Hero Card */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#506040]/15 text-[#506040] text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg border border-[#506040]/30">
            <Truck className="w-3.5 h-3.5 text-[#506040]" />
            Fast & Reliable Delivery
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D241C]">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] max-w-2xl leading-relaxed">
            We deliver safely across India and worldwide. Every item is packed with care in secure, protective packaging.
          </p>
        </div>

        {/* Shipping Rates & Delivery Time Table */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 sm:p-10 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DC]">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1D241C]">Delivery Options & Rates</h2>
              <p className="text-xs text-[#687163] mt-0.5">
                Free shipping applies automatically on all orders above ₹5,000.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8E4DC] bg-[#FAF8F5] text-[10px] uppercase tracking-wider text-[#687163]">
                  <th className="py-3.5 px-4 font-semibold">Delivery Type</th>
                  <th className="py-3.5 px-4 font-semibold">Estimated Time</th>
                  <th className="py-3.5 px-4 font-semibold">Orders Below ₹5,000</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Orders Above ₹5,000</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4DC]">
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#1D241C]">Standard Delivery</td>
                  <td className="py-4 px-4 text-[#687163]">3 – 5 Business Days</td>
                  <td className="py-4 px-4 font-mono">₹150</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-emerald-700 uppercase">Free</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#1D241C]">Express Priority Delivery</td>
                  <td className="py-4 px-4 text-[#687163]">1 – 2 Business Days</td>
                  <td className="py-4 px-4 font-mono">₹350</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-[#1D241C]">₹350</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#1D241C]">International Delivery</td>
                  <td className="py-4 px-4 text-[#687163]">5 – 8 Business Days</td>
                  <td className="py-4 px-4 font-mono">₹950</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-emerald-700 uppercase">Free</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs and Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-2">
            <PackageCheck className="w-5 h-5 text-[#506040]" />
            <h3 className="font-serif text-base font-bold text-[#1D241C]">Order Tracking</h3>
            <p className="text-xs text-[#687163] leading-relaxed">
              You will receive a tracking link via SMS and email as soon as your order is dispatched.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-2">
            <Clock className="w-5 h-5 text-[#506040]" />
            <h3 className="font-serif text-base font-bold text-[#1D241C]">Dispatch Time</h3>
            <p className="text-xs text-[#687163] leading-relaxed">
              Orders placed before 2:00 PM are processed and packed on the same business day.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#506040]" />
            <h3 className="font-serif text-base font-bold text-[#1D241C]">Damage Protection</h3>
            <p className="text-xs text-[#687163] leading-relaxed">
              If an item is damaged during transit, contact us within 48 hours and we will replace it immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
