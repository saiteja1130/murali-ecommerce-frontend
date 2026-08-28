import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check, ArrowRight } from 'lucide-react';
export const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted, onClickProduct }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [isAddedRecently, setIsAddedRecently] = useState(false);
    const discountPercent = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;
    const handleCardClick = () => {
        if (onClickProduct) {
            onClickProduct(product);
        }
        else {
            navigate(`/product/${product.id}`);
        }
    };
    const handleQuickAdd = (e) => {
        e.stopPropagation();
        onAddToCart(product, product.sizes[0], selectedColor);
        setIsAddedRecently(true);
        setTimeout(() => setIsAddedRecently(false), 1800);
    };
    const handleWishlistClick = (e) => {
        e.stopPropagation();
        onToggleWishlist(product);
    };
    return (<div id={`product-card-${product.id}`} className="group relative flex flex-col bg-white border border-[#E8E3DE] hover:border-[#C8A87C]/60 transition-all duration-300 rounded-[4px] overflow-hidden shadow-2xs hover:shadow-md cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleCardClick}>
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4EFEA]">
        {/* Primary Image */}
        <img src={product.image} alt={product.name} className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${isHovered && product.hoverImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`} loading="lazy"/>

        {/* Hover Alternate Image */}
        {product.hoverImage && (<img src={product.hoverImage} alt={`${product.name} alternate view`} className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`} loading="lazy"/>)}

        {/* Badge Indicator (Top-Left) */}
        {product.badge && (<div className="absolute top-3 left-3 z-10">
            <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-xs shadow-xs ${product.badge === 'SALE'
                ? 'bg-[#C8A87C] text-[#1A1A1A]'
                : product.badge === 'BESTSELLER'
                    ? 'bg-[#1A1A1A] text-white'
                    : product.badge === 'NEW'
                        ? 'bg-emerald-800 text-white'
                        : 'bg-[#E8D5D0] text-[#1A1A1A]'}`}>
              {product.badge === 'SALE' && discountPercent ? `-₹{discountPercent}%` : product.badge}
            </span>
          </div>)}

        {/* Wishlist Button (Top-Right) */}
        <button id={`wishlist-toggle-${product.id}`} onClick={handleWishlistClick} className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-110 ${isWishlisted ? 'text-[#C8A87C]' : 'text-neutral-600 hover:text-black'}`} aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C8A87C]' : ''}`}/>
        </button>

        {/* View Details Button on Hover */}
        <div className={`absolute inset-x-3 bottom-14 z-10 transition-all duration-300 ${isHovered
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3 pointer-events-none'}`}>
          <button id={`view-details-btn-${product.id}`} onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
        }} className="w-full py-2.5 bg-white/95 hover:bg-white text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider shadow-md backdrop-blur-xs flex items-center justify-center gap-2 rounded-xs transition-colors border border-[#E8E3DE]">
            <span>View Garment Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C8A87C]"/>
          </button>
        </div>

        {/* Quick Add To Cart Bar */}
        <div className={`absolute inset-x-0 bottom-0 z-10 transition-all duration-300 ${isHovered
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          <button id={`quick-add-btn-${product.id}`} onClick={handleQuickAdd} disabled={isAddedRecently} className={`w-full py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${isAddedRecently
            ? 'bg-emerald-700 text-white'
            : 'bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A]'}`}>
            {isAddedRecently ? (<>
                <Check className="w-4 h-4"/>
                <span>Added to Cart</span>
              </>) : (<>
                <ShoppingBag className="w-3.5 h-3.5"/>
                <span>Quick Add</span>
              </>)}
          </button>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between text-xs text-[#6B6B6B] mb-1.5">
            <span className="uppercase tracking-widest font-medium text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-600">
              <Star className="w-3.5 h-3.5 fill-current"/>
              <span className="font-semibold text-xs text-[#1A1A1A]">{product.rating}</span>
              <span className="text-[11px] text-[#6B6B6B]">({product.reviews})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-sans text-sm font-medium text-[#1A1A1A] hover:text-[#C8A87C] line-clamp-2 leading-snug transition-colors mb-2 min-h-[38px]">
            {product.name}
          </h3>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-semibold text-[#1A1A1A]">
              ₹{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (<span className="text-xs text-[#6B6B6B] line-through">
                ₹{product.originalPrice.toFixed(2)}
              </span>)}
          </div>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (<div className="flex items-center gap-1.5 pt-2 border-t border-[#E8E3DE]/60">
              {product.colors.map((color, cIdx) => (<button key={cIdx} title={color.name} onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                }} className={`w-4 h-4 rounded-full border transition-transform ${selectedColor.name === color.name
                    ? 'scale-125 ring-2 ring-[#C8A87C] ring-offset-1 border-transparent'
                    : 'border-neutral-300 hover:scale-110'}`} style={{ backgroundColor: color.hex }} aria-label={`Select color ${color.name}`}/>))}
              <span className="text-[11px] text-[#6B6B6B] ml-1.5 truncate">
                {selectedColor.name}
              </span>
            </div>)}
        </div>
      </div>
    </div>);
};
