import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, Share2, Check } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ConfirmModal } from '../components/ConfirmModal';
export const WishlistPage = ({ wishlistProducts, onRemoveFromWishlist, onClearWishlist, onAddToCart, allProducts, onToggleWishlist, wishlistIds }) => {
  const navigate = useNavigate();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [isCopiedShare, setIsCopiedShare] = useState(false);
  const [addedItems, setAddedItems] = useState({});
  const [removeWishlistModal, setRemoveWishlistModal] = useState({ isOpen: false, product: null });

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleColorSelect = (productId, color) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: color }));
  };

  const getWishlistProductImage = (product) => {
    const activeColor = selectedColors[product.id] || product.selectedColor || product.colors?.[0];
    const colorName = (activeColor?.name || (typeof activeColor === 'string' ? activeColor : '')).trim().toLowerCase();
    if (colorName && Array.isArray(product.colorImages) && product.colorImages.length > 0) {
      const match = product.colorImages.find(
        (ci) => (ci.color || '').trim().toLowerCase() === colorName
      );
      if (match && Array.isArray(match.images) && match.images.length > 0) {
        return match.images[0];
      }
    }
    return product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900';
  };

  const handleMoveSingleToCart = (product) => {
    const chosenSize = selectedSizes[product.id] || product.sizes?.[0] || 'M';
    const chosenColor = selectedColors[product.id] || product.selectedColor || product.colors?.[0] || { name: 'Standard', hex: '#1A1A1A' };
    const chosenImage = getWishlistProductImage(product);
    onAddToCart({ ...product, image: chosenImage }, chosenSize, chosenColor);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      onRemoveFromWishlist(product.id);
    }, 800);
  };

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach((product) => {
      const chosenSize = selectedSizes[product.id] || product.sizes?.[0] || 'M';
      const chosenColor = selectedColors[product.id] || product.selectedColor || product.colors?.[0] || { name: 'Standard', hex: '#1A1A1A' };
      const chosenImage = getWishlistProductImage(product);
      onAddToCart({ ...product, image: chosenImage }, chosenSize, chosenColor);
    });
    onClearWishlist();
  };
  const handleShareWishlist = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopiedShare(true);
    setTimeout(() => setIsCopiedShare(false), 2000);
  };
  const trendingProducts = allProducts.filter((p) => !wishlistIds.includes(p.id)).slice(0, 4);
  return (<div className="min-h-screen bg-[#F8F6F3] py-8 lg:py-12 animate-fade-in">
    <div className="max-w-7xl mx-auto px-5">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E3DE] mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-2">
            <button onClick={() => navigate('/')} className="hover:text-[#1A1A1A]">Home</button>
            <span>/</span>
            <span className="text-[#1A1A1A] font-semibold">Wishlist</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              Saved Wishlist
            </h1>
            <span className="px-3 py-1 bg-white text-xs font-bold text-[#1A1A1A] rounded-full border border-[#E8E3DE] shadow-2xs">
              {wishlistProducts.length} Items
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button onClick={handleShareWishlist} className="px-4 py-2.5 bg-white hover:bg-neutral-100 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] border border-[#E8E3DE] rounded-xs transition-colors flex items-center gap-2 shadow-2xs">
            {isCopiedShare ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-neutral-500" />}
            <span>{isCopiedShare ? 'Link Copied' : 'Share Wishlist'}</span>
          </button>

          {wishlistProducts.length > 0 && (<button onClick={handleMoveAllToCart} className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-xs flex items-center gap-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Move All to Bag</span>
          </button>)}
        </div>
      </div>

      {wishlistProducts.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => {
          const activeSize = selectedSizes[product.id] || product.sizes[0] || 'M';
          const isAdded = addedItems[product.id];
          return (<div key={product.id} className="bg-white rounded-[4px] border border-[#E8E3DE] hover:border-[#C8A87C]/60 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
            {/* Thumbnail Stage */}
            <div className="relative aspect-[3/4] bg-[#F4EFEA] overflow-hidden">
              <img
                src={getWishlistProductImage(product)}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900';
                }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="w-full h-full object-cover object-center cursor-pointer transition-transform duration-700 group-hover:scale-105"
              />

              {/* Badge */}
              {product.badge && (<span className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#1A1A1A] text-white rounded-xs">
                {product.badge}
              </span>)}

              {/* Delete button */}
              <button
                onClick={() => setRemoveWishlistModal({ isOpen: true, product })}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-500 hover:text-rose-600 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                aria-label="Remove from wishlist"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Body Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B6B6B] mb-1">
                  <span className="uppercase tracking-widest text-[10px] font-semibold text-[#C8A87C]">
                    {product.category}
                  </span>
                </div>

                <h3 onClick={() => navigate(`/product/${product.id}`)} className="font-serif text-sm font-bold text-[#1A1A1A] hover:text-[#C8A87C] cursor-pointer truncate">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-bold text-[#1A1A1A]">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (<span className="text-xs text-[#6B6B6B] line-through">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>)}
                </div>
              </div>

              {/* Color Selector in Wishlist */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold block mb-1">
                    Select Color: <span className="text-[#1A1A1A] font-bold">{(selectedColors[product.id]?.name || product.selectedColor?.name || product.colors[0]?.name || 'Standard')}</span>
                  </span>
                  <div className="flex flex-wrap gap-2 items-center">
                    {product.colors.map((c, cIdx) => {
                      const cName = typeof c === 'object' ? c.name : c;
                      const cHex = typeof c === 'object' ? c.hex : '#1D241C';
                      const currentChosen = selectedColors[product.id] || product.selectedColor || product.colors[0];
                      const currentChosenName = typeof currentChosen === 'object' ? currentChosen.name : currentChosen;
                      const isSelected = currentChosenName === cName;
                      return (
                        <button
                          key={cIdx}
                          type="button"
                          onClick={() => handleColorSelect(product.id, c)}
                          title={cName}
                          className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                            isSelected ? 'ring-2 ring-offset-1 ring-[#1A1A1A] scale-110' : 'border-neutral-300 opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: cHex }}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selector in Wishlist */}
              {product.sizes && product.sizes.length > 0 && (<div>
                <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold block mb-1">
                  Select Size:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((sz) => (<button key={sz} onClick={() => handleSizeSelect(product.id, sz)} className={`px-2 py-1 text-[10px] font-semibold uppercase rounded-xs border transition-colors ${activeSize === sz
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-[#F8F6F3] text-[#1A1A1A] border-[#E8E3DE] hover:border-neutral-400'}`}>
                    {sz}
                  </button>))}
                </div>
              </div>)}

              {/* Move to Bag CTA */}
              <button onClick={() => handleMoveSingleToCart(product)} disabled={isAdded} className={`w-full py-2.5 text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-all shadow-xs ${isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A]'}`}>
                {isAdded ? (<>
                  <Check className="w-3.5 h-3.5" />
                  <span>Moved to Bag</span>
                </>) : (<>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Bag</span>
                </>)}
              </button>
            </div>
          </div>);
        })}
      </div>) : (
        /* Empty Wishlist State */
        <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-12 text-center max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#F8F6F3] border border-[#E8E3DE] flex items-center justify-center mx-auto text-[#C8A87C]">
            <Heart className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-[#6B6B6B] max-w-md mx-auto">
              Save your favorite items by tapping the heart icon on any product.
            </p>
          </div>

          <button onClick={() => navigate('/')} className="px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-bold uppercase tracking-widest rounded-xs transition-colors shadow-md">
            Explore Products
          </button>
        </div>)}

      {/* Trending Suggestions at Bottom */}
      <section className="pt-16 mt-16 border-t border-[#E8E3DE]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A87C]">
              Recommended for You
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mt-1">
              Trending Items
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((prod) => (<ProductCard key={prod.id} product={prod} onAddToCart={(p) => onAddToCart(p)} onToggleWishlist={(p) => onToggleWishlist(p)} isWishlisted={wishlistIds.includes(prod.id)} onClickProduct={(p) => navigate(`/product/${p.id}`)} />))}
        </div>
      </section>
    </div>

    {/* Remove from Wishlist Confirmation Modal */}
    <ConfirmModal
      isOpen={removeWishlistModal.isOpen}
      onClose={() => setRemoveWishlistModal({ isOpen: false, product: null })}
      onConfirm={() => {
        if (removeWishlistModal.product) {
          onRemoveFromWishlist(removeWishlistModal.product.id);
          setRemoveWishlistModal({ isOpen: false, product: null });
        }
      }}
      variant="danger"
      title="Remove from Wishlist?"
      message={`Are you sure you want to remove "${removeWishlistModal.product?.name || 'this item'}" from your saved wishlist?`}
      confirmText="Remove"
      cancelText="Keep in Wishlist"
    />
  </div>);
};

export default WishlistPage;
