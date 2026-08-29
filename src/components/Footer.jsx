import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Check, Instagram, Twitter, Facebook, Sparkles, ShieldCheck } from 'lucide-react';

export const Footer = ({ onSelectCategory, onScrollToLookbook, onNavigateToPage }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#1D241C] text-white border-t border-white/10">
      {/* Main 4-Column Footer Section */}
      <div className="max-w-7xl mx-auto px-5 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 group-hover:border-[#C69E58]/40 transition-colors">
                <img
                  src="/assets/images/Logo.png"
                  alt="Murari's Glam & Glow"
                  className="h-12 w-auto object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl md:text-2xl font-bold tracking-[0.14em] text-white group-hover:text-[#C69E58] transition-colors leading-tight">
                  MURARI'S
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C69E58] font-semibold">
                  GLAM & GLOW • FASHION
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans max-w-sm">
              Discover elegant fashion crafted with premium fabrics, modern designs, and comfortable fits for every occasion.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C69E58] hover:text-[#1D241C] text-neutral-200 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C69E58] hover:text-[#1D241C] text-neutral-200 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C69E58] hover:text-[#1D241C] text-neutral-200 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Customer Help & Policies (2.5 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#C69E58]">
              Customer Service
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
              <li>
                <Link to="/shipping-policy" className="hover:text-[#C69E58] transition-colors text-left block">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns-policy" className="hover:text-[#C69E58] transition-colors text-left block">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#C69E58] transition-colors text-left block">
                  FAQ & Help
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#C69E58] transition-colors text-left flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C69E58]" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#C69E58] transition-colors text-left block">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Account & Quick Links (2.5 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#C69E58]">
              My Account
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
              <li>
                <Link to="/account/orders" className="hover:text-[#C69E58] transition-colors text-left block font-semibold text-white">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/account/addresses" className="hover:text-[#C69E58] transition-colors text-left block">
                  Saved Addresses
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C69E58] transition-colors text-left block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C69E58] transition-colors text-left block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#C69E58] transition-colors text-left block">
                  Help & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C69E58]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stay Updated</span>
            </div>

            <h4 className="font-serif text-lg font-bold text-white">
              Get 15% Off Your Next Order
            </h4>

            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              Subscribe to get exclusive discounts, new arrival alerts, and seasonal offers sent to your inbox.
            </p>

            {subscribed ? (
              <div className="p-3 bg-white/10 border border-[#C69E58] rounded-xl flex items-center gap-2 text-xs text-[#C69E58] animate-fade-in">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Thank you for subscribing! Check your email for your discount code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-white/5 border border-white/20 text-xs text-white placeholder-neutral-400 rounded-xl focus:outline-none focus:border-[#C69E58]"
                  />
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="px-5 py-2.5 bg-[#C69E58] hover:bg-[#B38C47] text-[#1D241C] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1 flex-shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[11px] text-neutral-400 flex items-center gap-1">
                  <span>By subscribing, you agree to our</span>
                  <Link to="/privacy-policy" className="text-[#C69E58] hover:underline">
                    Privacy Policy
                  </Link>
                  <span>.</span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Payment Badges */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
            <p>© 2026 Murari's Glam & Glow. All rights reserved.</p>
            <Link to="/privacy-policy" className="text-[#C69E58] hover:underline font-medium">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-[#C69E58] hover:underline font-medium">
              Terms & Conditions
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-neutral-300 text-xs">
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg font-mono text-[10px] font-bold">
              UPI
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg font-mono text-[10px] font-bold">
              VISA
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg font-mono text-[10px] font-bold">
              MASTERCARD
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg font-mono text-[10px] font-bold">
              RUPAY
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg font-mono text-[10px] font-bold">
              NET BANKING
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg font-mono text-[10px] font-bold">
              CASH ON DELIVERY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
