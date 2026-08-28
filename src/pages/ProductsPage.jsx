import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  ArrowUpDown,
  X,
  ChevronRight,
  Check,
  Sparkles,
  Flame,
  Tag,
  Grid3X3,
  Grid2X2,
  LayoutGrid,
  List,
  Search,
  ChevronDown,
  ChevronLeft,
  RotateCcw,
  ShoppingBag,
  Heart,
  Sliders,
  Filter
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const ProductsPage = ({
  allProducts,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onNavigateToCategory
}) => {
  const { category: routeCategory } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Parse URL query parameters
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialSearch = queryParams.get('search') || '';

  // Determine active category from route (e.g. /products/men -> 'Men')
  const activeCategory = useMemo(() => {
    if (!routeCategory || routeCategory.toLowerCase() === 'all') return 'All';
    const normalized = routeCategory.toLowerCase();
    if (normalized === 'men' || normalized === 'mens') return 'Men';
    if (normalized === 'women' || normalized === 'womens') return 'Women';
    if (normalized === 'kids') return 'Kids';
    if (normalized === 'accessories') return 'Accessories';
    return 'All';
  }, [routeCategory]);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedBadge, setSelectedBadge] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 750]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  // Layout & Sort States
  const [sortBy, setSortBy] = useState('featured');
  const [gridDensity, setGridDensity] = useState('3'); // '2', '3', '4', 'list'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Sync search query if URL changes
  useEffect(() => {
    const urlSearch = queryParams.get('search') || '';
    setSearchQuery(urlSearch);
  }, [location.search, queryParams]);

  // Reset pagination when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Scroll to top of catalog when page changes
  const scrollToCatalogTop = () => {
    const el = document.getElementById('catalog-content-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Category Hero Descriptions & Banners
  const categoryHeaders = {
    All: {
      title: 'Complete Atelier Catalog',
      subtitle: 'Sculpted silhouettes, tactile organic fabrics, and quiet luxury craftsmanship curated across all collections.',
      bannerImg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1800&auto=format&fit=crop',
      badge: 'ARCHIVE & ATELIER'
    },
    Men: {
      title: "Men's Sartorial Collection",
      subtitle: 'Architectural jackets, tropical wool trousers, Japanese selvedge denim, and cashmere knitwear designed for poise.',
      bannerImg: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1800&auto=format&fit=crop',
      badge: 'MEN’S EDITORIAL'
    },
    Women: {
      title: "Women's Capsule Wardrobe",
      subtitle: 'Pure mulberry silk slip dresses, double-breasted outerwear, column skirts, and bespoke Italian tailoring.',
      bannerImg: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1800&auto=format&fit=crop',
      badge: 'WOMEN’S CAPSULE'
    },
    Kids: {
      title: "Kids' Organic Collection",
      subtitle: 'GOTS certified organic cotton sets, miniature wool peacoats, and gentle knitwear crafted for playful longevity.',
      bannerImg: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?q=80&w=1800&auto=format&fit=crop',
      badge: 'GOTS CERTIFIED'
    },
    Accessories: {
      title: 'Fine Leather & Handcrafted Optics',
      subtitle: 'Vegetable-tanned calfskin bags, 18K gold vermeil jewelry, Japanese acetate sunglasses, and pure silk scarves.',
      bannerImg: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1800&auto=format&fit=crop',
      badge: 'ARTISANAL GOODS'
    }
  };

  const currentHeader = categoryHeaders[activeCategory] || categoryHeaders.All;

  // Color Swatches Palette
  const availableColors = [
    { name: 'Pitch Black', hex: '#1A1A1A' },
    { name: 'Ivory / White', hex: '#FDFBF7' },
    { name: 'Oatmeal Taupe', hex: '#D8CDBF' },
    { name: 'Camel Gold', hex: '#C8A87C' },
    { name: 'Espresso / Brown', hex: '#3E2723' },
    { name: 'Midnight Navy', hex: '#1C2841' },
    { name: 'Sage Olive', hex: '#556B2F' },
    { name: 'Burgundy Oxblood', hex: '#4A0E17' },
    { name: 'Charcoal Grey', hex: '#5A6065' }
  ];

  // Size Options
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size', '2-3Y', '4-5Y', '6-7Y', '8-9Y'];

  // Handle Category Switching via Route
  const handleCategorySwitch = (catSlug) => {
    setCurrentPage(1);
    if (catSlug === 'All') {
      navigate('/products');
    } else {
      navigate(`/products/${catSlug.toLowerCase()}`);
    }
  };

  // Toggle Color Filter
  const toggleColor = (colorName) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
    setCurrentPage(1);
  };

  // Toggle Size Filter
  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  // Reset All Filters
  const handleResetAllFilters = () => {
    setSelectedBadge('all');
    setPriceRange([0, 750]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
    navigate(activeCategory === 'All' ? '/products' : `/products/${activeCategory.toLowerCase()}`);
  };

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Category filter
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // 3. Badge / Collection filter
    if (selectedBadge === 'bestsellers') {
      result = result.filter((p) => p.isBestSeller || p.badge === 'BESTSELLER');
    } else if (selectedBadge === 'new') {
      result = result.filter((p) => p.isNew || p.badge === 'NEW');
    } else if (selectedBadge === 'sale') {
      result = result.filter((p) => p.isSale || p.badge === 'SALE' || p.originalPrice);
    } else if (selectedBadge === 'atelier') {
      result = result.filter((p) => p.badge === 'ATELIER' || p.badge === 'LIMITED');
    } else if (selectedBadge === 'organic') {
      result = result.filter((p) => p.badge === 'ORGANIC');
    }

    // 4. Price filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 5. In stock & On sale only
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }
    if (onSaleOnly) {
      result = result.filter((p) => p.isSale || p.originalPrice);
    }

    // 6. Size filter
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes && p.sizes.some((s) => selectedSizes.includes(s)));
    }

    // 7. Color filter
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors && p.colors.some((c) => selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase())))
      );
    }

    // 8. Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Featured
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [
    allProducts,
    activeCategory,
    searchQuery,
    selectedBadge,
    priceRange,
    inStockOnly,
    onSaleOnly,
    selectedSizes,
    selectedColors,
    sortBy
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedBadge !== 'all') count++;
    if (priceRange[0] > 0 || priceRange[1] < 750) count++;
    if (selectedColors.length > 0) count += selectedColors.length;
    if (selectedSizes.length > 0) count += selectedSizes.length;
    if (inStockOnly) count++;
    if (onSaleOnly) count++;
    if (searchQuery) count++;
    return count;
  }, [
    selectedBadge,
    priceRange,
    selectedColors,
    selectedSizes,
    inStockOnly,
    onSaleOnly,
    searchQuery
  ]);

  // Render Filter Sidebar Content (Shared between desktop sidebar & mobile drawer)
  const renderFilterSidebar = () => (
    <div className="space-y-8 text-sm">
      {/* Category Selection */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3 pb-2 border-b border-[#E8E3DE]">
          Collections
        </h4>
        <div className="space-y-2">
          {[
            { label: 'All Collections', slug: 'All', count: allProducts.length },
            { label: "Men's Fashion", slug: 'Men', count: allProducts.filter((p) => p.category === 'Men').length },
            { label: "Women's Fashion", slug: 'Women', count: allProducts.filter((p) => p.category === 'Women').length },
            { label: "Kids' Collection", slug: 'Kids', count: allProducts.filter((p) => p.category === 'Kids').length },
            { label: 'Accessories', slug: 'Accessories', count: allProducts.filter((p) => p.category === 'Accessories').length }
          ].map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                handleCategorySwitch(cat.slug);
                setIsMobileFilterOpen(false);
              }}
              className={`w-full flex items-center justify-between py-1 px-2 rounded-xs text-xs font-medium transition-colors ${activeCategory === cat.slug
                  ? 'bg-[#1A1A1A] text-white font-semibold'
                  : 'text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F0EBE4]'
                }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] font-mono ${activeCategory === cat.slug ? 'text-[#C8A87C]' : 'text-neutral-400'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
            Price Range
          </h4>
          <span className="text-xs font-mono font-semibold text-[#C8A87C]">
            ${priceRange[0]} – ${priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="750"
          step="25"
          value={priceRange[1]}
          onChange={(e) => {
            setPriceRange([priceRange[0], parseInt(e.target.value)]);
            setCurrentPage(1);
          }}
          className="w-full h-1.5 bg-[#E8E3DE] rounded-lg appearance-none cursor-pointer accent-[#1A1A1A]"
        />
        <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono mt-1">
          <span>₹0</span>
          <span>₹5,000</span>
          <span>₹25,000+</span>
        </div>
      </div>

      {/* Curation Badges */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3 pb-2 border-b border-[#E8E3DE]">
          Curated Edits
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'bestsellers', label: 'Best Sellers' },
            { id: 'new', label: 'New Arrivals' },
            { id: 'sale', label: 'On Sale' },
            { id: 'atelier', label: 'Atelier Ed.' },
            { id: 'organic', label: 'Organic GOTS' }
          ].map((badge) => (
            <button
              key={badge.id}
              onClick={() => {
                setSelectedBadge(badge.id);
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1.5 text-[11px] font-medium rounded-xs border text-left transition-all ${selectedBadge === badge.id
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white text-[#6B6B6B] border-[#E8E3DE] hover:border-[#1A1A1A]'
                }`}
            >
              {badge.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes Selection */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3 pb-2 border-b border-[#E8E3DE]">
          Sizes
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded-xs border transition-all ${selectedSizes.includes(size)
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white text-[#6B6B6B] border-[#E8E3DE] hover:border-[#1A1A1A]'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3 pb-2 border-b border-[#E8E3DE]">
          Colors
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => {
            const isSelected = selectedColors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                title={color.name}
                className={`w-6 h-6 rounded-full border flex items-center justify-center transition-transform ${isSelected ? 'scale-115 ring-2 ring-[#C8A87C] ring-offset-1' : 'hover:scale-105'
                  }`}
                style={{ backgroundColor: color.hex, borderColor: '#CCCCCC' }}
              >
                {isSelected && (
                  <Check
                    className={`w-3 h-3 ${color.hex === '#FDFBF7' || color.hex === '#D8CDBF' ? 'text-black' : 'text-white'}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability Checkboxes */}
      <div className="space-y-2 pt-2 border-t border-[#E8E3DE]">
        <label className="flex items-center gap-2.5 text-xs text-[#1A1A1A] cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => {
              setInStockOnly(e.target.checked);
              setCurrentPage(1);
            }}
            className="w-4 h-4 rounded-xs text-[#1A1A1A] accent-[#1A1A1A]"
          />
          <span>In Stock Only</span>
        </label>
        <label className="flex items-center gap-2.5 text-xs text-[#1A1A1A] cursor-pointer">
          <input
            type="checkbox"
            checked={onSaleOnly}
            onChange={(e) => {
              setOnSaleOnly(e.target.checked);
              setCurrentPage(1);
            }}
            className="w-4 h-4 rounded-xs text-[#1A1A1A] accent-[#1A1A1A]"
          />
          <span>Special Offers & Sale</span>
        </label>
      </div>

      {/* Reset Action */}
      {activeFiltersCount > 0 && (
        <button
          onClick={handleResetAllFilters}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#FAF6F0] hover:bg-[#F0EBE4] text-[#1A1A1A] border border-[#E8E3DE] rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters ({activeFiltersCount})</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F6F3] text-[#1A1A1A] animate-fade-in pb-24">
      {/* 1. Category Hero Banner */}
      <div className="relative bg-[#1A1A1A] text-white py-16 md:py-24 px-5 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentHeader.bannerImg}
            alt={currentHeader.title}
            className="w-full h-full object-cover object-center opacity-30 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-4 uppercase tracking-widest font-mono">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-neutral-600" />
            <Link to="/products" className="hover:text-white transition-colors">Collections</Link>
            {activeCategory !== 'All' && (
              <>
                <ChevronRight className="w-3 h-3 text-neutral-600" />
                <span className="text-[#C8A87C] font-bold">{activeCategory}</span>
              </>
            )}
          </nav>

          <div className="max-w-2xl space-y-3">
            <span className="inline-block px-2.5 py-0.5 bg-[#C8A87C] text-[#1A1A1A] text-[10px] font-bold tracking-widest uppercase rounded-xs">
              {currentHeader.badge}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              {currentHeader.title}
            </h1>
            <p className="text-sm md:text-base text-neutral-300 font-sans leading-relaxed">
              {currentHeader.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Top Category Pills Navigation Bar */}
      <div className="sticky top-[69px] z-30 bg-[#F8F6F3]/95 backdrop-blur-md border-b border-[#E8E3DE] py-3.5 px-5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          {/* Categories Horizontal Switcher */}
          <div className="flex items-center gap-2">
            {[
              { label: 'All Collections', slug: 'All' },
              { label: 'Men', slug: 'Men' },
              { label: 'Women', slug: 'Women' },
              { label: 'Kids', slug: 'Kids' },
              { label: 'Accessories', slug: 'Accessories' }
            ].map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategorySwitch(cat.slug)}
                className={`whitespace-nowrap px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${activeCategory === cat.slug
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'bg-white border border-[#E8E3DE] text-[#6B6B6B] hover:text-[#1A1A1A] hover:border-[#1A1A1A]'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Direct Collection Shortcut Badges */}
          <div className="hidden md:flex items-center gap-2">
            {[
              { id: 'all', label: 'All Pieces' },
              { id: 'bestsellers', label: 'Best Sellers' },
              { id: 'new', label: 'New Drops' },
              { id: 'sale', label: 'Sale' }
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedBadge(b.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 text-xs font-medium rounded-xs transition-colors ${selectedBadge === b.id
                    ? 'bg-[#1A1A1A] text-white'
                    : 'text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#E8E3DE]/50'
                  }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Main Catalog Section with Sidebar + Products Grid */}
      <section id="catalog-content-section" className="max-w-7xl mx-auto px-5 py-8 md:py-12">
        {/* Controls & Metrics Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E3DE]">
          {/* Left: Filter Toggle for Mobile + Results Counter */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E8E3DE] rounded-xs text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] shadow-2xs hover:bg-[#F0EBE4] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C8A87C]" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            <div className="text-xs text-[#6B6B6B] font-mono">
              Showing <span className="font-bold text-[#1A1A1A]">{filteredProducts.length === 0 ? 0 : startIndex + 1}–{endIndex}</span> of{' '}
              <span className="font-bold text-[#1A1A1A]">{filteredProducts.length}</span> luxury pieces
            </div>
          </div>

          {/* Right: Search, Sorting, Grid Density Switches */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Catalog Internal Search Input */}
            <div className="relative min-w-[200px] flex-1 md:flex-initial">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search this collection..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-white border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] text-[#1A1A1A] placeholder-neutral-400 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none pl-3 pr-8 py-1.5 text-xs font-semibold uppercase tracking-wider bg-white border border-[#E8E3DE] rounded-xs text-[#1A1A1A] cursor-pointer focus:outline-none focus:border-[#C8A87C] shadow-2xs"
              >
                <option value="featured">Featured / Curated</option>
                <option value="newest">Newest Drops</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 pointer-events-none" />
            </div>

            {/* Grid Density Switcher (Desktop Only) */}
            <div className="hidden sm:flex items-center gap-1 bg-white border border-[#E8E3DE] p-1 rounded-xs shadow-2xs">
              <button
                onClick={() => setGridDensity('2')}
                title="2 Columns"
                className={`p-1 rounded-xs transition-colors ${gridDensity === '2' ? 'bg-[#1A1A1A] text-white' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}
              >
                <Grid2X2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridDensity('3')}
                title="3 Columns"
                className={`p-1 rounded-xs transition-colors ${gridDensity === '3' ? 'bg-[#1A1A1A] text-white' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridDensity('4')}
                title="4 Columns"
                className={`p-1 rounded-xs transition-colors ${gridDensity === '4' ? 'bg-[#1A1A1A] text-white' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridDensity('list')}
                title="List View"
                className={`p-1 rounded-xs transition-colors ${gridDensity === 'list' ? 'bg-[#1A1A1A] text-white' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-3 rounded-xs border border-[#E8E3DE] shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mr-1">
              Active Filters:
            </span>
            {selectedBadge !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF6F0] text-[#1A1A1A] border border-[#E8E3DE] text-xs rounded-xs font-medium">
                Edit: {selectedBadge.toUpperCase()}
                <button onClick={() => setSelectedBadge('all')} className="hover:text-red-600"><X className="w-3 h-3" /></button>
              </span>
            )}
            {(priceRange[0] > 0 || priceRange[1] < 750) && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF6F0] text-[#1A1A1A] border border-[#E8E3DE] text-xs rounded-xs font-medium">
                Price: ${priceRange[0]}–${priceRange[1]}
                <button onClick={() => setPriceRange([0, 750])} className="hover:text-red-600"><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedSizes.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF6F0] text-[#1A1A1A] border border-[#E8E3DE] text-xs rounded-xs font-medium">
                Size: {s}
                <button onClick={() => toggleSize(s)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
              </span>
            ))}
            {selectedColors.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF6F0] text-[#1A1A1A] border border-[#E8E3DE] text-xs rounded-xs font-medium">
                Color: {c}
                <button onClick={() => toggleColor(c)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
              </span>
            ))}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF6F0] text-[#1A1A1A] border border-[#E8E3DE] text-xs rounded-xs font-medium">
                Search: &quot;{searchQuery}&quot;
                <button onClick={() => setSearchQuery('')} className="hover:text-red-600"><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              onClick={handleResetAllFilters}
              className="text-xs text-[#C8A87C] hover:underline font-semibold ml-auto"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Catalog Grid Layout (Sidebar Left + Grid Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Desktop Sticky Filters Sidebar (3 Cols) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 bg-white p-6 rounded-[4px] border border-[#E8E3DE] shadow-2xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8E3DE]">
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C8A87C]" />
                  <span>Refine Catalog</span>
                </h3>
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 bg-[#C8A87C] text-[#1A1A1A] text-[10px] font-bold rounded-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              {renderFilterSidebar()}
            </div>
          </aside>

          {/* Products Grid / List (9 Cols) */}
          <div className="lg:col-span-9">
            {currentProducts.length > 0 ? (
              <>
                {/* Responsive Grid mapping density */}
                <div
                  className={`grid gap-6 ${gridDensity === '2'
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : gridDensity === '4'
                        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                        : gridDensity === 'list'
                          ? 'grid-cols-1'
                          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                    }`}
                >
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                      onToggleWishlist={onToggleWishlist}
                      isWishlisted={wishlistIds.includes(product.id)}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-8 border-t border-[#E8E3DE]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#6B6B6B] font-mono">Items per page:</span>
                      {[12, 24, 48].map((num) => (
                        <button
                          key={num}
                          onClick={() => {
                            setItemsPerPage(num);
                            setCurrentPage(1);
                            scrollToCatalogTop();
                          }}
                          className={`px-2.5 py-1 text-xs font-mono rounded-xs border transition-colors ${itemsPerPage === num
                              ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold'
                              : 'bg-white text-[#6B6B6B] border-[#E8E3DE] hover:border-[#1A1A1A]'
                            }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setCurrentPage((prev) => Math.max(prev - 1, 1));
                          scrollToCatalogTop();
                        }}
                        disabled={currentPage === 1}
                        className="p-2 border border-[#E8E3DE] rounded-xs bg-white text-[#1A1A1A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F0EBE4] transition-colors"
                        aria-label="Previous Page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            scrollToCatalogTop();
                          }}
                          className={`w-8 h-8 flex items-center justify-center text-xs font-mono font-semibold rounded-xs border transition-colors ${currentPage === pageNum
                              ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                              : 'bg-white text-[#6B6B6B] border-[#E8E3DE] hover:border-[#1A1A1A]'
                            }`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        onClick={() => {
                          setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                          scrollToCatalogTop();
                        }}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-[#E8E3DE] rounded-xs bg-white text-[#1A1A1A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F0EBE4] transition-colors"
                        aria-label="Next Page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Empty Fallback State */
              <div className="bg-white p-12 md:p-16 rounded-[4px] border border-[#E8E3DE] text-center space-y-6 shadow-2xs">
                <div className="w-16 h-16 rounded-full bg-[#FAF6F0] flex items-center justify-center mx-auto text-[#C8A87C]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                    No Matching Silhouettes Found
                  </h3>
                  <p className="text-xs md:text-sm text-[#6B6B6B]">
                    We couldn&apos;t find any items matching your active filter configuration. Try broadening your price range or clearing specific color/size tags.
                  </p>
                </div>
                <button
                  onClick={handleResetAllFilters}
                  className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest transition-all rounded-xs shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Mobile Sliding Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-sm bg-[#F8F6F3] h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8E3DE]">
                <div className="flex items-center gap-2 font-serif text-lg font-bold text-[#1A1A1A]">
                  <SlidersHorizontal className="w-4 h-4 text-[#C8A87C]" />
                  <span>Refine Catalog</span>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-neutral-600 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {renderFilterSidebar()}
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8E3DE]">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest rounded-xs text-center"
              >
                Apply Filters ({filteredProducts.length} Items)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
