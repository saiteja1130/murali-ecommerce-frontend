import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  Mail,
  CheckCircle2,
  ChevronRight,
  UserCheck,
  Database,
  Building2,
  Smartphone,
  UserX,
  CreditCard,
  Scale,
  Trash2,
  ExternalLink,
  Cookie
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const PrivacyPolicyPage = () => {
  const { freeShippingThreshold = 5000, shippingFee = 30 } = useCart();
  const [activeSection, setActiveSection] = useState('overview');
  const [cookieConsent, setCookieConsent] = useState(() => {
    return localStorage.getItem('murari_cookie_consent') || 'accepted';
  });

  const sections = [
    { id: 'overview', label: '1. Overview & Commitment' },
    { id: 'data-collected', label: '2. Information We Collect' },
    { id: 'payment-security', label: '3. Razorpay & Payment Security' },
    { id: 'play-store-compliance', label: '4. Google Play & Device Safety' },
    { id: 'usage-sharing', label: '5. How We Use & Share Data' },
    { id: 'cookies-tracking', label: '6. Cookies & Web Analytics' },
    { id: 'retention-deletion', label: '7. Data Retention & Account Deletion' },
    { id: 'user-rights', label: '8. Your Rights & Choices' },
    { id: 'children-privacy', label: '9. Children’s Privacy Protection' },
    { id: 'grievance-officer', label: '10. Grievance Officer & Contact' }
  ];

  const scrollTo = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 lg:py-16 animate-fade-in font-sans text-[#1D241C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#687163]">
          <Link to="/" className="hover:text-[#1D241C] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1D241C] font-semibold">Privacy Policy</span>
        </nav>

        {/* Hero Header Card */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#506040]/15 text-[#506040] text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg border border-[#506040]/30">
              <ShieldCheck className="w-3.5 h-3.5 text-[#506040]" />
              Razorpay &amp; Google Play Store Compliant
            </span>
            <span className="text-[11px] text-[#687163] font-mono">
              Last Updated: January 1, 2026 • Version 2.4
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1D241C]">
            Privacy Policy &amp; Data Safety Charter
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] max-w-3xl leading-relaxed">
            At <strong>Murari&apos;s Glam &amp; Glow</strong>, we are committed to safeguarding your personal information, securing digital transactions, and complying with the <em>Information Technology Act, 2000</em>, the <em>SPDI Rules 2011</em>, <em>Google Play Developer Data Safety Policies</em>, and <em>Razorpay Payment Gateway Standards</em>.
          </p>
        </div>

        {/* Key Security Pillars Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1D241C]">256-Bit SSL Encryption</div>
              <div className="text-[11px] text-[#687163]">TLS 1.3 secure channel</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1D241C]">PCI-DSS Compliant</div>
              <div className="text-[11px] text-[#687163]">Zero card storage on servers</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1D241C]">Google Play Certified</div>
              <div className="text-[11px] text-[#687163]">Transparent data safety</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-[#1D241C]">Account Deletion</div>
              <div className="text-[11px] text-[#687163]">Instant self-service removal</div>
            </div>
          </div>
        </div>

        {/* 2-Column Content: Sidebar Menu (Left) + Document Content (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Table of Contents Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-2xs space-y-3">
              <h3 className="font-serif text-sm font-bold text-[#1D241C] uppercase tracking-wider">
                Policy Sections
              </h3>
              <nav className="space-y-1 text-xs">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      activeSection === sec.id
                        ? 'bg-[#1D241C] text-white font-semibold shadow-xs'
                        : 'text-[#687163] hover:text-[#1D241C] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-[#E8E4DC] space-y-2">
                <Link
                  to="/delete-account"
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                >
                  <span>Request Account Deletion</span>
                  <UserX className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#506040] bg-[#FAF8F5] hover:bg-[#E8E4DC]/60 rounded-lg transition-colors"
                >
                  <span>Contact Grievance Officer</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Legal Content */}
          <main className="lg:col-span-8 space-y-8 bg-white rounded-2xl border border-[#E8E4DC] p-6 sm:p-10 shadow-2xs text-xs sm:text-sm text-[#687163] leading-relaxed">
            {/* Section 1 */}
            <section id="overview" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#506040]" />
                1. Overview &amp; Commercial Commitment
              </h2>
              <p>
                This Privacy Policy describes how <strong>Murari&apos;s Glam &amp; Glow</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, processes, stores, and protects personal information obtained from customers who visit our web portal, Android application, and mobile checkout platform.
              </p>
              <p>
                We do not sell, rent, or trade your personal information to any third parties for their independent marketing purposes. All data collected is utilized solely to process your orders, facilitate deliveries, manage authentication, prevent fraudulent transactions, and enhance your user experience.
              </p>
            </section>

            {/* Section 2 */}
            <section id="data-collected" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <Database className="w-5 h-5 text-[#506040]" />
                2. Information We Collect
              </h2>
              <p>We only collect information strictly required to fulfill your shopping and service requests:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong>Personal Identification Data:</strong> Full Name, Email Address, and Mobile Phone Number (provided during registration or checkout).
                </li>
                <li>
                  <strong>Shipping &amp; Billing Data:</strong> Postal address, apartment/suite number, city, state, postal PIN code, and recipient contact number for delivery routing.
                </li>
                <li>
                  <strong>Account Credentials:</strong> Securely salted and hashed passwords (we never have access to plain-text passwords).
                </li>
                <li>
                  <strong>Order History &amp; Favorites:</strong> Items purchased, order statuses, transaction identifiers, and wishlist items.
                </li>
                <li>
                  <strong>Device &amp; Technical Information:</strong> IP address, browser type, operating system version, and anonymous session analytics to optimize site performance and prevent spam/bots.
                </li>
              </ul>
            </section>

            {/* Section 3: Razorpay Compliance */}
            <section id="payment-security" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#506040]" />
                3. Razorpay Payment Gateway &amp; Financial Security
              </h2>
              <div className="p-4 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl space-y-2 text-xs">
                <div className="font-bold text-[#1D241C] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  PCI-DSS Level 1 Compliant Payment Architecture
                </div>
                <p>
                  All online payments (UPI, Debit/Credit Cards, Net Banking, and Wallets) are processed through <strong>Razorpay Software Private Limited</strong>, an RBI-authorized, PCI-DSS Level 1 compliant payment aggregator.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong>No Card Data Stored:</strong> Murari&apos;s Glam &amp; Glow does not store, capture, or have access to your full credit/debit card numbers, CVV codes, UPI PINs, or net banking credentials. All sensitive card capture is handled directly inside Razorpay&apos;s encrypted vault.
                </li>
                <li>
                  <strong>Tokenization Standards:</strong> In compliance with Reserve Bank of India (RBI) tokenization guidelines, card details are secured using encrypted tokens without exposing primary account numbers.
                </li>
                <li>
                  <strong>Idempotent &amp; Fraud-Protected:</strong> Every payment transaction is assigned a unique cryptographic transaction ID to prevent double-charging and secure against payment tampering.
                </li>
              </ul>
            </section>

            {/* Section 4: Google Play Compliance */}
            <section id="play-store-compliance" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#506040]" />
                4. Google Play Store &amp; App Data Safety Disclosures
              </h2>
              <p>
                In strict adherence to the Google Play Developer Policy and Data Safety disclosures:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong>Data Encryption in Transit:</strong> All data transmitted between your mobile device and our backend servers is encrypted using standard <strong>TLS 1.3 / HTTPS</strong> cryptographic protocols.
                </li>
                <li>
                  <strong>No Sensitive Device Permissions:</strong> Our app does not require background location tracking, microphone access, contact book access, or SMS scraping permissions.
                </li>
                <li>
                  <strong>Third-Party Analytics:</strong> We only use privacy-preserving analytics to track app stability, crash logs, and load times.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="usage-sharing" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#506040]" />
                5. How We Use &amp; Share Information
              </h2>
              <p>
                Your information is shared only with verified operational service providers under strict non-disclosure obligations:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E4DC]">
                  <div className="font-bold text-xs text-[#1D241C]">Logistics &amp; Courier Partners</div>
                  <div className="text-[11px] text-[#687163] mt-0.5">
                    BlueDart, Delhivery, DTDC receive your shipping name, address, and contact number solely to deliver your parcel.
                  </div>
                </div>
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E4DC]">
                  <div className="font-bold text-xs text-[#1D241C]">Payment Gateways</div>
                  <div className="text-[11px] text-[#687163] mt-0.5">
                    Razorpay receives order amounts and customer billing details for secure transaction clearance.
                  </div>
                </div>
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E4DC]">
                  <div className="font-bold text-xs text-[#1D241C]">Transactional SMS &amp; Email</div>
                  <div className="text-[11px] text-[#687163] mt-0.5">
                    Automated dispatch notifications, OTPs, and invoice delivery.
                  </div>
                </div>
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E4DC]">
                  <div className="font-bold text-xs text-[#1D241C]">Legal &amp; Regulatory Authorities</div>
                  <div className="text-[11px] text-[#687163] mt-0.5">
                    Shared only if strictly mandated under valid court orders, statutory GST audits, or law enforcement warrants.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="cookies-tracking" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <Cookie className="w-5 h-5 text-[#506040]" />
                6. Cookies &amp; Local Storage Usage
              </h2>
              <p>
                We use strictly necessary cookies and local storage items to maintain your authenticated login session, keep items in your shopping bag, and remember your regional currency preference. You can manage or clear cookies anytime in your browser settings.
              </p>
            </section>

            {/* Section 7: Account Deletion (Google Play Mandate) */}
            <section id="retention-deletion" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <UserX className="w-5 h-5 text-rose-700" />
                7. Data Retention &amp; User Account Deletion Request
              </h2>
              <p>
                In compliance with Google Play Store User Data policies and the Digital Personal Data Protection Act, we provide users with full control over their account data.
              </p>
              <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2 text-xs">
                <div className="font-bold text-rose-900 flex items-center gap-1.5">
                  <UserX className="w-4 h-4 text-rose-700" />
                  Self-Service Account Deletion
                </div>
                <p className="text-rose-800">
                  You can permanently delete your account, contact details, saved addresses, and wishlist at any time. Visit our dedicated{' '}
                  <Link to="/delete-account" className="font-bold underline text-rose-900">
                    Account Deletion Portal
                  </Link>{' '}
                  or email{' '}
                  <a href="mailto:privacy@murarisglamglow.com" className="font-bold underline text-rose-900">
                    privacy@murarisglamglow.com
                  </a>.
                </p>
              </div>
              <p className="text-[11px] text-[#687163]">
                <em>Note: Past financial invoices and tax ledgers are retained for the statutory period required under Indian GST laws before permanent purging.</em>
              </p>
            </section>

            {/* Section 8 */}
            <section id="user-rights" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#506040]" />
                8. Your Privacy Rights &amp; Choices
              </h2>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><strong>Right to Access:</strong> View all profile information and order history inside your Account Portal.</li>
                <li><strong>Right to Rectification:</strong> Edit your name, phone, and saved addresses directly in your profile.</li>
                <li><strong>Right to Erasure:</strong> Request permanent erasure of your account and personal identifiers.</li>
                <li><strong>Right to Opt-Out:</strong> Unsubscribe from non-essential promotional communications with one click.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section id="children-privacy" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#506040]" />
                9. Children&apos;s Privacy Protection
              </h2>
              <p>
                While our catalog includes curated children&apos;s and kids&apos; apparel, our website and purchasing features are strictly intended for use by adults (parents and legal guardians aged 18 years or older). We do not knowingly collect personal information directly from minors.
              </p>
            </section>

            {/* Section 10: Grievance Officer */}
            <section id="grievance-officer" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#506040]" />
                10. Grievance Redressal Officer (IT Act, 2000 Compliance)
              </h2>
              <p>
                In accordance with the <em>Information Technology Act, 2000</em> and the <em>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</em>, the contact details of the Grievance Officer are published below:
              </p>

              <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC] space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#687163] block">Designated Grievance Officer:</span>
                    <strong className="text-[#1D241C] text-sm">Nodal Privacy &amp; Compliance Officer</strong>
                  </div>
                  <div>
                    <span className="text-[#687163] block">Company Name:</span>
                    <strong className="text-[#1D241C] text-sm">Murari&apos;s Glam &amp; Glow</strong>
                  </div>
                  <div>
                    <span className="text-[#687163] block">Direct Compliance Email:</span>
                    <a href="mailto:grievance@murarisglamglow.com" className="text-[#506040] font-bold underline">
                      grievance@murarisglamglow.com
                    </a>
                  </div>
                  <div>
                    <span className="text-[#687163] block">Customer Support Desk:</span>
                    <a href="mailto:support@murarisglamglow.com" className="text-[#506040] font-bold underline">
                      support@murarisglamglow.com
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E4DC] text-[#687163]">
                  <strong>Operating Address:</strong> Murari&apos;s Glam &amp; Glow, Prime Commercial Avenue, Banjara Hills, Hyderabad, Telangana – 500034, India.
                </div>

                <div className="text-[11px] text-[#687163]">
                  <em>Turnaround Time: All privacy grievances are formally acknowledged within 24 hours and resolved within 15 to 30 business days as prescribed by law.</em>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
