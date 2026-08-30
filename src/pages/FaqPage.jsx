import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, HelpCircle, ChevronRight, Headphones, ArrowRight, Truck, RotateCcw, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FaqPage = () => {
  const { freeShippingThreshold = 5000, shippingFee = 30 } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({ 'faq-1': true, 'faq-3': true, 'faq-5': true });

  const toggleItem = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const faqData = [
    {
      id: 'faq-1',
      category: 'Orders & Tracking',
      question: 'How do I track my order status?',
      answer:
        'Once your order is dispatched from our fulfillment center, you will receive an automated SMS and email containing your live courier tracking link. You can also view real-time delivery status anytime in your Account Portal under the "My Orders" tab.'
    },
    {
      id: 'faq-2',
      category: 'Orders & Tracking',
      question: 'Can I modify or cancel my order after placing it?',
      answer:
        'Because our team processes and packs orders swiftly, cancellations or modifications (such as changing address, color, or size) can only be requested within 60 minutes of placing the order. Please reach out immediately via our Contact page or support line.'
    },
    {
      id: 'faq-3',
      category: 'Shipping & Delivery',
      question: `What are your shipping rates and delivery timelines?`,
      answer:
        `Standard pan-India delivery takes 2 to 5 business days. Orders below ₹${freeShippingThreshold.toLocaleString('en-IN')} incur a nominal flat shipping fee of ₹${shippingFee}, while all orders of ₹${freeShippingThreshold.toLocaleString('en-IN')} or above enjoy 100% FREE delivery across 19,000+ PIN codes.`
    },
    {
      id: 'faq-4',
      category: 'Shipping & Delivery',
      question: 'Do you provide Express Delivery for urgent orders?',
      answer:
        'Yes, Express Priority Air Delivery is available for major metropolitan and tier-1 cities (1 to 2 business days) at a flat fee of ₹150. Orders placed before 2:00 PM are dispatched on the same business day.'
    },
    {
      id: 'faq-5',
      category: 'Payments & COD',
      question: 'What payment methods do you accept?',
      answer:
        'We support all leading Indian payment options: UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, and Cash on Delivery (COD) at your doorstep.'
    },
    {
      id: 'faq-6',
      category: 'Payments & COD',
      question: 'Is Cash on Delivery (COD) available in my area?',
      answer:
        'Yes, COD is available across most serviceable PIN codes in India. You can inspect your sealed package and pay cash or scan the courier\'s dynamic UPI QR code upon delivery.'
    },
    {
      id: 'faq-7',
      category: 'Returns & Exchanges',
      question: 'What is your return and exchange policy?',
      answer:
        'We offer a 7-day hassle-free return and exchange policy from the date of delivery. If you need a size replacement or are not completely satisfied, request a return via your account or support team. Our courier partner will pick up the item from your doorstep.'
    },
    {
      id: 'faq-8',
      category: 'Returns & Exchanges',
      question: 'When will I receive my refund for returned items?',
      answer:
        'Once our quality team receives and inspects the returned garment (unworn, unwashed with original tags intact), your refund is initiated within 24 to 48 hours back to your original payment method or UPI ID.'
    },
    {
      id: 'faq-9',
      category: 'Sizing & Garment Care',
      question: 'How do I choose the right size for Women and Kids?',
      answer:
        'Every product detail page includes an accurate Size Guide with chest, waist, and length measurements in both inches and centimeters. For kids\' apparel, sizes correspond to age brackets (e.g., 2Y to 14Y).'
    },
    {
      id: 'faq-10',
      category: 'Sizing & Garment Care',
      question: 'How should I care for and wash delicate fabrics?',
      answer:
        'For pure cottons and everyday casuals, machine wash cold on a gentle cycle with like colors. For silks, embroideries, and outerwear, we recommend gentle hand washing or professional dry cleaning to maintain fabric luster.'
    }
  ];

  const categories = ['All', 'Orders & Tracking', 'Shipping & Delivery', 'Payments & COD', 'Returns & Exchanges', 'Sizing & Garment Care'];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 lg:py-16 animate-fade-in font-sans text-[#1D241C]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#687163]">
          <Link to="/" className="hover:text-[#1D241C] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1D241C] font-semibold">Help Center &amp; FAQ</span>
        </nav>

        {/* Hero Header & Search */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#506040]/15 border border-[#506040]/30 text-[#506040] text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg">
            <HelpCircle className="w-3.5 h-3.5 text-[#506040]" />
            Murari&apos;s Glam &amp; Glow Help Center
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D241C]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] max-w-xl mx-auto leading-relaxed">
            Find quick answers about orders, pan-India shipping, UPI &amp; COD payments, sizing, and 7-day returns.
          </p>

          {/* Search Box */}
          <div className="relative max-w-lg mx-auto pt-2">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics (e.g. shipping fees, COD, return window, tracking)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl text-xs text-[#1D241C] placeholder-neutral-400 focus:outline-none focus:border-[#506040] shadow-2xs"
            />
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1D241C] text-white shadow-xs'
                  : 'bg-white border border-[#E8E4DC] text-[#687163] hover:text-[#1D241C] hover:border-[#1D241C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-[#E8E4DC] text-center space-y-3 shadow-2xs">
              <p className="font-serif text-lg font-bold text-[#1D241C]">No questions match &quot;{searchQuery}&quot;</p>
              <p className="text-xs text-[#687163]">Our customer support team is available to assist you directly.</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D241C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#506040] transition-colors"
              >
                <span>Contact Support</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#E8E4DC] shadow-2xs overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5]/60 transition-colors"
                  >
                    <span className="font-serif text-base font-bold text-[#1D241C]">
                      {faq.question}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E8E4DC] flex items-center justify-center text-[#506040] shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#687163] leading-relaxed border-t border-[#E8E4DC]/40">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact Support Footer Card */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#506040]/10 flex items-center justify-center text-[#506040] shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#1D241C]">Still have questions?</h3>
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
            <span>Get in Touch</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
