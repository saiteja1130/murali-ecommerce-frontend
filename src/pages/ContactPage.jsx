import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Sparkles, ChevronRight, Headphones, MessageSquare } from 'lucide-react';

export const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Order Status & Tracking',
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
        inquiryType: 'Order Status & Tracking',
        orderNumber: '',
        message: ''
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 lg:py-16 animate-fade-in font-sans text-[#1D241C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#687163]">
          <Link to="/" className="hover:text-[#1D241C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1D241C] font-semibold">Contact Us</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#506040]/15 border border-[#506040]/30 text-[#506040] text-[10px] font-mono font-bold tracking-widest uppercase rounded-full">
            <Sparkles className="w-3 h-3 text-[#506040]" />
            Customer Support
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1D241C]">
            Get in Touch With Us
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] leading-relaxed">
            Have a question about your order, sizing, returns, or styling? We are here to help you every step of the way.
          </p>
        </div>

        {/* 2-Column Layout: Form (Left) & Contact Details / Stores (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8E4DC] p-6 sm:p-10 shadow-2xs">
            <h2 className="font-serif text-2xl font-bold text-[#1D241C] mb-1">
              Send Us a Message
            </h2>
            <p className="text-xs text-[#687163] mb-6">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 bg-[#506040]/10 border border-[#506040]/30 rounded-2xl text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#506040] mx-auto" />
                <h3 className="font-serif text-xl font-bold text-[#1D241C]">
                  Thank You! Your Message Has Been Sent.
                </h3>
                <p className="text-xs text-[#687163] max-w-md mx-auto">
                  Our customer support team has received your message and will reply to your email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#1D241C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#C69E58] hover:text-[#1D241C] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C] font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                      Topic / Reason *
                    </label>
                    <select
                      value={form.inquiryType}
                      onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C] cursor-pointer"
                    >
                      <option>Order Status & Tracking</option>
                      <option>Size & Fit Questions</option>
                      <option>Returns & Refunds</option>
                      <option>Payment & Billing Inquiry</option>
                      <option>General Feedback / Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                    Order Number (If Applicable)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SMLX-123456"
                    value={form.orderNumber}
                    onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C] font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your question or message here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-3.5 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Info & Stores */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Support Details */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-2xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#1D241C]">
                Direct Contact Information
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E4DC]">
                  <Mail className="w-4 h-4 text-[#506040] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#1D241C]">Email Support</div>
                    <a href="mailto:support@murarisglamandglow.com" className="text-[#506040] hover:underline font-medium">
                      support@murarisglamandglow.com
                    </a>
                    <div className="text-[11px] text-[#687163] mt-0.5">Replies within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E4DC]">
                  <Phone className="w-4 h-4 text-[#506040] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#1D241C]">Phone Support</div>
                    <div className="font-mono text-[#1D241C] font-bold">+91 98765 43210</div>
                    <div className="text-[11px] text-[#687163] mt-0.5">Monday – Saturday: 10:00 AM – 7:00 PM IST</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E4DC]">
                  <Headphones className="w-4 h-4 text-[#506040] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#1D241C]">Help Center & FAQs</div>
                    <Link to="/faq" className="text-[#506040] hover:underline font-semibold flex items-center gap-1 mt-0.5">
                      <span>View Frequently Asked Questions →</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Locations */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-2xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#1D241C]">
                Store Locations
              </h3>

              <div className="space-y-4 text-xs">
                <div className="border-b border-[#E8E4DC] pb-3 space-y-1">
                  <div className="font-bold text-[#1D241C] flex items-center justify-between">
                    <span>Mumbai Store</span>
                    <span className="text-[10px] text-[#506040] font-mono font-bold">Flagship</span>
                  </div>
                  <p className="text-[#687163]">Linking Road, Bandra West, Mumbai, Maharashtra 400050</p>
                  <p className="text-[11px] text-[#687163]">Open: Mon–Sun 10:00 AM – 8:00 PM</p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-[#1D241C] flex items-center justify-between">
                    <span>New Delhi Store</span>
                    <span className="text-[10px] text-[#506040] font-mono font-bold">Boutique</span>
                  </div>
                  <p className="text-[#687163]">DLF Emporio, Vasant Kunj, New Delhi 110070</p>
                  <p className="text-[11px] text-[#687163]">Open: Mon–Sun 11:00 AM – 8:00 PM</p>
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
