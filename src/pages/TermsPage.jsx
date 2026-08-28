import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, ChevronRight } from 'lucide-react';

export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F6F3] py-8 lg:py-16 animate-fade-in font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B6B6B]">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1A1A1A] font-semibold">Terms of Service</span>
        </nav>

        {/* Header Hero Card */}
        <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-8 sm:p-12 shadow-2xs space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C8A87C]/15 text-[#A68758] text-[10px] font-mono font-bold tracking-widest uppercase rounded-xs">
            <FileText className="w-3.5 h-3.5 text-[#C8A87C]" />
            Legal & Patron Governance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A]">
            Terms of Service & Conditions
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-2xl leading-relaxed">
            Effective Date: January 1, 2026. These Terms of Service govern your relationship with SUMILUX Studio Ltd. and define the terms under which you access our digital showroom and acquire our tailored apparel.
          </p>
        </div>

        {/* Terms Content Body */}
        <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-8 sm:p-14 shadow-2xs space-y-8 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">1. Atelier Scope & Account Creation</h2>
            <p>
              By accessing the SUMILUX digital boutique, opening a patron account, or completing an order, you confirm that you are at least 18 years old and agree to be bound by these Terms of Service. You are solely responsible for safeguarding the credentials associated with your account.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">2. Product Descriptions & Pricing Accuracy</h2>
            <p>
              We take great care to ensure that the descriptions, measurements, imagery, and compositions of our garments are accurate. However, because our pieces are hand-finished using natural organic fibers and vegetable-tanned leathers, subtle textural nuances are intrinsic characteristics of artisanal craftsmanship.
            </p>
            <p>
              All prices are listed in USD (or your selected localized currency) and are inclusive of standard applicable duties for DDP destinations. We reserve the right to correct typographical pricing errors before order dispatch.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">3. Order Acceptance & Fraud Prevention</h2>
            <p>
              Submission of an order represents an offer to purchase. Order acceptance occurs when we transmit a formal dispatch confirmation containing tracking credentials. SUMILUX utilizes automated machine-learning fraud detection and card tokenization; orders flagged for irregular velocity or unauthorized card use will be suspended pending verification.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">4. Intellectual Property Rights</h2>
            <p>
              All trademarks, logotypes, garment pattern blueprints, editorial photography, typography, and codebases associated with SUMILUX are the exclusive intellectual property of SUMILUX Studio Ltd. Any unauthorized reproduction, scraping, or commercial exploitation is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, SUMILUX shall not be liable for indirect, incidental, punitive, or consequential damages resulting from the use or inability to use our services. Our aggregate liability for any claim arising under these Terms shall not exceed the amount paid for the specific garment order.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">6. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California and the United Kingdom, without regard to conflict of law principles. Any dispute shall be settled by binding confidential arbitration in San Francisco, California or London, UK.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
