import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  Mail,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Cookie,
  RefreshCw,
  Clock,
  ChevronRight,
  Download,
  Printer,
  UserCheck,
  Database,
  ExternalLink,
  Share2,
  Building2,
  Smartphone,
  UserX,
  Receipt,
  Scale
} from 'lucide-react';

export const PrivacyPolicyPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [cookieAnalytics, setCookieAnalytics] = useState(() => {
    const saved = localStorage.getItem('sumilux_cookie_analytics');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [cookieMarketing, setCookieMarketing] = useState(() => {
    const saved = localStorage.getItem('sumilux_cookie_marketing');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [cookieSaved, setCookieSaved] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Scrollspy to highlight active sidebar item on scroll
  useEffect(() => {
    const sectionIds = [
      'overview',
      'collection',
      'usage-sharing',
      'cookies',
      'rights-retention',
      'children',
      'grievance'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSaveCookiePreferences = () => {
    localStorage.setItem('sumilux_cookie_analytics', JSON.stringify(cookieAnalytics));
    localStorage.setItem('sumilux_cookie_marketing', JSON.stringify(cookieMarketing));
    setCookieSaved(true);
    setTimeout(() => setCookieSaved(false), 3500);
  };

  const handleExportDataArchive = () => {
    const patronData = {
      client: 'SUMILUX Verified Patron',
      timestamp: new Date().toISOString(),
      governance: 'GDPR / CCPA / DPDP India Privacy & Portability Charter (Article 20)',
      encryptionStandard: 'AES-256 TLS 1.3',
      storedAttributes: {
        preferences: {
          currency: 'INR / USD / GBP',
          analyticsConsent: cookieAnalytics,
          marketingConsent: cookieMarketing,
        },
        dataRetentionPolicy: 'Active session + 36 months audit trail for statutory tax and anti-fraud verification'
      }
    };

    const blob = new Blob([JSON.stringify(patronData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sumilux-patron-privacy-export-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'overview', label: '1. Overview & Business Scope', icon: FileText },
    { id: 'collection', label: '2. Information We Collect', icon: Eye },
    { id: 'usage-sharing', label: '3. Data Usage & Sharing', icon: Share2 },
    { id: 'cookies', label: '4. Cookies & Device Ad IDs', icon: Cookie },
    { id: 'rights-retention', label: '5. Rights & Data Retention', icon: Lock },
    { id: 'children', label: '6. Age Policy (18+) & Minors', icon: UserX },
    { id: 'grievance', label: '7. Statutory Grievance Redressal', icon: Scale },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F3] py-8 lg:py-16 animate-fade-in font-sans text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B6B6B]">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1A1A1A] font-semibold">Privacy Policy & Security Charter</span>
        </nav>

        {/* Page Header Hero Card */}
        <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-8 sm:p-12 shadow-2xs flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C8A87C]/15 text-[#A68758] text-[10px] font-mono font-bold tracking-widest uppercase rounded-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8A87C]" />
              Sumilux Legal & Data Trust
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
              Privacy Policy & Security Charter
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              Effective Date: January 2026 (Last Updated: April 2026). How SUMILUX Studio Ltd. and its affiliates collect, safeguard, and process your personal data in strict compliance with the Digital Personal Data Protection (DPDP) Act, Information Technology Act 2000, GDPR, UK-GDPR, and CCPA.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap self-start md:self-auto shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] hover:border-[#1A1A1A] text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] rounded-xs transition-colors cursor-pointer"
              title="Print Charter"
            >
              <Printer className="w-4 h-4 text-[#6B6B6B]" />
              <span>Print</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Boutique</span>
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            <div className="bg-white p-5 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-2">
              <div className="flex items-center justify-between px-3 py-1 border-b border-[#F2EFE9] pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B]">
                  Charter Sections
                </span>
                <span className="text-[10px] font-mono text-[#A68758]">7 Clauses</span>
              </div>

              <div className="space-y-1 pt-1">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeTab === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xs text-xs font-semibold transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#1A1A1A] text-white shadow-xs'
                          : 'text-[#1A1A1A] hover:bg-[#F8F6F3] hover:text-[#C8A87C]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C8A87C]' : 'text-[#6B6B6B]'}`} />
                      <span className="truncate">{sec.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Zero Data Selling Pledge Box */}
            <div className="bg-white p-5 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#C8A87C]" />
                <span>Zero Data Selling Pledge</span>
              </div>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                SUMILUX does not sell, rent, monetize, or trade client personal data, body measurement metrics, or silhouette records to third-party data brokers.
              </p>
              <div className="pt-2 border-t border-[#F2EFE9] flex items-center gap-2 text-[11px] text-[#A68758] font-medium">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Patron Privacy Guaranteed</span>
              </div>
            </div>

            {/* Statutory Grievance Redressal Card */}
            <div className="bg-[#FAF8F5] p-5 rounded-[4px] border border-[#E8E3DE] space-y-2 text-xs">
              <div className="font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#C8A87C]" />
                <span>Grievance Redressal Officer</span>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                In compliance with the Information Technology Act 2000:
              </p>
              <div className="space-y-0.5 pt-1">
                <div className="font-semibold text-[#1A1A1A]">Mr. Karthik R.</div>
                <div className="text-[11px] text-[#6B6B6B]">Associate Director – Data Governance</div>
                <a
                  href="mailto:privacy.grievance@sumilux.com?subject=Privacy%20Grievance%20Escalation"
                  className="inline-flex items-center gap-1 font-semibold text-[#1A1A1A] hover:text-[#C8A87C] transition-colors pt-1"
                >
                  <span>privacy.grievance@sumilux.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Clauses & Interactive Controls */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 1: Overview & Scope */}
            <section
              id="overview"
              className="bg-white p-6 sm:p-10 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-6 scroll-mt-28"
            >
              <div className="border-b border-[#F2EFE9] pb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A68758] block mb-1">
                  Section 01
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  1. Our Privacy Philosophy, Scope & Business Restructuring
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                <p>
                  At SUMILUX (operated by SUMILUX Studio Ltd., 12 Mayfair Gardens, London, UK and its affiliates across India and international logistics hubs), we value the trust you place in us and recognize the importance of secure transactions and client discretion.
                </p>
                <p>
                  This Privacy Policy describes how we collect, use, share, and process your personal data through our digital boutique, mobile applications, and concierge platforms. By visiting our Platform, providing personal details, or acquiring our garments, you expressly agree to be bound by the terms of this Privacy Policy, our Terms of Service, and applicable laws of India (including the Digital Personal Data Protection Act 2023 and Information Technology Act 2000), UK-GDPR, and EU GDPR.
                </p>
              </div>

              {/* 3 Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE] space-y-1.5">
                  <Lock className="w-5 h-5 text-[#C8A87C]" />
                  <h3 className="text-xs font-bold text-[#1A1A1A]">256-Bit SSL Encryption</h3>
                  <p className="text-[11px] text-[#6B6B6B] leading-normal">
                    Bank-grade TLS 1.3 cryptographic protocols secure all checkout telemetry and patron logins.
                  </p>
                </div>

                <div className="p-4 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE] space-y-1.5">
                  <ShieldCheck className="w-5 h-5 text-[#C8A87C]" />
                  <h3 className="text-xs font-bold text-[#1A1A1A]">DPDP, GDPR & CCPA Compliant</h3>
                  <p className="text-[11px] text-[#6B6B6B] leading-normal">
                    Comprehensive patron control over data access, rectification, portability, and consent withdrawal.
                  </p>
                </div>

                <div className="p-4 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE] space-y-1.5">
                  <Clock className="w-5 h-5 text-[#C8A87C]" />
                  <h3 className="text-xs font-bold text-[#1A1A1A]">Minimal Data Retention</h3>
                  <p className="text-[11px] text-[#6B6B6B] leading-normal">
                    We only retain records necessary for delivery fulfillment, statutory audits, and fraud prevention.
                  </p>
                </div>
              </div>

              {/* Merger & Acquisition Clause */}
              <div className="p-4 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE] space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-[#1A1A1A]">
                  <Building2 className="w-4 h-4 text-[#C8A87C]" />
                  <span>Business Transfers, Mergers & Acquisitions</span>
                </div>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">
                  In the event that SUMILUX undergoes a business reorganization, amalgamation, asset sale, or merger with another corporate entity, patron records may be transferred as an essential business asset. Any acquiring entity or successor will remain strictly bound by the commitments and safeguards set forth in this Privacy Policy.
                </p>
              </div>
            </section>

            {/* Section 2: Information We Collect */}
            <section
              id="collection"
              className="bg-white p-6 sm:p-10 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-6 scroll-mt-28"
            >
              <div className="border-b border-[#F2EFE9] pb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A68758] block mb-1">
                  Section 02
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  2. Personal Data We Collect & Device Permissions
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                <p>
                  When you interact with our digital atelier, we collect information provided directly by you, generated automatically through your browsing activity, or accessed via device permissions:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE] space-y-1.5">
                    <h3 className="font-bold text-[#1A1A1A] text-xs">Patron Profile & Credentials</h3>
                    <p className="text-[11px] text-[#6B6B6B]">
                      Full name, verified email address, phone number, password hashes (salted SHA-256), and bespoke garment silhouette sizing preferences.
                    </p>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE] space-y-1.5">
                    <h3 className="font-bold text-[#1A1A1A] text-xs">Commerce, Shipping & Gifting</h3>
                    <p className="text-[11px] text-[#6B6B6B]">
                      Physical delivery addresses, courier GPS delivery notes, gift messages, and order history.
                    </p>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE] space-y-1.5">
                    <h3 className="font-bold text-[#1A1A1A] text-xs">PCI-DSS Tokenized Payments</h3>
                    <p className="text-[11px] text-[#6B6B6B]">
                      Credit/debit card numbers and UPI handles are processed via certified Level 1 PCI-DSS gateways (Stripe/Razorpay/Apple Pay). SUMILUX never stores raw card credentials.
                    </p>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE] space-y-1.5">
                    <h3 className="font-bold text-[#1A1A1A] text-xs">Tax Invoicing & Statutory KYC</h3>
                    <p className="text-[11px] text-[#6B6B6B]">
                      GST Identification Numbers (GSTIN) and PAN details when requested by business patrons for B2B tax invoicing or high-value customs declarations.
                    </p>
                  </div>
                </div>

                {/* Device Hardware Permissions */}
                <div className="p-4 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#1A1A1A]">
                    <Smartphone className="w-4 h-4 text-[#C8A87C]" />
                    <span>Device Permissions & Hardware Capabilities</span>
                  </div>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">
                    With your explicit permission, our mobile app or web platform may request access to:
                  </p>
                  <ul className="list-disc list-inside text-xs text-[#6B6B6B] space-y-1 pl-1">
                    <li><strong className="text-[#1A1A1A]">Camera & Photo Library:</strong> To enable visual wardrobe search, garment barcode scanning, and virtual try-on features.</li>
                    <li><strong className="text-[#1A1A1A]">Microphone:</strong> To facilitate hands-free concierge voice queries and search commands.</li>
                    <li><strong className="text-[#1A1A1A]">Location (GPS):</strong> To pinpoint regional boutique availability, accurate shipping time estimates, and local currency display.</li>
                    <li><strong className="text-[#1A1A1A]">SMS Telemetry:</strong> Solely for automated one-time password (OTP) verification during patron authentication.</li>
                  </ul>
                </div>

                {/* Recipient Gifting Warranty */}
                <div className="p-4 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE] space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#1A1A1A]">
                    <Receipt className="w-4 h-4 text-[#C8A87C]" />
                    <span>Gifting & Third-Party Recipient Representation</span>
                  </div>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">
                    If you provide personal data belonging to another individual (such as recipient delivery addresses, phone numbers, or gift notes), you represent and warrant that you have obtained their full consent and authority to share their information with SUMILUX in accordance with this Privacy Policy.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Data Usage & Sharing */}
            <section
              id="usage-sharing"
              className="bg-white p-6 sm:p-10 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-6 scroll-mt-28"
            >
              <div className="border-b border-[#F2EFE9] pb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A68758] block mb-1">
                  Section 03
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  3. How We Use Information & Sharing Ecosystem
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                <p>
                  We utilize your data to fulfill tailoring orders, coordinate DHL/FedEx logistics, process transactions, deliver customer support, detect fraud, and provide tailored product recommendations.
                </p>

                <div className="space-y-3">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">Categories of Third Parties with Whom We Share Data:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE]">
                      <strong className="text-[#1A1A1A] block mb-0.5">Atelier Logistics & Couriers</strong>
                      <span className="text-[11px] text-[#6B6B6B]">DHL Express, FedEx, and SUMILUX Chauffeur Couriers for package transit and signature confirmation.</span>
                    </div>

                    <div className="p-3 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE]">
                      <strong className="text-[#1A1A1A] block mb-0.5">Payment Gateways & BNPL Partners</strong>
                      <span className="text-[11px] text-[#6B6B6B]">Stripe, Apple Pay, and authorized credit/lending partners for credit underwriting and EMI payment processing.</span>
                    </div>

                    <div className="p-3 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE]">
                      <strong className="text-[#1A1A1A] block mb-0.5">Group Companies & Affiliates</strong>
                      <span className="text-[11px] text-[#6B6B6B]">Our corporate subsidiaries to provide unified patron services, loyalty point redemptions, and salon previews.</span>
                    </div>

                    <div className="p-3 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE]">
                      <strong className="text-[#1A1A1A] block mb-0.5">Legal, Regulatory & Law Enforcement</strong>
                      <span className="text-[11px] text-[#6B6B6B]">To respond to lawful court orders, subpoenas, or protect patron safety and investigate credit card fraud.</span>
                    </div>
                  </div>
                </div>

                {/* Omni-Channel Communication Consent */}
                <div className="p-4 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE] space-y-2">
                  <h3 className="font-bold text-xs text-[#1A1A1A]">Omni-Channel Communication Consent</h3>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">
                    By submitting an order or creating an account, you consent to receive transactional and concierge service dispatches via <strong>SMS, WhatsApp, Email, and Phone</strong> regarding order confirmation, dispatch telemetry, delivery scheduling, and security notifications. You may manage marketing communication preferences at any time.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Cookies & Device Ad IDs */}
            <section
              id="cookies"
              className="bg-white p-6 sm:p-10 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-6 scroll-mt-28"
            >
              <div className="border-b border-[#F2EFE9] pb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A68758] block mb-1">
                  Section 04
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  4. Cookies, Tracking & Mobile Advertising IDs (GAID / IDFA)
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                We use cookies and device identifiers to keep your shopping bag intact, prevent session hijacking, remember localized currency, and analyze showroom performance. You can customize your cookie preferences below:
              </p>

              {/* Cookie Controls Box */}
              <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-xs border border-[#E8E3DE] space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#1A1A1A] block">Essential Session Cookies (Required)</span>
                    <span className="text-[11px] text-[#6B6B6B]">Required for cart items, currency conversion, and checkout security.</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 bg-white px-2.5 py-1 rounded-xs border border-[#E8E3DE] shrink-0">
                    Always Active
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#E8E3DE]">
                  <div>
                    <span className="text-xs font-bold text-[#1A1A1A] block">Performance & Experience Analytics</span>
                    <span className="text-[11px] text-[#6B6B6B]">Allows us to optimize image loading speeds and refine boutique navigation.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={cookieAnalytics}
                      onChange={(e) => setCookieAnalytics(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1A1A1A]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#E8E3DE]">
                  <div>
                    <span className="text-xs font-bold text-[#1A1A1A] block">Private Showroom Editorial Alerts</span>
                    <span className="text-[11px] text-[#6B6B6B]">Enables personalized capsule notifications based on your silhouette favorites.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={cookieMarketing}
                      onChange={(e) => setCookieMarketing(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1A1A1A]"></div>
                  </label>
                </div>

                <div className="pt-4 border-t border-[#E8E3DE] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={handleSaveCookiePreferences}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Save Cookie Preferences</span>
                  </button>

                  {cookieSaved && (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Preferences Saved to Local Storage</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Mobile Advertising Identifiers (GAID / IDFA) */}
              <div className="p-4 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE] space-y-1.5">
                <h3 className="font-bold text-xs text-[#1A1A1A]">Device Ad Identifiers & Tracking Opt-Out</h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">
                  Third-party advertising partners may recognize your Google Advertising ID (GAID) or Apple Identifier for Advertisers (IDFA). You may reset or opt out of personalized ad tracking directly within your iOS Settings (<em>Privacy &gt; Tracking</em>) or Android Settings (<em>Google &gt; Ads &gt; Opt out of Ads Personalization</em>).
                </p>
              </div>
            </section>

            {/* Section 5: Rights & Data Retention */}
            <section
              id="rights-retention"
              className="bg-white p-6 sm:p-10 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-6 scroll-mt-28"
            >
              <div className="border-b border-[#F2EFE9] pb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A68758] block mb-1">
                  Section 05
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  5. Your Statutory Privacy Rights & Retention Policy
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                Under the Indian DPDP Act, GDPR, UK-GDPR, and CCPA, patrons possess comprehensive rights over their personal records:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE] space-y-1.5">
                  <strong className="text-[#1A1A1A] text-xs block">Right to Access & Portability</strong>
                  <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                    Request a structured, machine-readable JSON copy of all personal records and measurement charts associated with your patron profile.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE] space-y-1.5">
                  <strong className="text-[#1A1A1A] text-xs block">Right to Erasure & Forgotten Status</strong>
                  <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                    Request permanent erasure of your account, marketing profiles, and silhouette records from our active databases.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE] space-y-1.5">
                  <strong className="text-[#1A1A1A] text-xs block">Right to Rectification</strong>
                  <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                    Instantly correct or update any address, sizing detail, or email preference through your Patron Account portal.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE] space-y-1.5">
                  <strong className="text-[#1A1A1A] text-xs block">Right to Withdraw Consent</strong>
                  <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                    Withdraw previously granted consent at any time by emailing our Data Governance Officer with "Withdrawal of Consent" in the subject line.
                  </p>
                </div>
              </div>

              {/* Data Portability Tools */}
              <div className="p-5 bg-[#F8F6F3] rounded-xs border border-[#E8E3DE] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A]">
                  <Database className="w-4 h-4 text-[#C8A87C]" />
                  <span>Patron Self-Service Data Portability Tool</span>
                </div>
                <p className="text-xs text-[#6B6B6B]">
                  Exercise your GDPR Article 20 & DPDP data portability rights immediately:
                </p>
                <div className="flex items-center gap-3 flex-wrap pt-1">
                  <button
                    onClick={handleExportDataArchive}
                    className="px-4 py-2 bg-white border border-[#E8E3DE] hover:border-[#1A1A1A] text-xs font-semibold text-[#1A1A1A] rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C8A87C]" />
                    <span>Download Data Archive (JSON)</span>
                  </button>

                  <a
                    href="mailto:privacy.grievance@sumilux.com?subject=GDPR%20Data%20Erasure%20Request&body=Please%20delete%20all%20personal%20records%20associated%20with%20my%20patron%20account."
                    className="px-4 py-2 bg-white border border-[#E8E3DE] hover:border-[#C8A87C] text-xs font-semibold text-[#6B6B6B] hover:text-[#1A1A1A] rounded-xs transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Request Data Erasure via Email</span>
                  </a>

                  {exportSuccess && (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 animate-fade-in">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Archive Export Downloaded</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Data Retention & Archival Clause */}
              <div className="p-4 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE] space-y-1.5 text-xs text-[#6B6B6B] leading-relaxed">
                <strong className="text-[#1A1A1A] block">Data Retention & Fraud Prevention Archival</strong>
                <p>
                  We retain personal data only for as long as necessary to fulfill order delivery or satisfy statutory tax, customs, and corporate accounting laws. Even upon account deletion, certain transaction and payment telemetry may be retained in anonymized, restricted-access archives to resolve payment chargebacks, prevent repeat fraud, and defend against potential legal claims.
                </p>
              </div>
            </section>

            {/* Section 6: Children's Privacy */}
            <section
              id="children"
              className="bg-white p-6 sm:p-10 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-6 scroll-mt-28"
            >
              <div className="border-b border-[#F2EFE9] pb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A68758] block mb-1">
                  Section 06
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  6. Age of Majority & Children’s Information
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                <p>
                  Use of the SUMILUX Platform is available exclusively to individuals who can form legally binding contracts under the Indian Contract Act 1872 or the legal age of majority in their jurisdiction (minimum 18 years of age).
                </p>
                <p>
                  We do not knowingly solicit or collect personal data from children under the age of 18. If a parent or guardian becomes aware that a minor has provided us with personal data without proper authorization, please contact our Grievance Officer immediately to have the information permanently expunged.
                </p>
              </div>
            </section>

            {/* Section 7: Statutory Grievance Redressal */}
            <section
              id="grievance"
              className="bg-white p-6 sm:p-10 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-6 scroll-mt-28"
            >
              <div className="border-b border-[#F2EFE9] pb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A68758] block mb-1">
                  Section 07
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  7. Statutory Grievance Redressal Officer & Corporate Contacts
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                In accordance with the Information Technology Act 2000, Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules 2021, and the Consumer Protection (E-Commerce) Rules 2020, the designated Grievance Officer details are published below:
              </p>

              <div className="bg-[#FAF8F5] p-6 rounded-xs border border-[#E8E3DE] space-y-4 text-xs leading-relaxed">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <span className="text-[#6B6B6B] block text-[11px] uppercase tracking-wider font-mono">Grievance Officer</span>
                    <strong className="text-[#1A1A1A] text-sm font-serif">Mr. Karthik R.</strong>
                    <div className="text-[#6B6B6B] text-[11px]">Associate Director – Data Governance</div>
                  </div>

                  <div>
                    <span className="text-[#6B6B6B] block text-[11px] uppercase tracking-wider font-mono">Dedicated Grievance Email</span>
                    <a
                      href="mailto:privacy.grievance@sumilux.com"
                      className="text-[#1A1A1A] font-semibold hover:text-[#C8A87C] transition-colors"
                    >
                      privacy.grievance@sumilux.com
                    </a>
                  </div>

                  <div>
                    <span className="text-[#6B6B6B] block text-[11px] uppercase tracking-wider font-mono">Operating Corporate Entity</span>
                    <span className="text-[#1A1A1A] font-semibold">SUMILUX Studio Ltd.</span>
                    <div className="text-[#6B6B6B] text-[11px]">CIN: U51109KA2026PTC088214</div>
                  </div>

                  <div>
                    <span className="text-[#6B6B6B] block text-[11px] uppercase tracking-wider font-mono">Registered Office Address</span>
                    <span className="text-[#1A1A1A]">12 Mayfair Gardens, London W1K 4QT, UK & Embassy Tech Village, Outer Ring Road, Bengaluru 560103, India</span>
                  </div>

                  <div>
                    <span className="text-[#6B6B6B] block text-[11px] uppercase tracking-wider font-mono">Telephone Inquiries</span>
                    <a href="tel:044-45614709" className="text-[#1A1A1A] font-mono hover:text-[#C8A87C]">044-45614709</a> / <a href="tel:044-45714709" className="text-[#1A1A1A] font-mono hover:text-[#C8A87C]">044-45714709</a>
                  </div>

                  <div>
                    <span className="text-[#6B6B6B] block text-[11px] uppercase tracking-wider font-mono">Statutory Resolution SLA</span>
                    <span className="text-[#1A1A1A]">Acknowledgment within 48 hours; resolution within 30 days as per IT Rules</span>
                  </div>
                </div>
              </div>

              {/* Bottom Support Link */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#1A1A1A] hover:text-[#C8A87C] transition-colors"
                >
                  <span>Need assistance with your order or privacy? Contact Us</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[#6B6B6B]">Last updated: April 2026</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
