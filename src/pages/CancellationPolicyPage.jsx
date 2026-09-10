import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, Clock, CheckCircle2, ChevronRight, CreditCard, Headphones, ArrowRight, Package, AlertCircle } from 'lucide-react';

export const CancellationPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 lg:py-16 animate-fade-in font-sans text-[#1D241C]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#687163]">
          <Link to="/" className="hover:text-[#1D241C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1D241C] font-semibold">Cancellation, Return &amp; Refund Policy</span>
        </nav>

        {/* Header Hero Card */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#506040]/15 text-[#506040] text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg border border-[#506040]/30">
              <RotateCcw className="w-3.5 h-3.5 text-[#506040]" />
              Customer-Friendly Policy
            </span>
            <span className="text-[11px] text-[#687163] font-mono">
              Last Updated: September 1, 2026
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D241C]">
            Cancellation, Return &amp; Refund Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] max-w-2xl leading-relaxed">
            At <strong>Murari&apos;s Glam &amp; Glow</strong>, we want you to have a smooth shopping experience. This policy explains how cancellations, returns, exchanges, and refunds are handled.
          </p>
        </div>

        {/* 3 Pillar Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-2">
            <Clock className="w-5 h-5 text-[#506040]" />
            <h3 className="font-serif text-base font-bold text-[#1D241C]">Cancellation</h3>
            <p className="text-xs text-[#687163] leading-relaxed">
              Orders may be cancelled before they are processed or dispatched.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-2">
            <RotateCcw className="w-5 h-5 text-[#506040]" />
            <h3 className="font-serif text-base font-bold text-[#1D241C]">Returns</h3>
            <p className="text-xs text-[#687163] leading-relaxed">
              Eligible products may be returned within the applicable return period.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-2">
            <CreditCard className="w-5 h-5 text-[#506040]" />
            <h3 className="font-serif text-base font-bold text-[#1D241C]">Refunds</h3>
            <p className="text-xs text-[#687163] leading-relaxed">
              Approved refunds are processed to the original payment method where applicable.
            </p>
          </div>
        </div>

        {/* Detailed Policy Content */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-8 text-xs sm:text-sm text-[#687163] leading-relaxed">
          {/* Section 1: Order Cancellation */}
          <section className="space-y-3 border-b border-[#E8E4DC] pb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">
              1. Order Cancellation
            </h2>
            <p>
              Customers can request cancellation before the order is processed or dispatched. Once an order has been dispatched, cancellation may no longer be possible.
            </p>
            <p>
              To request cancellation, contact customer support or use the cancellation option available in your account, if provided.
            </p>
            <p>
              Any eligible refund will be processed after cancellation is confirmed.
            </p>
          </section>

          {/* Section 2: Returns & Exchanges */}
          <section className="space-y-3 border-b border-[#E8E4DC] pb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">
              2. Returns &amp; Exchanges
            </h2>
            <p>
              Eligible products may be returned or exchanged according to our return conditions:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Product should generally be unused and in acceptable condition.</li>
              <li>Original tags and packaging should be retained where applicable.</li>
              <li>Return requests must be made within the applicable return period.</li>
              <li>Certain products may not be eligible for return or exchange.</li>
            </ul>
            <p className="pt-1">
              Return eligibility may vary depending on the product.
            </p>
          </section>

          {/* Section 3: Refunds */}
          <section className="space-y-3 border-b border-[#E8E4DC] pb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">
              3. Refunds
            </h2>
            <p>
              Once a return or cancellation is approved, the applicable refund will be processed using the original payment method where possible.
            </p>
            <p>
              Refund processing time may vary depending on the payment method and financial institution.
            </p>
          </section>

          {/* Section 4: Damaged, Defective or Incorrect Products */}
          <section className="space-y-3 border-b border-[#E8E4DC] pb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">
              4. Damaged, Defective or Incorrect Products
            </h2>
            <p>
              If you receive a damaged, defective, or incorrect product, please contact us as soon as possible after delivery with the relevant order details and, where helpful, photographs of the issue.
            </p>
            <p>
              We will review the issue and provide an appropriate resolution based on the circumstances and applicable return conditions.
            </p>
          </section>

          {/* Section 5: Non-Returnable Products */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">
              5. Non-Returnable Products
            </h2>
            <p>
              Some products may not be eligible for return or exchange due to their nature, hygiene considerations, customization, or other applicable conditions. Any such restrictions will be communicated on the relevant product page where applicable.
            </p>
          </section>
        </div>

        {/* Contact Support Help Box */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#506040]/10 flex items-center justify-center text-[#506040] shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#1D241C]">
                Need Help With Your Order?
              </h3>
              <p className="text-xs text-[#687163] mt-0.5">
                If you have questions about cancellation, returns, exchanges, or refunds, please contact our customer support team.
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

export default CancellationPolicyPage;
