import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw, Ruler, ChevronDown, ChevronUp, Share2, Check, ArrowRight, Plus, Minus, MessageSquare } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { normalizeProduct } from '../utils/productAdapter';

export const ProductDetailPage = ({
  product: initialProduct,
  allProducts = [],
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  onNavigateToCategory,
  onDirectCheckout
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find and normalize the active product safely
  const rawProduct = (id ? allProducts.find((p) => p.id === id || p._id === id || p.slug === id) : null) ||
    initialProduct ||
    allProducts[0] ||
    null;

  const product = normalizeProduct(rawProduct) || {
    id: 'placeholder',
    name: 'Featured Product',
    price: 0,
    originalPrice: null,
    badge: null,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900',
    galleryImages: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900'],
    colors: [{ name: 'Standard', hex: '#1D241C' }],
    sizes: ['One Size'],
    rating: 5.0,
    reviews: 12,
    category: 'Collection',
    description: 'High quality product made with durable and comfortable materials for everyday use.',
    composition: '100% Premium Quality Materials',
    sustainability: 'Eco-friendly & Durable Design',
    careInstructions: 'Hand wash or gentle machine wash in cold water'
  };

  const isCurrentWishlisted = wishlistIds.includes(product.id);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const colors = Array.isArray(product.colors) && product.colors.length > 0
    ? product.colors
    : [{ name: 'Standard', hex: '#1D241C' }];
  const sizes = Array.isArray(product.sizes) && product.sizes.length > 0
    ? product.sizes
    : ['One Size'];

  const [selectedSize, setSelectedSize] = useState(sizes[0] || 'One Size');
  const [selectedColor, setSelectedColor] = useState(colors[0] || { name: 'Standard', hex: '#1D241C' });
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isCopiedLink, setIsCopiedLink] = useState(false);

  // Details & Fabric Care in simple, natural English
  const detailsList = Array.isArray(product.details) && product.details.length > 0
    ? product.details
    : [
        product.composition || '100% Premium Quality Materials',
        product.sustainability || 'Durable build for long-lasting everyday use',
        'Neat and strong finish for a clean look'
      ];

  const fabricCareList = Array.isArray(product.fabricCare) && product.fabricCare.length > 0
    ? product.fabricCare
    : [
        product.careInstructions || 'Hand wash or gentle machine wash in cold water',
        'Dry in shade and keep away from direct heat',
        'Iron on low temperature if needed'
      ];

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    details: true,
    care: false,
    shipping: false
  });

  // Review submission state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Reset when product changes
  useEffect(() => {
    setSelectedImageIdx(0);
    setSelectedSize(sizes[0] || 'One Size');
    setSelectedColor(colors[0] || { name: 'Standard', hex: '#1D241C' });
    setQuantity(1);
    setAddedSuccess(false);
    setShowReviewForm(false);
    setReviewSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const toggleAccordion = (section) => {
    setOpenAccordions((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const images = Array.isArray(product.galleryImages) && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image, product.hoverImage].filter(Boolean);

  const price = typeof product.price === 'number' ? product.price : Number(product.price) || 0;
  const originalPrice = product.originalPrice ? Number(product.originalPrice) : null;
  const discountPercent = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  // Filter similar products (same category, excluding current product)
  const similarProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 4);

  const handleAddToCartClick = () => {
    setIsAdding(true);
    if (onAddToCart) {
      onAddToCart(product, selectedSize, selectedColor, quantity);
    }
    setTimeout(() => {
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2500);
    }, 400);
  };

  const handleBuyNow = () => {
    if (onDirectCheckout) {
      onDirectCheckout(product, selectedSize, selectedColor, quantity);
    } else {
      if (onAddToCart) onAddToCart(product, selectedSize, selectedColor, quantity);
      navigate('/checkout');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopiedLink(true);
    setTimeout(() => setIsCopiedLink(false), 2000);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    setReviewSubmitted(true);
    setShowReviewForm(false);
  };

  const handleCategoryClick = (cat) => {
    if (onNavigateToCategory) {
      onNavigateToCategory(cat);
    }
    navigate(`/products/${(cat || '').toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 lg:py-12 animate-fade-in text-[#1D241C]">
      <div className="max-w-7xl mx-auto px-5">
        {/* Breadcrumbs Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#687163] mb-8 font-mono">
          <button onClick={() => navigate('/')} className="hover:text-[#1D241C] transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={() => handleCategoryClick(product.category)} className="hover:text-[#1D241C] transition-colors cursor-pointer">
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[#1D241C] font-semibold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Product Hero Section (2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-[#E8E4DC]">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails Sidebar */}
            {images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[580px] scrollbar-none flex-shrink-0">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-16 h-20 md:w-20 md:h-26 rounded-[3px] overflow-hidden border-2 transition-all flex-shrink-0 bg-[#FAF8F5] cursor-pointer ${
                      selectedImageIdx === idx
                        ? 'border-[#C69E58] shadow-xs'
                        : 'border-[#E8E4DC] hover:border-neutral-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover object-center" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-[3/4] bg-[#FAF8F5] rounded-[4px] border border-[#E8E4DC] overflow-hidden group shadow-xs">
              <img
                src={images[selectedImageIdx] || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Badge Tag */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase rounded-xs shadow-xs ${
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
                </div>
              )}

              {/* Action Buttons on Image */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={() => onToggleWishlist && onToggleWishlist(product)}
                  className={`w-10 h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all shadow-md hover:scale-110 cursor-pointer ${
                    isCurrentWishlisted ? 'text-[#C69E58]' : 'text-neutral-600 hover:text-black'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isCurrentWishlisted ? 'fill-[#C69E58]' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all shadow-md hover:scale-110 text-neutral-600 hover:text-black cursor-pointer"
                  aria-label="Share product"
                >
                  {isCopiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
                </button>
              </div>

              {isCopiedLink && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#1D241C] text-white text-xs px-3 py-1.5 rounded-xs shadow-lg animate-fade-in font-medium">
                  Link copied to clipboard!
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product Info & Commerce (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleCategoryClick(product.category)}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C69E58] hover:underline cursor-pointer"
                >
                  {product.category}
                </button>

                <div className="flex items-center gap-1.5 text-amber-600">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#1D241C]">{product.rating || 5.0}</span>
                  <a href="#customer-reviews-section" className="text-xs text-[#687163] hover:underline">
                    ({product.reviews || 12} reviews)
                  </a>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1D241C] leading-tight">
                {product.name}
              </h1>

              {/* Price block */}
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1D241C]">
                  ₹{price.toFixed(2)}
                </span>
                {originalPrice && (
                  <>
                    <span className="text-base text-[#687163] line-through font-sans">
                      ₹{originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                      Save ₹{(originalPrice - price).toFixed(2)} ({discountPercent}% OFF)
                    </span>
                  </>
                )}
              </div>

              {/* Description summary */}
              <p className="text-xs sm:text-sm text-[#687163] leading-relaxed">
                {product.description}
              </p>

              {/* Color Swatch Picker */}
              {colors.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-[#1D241C]">
                      Color: <strong className="text-[#1D241C]">{selectedColor.name}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 flex items-center justify-center cursor-pointer ${
                          selectedColor.name === color.name
                            ? 'border-[#C69E58] scale-110 shadow-xs'
                            : 'border-transparent hover:scale-105'
                        }`}
                        title={color.name}
                      >
                        <span className="w-full h-full rounded-full border border-neutral-300 block" style={{ backgroundColor: color.hex || '#1D241C' }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {sizes.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-[#1D241C]">
                      Select Size: <strong className="text-[#1D241C]">{selectedSize}</strong>
                    </span>

                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="text-xs text-[#C69E58] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] h-10 px-3.5 text-xs font-semibold uppercase tracking-wider rounded-xs border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-[#1D241C] text-white border-[#1D241C] shadow-xs'
                            : 'bg-white text-[#1D241C] border-[#E8E4DC] hover:border-[#C69E58]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Stock Status */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-[#1D241C]">Quantity</span>
                  <span className="text-xs font-medium text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    In Stock • Ready to Dispatch
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#E8E4DC] bg-white rounded-xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-11 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-[#1D241C]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-11 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Primary Add to Cart CTA */}
                  <button
                    id="pdp-add-to-bag-btn"
                    onClick={handleAddToCartClick}
                    disabled={isAdding}
                    className={`flex-1 h-11 px-6 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-xs transition-all shadow-md cursor-pointer ${
                      addedSuccess
                        ? 'bg-[#506040] text-white'
                        : 'bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C]'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart • ₹{(price * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Buy It Now CTA */}
              <button
                id="pdp-buy-now-btn"
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#C69E58] hover:bg-[#A87C38] text-[#1D241C] text-xs font-bold uppercase tracking-widest rounded-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Assurance Badges */}
              <div className="p-4 bg-white rounded-xs border border-[#E8E4DC] grid grid-cols-3 gap-2 text-center text-[11px] text-[#687163]">
                <div className="flex flex-col items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#C69E58]" />
                  <span>Free Delivery on orders ₹5,000+</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-[#C69E58]" />
                  <span>30 Days Easy Return</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C69E58]" />
                  <span>100% Genuine Product</span>
                </div>
              </div>

              {/* Accordion Tabs */}
              <div className="border-t border-[#E8E4DC] pt-4 space-y-3">
                {/* Description */}
                <div className="border-b border-[#E8E4DC] pb-3">
                  <button
                    onClick={() => toggleAccordion('description')}
                    className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1D241C] text-left py-1 cursor-pointer"
                  >
                    <span>Product Description</span>
                    {openAccordions.description ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.description && (
                    <div className="pt-2 text-xs text-[#687163] leading-relaxed">
                      <p>{product.description}</p>
                    </div>
                  )}
                </div>

                {/* Material & Details */}
                <div className="border-b border-[#E8E4DC] pb-3">
                  <button
                    onClick={() => toggleAccordion('details')}
                    className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1D241C] text-left py-1 cursor-pointer"
                  >
                    <span>Material & Product Details</span>
                    {openAccordions.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.details && (
                    <ul className="pt-2 space-y-1.5 text-xs text-[#687163] list-disc list-inside">
                      {detailsList.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Wash & Care */}
                <div className="border-b border-[#E8E4DC] pb-3">
                  <button
                    onClick={() => toggleAccordion('care')}
                    className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1D241C] text-left py-1 cursor-pointer"
                  >
                    <span>Care Instructions</span>
                    {openAccordions.care ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.care && (
                    <ul className="pt-2 space-y-1.5 text-xs text-[#687163] list-disc list-inside">
                      {fabricCareList.map((care, idx) => (
                        <li key={idx}>{care}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Shipping & Delivery */}
                <div className="border-b border-[#E8E4DC] pb-3">
                  <button
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1D241C] text-left py-1 cursor-pointer"
                  >
                    <span>Shipping & Returns</span>
                    {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.shipping && (
                    <div className="pt-2 space-y-2 text-xs text-[#687163] leading-relaxed">
                      <p>
                        We offer free shipping on all orders over ₹5,000. Orders are delivered in 2–4 business days.
                      </p>
                      <p>
                        If you are not satisfied with your purchase, you can easily return it within 30 days of delivery.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section id="customer-reviews-section" className="py-16 border-b border-[#E8E4DC]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C69E58]">
                Customer Feedback
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1D241C] mt-1">
                Ratings & Reviews
              </h3>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors self-start md:self-auto cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{showReviewForm ? 'Close Review Form' : 'Write a Review'}</span>
            </button>
          </div>

          {/* Review Submission Form */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="bg-white p-6 rounded-[4px] border border-[#E8E4DC] mb-10 max-w-xl space-y-4 animate-fade-in shadow-xs">
              <h4 className="font-serif text-lg font-bold text-[#1D241C]">Write a Review</h4>

              <div>
                <label className="text-xs font-medium text-[#1D241C] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xs focus:outline-none focus:border-[#C69E58]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#1D241C] block mb-1">Your Rating</label>
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-125 transition-transform cursor-pointer"
                    >
                      <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-current text-amber-500' : 'text-neutral-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-[#1D241C] ml-2">{reviewRating} out of 5</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#1D241C] block mb-1">Your Review</label>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share what you liked about this product..."
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xs focus:outline-none focus:border-[#C69E58]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          )}

          {reviewSubmitted && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xs text-xs mb-8 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Your review has been submitted successfully.</span>
            </div>
          )}

          {/* Ratings Summary Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-[4px] border border-[#E8E4DC]">
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-[#E8E4DC] pb-6 md:pb-0 md:pr-8">
              <span className="font-serif text-5xl font-bold text-[#1D241C]">{product.rating || 5.0}</span>
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#687163]">Based on {product.reviews || 12} reviews</p>
              <span className="inline-block mt-2 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                98% of customers recommend this item
              </span>
            </div>

            <div className="md:col-span-8 space-y-2">
              {[
                { stars: '5 Star', pct: '88%' },
                { stars: '4 Star', pct: '10%' },
                { stars: '3 Star', pct: '2%' },
                { stars: '2 Star', pct: '0%' },
                { stars: '1 Star', pct: '0%' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-[#687163]">
                  <span className="w-12 font-medium">{item.stars}</span>
                  <div className="flex-1 h-2 bg-[#FAF8F5] rounded-full overflow-hidden border border-[#E8E4DC]">
                    <div className="h-full bg-[#C69E58] rounded-full" style={{ width: item.pct }} />
                  </div>
                  <span className="w-10 text-right font-mono text-[11px]">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Similar Products / "You May Also Like" */}
        {similarProducts.length > 0 && (
          <section id="similar-products-section" className="pt-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C69E58]">
                  Recommendations
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1D241C] mt-1">
                  You May Also Like
                </h3>
              </div>

              <button
                onClick={() => handleCategoryClick(product.category)}
                className="text-xs font-semibold uppercase tracking-wider text-[#1D241C] hover:text-[#C69E58] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View All in {product.category}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((simProd) => (
                <ProductCard
                  key={simProd.id || simProd._id}
                  product={simProd}
                  onAddToCart={(p, size, col) => onAddToCart && onAddToCart(p, size, col, 1)}
                  onToggleWishlist={(p) => onToggleWishlist && onToggleWishlist(p)}
                  isWishlisted={wishlistIds.includes(simProd.id || simProd._id)}
                  onClickProduct={(p) => navigate(`/product/${p.id || p._id}`)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setShowSizeGuide(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[4px] p-6 shadow-2xl z-10 border border-[#E8E4DC] animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DC] mb-4">
              <h4 className="font-serif text-lg font-bold text-[#1D241C]">Size Chart (Inches & CM)</h4>
              <button onClick={() => setShowSizeGuide(false)} className="text-neutral-400 hover:text-black text-xs font-bold uppercase tracking-wider cursor-pointer">
                Close
              </button>
            </div>

            <p className="text-xs text-[#687163] mb-4">
              Please refer to the size chart below to pick your best fit.
            </p>

            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E8E4DC]">
                  <th className="p-2 font-bold text-[#1D241C]">Size</th>
                  <th className="p-2 font-bold text-[#1D241C]">Chest / Bust</th>
                  <th className="p-2 font-bold text-[#1D241C]">Waist</th>
                  <th className="p-2 font-bold text-[#1D241C]">Hips</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4DC]">
                <tr>
                  <td className="p-2 font-semibold">XS</td>
                  <td className="p-2">32&quot; (81cm)</td>
                  <td className="p-2">24&quot; (61cm)</td>
                  <td className="p-2">35&quot; (89cm)</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">S</td>
                  <td className="p-2">34&quot; (86cm)</td>
                  <td className="p-2">26&quot; (66cm)</td>
                  <td className="p-2">37&quot; (94cm)</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">M</td>
                  <td className="p-2">36&quot; (91cm)</td>
                  <td className="p-2">28&quot; (71cm)</td>
                  <td className="p-2">39&quot; (99cm)</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">L</td>
                  <td className="p-2">38.5&quot; (98cm)</td>
                  <td className="p-2">30.5&quot; (77cm)</td>
                  <td className="p-2">41.5&quot; (105cm)</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">XL</td>
                  <td className="p-2">41&quot; (104cm)</td>
                  <td className="p-2">33&quot; (84cm)</td>
                  <td className="p-2">44&quot; (112cm)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
