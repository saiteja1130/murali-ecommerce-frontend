import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
export const WishlistDrawer = ({ isOpen, onClose, wishlistProducts, onRemoveFromWishlist, onMoveToCart }) => {
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in" onClick={onClose}/>

      {/* Drawer Panel */}
      <div id="wishlist-slide-drawer" className="relative w-full max-w-md bg-[#F8F6F3] h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-slide-in-right">
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E8E3DE] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#C8A87C] fill-current"/>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
              Saved Wishlist
            </h3>
            <span className="px-2 py-0.5 bg-[#F8F6F3] text-xs font-semibold rounded-full border border-[#E8E3DE]">
              {wishlistProducts.length}
            </span>
          </div>

          <button id="close-wishlist-drawer-btn" onClick={onClose} className="p-1.5 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-100 transition-colors" aria-label="Close wishlist">
            <X className="w-5 h-5"/>
          </button>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistProducts.length > 0 ? (wishlistProducts.map((product) => (<div key={product.id} id={`wishlist-item-${product.id}`} className="bg-white p-3.5 rounded-[4px] border border-[#E8E3DE] flex gap-3.5 relative group shadow-2xs">
                <img src={product.image} alt={product.name} className="w-18 h-22 object-cover rounded-xs bg-[#F4EFEA] flex-shrink-0"/>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-[#1A1A1A] leading-snug truncate">
                        {product.name}
                      </h4>
                      <button onClick={() => onRemoveFromWishlist(product.id)} className="text-neutral-400 hover:text-rose-600 p-1 transition-colors" aria-label="Remove item from wishlist">
                        <Trash2 className="w-3.5 h-3.5"/>
                      </button>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C8A87C]">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8E3DE]/60">
                    <span className="text-xs font-bold text-[#1A1A1A]">
                      ₹{product.price.toFixed(2)}
                    </span>

                    <button onClick={() => onMoveToCart(product)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-[11px] font-semibold uppercase tracking-wider rounded-xs transition-colors">
                      <ShoppingBag className="w-3 h-3"/>
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>))) : (<div className="py-16 text-center text-[#6B6B6B] flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-white border border-[#E8E3DE] flex items-center justify-center mb-4 text-[#C8A87C]">
                <Heart className="w-6 h-6"/>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#1A1A1A] mb-1">
                Your wishlist is empty
              </h4>
              <p className="text-xs max-w-xs mb-6">
                Tap the heart icon on any product to save items you love for future consideration.
              </p>
              <button onClick={onClose} className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider transition-colors rounded-xs">
                Explore Styles
              </button>
            </div>)}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (<div className="p-6 bg-white border-t border-[#E8E3DE]">
            <button onClick={() => {
                wishlistProducts.forEach((p) => onMoveToCart(p));
                onClose();
            }} className="w-full py-3 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-xs transition-all">
              <span>Move All to Bag</span>
              <ArrowRight className="w-4 h-4"/>
            </button>
          </div>)}
      </div>
    </div>);
};
