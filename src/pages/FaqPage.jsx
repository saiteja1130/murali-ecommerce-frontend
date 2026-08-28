import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, Sparkles, HelpCircle, ChevronRight, Headphones, ArrowRight } from 'lucide-react';

export const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({ 'faq-1': true, 'faq-4': true });

  const toggleItem = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const faqData = [
    {
      id: 'faq-1',
      category: 'Orders & Tracking',
      question: 'How can I track the live delivery telemetry of my order?',
      answer:
        'Once your pieces have cleared our atelier quality inspection and have been dispatched with DHL Express, an automated email containing your tracking number will be delivered to your inbox. You can also view live GPS waypoints in your Patron Account under the "My Orders" tab.'
    },
    {
      id: 'faq-2',
      category: 'Orders & Tracking',
      question: 'Can I modify or cancel an order after it has been submitted?',
      answer:
        'Because our atelier initiates hand-packaging and tailored preparation promptly, changes can only be accommodated within 60 minutes of order submission. Please contact our Client Concierge hotline immediately to adjust size, color, or shipping destinations.'
    },
    {
      id: 'faq-3',
      category: 'Shipping & Duties',
      question: 'Are customs duties and international import taxes included in the checkout price?',
      answer:
        'Yes. SUMILUX ships all international orders on a Delivered Duty Paid (DDP) basis. All applicable import duties, customs tariffs, and local VAT taxes are covered by SUMILUX — you will never be asked to pay additional fees upon arrival.'
    },
    {
      id: 'faq-4',
      category: 'Shipping & Duties',
      question: 'What is the complimentary shipping threshold?',
      answer:
        'We offer complimentary worldwide express shipping via DHL Express on all orders exceeding ₹5,000. Standard express shipping on orders under ₹5,000 is a flat rate of ₹250.'
    },
    {
      id: 'faq-5',
      category: 'Sizing & Garment Care',
      question: 'How do SUMILUX silhouettes fit compared to standard European sizing?',
      answer:
        'Our garments feature structured architectural tailoring designed for relaxed elegance. If you prefer a tailored, form-fitting silhouette, we recommend choosing your standard IT/FR size. For a more relaxed, draped aesthetic, we recommend sizing up. Detailed measurements are available on each individual Product Detail Page.'
    },
    {
      id: 'faq-6',
      category: 'Sizing & Garment Care',
      question: 'What are the recommended dry cleaning instructions for organic wool and peace silk?',
      answer:
        'To preserve the natural resilience of organic virgin wools and Mulberry peace silks, we recommend specialized eco-friendly dry cleaning. We also advise hanging garments on wide cedar wood hangers in a climate-controlled wardrobe.'
    },
    {
      id: 'faq-7',
      category: 'Returns & Refunds',
      question: 'What is the return window and are return labels provided?',
      answer:
        'We provide a 30-day return policy from the date of delivery. Every SUMILUX shipment includes a pre-printed, prepaid DHL Express return shipping label. Simply visit your Patron Portal to print your receipt and schedule a courier pickup.'
    },
    {
      id: 'faq-8',
      category: 'Patron Benefits',
      question: 'How do I unlock patron member benefits and private salon drops?',
      answer:
        'Patrons who create an account and complete their first order automatically receive access to private drop previews, invitations to regional showroom fittings in London and San Francisco, and a lifetime 15% discount courtesy on future capsules.'
    }
  ];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Orders & Tracking', 'Shipping & Duties', 'Sizing & Garment Care', 'Returns & Refunds', 'Patron Benefits'];

  return (
    <div className="min-h-screen bg-[#F8F6F3] py-8 lg:py-16 animate-fade-in font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B6B6B]">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1A1A1A] font-semibold">Frequently Asked Questions</span>
        </nav>

        {/* Hero Header & Search */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C8A87C]/15 border border-[#C8A87C]/30 text-[#A68758] text-[10px] font-mono font-bold tracking-widest uppercase rounded-full">
            <HelpCircle className="w-3 h-3 text-[#C8A87C]" />
            Knowledge Base & Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
            Find immediate answers regarding ordering, atelier sizing, shipping protocols, and our lifetime garment guarantee.
          </p>

          {/* Search Box */}
          <div className="relative max-w-lg mx-auto pt-2">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics (e.g., shipping, returns, sizing, DDP duties)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#E8E3DE] rounded-xs text-xs text-[#1A1A1A] placeholder-neutral-400 focus:outline-none focus:border-[#C8A87C] shadow-2xs"
            />
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap pb-2 border-b border-[#E8E3DE]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white border border-[#E8E3DE] text-[#6B6B6B] hover:text-[#1A1A1A] hover:border-[#1A1A1A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Questions List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white p-12 rounded-[4px] border border-[#E8E3DE] text-center space-y-3">
              <p className="font-serif text-lg font-bold text-[#1A1A1A]">No answers match your search term.</p>
              <p className="text-xs text-[#6B6B6B]">Our client concierge is standing by to answer your specific question.</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#C8A87C] hover:text-[#1A1A1A] transition-colors"
              >
                <span>Ask the Concierge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-[4px] border border-[#E8E3DE] shadow-2xs overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-[#A68758]">
                        {faq.category}
                      </span>
                      <h3 className="font-serif text-base font-bold text-[#1A1A1A]">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="p-1 rounded-full bg-[#FAF8F5] border border-[#E8E3DE] text-[#1A1A1A] shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed border-t border-[#F2EFE9] bg-white animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Contact Help Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-[4px] border border-[#E8E3DE] p-8 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E8E3DE] flex items-center justify-center text-[#C8A87C] shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Still have an unanswered question?</h3>
              <p className="text-xs text-[#6B6B6B] mt-0.5">Our client styling team is online to assist you directly.</p>
            </div>
          </div>

          <Link
            to="/support"
            className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shrink-0"
          >
            Live Concierge Help →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
