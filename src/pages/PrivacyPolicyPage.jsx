import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, FileText, Mail, CheckCircle2, ArrowLeft, Sparkles, Cookie, RefreshCw, Clock } from 'lucide-react';
export const PrivacyPolicyPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [cookieAnalytics, setCookieAnalytics] = useState(true);
    const [cookieMarketing, setCookieMarketing] = useState(false);
    const [cookieSaved, setCookieSaved] = useState(false);
    const handleSaveCookiePreferences = () => {
        setCookieSaved(true);
        setTimeout(() => setCookieSaved(false), 3000);
    };
    return (<div className="min-h-screen bg-[#F8F6F3] py-8 lg:py-14 animate-fade-in text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-6">
          <button onClick={() => navigate('/')} className="hover:text-[#1A1A1A] transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-[#1A1A1A] font-semibold">Privacy & Data Governance</span>
        </div>

        {/* Page Header */}
        <div className="pb-8 border-b border-[#E8E3DE] mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A87C] mb-2">
              <ShieldCheck className="w-4 h-4"/>
              <span>Sumilux Legal & Data Trust</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight">
              Privacy Policy & Security Charter
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-2 max-w-2xl">
              Last updated: January 2026. How we protect your personal data, ensure confidential showroom interactions, and maintain strict GDPR & CCPA compliance.
            </p>
          </div>

          <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8E3DE] hover:border-[#C8A87C] text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] rounded-xs shadow-2xs transition-colors self-start md:self-auto">
            <ArrowLeft className="w-4 h-4"/>
            <span>Return to Boutique</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-2 sticky top-24">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B] block px-3 py-1">
                Charter Sections
              </span>

              <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xs text-xs font-semibold transition-colors text-left ${activeTab === 'overview'
            ? 'bg-[#1A1A1A] text-white'
            : 'text-[#1A1A1A] hover:bg-[#F8F6F3]'}`}>
                <FileText className="w-4 h-4"/>
                <span>1. Overview & Commitment</span>
              </button>

              <button onClick={() => setActiveTab('collection')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xs text-xs font-semibold transition-colors text-left ${activeTab === 'collection'
            ? 'bg-[#1A1A1A] text-white'
            : 'text-[#1A1A1A] hover:bg-[#F8F6F3]'}`}>
                <Eye className="w-4 h-4"/>
                <span>2. Information We Collect</span>
              </button>

              <button onClick={() => setActiveTab('cookies')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xs text-xs font-semibold transition-colors text-left ${activeTab === 'cookies'
            ? 'bg-[#1A1A1A] text-white'
            : 'text-[#1A1A1A] hover:bg-[#F8F6F3]'}`}>
                <Cookie className="w-4 h-4"/>
                <span>3. Cookies & Preferences</span>
              </button>

              <button onClick={() => setActiveTab('rights')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xs text-xs font-semibold transition-colors text-left ${activeTab === 'rights'
            ? 'bg-[#1A1A1A] text-white'
            : 'text-[#1A1A1A] hover:bg-[#F8F6F3]'}`}>
                <Lock className="w-4 h-4"/>
                <span>4. Your Privacy Rights (GDPR/CCPA)</span>
              </button>

              <button onClick={() => setActiveTab('contact')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xs text-xs font-semibold transition-colors text-left ${activeTab === 'contact'
            ? 'bg-[#1A1A1A] text-white'
            : 'text-[#1A1A1A] hover:bg-[#F8F6F3]'}`}>
                <Mail className="w-4 h-4"/>
                <span>5. Contact Privacy Concierge</span>
              </button>
            </div>

            {/* Security Guarantee Box */}
            <div className="bg-[#E8D5D0]/30 p-5 rounded-[4px] border border-[#E8E3DE] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#C8A87C]"/>
                <span>Zero Data Selling Pledge</span>
              </div>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                SUMILUX does not sell, rent, or trade client personal information or measurement data to third-party data brokers under any circumstances.
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Clauses & Interactive Controls */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 1: Overview */}
            {(activeTab === 'overview' || activeTab === 'collection' || activeTab === 'cookies' || activeTab === 'rights' || activeTab === 'contact') && (<div className="bg-white p-6 sm:p-8 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-6">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-3">
                    1. Our Privacy Philosophy & Commitment
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                    At SUMILUX (operated by SUMILUX Studio Ltd., 12 Mayfair Gardens, London, UK), we view discretion and privacy as integral components of the modern luxury experience. When you browse our digital showroom, save items to your personal wishlist, or acquire bespoke wardrobe pieces, we handle your personal data with the utmost confidentiality and high-grade cryptographic security.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE] space-y-1">
                    <Lock className="w-4 h-4 text-[#C8A87C]"/>
                    <h3 className="text-xs font-bold text-[#1A1A1A]">256-Bit SSL Encryption</h3>
                    <p className="text-[11px] text-[#6B6B6B]">All transactions and logins are shielded via bank-grade TLS.</p>
                  </div>

                  <div className="p-4 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE] space-y-1">
                    <ShieldCheck className="w-4 h-4 text-[#C8A87C]"/>
                    <h3 className="text-xs font-bold text-[#1A1A1A]">GDPR & CCPA Compliant</h3>
                    <p className="text-[11px] text-[#6B6B6B]">Full control over your data access, export, and deletion.</p>
                  </div>

                  <div className="p-4 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE] space-y-1">
                    <Clock className="w-4 h-4 text-[#C8A87C]"/>
                    <h3 className="text-xs font-bold text-[#1A1A1A]">Minimal Data Retention</h3>
                    <p className="text-[11px] text-[#6B6B6B]">We only retain data necessary for order delivery and service.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E3DE]">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-3">
                    2. Personal Data We Collect & How We Use It
                  </h2>
                  <div className="space-y-4 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                    <p>
                      We collect information that you explicitly provide when interacting with our boutique:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      <li>
                        <strong className="text-[#1A1A1A]">Patron Profile & Account Credentials:</strong> Your full name, email address, password hashes, and saved garment sizing preferences.
                      </li>
                      <li>
                        <strong className="text-[#1A1A1A]">Commerce & Shipping Information:</strong> Physical delivery address, telephone contact for DHL courier updates, and transaction logs.
                      </li>
                      <li>
                        <strong className="text-[#1A1A1A]">Payment Security:</strong> Credit card and digital wallet details are processed directly by certified PCI-DSS Level 1 payment processors (e.g. Stripe, Apple Pay). SUMILUX never stores raw card numbers.
                      </li>
                      <li>
                        <strong className="text-[#1A1A1A]">Styling & Wishlist Interactions:</strong> Products you favorite, lookbooks you view, and custom notes added to order gift wrappings.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section 3: Interactive Cookie Controls */}
                <div className="pt-4 border-t border-[#E8E3DE]">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-3">
                    3. Cookies & Tracking Technologies
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-4">
                    We use strictly necessary cookies to keep your shopping bag intact, authenticate patron account logins, and remember your preferred currency. You can adjust optional analytical cookies below:
                  </p>

                  <div className="bg-[#F8F6F3] p-5 rounded-xs border border-[#E8E3DE] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#1A1A1A] block">Essential Session Cookies (Required)</span>
                        <span className="text-[11px] text-[#6B6B6B]">Required for cart items, currency conversion, and checkout security.</span>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 bg-white px-2.5 py-1 rounded-xs border border-[#E8E3DE]">
                        Always Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#E8E3DE]">
                      <div>
                        <span className="text-xs font-bold text-[#1A1A1A] block">Performance & Experience Analytics</span>
                        <span className="text-[11px] text-[#6B6B6B]">Allows us to optimize image loading speeds and refine boutique navigation.</span>
                      </div>
                      <input type="checkbox" checked={cookieAnalytics} onChange={(e) => setCookieAnalytics(e.target.checked)} className="rounded border-[#E8E3DE] text-[#C8A87C] focus:ring-[#C8A87C] w-4 h-4"/>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#E8E3DE]">
                      <div>
                        <span className="text-xs font-bold text-[#1A1A1A] block">Private Showroom Editorial Alerts</span>
                        <span className="text-[11px] text-[#6B6B6B]">Enables personalized capsule notifications based on your silhouette favorites.</span>
                      </div>
                      <input type="checkbox" checked={cookieMarketing} onChange={(e) => setCookieMarketing(e.target.checked)} className="rounded border-[#E8E3DE] text-[#C8A87C] focus:ring-[#C8A87C] w-4 h-4"/>
                    </div>

                    <div className="pt-3 border-t border-[#E8E3DE] flex items-center justify-between">
                      <button onClick={handleSaveCookiePreferences} className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-2xs flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5"/>
                        <span>Save Cookie Preferences</span>
                      </button>

                      {cookieSaved && (<span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4"/>
                          <span>Preferences Updated</span>
                        </span>)}
                    </div>
                  </div>
                </div>

                {/* Section 4: Your Rights */}
                <div className="pt-4 border-t border-[#E8E3DE]">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-3">
                    4. Your Statutory Privacy Rights
                  </h2>
                  <div className="space-y-3 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                    <p>
                      Regardless of your global location, SUMILUX grants all patrons comprehensive rights under European GDPR and California CCPA frameworks:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE]">
                        <strong className="text-[#1A1A1A] block mb-1">Right to Access & Portability</strong>
                        <span>Request a structured copy of all personal records associated with your account.</span>
                      </div>
                      <div className="p-3 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE]">
                        <strong className="text-[#1A1A1A] block mb-1">Right to Erasure (Be Forgotten)</strong>
                        <span>Request immediate, permanent deletion of your profile and history from our systems.</span>
                      </div>
                      <div className="p-3 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE]">
                        <strong className="text-[#1A1A1A] block mb-1">Right to Rectification</strong>
                        <span>Instantly correct or update any address or sizing detail through your account portal.</span>
                      </div>
                      <div className="p-3 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE]">
                        <strong className="text-[#1A1A1A] block mb-1">Opt-Out of Newsletters</strong>
                        <span>Unsubscribe with a single click at the footer of any editorial email dispatch.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 5: Contact Concierge */}
                <div className="pt-4 border-t border-[#E8E3DE]">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-3">
                    5. Contact Our Data Protection Concierge
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-4">
                    For inquiries concerning data security, right-to-be-forgotten requests, or general compliance questions, our dedicated Data Privacy Officer is available directly:
                  </p>

                  <div className="bg-[#F8F6F3] p-5 rounded-xs border border-[#E8E3DE] space-y-2 text-xs">
                    <p className="text-[#1A1A1A]">
                      <strong>Legal Entity:</strong> SUMILUX Studio Ltd.
                    </p>
                    <p className="text-[#1A1A1A]">
                      <strong>Data Governance Officer:</strong> privacy@sumilux.com
                    </p>
                    <p className="text-[#1A1A1A]">
                      <strong>Atelier Address:</strong> 12 Mayfair Gardens, London W1K 4QT, United Kingdom
                    </p>
                    <p className="text-[#6B6B6B]">
                      <strong>Response Commitment:</strong> Formal inquiries are acknowledged and addressed within 48 business hours.
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>);
};
