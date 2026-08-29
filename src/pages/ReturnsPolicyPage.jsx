import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ShieldCheck, CheckCircle2, Clock, PackageCheck, AlertCircle, ChevronRight, ArrowRight } from 'lucide-react';

export const ReturnsPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 lg:py-16 animate-fade-in font-sans text-[#1D241C]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#687163]">
          <Link to="/" className="hover:text-[#1D241C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1D241C] font-semibold">Returns & Refunds</span>
        </nav>

        {/* Header Hero Card */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#506040]/15 text-[#506040] text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg border border-[#506040]/30">
            <RotateCcw className="w-3.5 h-3.5 text-[#506040]" />
            Easy 7-Day Returns
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D241C]">
            Returns & Refund Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] max-w-2xl leading-relaxed">
            We want you to be completely happy with your purchase. If the size doesn't fit or you wish to return an item, we offer hassle-free 7-day returns and size exchanges.
          </p>
        </div>

        {/* Step-by-Step 4-Stage Return Workflow */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-10 shadow-2xs space-y-8">
          <div className="border-b border-[#E8E4DC] pb-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1D241C]">How to Return or Exchange an Item</h2>
            <p className="text-xs text-[#687163] mt-1">Our return process takes less than 1 minute to start.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1D241C] text-[#C69E58] flex items-center justify-center font-mono font-bold text-xs">
                1
              </div>
              <h3 className="font-serif text-base font-bold text-[#1D241C]">Go to My Orders</h3>
              <p className="text-xs text-[#687163] leading-relaxed">
                Log into your account, open your order history, and click <strong>Return / Exchange</strong> on the item.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1D241C] text-[#C69E58] flex items-center justify-center font-mono font-bold text-xs">
                2
              </div>
              <h3 className="font-serif text-base font-bold text-[#1D241C]">Select Reason</h3>
              <p className="text-xs text-[#687163] leading-relaxed">
                Choose whether you'd like a size exchange or a refund to your original payment method.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1D241C] text-[#C69E58] flex items-center justify-center font-mono font-bold text-xs">
                3
              </div>
              <h3 className="font-serif text-base font-bold text-[#1D241C]">Doorstep Pickup</h3>
              <p className="text-xs text-[#687163] leading-relaxed">
                Our courier partner will pick up the packed item from your address free of charge.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1D241C] text-[#C69E58] flex items-center justify-center font-mono font-bold text-xs">
                4
              </div>
              <h3 className="font-serif text-base font-bold text-[#1D241C]">Quick Refund</h3>
              <p className="text-xs text-[#687163] leading-relaxed">
                Once the item passes inspection, your refund is processed within 24–48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Return Conditions */}
        <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-3">
          <h3 className="font-serif text-base font-bold text-[#1D241C]">Return Guidelines</h3>
          <ul className="text-xs text-[#687163] space-y-2 list-disc list-inside leading-relaxed">
            <li>Items must be unworn, unwashed, and in their original condition.</li>
            <li>All original brand tags and packaging should be attached.</li>
            <li>Returns must be requested within 7 days of package delivery.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPolicyPage;
