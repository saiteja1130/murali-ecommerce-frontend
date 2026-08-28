import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ShieldCheck, CheckCircle2, Clock, PackageCheck, AlertCircle, ChevronRight, ArrowRight } from 'lucide-react';

export const ReturnsPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F6F3] py-8 lg:py-16 animate-fade-in font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B6B6B]">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1A1A1A] font-semibold">Returns & Exchanges Policy</span>
        </nav>

        {/* Header Hero Card */}
        <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-8 sm:p-12 shadow-2xs space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C8A87C]/15 text-[#A68758] text-[10px] font-mono font-bold tracking-widest uppercase rounded-xs">
            <RotateCcw className="w-3.5 h-3.5 text-[#C8A87C]" />
            30-Day Effortless Courtesies
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A]">
            Returns & Exchanges Charter
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-2xl leading-relaxed">
            We want you to be completely satisfied with every piece in your personal archive. We offer complimentary 30-day worldwide returns and seamless size exchanges with pre-paid return labels included in every parcel.
          </p>
        </div>

        {/* Step-by-Step 4-Stage Return Workflow */}
        <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-8 sm:p-10 shadow-2xs space-y-8">
          <div className="border-b border-[#E8E3DE] pb-4">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">How to Initiate a Return</h2>
            <p className="text-xs text-[#6B6B6B] mt-1">Our digitized return process takes under 60 seconds.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#FAF8F5] rounded-[4px] border border-[#E8E3DE] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#C8A87C] flex items-center justify-center font-mono font-bold text-xs">
                1
              </div>
              <h3 className="font-serif text-base font-bold text-[#1A1A1A]">Visit Patron Portal</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Log in to your account, select the relevant order, and choose the item(s) you wish to return or exchange.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] rounded-[4px] border border-[#E8E3DE] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#C8A87C] flex items-center justify-center font-mono font-bold text-xs">
                2
              </div>
              <h3 className="font-serif text-base font-bold text-[#1A1A1A]">Affix Prepaid Label</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Use the pre-printed DHL Express return label included in your box, or print a new digital barcode label.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] rounded-[4px] border border-[#E8E3DE] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#C8A87C] flex items-center justify-center font-mono font-bold text-xs">
                3
              </div>
              <h3 className="font-serif text-base font-bold text-[#1A1A1A]">Courier Pickup / Dropoff</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Schedule a complimentary courier doorstep collection, or hand the parcel to any authorized DHL location.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] rounded-[4px] border border-[#E8E3DE] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#C8A87C] flex items-center justify-center font-mono font-bold text-xs">
                4
              </div>
              <h3 className="font-serif text-base font-bold text-[#1A1A1A]">Instant Settlement</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Upon delivery to our atelier, refunds are credited back to your original payment method within 3–5 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Conditions of Eligibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Eligible for Full Refund</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#6B6B6B]">
              <li className="flex items-start gap-2">
                <span className="text-[#C8A87C] font-bold">•</span>
                <span>Garments returned within 30 days of confirmed delivery date.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C8A87C] font-bold">•</span>
                <span>Unworn, unwashed, unaltered, and free of fragrances or cosmetics.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C8A87C] font-bold">•</span>
                <span>Original silk security ribbon and garment hangtags intact.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C8A87C] font-bold">•</span>
                <span>Footwear and leather goods returned with original dust bags and protective soles.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>Non-Returnable Pieces</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#6B6B6B]">
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 font-bold">•</span>
                <span>Custom bespoke tailoring made to specific non-standard client measurements.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 font-bold">•</span>
                <span>Monogrammed or personalized leather goods.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 font-bold">•</span>
                <span>Items marked as Final Atelier Archive Sale (exchanges permitted for size).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom CTA to Account Orders */}
        <div className="bg-[#1A1A1A] text-white p-8 rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-xl font-bold">Ready to Start a Return?</h3>
            <p className="text-xs text-neutral-400 mt-1">Access your order history to print your pre-paid shipping label immediately.</p>
          </div>
          <Link
            to="/account/orders"
            className="px-6 py-3 bg-[#C8A87C] hover:bg-[#B8956A] text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shrink-0"
          >
            Go to My Orders →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPolicyPage;
