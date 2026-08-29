import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Check, Instagram, Twitter, Facebook, Sparkles, ShieldCheck } from 'lucide-react';
export const Footer = ({ onSelectCategory, onScrollToLookbook, onNavigateToPage }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim())
      return;
    setSubscribed(true);
    setEmail('');
  };
  const handleCategoryNav = (cat) => {
    onSelectCategory(cat);
    if (cat === 'All') {
      navigate('/products');
    } else {
      navigate(`/products/${cat.toLowerCase()}`);
    }
  };
  const handleLookbookClick = () => {
    if (onNavigateToPage)
      onNavigateToPage('home');
    navigate('/');
    setTimeout(() => {
      onScrollToLookbook();
    }, 100);
  };
  return (<footer className="bg-[#1A1A1A] text-white border-t border-neutral-800">
    {/* Main 4-Column Footer Section */}
    <div className="max-w-7xl mx-auto px-5 py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Column 1: Brand & Bio (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Link to="/" className="flex flex-col inline-block group">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-[0.2em] text-white group-hover:text-[#C8A87C] transition-colors">
              SUMILUX
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C8A87C] font-semibold mt-0.5">
              MINIMALIST LUXURY TAILORING
            </span>
          </Link>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans max-w-sm">
            Rooted in modern minimalism and quiet luxury. We design foundational wardrobe pieces created from certified organic fibers, 100% GOTS cottons, and Italian vegetable-tanned leathers.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C8A87C] hover:text-[#1A1A1A] text-neutral-300 flex items-center justify-center transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C8A87C] hover:text-[#1A1A1A] text-neutral-300 flex items-center justify-center transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C8A87C] hover:text-[#1A1A1A] text-neutral-300 flex items-center justify-center transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Client Care & Policies (2.5 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#C8A87C]">
            Client Care & Legal
          </h4>
          <ul className="space-y-2.5 text-xs text-neutral-400 font-medium">
            <li>
              <Link to="/shipping-policy" className="hover:text-white transition-colors text-left block">
                Shipping & Logistics
              </Link>
            </li>
            <li>
              <Link to="/returns-policy" className="hover:text-white transition-colors text-left block">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white transition-colors text-left block">
                Frequently Asked (FAQ)
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-[#C8A87C] transition-colors text-left flex items-center gap-1.5 text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A87C]" />
                <span>Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white transition-colors text-left block">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Patron Services & Atelier (2.5 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#C8A87C]">
            Patron Services
          </h4>
          <ul className="space-y-2.5 text-xs text-neutral-400 font-medium">
            <li>
              <Link to="/account/orders" className="hover:text-white transition-colors text-left block text-[#C8A87C] font-semibold">
                My Orders & Tracking
              </Link>
            </li>
            <li>
              <Link to="/account/addresses" className="hover:text-white transition-colors text-left block">
                Address Book
              </Link>
            </li>
            <li>
              <Link to="/account/payments" className="hover:text-white transition-colors text-left block">
                Payment History
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors text-left block">
                About the Atelier
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors text-left block">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-white transition-colors text-left block">
                Help & Live Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter Signup (3.5 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A87C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Sumilux Journal</span>
          </div>

          <h4 className="font-serif text-lg font-bold text-white">
            Receive Private Drop Previews & 15% Off
          </h4>

          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            Subscribe to receive private showroom invitations, seasonal editorial lookbooks, and early access to limited capsules.
          </p>

          {subscribed ? (<div className="p-3 bg-white/10 border border-[#C8A87C] rounded-xs flex items-center gap-2 text-xs text-[#C8A87C] animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Thank you for subscribing! Check your inbox for code <strong>SUMI15</strong>.</span>
          </div>) : (<form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex gap-2">
              <input id="newsletter-email-input" type="email" required placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 rounded-xs focus:outline-none focus:border-[#C8A87C]" />
              <button id="newsletter-submit-btn" type="submit" className="px-5 py-2.5 bg-[#C8A87C] hover:bg-[#B8956A] text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1 flex-shrink-0">
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-[10px] text-neutral-400 flex items-center gap-1">
              <span>By subscribing, you agree to our</span>
              <Link to="/privacy-policy" className="text-[#C8A87C] hover:underline">
                Privacy Policy
              </Link>
              <span>.</span>
            </div>
          </form>)}
        </div>
      </div>

      {/* Bottom Legal & Payment Badges */}
      <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <div className="flex flex-wrap items-center gap-4">
          <p>© 2026 SUMILUX Studio Ltd. All rights reserved.</p>
          <Link to="/privacy-policy" className="text-[#C8A87C] hover:underline font-medium">
            Privacy Policy & Security Charter
          </Link>
        </div>

        <div className="flex items-center gap-3 text-neutral-400 text-xs">
          <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded font-mono text-[10px]">
            VISA
          </span>
          <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded font-mono text-[10px]">
            MC
          </span>
          <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded font-mono text-[10px]">
            AMEX
          </span>
          <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded font-mono text-[10px]">
            APPLE PAY
          </span>
          <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded font-mono text-[10px]">
            PAYPAL
          </span>
        </div>
      </div>
    </div>
  </footer>);
};
