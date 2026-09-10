import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ChevronRight, Headphones, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

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
          <span className="text-[#1D241C] font-semibold">Returns &amp; Refund Policy</span>
        </nav>

        {/* Header Hero Card */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#506040]/15 text-[#506040] text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg border border-[#506040]/30">
              <RotateCcw className="w-3.5 h-3.5 text-[#506040]" />
              Easy Returns
            </span>
            <span className="text-[11px] text-[#687163] font-mono">
              Last Updated: September 1, 2026
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D241C]">
            Returns &amp; Refund Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] max-w-2xl leading-relaxed">
            We want you to have a smooth shopping experience. If you are not satisfied with an eligible product, you may request a return according to the conditions below.
          </p>
        </div>

        {/* Step-by-Step 4-Stage Return Workflow */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-10 shadow-2xs space-y-8">
          <div className="border-b border-[#E8E4DC] pb-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1D241C]">
              Return Process
            </h2>
            <p className="text-xs text-[#687163] mt-1">
              A simple overview of how return requests are handled.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1D241C] text-[#C69E58] flex items-center justify-center font-mono font-bold text-xs">
                1
              </div>
              <h3 className="font-serif text-base font-bold text-[#1D241C]">1. Open Your Order</h3>
              <p className="text-xs text-[#687163] leading-relaxed">
                Log in to your account and open the relevant order.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1D241C] text-[#C69E58] flex items-center justify-center font-mono font-bold text-xs">
                2
              </div>
              <h3 className="font-serif text-base font-bold text-[#1D241C]">2. Request a Return</h3>
              <p className="text-xs text-[#687163] leading-relaxed">
                Submit a return request for the eligible item.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1D241C] text-[#C69E58] flex items-center justify-center font-mono font-bold text-xs">
                3
              </div>
              <h3 className="font-serif text-base font-bold text-[#1D241C]">3. Product Review</h3>
              <p className="text-xs text-[#687163] leading-relaxed">
                The returned product will be checked to confirm that it meets the return conditions.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC] space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1D241C] text-[#C69E58] flex items-center justify-center font-mono font-bold text-xs">
                4
              </div>
              <h3 className="font-serif text-base font-bold text-[#1D241C]">4. Refund</h3>
              <p className="text-xs text-[#687163] leading-relaxed">
                Once the return is approved, the applicable refund will be processed.
              </p>
            </div>
          </div>
        </div>

        {/* Return Conditions */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#1D241C]">Return Guidelines</h3>
          <ul className="text-xs sm:text-sm text-[#687163] space-y-2 list-disc list-inside leading-relaxed pl-1">
            <li>The product should be unused and in its original condition.</li>
            <li>Original tags and packaging should be retained where applicable.</li>
            <li>Return requests must be submitted within the applicable return period.</li>
            <li>Some products may not be eligible for return or exchange.</li>
            <li>Return eligibility may depend on the product and reason for return.</li>
          </ul>
        </div>

        {/* Damaged or Incorrect Products & Refunds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#1D241C]">
              Damaged or Incorrect Product
            </h3>
            <p className="text-xs sm:text-sm text-[#687163] leading-relaxed">
              If you receive a damaged, defective, or incorrect product, please contact us as soon as possible with your order details. We will review the issue and provide an appropriate resolution.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#1D241C]">
              Refunds
            </h3>
            <p className="text-xs sm:text-sm text-[#687163] leading-relaxed">
              Approved refunds will generally be processed to the original payment method. The time taken for the refund to appear may vary depending on the payment service or financial institution.
            </p>
          </div>
        </div>

        {/* Contact Support Help Box */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#506040]/10 flex items-center justify-center text-[#506040] shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#1D241C]">
                Need Help?
              </h3>
              <p className="text-xs text-[#687163] mt-0.5">
                For questions about returns or refunds, please contact our support team.
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

export default ReturnsPolicyPage;
