import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ArrowRight, Home, ShoppingBag, Sparkles } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#F8F6F3] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl w-full text-center space-y-8 bg-white p-8 sm:p-14 rounded-[4px] border border-[#E8E3DE] shadow-xl animate-fade-in">
        {/* Editorial 404 Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF8F5] border border-[#E8E3DE] text-[#C8A87C] text-xs font-mono font-bold tracking-widest uppercase rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Error 404 • Page Not Found</span>
        </div>

        <div className="space-y-3">
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1A1A1A]">
            The Piece You Seek Does Not Exist
          </h1>
          <p className="text-sm sm:text-base text-[#6B6B6B] max-w-lg mx-auto leading-relaxed">
            The archive link may have expired, or the garment edition has transitioned into our private atelier vault.
          </p>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search garments, blazers, accessories..."
              className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs text-xs text-[#1A1A1A] placeholder-neutral-400 focus:outline-none focus:border-[#C8A87C]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Quick Direct Links */}
        <div className="pt-6 border-t border-[#F2EFE9] space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#A68758]">
            Popular Archive Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAF8F5] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white border border-[#E8E3DE] rounded-xs text-xs font-medium transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Atelier Home</span>
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAF8F5] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white border border-[#E8E3DE] rounded-xs text-xs font-medium transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>All Products</span>
            </Link>
            <Link
              to="/products/men"
              className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white border border-[#E8E3DE] rounded-xs text-xs font-medium transition-colors"
            >
              Men’s Sartorial
            </Link>
            <Link
              to="/products/women"
              className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white border border-[#E8E3DE] rounded-xs text-xs font-medium transition-colors"
            >
              Women’s Capsule
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white border border-[#E8E3DE] rounded-xs text-xs font-medium transition-colors"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
