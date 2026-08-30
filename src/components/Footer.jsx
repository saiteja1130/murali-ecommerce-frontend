import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#1D241C] text-white border-t border-white/10 font-sans">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-5 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Brand & Identity (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
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

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans max-w-md">
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

          {/* Column 2: Quick Links / Collections (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#C69E58]">
              Shop & Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
              <li>
                <Link to="/products?department=women" className="hover:text-[#C69E58] transition-colors block">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link to="/products?department=kids" className="hover:text-[#C69E58] transition-colors block">
                  Kids' Collection
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#C69E58] transition-colors block">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="hover:text-[#C69E58] transition-colors block">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-[#C69E58] transition-colors block">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#C69E58]">
              Customer Care &amp; Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
              <li>
                <Link to="/about" className="hover:text-[#C69E58] transition-colors block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C69E58] transition-colors block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-[#C69E58] transition-colors block">
                  Shipping &amp; Delivery Policy
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="hover:text-[#C69E58] transition-colors block">
                  Cancellation &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/returns-policy" className="hover:text-[#C69E58] transition-colors block">
                  7-Day Return Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#C69E58] transition-colors block">
                  Help Center &amp; FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Compliance Section */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 Murari&apos;s Glam &amp; Glow. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to="/privacy-policy" className="text-neutral-400 hover:text-[#C69E58] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-neutral-400 hover:text-[#C69E58] transition-colors">
              Terms of Service
            </Link>
            <Link to="/cancellation-policy" className="text-neutral-400 hover:text-[#C69E58] transition-colors">
              Refund Policy
            </Link>
            <Link to="/delete-account" className="text-neutral-400 hover:text-rose-400 transition-colors">
              Data &amp; Account Deletion
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
