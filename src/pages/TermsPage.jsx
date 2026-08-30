import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, ChevronRight, Truck, RotateCcw, CreditCard, Headphones, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const TermsPage = () => {
  const { freeShippingThreshold = 5000, shippingFee = 30 } = useCart();

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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#506040]/15 text-[#506040] text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg border border-[#506040]/30">
            <FileText className="w-3.5 h-3.5 text-[#506040]" />
            Official Terms of Service
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D241C]">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] max-w-2xl leading-relaxed">
            Welcome to Murari&apos;s Glam &amp; Glow. By accessing our platform, creating an account, or placing an order, you agree to the following terms and commercial policies.
          </p>
        </div>

        {/* Highlight Summary Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#506040]/10 flex items-center justify-center text-[#506040] shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1D241C]">₹{shippingFee} Flat Shipping</div>
              <div className="text-[11px] text-[#687163]">Free &gt; ₹{freeShippingThreshold.toLocaleString('en-IN')}</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#506040]/10 flex items-center justify-center text-[#506040] shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1D241C]">7-Day Returns</div>
              <div className="text-[11px] text-[#687163]">Hassle-free pickups</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#506040]/10 flex items-center justify-center text-[#506040] shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1D241C]">UPI &amp; COD Accepted</div>
              <div className="text-[11px] text-[#687163]">100% secure checkout</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#506040]/10 flex items-center justify-center text-[#506040] shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1D241C]">Verified Privacy</div>
              <div className="text-[11px] text-[#687163]">Protected data &amp; auth</div>
            </div>
          </div>
        </div>

        {/* Terms Content Body */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-8 text-xs sm:text-sm text-[#687163] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">1. Account Registration &amp; Security</h2>
            <p>
              To add items to your shopping cart, save favorite pieces to your wishlist, or complete a purchase, customers must register for a verified account. You agree to provide accurate, up-to-date contact information and are responsible for safeguarding your login credentials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">2. Product Catalog, Availability &amp; Pricing</h2>
            <p>
              We curate premium women&apos;s and kids&apos; apparel, footwear, and lifestyle accessories. While we strive to display fabrics, cuts, and color shades with complete fidelity, actual fabric hues may vary slightly across different device displays.
            </p>
            <p>
              All prices are listed in Indian Rupees (₹ INR) and include all applicable Goods and Services Taxes (GST). We reserve the right to revise pricing, promotional discounts, and inventory availability without prior notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">3. Order Confirmation &amp; Payment Processing</h2>
            <p>
              Upon placing an order, you will receive an immediate digital order summary and confirmation email. We support all major payment gateways including UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, Net Banking, and Cash on Delivery (COD) across verified postal zones.
            </p>
            <p>
              If an item becomes out of stock after order submission due to simultaneous demand, our fulfillment team will notify you promptly and initiate a 100% refund immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">4. Shipping, Transit &amp; Delivery</h2>
            <p>
              Orders are dispatched from our warehouse within 24 to 48 hours. Standard pan-India delivery typically takes 2 to 5 business days. A nominal flat shipping charge of ₹{shippingFee} applies for orders under ₹{freeShippingThreshold.toLocaleString('en-IN')}, and free shipping applies automatically to all orders above ₹{freeShippingThreshold.toLocaleString('en-IN')}.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">5. 7-Day Returns, Exchanges &amp; Refunds</h2>
            <p>
              If you need a different size or are not completely satisfied with your order, you can initiate a return or exchange request within 7 days of receiving your package. Returned garments must remain unused, unwashed, with all original price tags and packaging intact.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">6. Intellectual Property &amp; Brand Rights</h2>
            <p>
              All trademarks, product photography, editorial copy, design graphics, and digital assets featured on this platform are the exclusive intellectual property of Murari&apos;s Glam &amp; Glow and may not be reproduced without written authorization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">7. Customer Care &amp; Grievances</h2>
            <p>
              For questions regarding your order status, terms, or returns, please reach out to our dedicated support team at{' '}
              <a href="mailto:support@murarisglamglow.com" className="text-[#506040] font-semibold underline">
                support@murarisglamglow.com
              </a>{' '}
              or visit our <Link to="/contact" className="text-[#506040] font-semibold underline">Contact Support Page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
