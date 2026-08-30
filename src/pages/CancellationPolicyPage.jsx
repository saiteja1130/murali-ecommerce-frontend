import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, Clock, ShieldCheck, CheckCircle2, AlertCircle, ChevronRight, CreditCard, Headphones, ArrowRight, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CancellationPolicyPage = () => {
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
          <span className="text-[#1D241C] font-semibold">Cancellation &amp; Refund Policy</span>
        </nav>

        {/* Header Hero Card */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#506040]/15 text-[#506040] text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg border border-[#506040]/30">
            <RotateCcw className="w-3.5 h-3.5 text-[#506040]" />
            Razorpay Merchant &amp; Consumer Protection Policy
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D241C]">
            Cancellation, Return &amp; Refund Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] max-w-2xl leading-relaxed">
            At Murari&apos;s Glam &amp; Glow, we stand behind the craftsmanship of every garment and accessory. Below is our transparent, customer-first policy regarding cancellations, returns, and refund processing.
          </p>
        </div>

        {/* 3 Pillar Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-2">
            <Clock className="w-5 h-5 text-[#506040]" />
            <h3 className="font-serif text-base font-bold text-[#1D241C]">60-Minute Cancellation</h3>
            <p className="text-xs text-[#687163] leading-relaxed">
              Orders can be cancelled or edited free of charge within 60 minutes of placement before dispatch.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-2">
            <RotateCcw className="w-5 h-5 text-[#506040]" />
            <h3 className="font-serif text-base font-bold text-[#1D241C]">7-Day Easy Returns</h3>
            <p className="text-xs text-[#687163] leading-relaxed">
              Request a return or size exchange within 7 days of receiving your package with doorstep courier pickup.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-2">
            <CreditCard className="w-5 h-5 text-[#506040]" />
            <h3 className="font-serif text-base font-bold text-[#1D241C]">24–48 Hr Refund Release</h3>
            <p className="text-xs text-[#687163] leading-relaxed">
              Refunds are initiated back to your original payment source (UPI, Card, Bank) as soon as returned items are verified.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-8 text-xs sm:text-sm text-[#687163] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3 border-b border-[#E8E4DC] pb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">1. Order Cancellation Terms</h2>
            <p>
              <strong>Before Dispatch:</strong> Customers may cancel an order within <strong>60 minutes</strong> of placing it on our website. To cancel, visit your Account &gt; My Orders or contact customer support. A 100% full refund will be processed immediately.
            </p>
            <p>
              <strong>After Dispatch:</strong> Once an order is processed, packed, and handed over to our courier partner (BlueDart, Delhivery, DTDC), it cannot be cancelled in transit. In such cases, customers may refuse delivery at doorstep or initiate a 7-day return upon arrival.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-b border-[#E8E4DC] pb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">2. Return &amp; Exchange Eligibility</h2>
            <p>We accept returns and size exchanges under the following conditions:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Return request must be initiated within <strong>7 days</strong> from the date of package delivery.</li>
              <li>Garments and accessories must remain <strong>unworn, unwashed, and undamaged</strong> with all original brand tags, security loops, and packaging intact.</li>
              <li>Free doorstep pickup will be arranged by our logistics partner across India.</li>
            </ul>
          </section>

          {/* Section 3: Refund Timeline & Payment Gateway Method */}
          <section className="space-y-3 border-b border-[#E8E4DC] pb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">3. Refund Timelines &amp; Mode of Settlement</h2>
            <p>
              Once your returned item arrives at our fulfillment facility, our quality team inspects the piece within 24 hours. Upon approval, your refund will be disbursed as follows:
            </p>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E4DC] bg-[#FAF8F5] text-[10px] uppercase tracking-wider text-[#687163]">
                    <th className="py-3 px-4 font-semibold">Payment Method</th>
                    <th className="py-3 px-4 font-semibold">Refund Settlement Mode</th>
                    <th className="py-3 px-4 font-semibold text-right">Settlement TAT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E4DC]">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-[#1D241C]">UPI (Google Pay, PhonePe, Paytm)</td>
                    <td className="py-3.5 px-4">Direct Credit to Original VPA / UPI Account</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-[#506040]">Instant to 24 Hours</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-[#1D241C]">Debit &amp; Credit Cards</td>
                    <td className="py-3.5 px-4">Reversal via Razorpay Gateway to Issuing Bank</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-[#506040]">3 – 5 Business Days</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-[#1D241C]">Net Banking</td>
                    <td className="py-3.5 px-4">Direct Bank Account Credit</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-[#506040]">2 – 4 Business Days</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-[#1D241C]">Cash on Delivery (COD)</td>
                    <td className="py-3.5 px-4">Direct Bank Transfer (NEFT/IMPS) or UPI Transfer</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-[#506040]">1 – 2 Business Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C]">4. Damaged or Defective Items</h2>
            <p>
              In the rare event that an item arrives damaged, defective, or incorrect, please notify us within <strong>48 hours</strong> of delivery with a photo of the defect. We will immediately dispatch a free replacement or issue a 100% full refund without requiring return shipping costs.
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
              <h3 className="font-serif text-base font-bold text-[#1D241C]">Need Help with a Cancellation or Return?</h3>
              <p className="text-xs text-[#687163]">
                Our dedicated support desk is available Monday to Saturday, 9:00 AM – 8:00 PM IST.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1D241C] hover:bg-[#506040] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shrink-0 shadow-xs"
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
