import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Clock, PackageCheck, ChevronRight, MapPin, CreditCard, Headphones, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ShippingPolicyPage = () => {
  const { freeShippingThreshold, shippingFee } = useCart();

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
            Fast & Safe Pan-India Delivery
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D241C]">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] max-w-2xl leading-relaxed">
            Every garment and accessory from Murari&apos;s Glam &amp; Glow is inspected for quality, packed in tamper-proof secure packaging, and shipped via trusted national courier networks.
          </p>
        </div>

        {/* Shipping Rates & Delivery Time Table */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 sm:p-10 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E4DC] gap-2">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1D241C]">Delivery Options &amp; Rates</h2>
              <p className="text-xs text-[#687163] mt-0.5">
                Free shipping applies automatically on all orders above ₹{freeShippingThreshold.toLocaleString('en-IN')}.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Free Shipping &gt; ₹{freeShippingThreshold.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8E4DC] bg-[#FAF8F5] text-[10px] uppercase tracking-wider text-[#687163]">
                  <th className="py-3.5 px-4 font-semibold">Delivery Option</th>
                  <th className="py-3.5 px-4 font-semibold">Estimated Delivery</th>
                  <th className="py-3.5 px-4 font-semibold">Orders Below ₹{freeShippingThreshold.toLocaleString('en-IN')}</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Orders Above ₹{freeShippingThreshold.toLocaleString('en-IN')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4DC]">
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#1D241C]">
                    <div>Standard Pan-India Delivery</div>
                    <span className="text-[11px] text-[#687163] font-normal">BlueDart, Delhivery, DTDC</span>
                  </td>
                  <td className="py-4 px-4 text-[#687163]">2 – 5 Business Days</td>
                  <td className="py-4 px-4 font-mono font-semibold">₹{shippingFee}</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-emerald-700 uppercase">FREE</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#1D241C]">
                    <div>Express Priority Air Delivery</div>
                    <span className="text-[11px] text-[#687163] font-normal">Metro &amp; Tier-1 Cities</span>
                  </td>
                  <td className="py-4 px-4 text-[#687163]">1 – 2 Business Days</td>
                  <td className="py-4 px-4 font-mono font-semibold">₹150</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-[#1D241C]">₹150</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#1D241C]">
                    <div>Cash on Delivery (COD)</div>
                    <span className="text-[11px] text-[#687163] font-normal">Pay cash/UPI at doorstep</span>
                  </td>
                  <td className="py-4 px-4 text-[#687163]">2 – 5 Business Days</td>
                  <td className="py-4 px-4 font-mono font-semibold">₹{shippingFee}</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-emerald-700 uppercase">FREE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Essential Shipping Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-2">
            <Clock className="w-5 h-5 text-[#506040]" />
            <h3 className="font-serif text-base font-bold text-[#1D241C]">Same-Day Dispatch</h3>
            <p className="text-xs text-[#687163] leading-relaxed">
              Orders placed before 2:00 PM (Monday through Saturday) are processed and dispatched on the very same business day.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-2">
            <PackageCheck className="w-5 h-5 text-[#506040]" />
            <h3 className="font-serif text-base font-bold text-[#1D241C]">Live Order Tracking</h3>
            <p className="text-xs text-[#687163] leading-relaxed">
              Once your package leaves our facility, you will receive an instant SMS and email with real-time live courier tracking.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#506040]" />
            <h3 className="font-serif text-base font-bold text-[#1D241C]">Tamper-Proof Packaging</h3>
            <p className="text-xs text-[#687163] leading-relaxed">
              All items are packed in multi-layered, tamper-evident weatherproof packaging to ensure they arrive in pristine condition.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines Section */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 sm:p-10 shadow-2xs space-y-6 text-xs text-[#687163] leading-relaxed">
          <h3 className="font-serif text-lg font-bold text-[#1D241C]">Additional Delivery Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-[#1D241C] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#506040]" />
                Delivery Locations
              </h4>
              <p>
                We deliver to over 19,000+ PIN codes across India including all major metropolitan hubs, tier-2 cities, and rural postal zones.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-sm text-[#1D241C] flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#506040]" />
                Payment &amp; Verification
              </h4>
              <p>
                We accept UPI, Google Pay, PhonePe, Debit/Credit Cards, Net Banking, and Cash on Delivery (COD). No hidden charges at checkout.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E4DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="font-bold text-[#1D241C] block">Have questions about your delivery?</span>
              <span>Our support team is available Monday to Saturday, 9:00 AM – 8:00 PM IST.</span>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1D241C] hover:bg-[#506040] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shrink-0"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
