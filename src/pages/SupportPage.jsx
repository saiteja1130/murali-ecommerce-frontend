import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Headphones,
  MessageSquare,
  Truck,
  RotateCcw,
  Ruler,
  CreditCard,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  User
} from 'lucide-react';

export const SupportPage = ({ currentUser }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'concierge',
      name: 'Claire (Senior Atelier Concierge)',
      text: 'Good day. Welcome to the SUMILUX Private Client Desk. How may I assist you with your orders, tailoring measurements, or private showroom inquiries today?',
      time: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      name: currentUser?.name || 'You',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate smart luxury concierge response
    setTimeout(() => {
      let replyText =
        'Thank you for your note. I have logged your request under ticket #SMLX-CS-' +
        Math.floor(1000 + Math.random() * 9000) +
        '. Our styling team has verified your patron profile and will email detailed guidance within minutes.';

      const lower = userText.toLowerCase();
      if (lower.includes('order') || lower.includes('track') || lower.includes('where')) {
        replyText =
          'Regarding your order inquiry: All active orders are synced live with DHL Express Worldwide. You can review live telemetry under your Patron Portal in "My Orders".';
      } else if (lower.includes('return') || lower.includes('exchange') || lower.includes('refund')) {
        replyText =
          'We offer a 30-day effortless return courtesy with complimentary DHL home pickup. You can generate your prepaid return label instantly under "My Orders".';
      } else if (lower.includes('size') || lower.includes('fit') || lower.includes('measure')) {
        replyText =
          'Our garments are sculpted with architectural precision. If you are between sizes, we recommend selecting your standard European size for a tailored look, or one size up for a relaxed drape.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'concierge',
          name: 'Claire (Senior Atelier Concierge)',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3] py-8 lg:py-16 animate-fade-in font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B6B6B]">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1A1A1A] font-semibold">Customer Support & Concierge</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C8A87C]/15 border border-[#C8A87C]/30 text-[#A68758] text-[10px] font-mono font-bold tracking-widest uppercase rounded-full">
            <Headphones className="w-3 h-3 text-[#C8A87C]" />
            24/7 Client Assistance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A]">
            Atelier Client Support
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
            Direct access to senior stylists, logistics coordinators, and master tailors.
          </p>
        </div>

        {/* 4 Quick Resolution Shortcut Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/account/orders"
            className="p-6 bg-white rounded-[4px] border border-[#E8E3DE] shadow-2xs hover:border-[#C8A87C] hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E3DE] flex items-center justify-center text-[#C8A87C] group-hover:bg-[#1A1A1A] transition-colors mb-4">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#1A1A1A] group-hover:text-[#C8A87C] transition-colors">
              Track Your Order
            </h3>
            <p className="text-xs text-[#6B6B6B] mt-1">
              Check live carrier telemetry, estimated delivery date, and package progress.
            </p>
          </Link>

          <Link
            to="/returns-policy"
            className="p-6 bg-white rounded-[4px] border border-[#E8E3DE] shadow-2xs hover:border-[#C8A87C] hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E3DE] flex items-center justify-center text-[#C8A87C] group-hover:bg-[#1A1A1A] transition-colors mb-4">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#1A1A1A] group-hover:text-[#C8A87C] transition-colors">
              Start a Return
            </h3>
            <p className="text-xs text-[#6B6B6B] mt-1">
              Generate prepaid return barcodes and schedule complimentary courier pickups.
            </p>
          </Link>

          <Link
            to="/faq"
            className="p-6 bg-white rounded-[4px] border border-[#E8E3DE] shadow-2xs hover:border-[#C8A87C] hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E3DE] flex items-center justify-center text-[#C8A87C] group-hover:bg-[#1A1A1A] transition-colors mb-4">
              <Ruler className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#1A1A1A] group-hover:text-[#C8A87C] transition-colors">
              Sizing & Fit Advice
            </h3>
            <p className="text-xs text-[#6B6B6B] mt-1">
              Access comprehensive garment measurements, fabric care, and silhouette comparisons.
            </p>
          </Link>

          <Link
            to="/account/payments"
            className="p-6 bg-white rounded-[4px] border border-[#E8E3DE] shadow-2xs hover:border-[#C8A87C] hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E3DE] flex items-center justify-center text-[#C8A87C] group-hover:bg-[#1A1A1A] transition-colors mb-4">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#1A1A1A] group-hover:text-[#C8A87C] transition-colors">
              Billing & Invoices
            </h3>
            <p className="text-xs text-[#6B6B6B] mt-1">
              Download VAT tax receipts, review settled payments, and update saved cards.
            </p>
          </Link>
        </div>

        {/* Interactive Live Concierge Chat / Ticketing Simulator */}
        <div className="bg-white rounded-[4px] border border-[#E8E3DE] shadow-2xs overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 sm:p-6 bg-[#FAF8F5] border-b border-[#E8E3DE] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#C8A87C] flex items-center justify-center font-serif font-bold text-base">
                  C
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <div className="font-bold text-sm text-[#1A1A1A] flex items-center gap-2">
                  <span>Claire • Senior Client Concierge</span>
                  <span className="px-2 py-0.2 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono rounded">
                    Online
                  </span>
                </div>
                <div className="text-[11px] text-[#6B6B6B]">
                  Average response: &lt; 2 minutes • Secured with TLS 1.3
                </div>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <div className="text-[10px] uppercase font-mono text-[#A68758] font-semibold">Priority Desk</div>
              <div className="text-xs text-[#1A1A1A] font-mono font-bold">Patron Salon Direct</div>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="p-6 sm:p-8 space-y-4 max-h-[380px] overflow-y-auto bg-[#FFFFFF]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender !== 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#C8A87C] flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-1">
                    C
                  </div>
                )}
                <div className={`max-w-lg space-y-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className="text-[10px] text-[#6B6B6B] px-1 font-mono">
                    {msg.name} • {msg.time}
                  </div>
                  <div
                    className={`p-4 rounded-[4px] text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-[#FAF8F5] text-[#1A1A1A] border border-[#E8E3DE]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#6B6B6B] italic py-2">
                <div className="w-2 h-2 rounded-full bg-[#C8A87C] animate-pulse" />
                <span>Concierge is drafting a response...</span>
              </div>
            )}
          </div>

          {/* Chat Input Footer */}
          <form onSubmit={handleSendMessage} className="p-4 bg-[#FAF8F5] border-t border-[#E8E3DE] flex gap-2">
            <input
              type="text"
              placeholder="Type your question or order number here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-[#E8E3DE] rounded-xs text-xs text-[#1A1A1A] placeholder-neutral-400 focus:outline-none focus:border-[#C8A87C]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2 cursor-pointer shrink-0 shadow-sm"
            >
              <span>Transmit</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
