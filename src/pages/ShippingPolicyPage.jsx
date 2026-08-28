import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Globe, Clock, PackageCheck, ChevronRight, Sparkles } from 'lucide-react';

export const ShippingPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F6F3] py-8 lg:py-16 animate-fade-in font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B6B6B]">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1A1A1A] font-semibold">Shipping & Delivery Policy</span>
        </nav>

        {/* Header Hero Card */}
        <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-8 sm:p-12 shadow-2xs space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C8A87C]/15 text-[#A68758] text-[10px] font-mono font-bold tracking-widest uppercase rounded-xs">
            <Truck className="w-3.5 h-3.5 text-[#C8A87C]" />
            Global White-Glove Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A]">
            Shipping & Delivery Charter
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-2xl leading-relaxed">
            At SUMILUX, our dispatch and transit protocols are held to the same exacting standards as our garment tailoring. Every order is packaged in climate-neutral, FSC-certified linen presentation boxes.
          </p>
        </div>

        {/* Shipping Rates & Transit Tiers Table */}
        <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-6 sm:p-10 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E3DE]">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">Delivery Speeds & Service Tiers</h2>
              <p className="text-xs text-[#6B6B6B] mt-0.5">Complimentary express shipping applies automatically on all orders over ₹5,000.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E8E3DE] bg-[#FAF8F5] text-[10px] uppercase tracking-wider text-[#6B6B6B]">
                  <th className="py-3.5 px-4 font-semibold">Service Level</th>
                  <th className="py-3.5 px-4 font-semibold">Transit Timeline</th>
                  <th className="py-3.5 px-4 font-semibold">Carrier</th>
                  <th className="py-3.5 px-4 font-semibold">Cost (Under ₹5,000)</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Cost (₹5,000+)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2EFE9]">
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#1A1A1A]">Complimentary Standard Express</td>
                  <td className="py-4 px-4 text-[#6B6B6B]">2 – 4 Business Days</td>
                  <td className="py-4 px-4 text-[#1A1A1A]">DHL / FedEx Express</td>
                  <td className="py-4 px-4 font-mono">₹250.00</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-emerald-700 uppercase">Free</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#1A1A1A]">Next-Day Priority Atelier Delivery</td>
                  <td className="py-4 px-4 text-[#6B6B6B]">1 Business Day (Order by 14:00)</td>
                  <td className="py-4 px-4 text-[#1A1A1A]">DHL Air Priority</td>
                  <td className="py-4 px-4 font-mono">₹450.00</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-[#1A1A1A]">₹450.00</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#1A1A1A]">International Worldwide Courier (DDP)</td>
                  <td className="py-4 px-4 text-[#6B6B6B]">3 – 5 Business Days</td>
                  <td className="py-4 px-4 text-[#1A1A1A]">DHL Express Global</td>
                  <td className="py-4 px-4 font-mono">₹950.00</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-emerald-700 uppercase">Free</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#1A1A1A]">Private Courier Hand Delivery (Metro Areas)</td>
                  <td className="py-4 px-4 text-[#6B6B6B]">Same-Day Evening Window</td>
                  <td className="py-4 px-4 text-[#1A1A1A]">SUMILUX Chauffeur</td>
                  <td className="py-4 px-4 font-mono">₹950.00</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-[#1A1A1A]">₹950.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3 Core Shipping Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-3">
            <Globe className="w-8 h-8 text-[#C8A87C]" />
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Delivered Duty Paid (DDP)</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              No surprise customs charges upon arrival. All international import taxes, duties, and brokerage clearance fees are calculated and covered by SUMILUX.
            </p>
          </div>

          <div className="bg-white p-6 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-3">
            <PackageCheck className="w-8 h-8 text-[#C8A87C]" />
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Signature Required & Insured</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Every parcel is 100% insured for transit loss or damage. Orders exceeding ₹15000 require an adult signature upon delivery for vault-level security.
            </p>
          </div>

          <div className="bg-white p-6 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-3">
            <Clock className="w-8 h-8 text-[#C8A87C]" />
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Real-Time GPS Tracking</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Upon dispatch, a live tracking link is transmitted to your email and patron account dashboard, providing live step-by-step waypoint telemetry.
            </p>
          </div>
        </div>

        {/* Questions Footer */}
        <div className="bg-[#FAF8F5] p-6 rounded-[4px] border border-[#E8E3DE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <div className="font-bold text-[#1A1A1A]">Have a bespoke delivery requirement?</div>
            <div className="text-[#6B6B6B]">Our concierge team can coordinate private drop-offs and discreet vault delivery.</div>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] font-semibold uppercase tracking-wider rounded-xs transition-colors shrink-0"
          >
            Speak with Logistics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
