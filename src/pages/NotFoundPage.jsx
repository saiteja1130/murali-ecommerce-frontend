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
    <div className="min-h-[80vh] bg-[#FAF8F5] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 font-sans text-[#1D241C]">
      <div className="max-w-2xl w-full text-center space-y-8 bg-white p-8 sm:p-14 rounded-2xl border border-[#E8E4DC] shadow-xl animate-fade-in">
        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF8F5] border border-[#E8E4DC] text-[#506040] text-xs font-mono font-bold tracking-widest uppercase rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Error 404 • Page Not Found</span>
        </div>

        <div className="space-y-3">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1D241C]">
            Oops! This Page Doesn't Exist
          </h1>
          <p className="text-sm sm:text-base text-[#687163] max-w-lg mx-auto leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable.
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
              placeholder="Search dresses, tops, sets..."
              className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl text-xs text-[#1D241C] placeholder-neutral-400 focus:outline-none focus:border-[#C69E58]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Quick Direct Links */}
        <div className="pt-6 border-t border-[#E8E4DC] space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#506040]">
            Explore Popular Pages
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#1D241C] text-[#1D241C] hover:text-white border border-[#E8E4DC] rounded-xl text-xs font-medium transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#1D241C] text-[#1D241C] hover:text-white border border-[#E8E4DC] rounded-xl text-xs font-medium transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>All Products</span>
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#1D241C] text-[#1D241C] hover:text-white border border-[#E8E4DC] rounded-xl text-xs font-medium transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/faq"
              className="px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#1D241C] text-[#1D241C] hover:text-white border border-[#E8E4DC] rounded-xl text-xs font-medium transition-colors"
            >
              Help & FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
