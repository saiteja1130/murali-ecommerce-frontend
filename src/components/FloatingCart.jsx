import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export const FloatingCart = ({ cartCount = 0, cartTotal = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the floating cart on cart and checkout pages to avoid obstruction
  const isHiddenRoute = location.pathname === '/cart' || location.pathname === '/checkout';

  if (isHiddenRoute) {
    return null;
  }

  const handleClick = () => {
    navigate('/cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="floating-cart-container"
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 animate-fade-in"
    >
      <button
        id="floating-cart-btn"
        onClick={handleClick}
        aria-label={`Shopping cart with ${cartCount} items`}
        title="View Shopping Bag"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#1D241C] text-[#C69E58] hover:text-[#DFC28B] border border-[#C69E58]/50 shadow-2xl hover:shadow-[0_10px_25px_rgba(198,158,88,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C69E58] focus:ring-offset-2"
      >
        {/* Shopping Bag Icon */}
        <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />

        {/* Dynamic Cart Count Badge */}
        {cartCount > 0 && (
          <span
            id="floating-cart-badge"
            className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-[#C69E58] text-[#1D241C] font-bold text-[10px] sm:text-[11px] font-mono flex items-center justify-center shadow-md border-2 border-[#FAF8F5] transition-transform duration-300 group-hover:scale-110"
          >
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}

        {/* Subtle desktop hover tooltip/pill */}
        <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          <div className="bg-[#1D241C] text-[#FAF8F5] text-xs font-medium py-1.5 px-3 rounded-sm shadow-xl border border-[#C69E58]/30 flex items-center gap-2">
            <span>Bag</span>
            <span className="text-[#C69E58] font-bold">
              {cartCount > 0 ? `${cartCount} ${cartCount === 1 ? 'item' : 'items'}` : 'Empty'}
            </span>
            {cartCount > 0 && cartTotal > 0 && (
              <>
                <span className="text-white/30">•</span>
                <span className="font-semibold text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
              </>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default FloatingCart;
