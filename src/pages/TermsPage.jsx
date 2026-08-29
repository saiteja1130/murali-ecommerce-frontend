import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, ChevronRight } from 'lucide-react';

export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 lg:py-16 animate-fade-in font-sans text-[#1D241C]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#687163]">
          <Link to="/" className="hover:text-[#1D241C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1D241C] font-semibold">Terms & Conditions</span>
        </nav>

        {/* Header Hero Card */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#506040]/15 text-[#506040] text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg border border-[#506040]/30">
            <FileText className="w-3.5 h-3.5 text-[#506040]" />
            Terms & Conditions
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D241C]">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] max-w-2xl leading-relaxed">
            Effective Date: January 1, 2026. Please read these terms carefully before using the Murari's Glam & Glow website or purchasing our products.
          </p>
        </div>

        {/* Terms Content Body */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-8 text-xs sm:text-sm text-[#687163] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">1. Account Registration</h2>
            <p>
              By creating an account or placing an order with Murari's Glam & Glow, you agree to provide accurate and complete contact details. You are responsible for keeping your login credentials and password confidential.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">2. Products & Pricing</h2>
            <p>
              We strive to display our product images, colors, and descriptions as accurately as possible. Please note that actual fabric colors may vary slightly depending on your screen settings and lighting.
            </p>
            <p>
              All prices are displayed in Indian Rupees (₹ INR) and include applicable taxes. We reserve the right to update product prices and availability at any time without prior notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">3. Orders & Payment</h2>
            <p>
              When you place an order, you will receive an order confirmation email and SMS. We accept payments via UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery where applicable.
            </p>
            <p>
              If an item is unexpectedly out of stock after your order is placed, we will notify you promptly and issue a full refund immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">4. Shipping & Delivery</h2>
            <p>
              Orders are typically dispatched within 1–2 business days. Estimated delivery times are 3–7 business days depending on your location. You will receive live tracking information once your package has been shipped.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">5. Returns & Refunds</h2>
            <p>
              We want you to love what you wear. If you are not satisfied with your purchase, you can request an easy return or exchange within 7 days of delivery. Items must be unused, unwashed, and in their original packaging with tags intact.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">6. Contact & Support</h2>
            <p>
              If you have any questions or need help with your order, please email us at{' '}
              <a href="mailto:support@murarisglamandglow.com" className="text-[#506040] font-semibold underline">
                support@murarisglamandglow.com
              </a>{' '}
              or reach out via our Help Center.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
