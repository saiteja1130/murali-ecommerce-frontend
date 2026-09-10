import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronRight, Truck, RotateCcw, CreditCard, ShoppingBag, Headphones } from 'lucide-react';

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
          <span className="text-[#1D241C] font-semibold">Terms &amp; Conditions</span>
        </nav>

        {/* Header Hero Card */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#506040]/15 text-[#506040] text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg border border-[#506040]/30">
              <FileText className="w-3.5 h-3.5 text-[#506040]" />
              Terms of Service
            </span>
            <span className="text-[11px] text-[#687163] font-mono">
              Last Updated: September 1, 2026
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D241C]">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] max-w-2xl leading-relaxed">
            By using our website or mobile application and placing an order, you agree to these Terms &amp; Conditions.
          </p>
        </div>

        {/* Highlight Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#506040]/10 flex items-center justify-center text-[#506040] shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1D241C]">Orders</div>
              <div className="text-[11px] text-[#687163]">Accurate details required</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#506040]/10 flex items-center justify-center text-[#506040] shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1D241C]">Payments</div>
              <div className="text-[11px] text-[#687163]">Available checkout options</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#506040]/10 flex items-center justify-center text-[#506040] shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1D241C]">Shipping</div>
              <div className="text-[11px] text-[#687163]">Charges shown at checkout</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#506040]/10 flex items-center justify-center text-[#506040] shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1D241C]">Returns</div>
              <div className="text-[11px] text-[#687163]">Per return policy terms</div>
            </div>
          </div>
        </div>

        {/* Terms Content Body */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-8 text-xs sm:text-sm text-[#687163] leading-relaxed">
          {/* 1. Account */}
          <section className="space-y-2 border-b border-[#E8E4DC] pb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">
              1. Account
            </h2>
            <p>
              Customers are responsible for providing accurate information when creating an account and for keeping their login details secure.
            </p>
          </section>

          {/* 2. Products & Pricing */}
          <section className="space-y-2 border-b border-[#E8E4DC] pb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">
              2. Products &amp; Pricing
            </h2>
            <p>
              Product information, images, availability, and prices are provided as accurately as possible. Prices and product availability may change when necessary.
            </p>
            <p>
              Product colors may appear slightly different depending on the customer&apos;s device or screen.
            </p>
          </section>

          {/* 3. Orders & Payments */}
          <section className="space-y-2 border-b border-[#E8E4DC] pb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">
              3. Orders &amp; Payments
            </h2>
            <p>
              After placing an order, you will receive order information or confirmation where applicable.
            </p>
            <p>
              We may cancel or decline an order if there is an issue with product availability, pricing, order information, or payment.
            </p>
          </section>

          {/* 4. Shipping & Delivery */}
          <section className="space-y-2 border-b border-[#E8E4DC] pb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">
              4. Shipping &amp; Delivery
            </h2>
            <p>
              Orders are processed and delivered according to the shipping information provided at checkout.
            </p>
            <p>
              Delivery times may vary depending on location, product availability, and other delivery conditions.
            </p>
            <p>
              For more information, customers can refer to our{' '}
              <Link to="/shipping-policy" className="text-[#506040] font-semibold underline hover:text-[#1D241C]">
                Shipping Policy
              </Link>.
            </p>
          </section>

          {/* 5. Returns, Exchanges & Refunds */}
          <section className="space-y-2 border-b border-[#E8E4DC] pb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">
              5. Returns, Exchanges &amp; Refunds
            </h2>
            <p>
              Returns, exchanges, cancellations, and refunds are handled according to our applicable policies.
            </p>
            <p>
              Customers should review our{' '}
              <Link to="/returns-policy" className="text-[#506040] font-semibold underline hover:text-[#1D241C]">
                Returns &amp; Refund Policy
              </Link>{' '}
              and{' '}
              <Link to="/cancellation-policy" className="text-[#506040] font-semibold underline hover:text-[#1D241C]">
                Cancellation Policy
              </Link>{' '}
              before placing an order.
            </p>
          </section>

          {/* 6. User Responsibilities */}
          <section className="space-y-2 border-b border-[#E8E4DC] pb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">
              6. User Responsibilities
            </h2>
            <p>
              Customers should use the website and mobile application only for lawful purposes and should not attempt to misuse, damage, or interfere with the service.
            </p>
          </section>

          {/* 7. Intellectual Property */}
          <section className="space-y-2 border-b border-[#E8E4DC] pb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">
              7. Intellectual Property
            </h2>
            <p>
              Website content, product images, logos, designs, and other materials belong to the business or its respective owners and should not be copied or used without permission.
            </p>
          </section>

          {/* 8. Contact Us */}
          <section className="space-y-2">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">
              8. Contact Us
            </h2>
            <p>
              For questions about these Terms &amp; Conditions or your order, please contact our support team at{' '}
              <a href="mailto:murariglamandglow@gmail.com" className="text-[#506040] font-semibold underline hover:text-[#1D241C]">
                murariglamandglow@gmail.com
              </a>{' '}
              or through our{' '}
              <Link to="/contact" className="text-[#506040] font-semibold underline hover:text-[#1D241C]">
                Contact Page
              </Link>.
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
                Questions About Our Terms?
              </h3>
              <p className="text-xs text-[#687163] mt-0.5">
                Our support team is happy to assist you with any questions.
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

export default TermsPage;
