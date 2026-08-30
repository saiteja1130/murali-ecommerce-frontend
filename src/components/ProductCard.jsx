import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check, ArrowRight } from 'lucide-react';
import { resolveImageUrl, FALLBACK_PRODUCT_IMAGE } from '../utils/productAdapter';
import { useAuth } from '../context/AuthContext';

export const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted, onClickProduct }) => {
    const navigate = useNavigate();
    const { token, isAuthenticated } = useAuth();
    const [isHovered, setIsHovered] = useState(false);
    
    // Defensive extraction of colors and sizes
    const colors = Array.isArray(product?.colors) && product.colors.length > 0
        ? product.colors
        : [{ name: 'Standard', hex: '#1D241C' }];
    const sizes = Array.isArray(product?.sizes) && product.sizes.length > 0
        ? product.sizes
        : ['One Size'];

    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [isAddedRecently, setIsAddedRecently] = useState(false);

    const price = typeof product?.price === 'number' ? product.price : Number(product?.price) || 0;
    const originalPrice = product?.originalPrice ? Number(product.originalPrice) : null;
    const discountPercent = originalPrice && originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : null;

    const primaryImage = resolveImageUrl(product?.image || product?.images?.[0]);
    const hoverImage = resolveImageUrl(product?.hoverImage || product?.images?.[1] || primaryImage);

    const handleCardClick = () => {
        if (onClickProduct) {
            onClickProduct(product);
        } else {
            navigate(`/product/${product?.id || product?._id}`);
        }
    };

    const handleQuickAdd = (e) => {
        e.stopPropagation();
        if (onAddToCart) {
            onAddToCart(product, sizes[0], selectedColor, 1);
            if (!token || !isAuthenticated) return;
            setIsAddedRecently(true);
            setTimeout(() => setIsAddedRecently(false), 1800);
        }
    };

    const handleWishlistClick = (e) => {
        e.stopPropagation();
        if (onToggleWishlist) {
            onToggleWishlist(product);
        }
    };

    const isLowStock = product?.totalStock !== undefined && product.totalStock > 0 && product.totalStock <= 4;

    return (
      <div
        id={`product-card-${product?.id || product?._id}`}
        className="group relative flex flex-col bg-white border border-[#E8E4DC] hover:border-[#C69E58]/60 transition-all duration-300 rounded-[4px] overflow-hidden shadow-2xs hover:shadow-md cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* Product Image Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF8F5]">
          {/* Primary Image */}
          <img
            src={primaryImage}
            alt={product?.name || 'Product'}
            onError={(e) => {
              if (e.currentTarget.src !== FALLBACK_PRODUCT_IMAGE) {
                e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
              }
            }}
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              product?.isStockAvailable === false ? 'opacity-70 grayscale-[30%]' : ''
            } ${
              isHovered && hoverImage !== primaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
            loading="lazy"
          />

          {/* Hover Alternate Image */}
          {hoverImage && hoverImage !== primaryImage && (
            <img
              src={hoverImage}
              alt={`${product?.name} alternate view`}
              onError={(e) => {
                if (e.currentTarget.src !== primaryImage && e.currentTarget.src !== FALLBACK_PRODUCT_IMAGE) {
                  e.currentTarget.src = primaryImage || FALLBACK_PRODUCT_IMAGE;
                }
              }}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                product?.isStockAvailable === false ? 'opacity-70 grayscale-[30%]' : ''
              } ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}

          {/* Badge Indicator (Top-Left) */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            {product?.isStockAvailable === false ? (
              <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-xs shadow-xs bg-[#2A2D28] text-white border border-neutral-700">
                Out of Stock
              </span>
            ) : product?.badge ? (
              <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-xs shadow-xs ${
                product.badge === 'SALE'
                  ? 'bg-[#C69E58] text-[#1D241C]'
                  : product.badge === 'BESTSELLER'
                    ? 'bg-[#1D241C] text-white'
                    : product.badge === 'NEW'
                      ? 'bg-[#506040] text-white'
                      : 'bg-[#E5ECE0] text-[#1D241C]'
              }`}>
                {product.badge === 'SALE' && discountPercent ? `-${discountPercent}%` : product.badge}
              </span>
            ) : null}

            {product?.isStockAvailable !== false && isLowStock && (
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase rounded-xs bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                Only {product.totalStock} Left
              </span>
            )}
          </div>

          {/* Wishlist Button (Top-Right) */}
          <button
            id={`wishlist-toggle-${product?.id}`}
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-110 ${
              isWishlisted ? 'text-[#C69E58]' : 'text-neutral-600 hover:text-[#1D241C]'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C69E58]' : ''}`} />
          </button>

          {/* View Details Button on Hover */}
          <div className={`absolute inset-x-3 bottom-14 z-10 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}>
            <button
              id={`view-details-btn-${product?.id}`}
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="w-full py-2.5 bg-white/95 hover:bg-white text-[#1D241C] text-xs font-semibold uppercase tracking-wider shadow-md backdrop-blur-xs flex items-center justify-center gap-2 rounded-xs transition-colors border border-[#E8E4DC]"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C69E58]" />
            </button>
          </div>

          {/* Quick Add To Cart Bar */}
          <div className={`absolute inset-x-0 bottom-0 z-10 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}>
            <button
              id={`quick-add-btn-${product?.id}`}
              onClick={handleQuickAdd}
              disabled={isAddedRecently || product?.isStockAvailable === false}
              className={`w-full py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                product?.isStockAvailable === false
                  ? 'bg-neutral-300 text-neutral-600 cursor-not-allowed'
                  : isAddedRecently
                    ? 'bg-[#506040] text-white'
                    : 'bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C]'
              }`}
            >
              {product?.isStockAvailable === false ? (
                <span>Out of Stock</span>
              ) : isAddedRecently ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card Content Details */}
        <div className="p-4 flex flex-col flex-1 justify-between bg-white">
          <div>
            {/* Category */}
            <div className="flex items-center justify-between text-xs text-[#687163] mb-1.5">
              <span className="uppercase tracking-widest font-medium text-[11px] truncate">
                {product?.category || 'Collection'}
              </span>
            </div>

            {/* Product Name */}
            <h3 className="font-sans text-sm font-medium text-[#1D241C] group-hover:text-[#506040] line-clamp-2 leading-snug transition-colors mb-2 min-h-[38px]">
              {product?.name}
            </h3>
          </div>

          <div>
            {/* Price */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-base font-semibold text-[#1D241C]">
                ₹{price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-xs text-[#687163] line-through">
                  ₹{originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Color Swatches */}
            {colors.length > 0 && (
              <div className="flex items-center gap-1.5 pt-2 border-t border-[#E8E4DC]/60">
                {colors.slice(0, 5).map((color, cIdx) => (
                  <button
                    key={cIdx}
                    title={color.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(color);
                    }}
                    className={`w-4 h-4 rounded-full border transition-transform ${
                      selectedColor?.name === color.name
                        ? 'scale-125 ring-2 ring-[#C69E58] ring-offset-1 border-transparent'
                        : 'border-neutral-300 hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.hex || '#1D241C' }}
                    aria-label={`Select color ${color.name}`}
                  />
                ))}
                {colors.length > 5 && (
                  <span className="text-[10px] text-[#687163] font-mono">+{colors.length - 5}</span>
                )}
                <span className="text-[11px] text-[#687163] ml-1.5 truncate">
                  {selectedColor?.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};
