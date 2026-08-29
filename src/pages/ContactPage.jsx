import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Sparkles, ChevronRight, Headphones, MessageSquare } from 'lucide-react';

export const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Private Fitting & Showroom',
    orderNumber: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'Private Fitting & Showroom',
        orderNumber: '',
        message: ''
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3] py-8 lg:py-16 animate-fade-in font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B6B6B]">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1A1A1A] font-semibold">Contact Us</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C8A87C]/15 border border-[#C8A87C]/30 text-[#A68758] text-[10px] font-mono font-bold tracking-widest uppercase rounded-full">
            <Sparkles className="w-3 h-3 text-[#C8A87C]" />
            Contact & Support
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A]">
            We Are at Your Service
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
            Whether you require bespoke garment consultations, private showroom bookings, or order assistance, our dedicated styling concierge is available to assist you.
          </p>
        </div>

        {/* 2-Column Layout: Form (Left) & Showrooms/Coordinates (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-[4px] border border-[#E8E3DE] p-6 sm:p-10 shadow-2xs">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">
              Send a Private Message
            </h2>
            <p className="text-xs text-[#6B6B6B] mb-6">
              Our atelier team will respond to your inquiry within 2 business hours.
            </p>

            {submitted ? (
              <div className="p-8 bg-[#4A7A5E]/10 border border-[#4A7A5E]/30 rounded-[4px] text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#4A7A5E] mx-auto" />
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                  Thank You. Your Inquiry Has Been Transmitted.
                </h3>
                <p className="text-xs text-[#6B6B6B] max-w-md mx-auto">
                  A personal concierge has been assigned to your request and will reach out via email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#C8A87C] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Eleanor Vance"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="eleanor.vance@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="+1 (415) 890-2144"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                      Inquiry Category *
                    </label>
                    <select
                      value={form.inquiryType}
                      onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                    >
                      <option>Private Fitting & Showroom</option>
                      <option>Garment Sizing & Styling Advice</option>
                      <option>Order Tracking & Delivery Status</option>
                      <option>Returns & Exchanges</option>
                      <option>Bespoke / Custom Atelier Request</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                    Order Number (If Applicable)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SMLX-98214"
                    value={form.orderNumber}
                    onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How may our atelier assist you today?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Note...</span>
                    ) : (
                      <>
                        <span>Submit to Concierge</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Channels & Showrooms */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Cards */}
            <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-6 shadow-2xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                Direct Concierge Desks
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE]">
                  <Mail className="w-4 h-4 text-[#C8A87C] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#1A1A1A]">Client Services Email</div>
                    <a href="mailto:concierge@sumilux.com" className="text-[#A68758] hover:underline font-mono">
                      concierge@sumilux.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE]">
                  <Phone className="w-4 h-4 text-[#C8A87C] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#1A1A1A]">Direct Telephone Hotline</div>
                    <div className="font-mono text-[#1A1A1A]">+1 (800) 840-SUMI / +44 20 7946 0912</div>
                    <div className="text-[10px] text-[#6B6B6B] mt-0.5">Monday – Saturday: 08:00 – 20:00 GMT</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#FAF8F5] rounded-xs border border-[#E8E3DE]">
                  <Headphones className="w-4 h-4 text-[#C8A87C] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#1A1A1A]">Live Support & Ticketing</div>
                    <Link to="/support" className="text-[#A68758] hover:underline font-medium">
                      Visit Interactive Help Center →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Flagship Showrooms */}
            <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-6 shadow-2xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                Flagship Atelier Showrooms
              </h3>

              <div className="space-y-4 text-xs">
                <div className="border-b border-[#F2EFE9] pb-3 space-y-1">
                  <div className="font-bold text-[#1A1A1A] flex items-center justify-between">
                    <span>London Mayfair Atelier</span>
                    <span className="text-[10px] text-[#A68758] font-mono">Flagship</span>
                  </div>
                  <p className="text-[#6B6B6B]">14 New Bond Street, Mayfair, London W1S 3PF, UK</p>
                  <p className="text-[11px] text-[#6B6B6B]">Showroom Hours: Mon–Sat 10:00 – 19:00</p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-[#1A1A1A] flex items-center justify-between">
                    <span>San Francisco Private Salon</span>
                    <span className="text-[10px] text-[#A68758] font-mono">Pacific Heights</span>
                  </div>
                  <p className="text-[#6B6B6B]">742 Montgomery Street, Suite 1400, San Francisco, CA 94111</p>
                  <p className="text-[11px] text-[#6B6B6B]">By Appointment: Tue–Sun 11:00 – 18:00 PST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
