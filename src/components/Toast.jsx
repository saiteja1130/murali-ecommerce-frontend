import React from 'react';
import { CheckCircle2, Heart, ShoppingBag, X, AlertCircle } from 'lucide-react';
import { resolveImageUrl, FALLBACK_PRODUCT_IMAGE } from '../utils/productAdapter';

export const Toast = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          className="pointer-events-auto bg-[#1A1A1A] text-white p-4 shadow-2xl border border-[#C8A87C]/50 flex items-start gap-3 transition-all duration-300 animate-slide-in-up rounded-[4px]"
        >
          {toast.image ? (
            <img
              src={resolveImageUrl(toast.image)}
              alt={toast.title || 'Product'}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
              }}
              className="w-12 h-14 object-cover flex-shrink-0 bg-neutral-800 rounded-xs border border-white/10"
            />
          ) : (
            <div className="w-9 h-9 flex-shrink-0 bg-[#C8A87C]/20 text-[#C8A87C] flex items-center justify-center rounded-sm">
              {toast.type === 'cart' && <ShoppingBag className="w-5 h-5" />}
              {toast.type === 'wishlist' && <Heart className="w-5 h-5 fill-current" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {(toast.type === 'info' || toast.type === 'success') && <CheckCircle2 className="w-5 h-5" />}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#C8A87C] mb-0.5">
              {toast.title}
            </p>
            <p className="text-sm text-neutral-200 line-clamp-2 leading-snug">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => onDismiss && onDismiss(toast.id)}
            className="text-neutral-400 hover:text-white p-1 transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
