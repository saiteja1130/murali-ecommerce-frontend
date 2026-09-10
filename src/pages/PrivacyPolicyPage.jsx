import React, { useState } from 'react';
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
  UserX,
  CreditCard,
  Scale,
  Cookie,
  Phone,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', label: '1. Introduction' },
    { id: 'information-collected', label: '2. Information We Collect' },
    { id: 'how-we-use-information', label: '3. How We Use Your Information' },
    { id: 'payments', label: '4. Payments' },
    { id: 'sharing-information', label: '5. Sharing Information' },
    { id: 'cookies-storage', label: '6. Cookies & Local Storage' },
    { id: 'data-security', label: '7. Data Security' },
    { id: 'retention-deletion', label: '8. Data Retention & Deletion' },
    { id: 'childrens-privacy', label: '9. Children’s Privacy' },
    { id: 'contact-us', label: '10. Contact Us' }
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
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#506040]/15 text-[#506040] text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg border border-[#506040]/30">
              <ShieldCheck className="w-3.5 h-3.5 text-[#506040]" />
              Your Privacy Matters
            </span>
            <span className="text-[11px] text-[#687163] font-mono">
              Last Updated: September 1, 2026
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1D241C]">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] max-w-3xl leading-relaxed">
            At <strong>Murari&apos;s Glam &amp; Glow</strong>, we value your trust and are committed to protecting your personal information when you use our website and mobile application.
          </p>
        </div>

        {/* 4 Security / Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-[#1D241C]">Secure Shopping</div>
              <div className="text-[11px] sm:text-xs text-[#687163] mt-0.5 leading-relaxed">
                We work to keep your information protected.
              </div>
            </div>
          </div>

          <div className="p-5 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-[#1D241C]">Data Protection</div>
              <div className="text-[11px] sm:text-xs text-[#687163] mt-0.5 leading-relaxed">
                Your information is used only for necessary business purposes.
              </div>
            </div>
          </div>

          <div className="p-5 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-[#1D241C]">Transparency</div>
              <div className="text-[11px] sm:text-xs text-[#687163] mt-0.5 leading-relaxed">
                We explain how your information is collected and used.
              </div>
            </div>
          </div>

          <div className="p-5 bg-white rounded-xl border border-[#E8E4DC] shadow-2xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-[#1D241C]">Account Control</div>
              <div className="text-[11px] sm:text-xs text-[#687163] mt-0.5 leading-relaxed">
                You can contact us regarding your personal information.
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Sticky Sidebar (Left) + 10 Short Sections (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation */}
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
                  <span>Contact Customer Support</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* 10 Sections Main Content */}
          <main className="lg:col-span-8 space-y-8 bg-white rounded-2xl border border-[#E8E4DC] p-6 sm:p-10 shadow-2xs text-xs sm:text-sm text-[#687163] leading-relaxed">
            
            {/* Section 1: Introduction */}
            <section id="introduction" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#506040]" />
                1. Introduction
              </h2>
              <p>
                This Privacy Policy describes how <strong>Murari&apos;s Glam &amp; Glow</strong> collects, uses, and safeguards your personal information when you visit our website or use our Android mobile application.
              </p>
            </section>

            {/* Section 2: Information We Collect */}
            <section id="information-collected" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <Database className="w-5 h-5 text-[#506040]" />
                2. Information We Collect
              </h2>
              <p>We may collect the following customer information to provide our services and fulfill orders:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><strong>Name:</strong> Your full name for order records and account profile.</li>
                <li><strong>Phone Number:</strong> For delivery updates, order confirmations, and customer support.</li>
                <li><strong>Email Address:</strong> For order notifications, invoices, and account management.</li>
                <li><strong>Delivery Address:</strong> Postal address and PIN code for shipping and parcel routing.</li>
                <li><strong>Order Information:</strong> Items purchased, order history, and bag details.</li>
                <li><strong>Payment Reference:</strong> Transaction reference IDs to verify order payments.</li>
                <li><strong>Basic Device Information:</strong> Device type, browser, or app technical details where applicable for website and app functionality.</li>
              </ul>
            </section>

            {/* Section 3: How We Use Your Information */}
            <section id="how-we-use-information" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#506040]" />
                3. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Process orders and payments</li>
                <li>Deliver products to your address</li>
                <li>Send order updates and shipment notifications</li>
                <li>Provide customer support and answer inquiries</li>
                <li>Handle returns and refunds</li>
                <li>Improve our products, website, and mobile app services</li>
              </ul>
            </section>

            {/* Section 4: Payments */}
            <section id="payments" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#506040]" />
                4. Payments
              </h2>
              <p>
                All digital payments are processed through secure third-party payment services. Sensitive payment credentials such as card PINs, CVVs, UPI PINs, or net banking passwords are not intentionally stored on our servers.
              </p>
            </section>

            {/* Section 5: Sharing Information */}
            <section id="sharing-information" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#506040]" />
                5. Sharing Information
              </h2>
              <p>
                Your information may be shared with delivery, payment, hosting, communication, or other service providers when required to fulfill orders and provide our services.
              </p>
              <p>
                We do not sell or rent your personal information to third parties for unrelated marketing purposes.
              </p>
            </section>

            {/* Section 6: Cookies & Local Storage */}
            <section id="cookies-storage" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <Cookie className="w-5 h-5 text-[#506040]" />
                6. Cookies &amp; Local Storage
              </h2>
              <p>
                We may use cookies and local storage to support essential website and app features, including maintaining your login session, storing cart information, remembering preferences, and ensuring smooth navigation. You can manage or disable cookies through your browser settings.
              </p>
            </section>

            {/* Section 7: Data Security */}
            <section id="data-security" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#506040]" />
                7. Data Security
              </h2>
              <p>
                We use reasonable administrative and technical measures to protect your personal information against unauthorized access, loss, or misuse.
              </p>
            </section>

            {/* Section 8: Data Retention & Account Deletion */}
            <section id="retention-deletion" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <UserX className="w-5 h-5 text-[#506040]" />
                8. Data Retention &amp; Account Deletion
              </h2>
              <p>
                Customer information is retained as necessary to fulfill orders, process refunds, provide customer support, and meet legal or accounting requirements.
              </p>
              <div className="p-4 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl space-y-2 text-xs">
                <div className="font-bold text-[#1D241C] flex items-center gap-1.5">
                  <UserX className="w-4 h-4 text-[#506040]" />
                  Account Deletion
                </div>
                <p>
                  You can request account and personal data deletion anytime through our{' '}
                  <Link to="/delete-account" className="font-bold underline text-[#506040]">
                    Account Deletion Page
                  </Link>{' '}
                  or by emailing us at{' '}
                  <a href="mailto:murariglamandglow@gmail.com" className="font-bold underline text-[#506040]">
                    murariglamandglow@gmail.com
                  </a>.
                </p>
              </div>
            </section>

            {/* Section 9: Children's Privacy */}
            <section id="childrens-privacy" className="space-y-3 scroll-mt-28 border-b border-[#E8E4DC] pb-8">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#506040]" />
                9. Children&apos;s Privacy
              </h2>
              <p>
                Our website and mobile application are intended for customers who are legally able to make purchases. While we offer children&apos;s products, selling these items does not mean we intentionally collect personal information from children.
              </p>
            </section>

            {/* Section 10: Contact Us */}
            <section id="contact-us" className="space-y-4 scroll-mt-28">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1D241C] flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#506040]" />
                10. Contact Us
              </h2>
              <p>
                If you have any questions regarding this Privacy Policy, wish to correct your information, or would like to submit a data deletion request, please feel free to contact us:
              </p>

              <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC] space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-[#506040] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#687163] block text-[11px]">Business Name:</span>
                      <strong className="text-[#1D241C] text-sm">Murari&apos;s Glam &amp; Glow</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-[#506040] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#687163] block text-[11px]">Email:</span>
                      <a href="mailto:murariglamandglow@gmail.com" className="text-[#506040] font-bold text-sm hover:underline">
                        murariglamandglow@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#506040] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#687163] block text-[11px]">Phone:</span>
                      <span className="text-[#1D241C] font-mono font-bold text-sm">+91 98765 43210</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#506040] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#687163] block text-[11px]">Address:</span>
                      <span className="text-[#1D241C] font-medium">
                        Prime Commercial Avenue, Road No. 10, Banjara Hills, Hyderabad, Telangana – 500034, India
                      </span>
                    </div>
                  </div>
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
