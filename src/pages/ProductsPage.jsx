import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  X,
  ChevronRight,
  Check,
  Sparkles,
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
  Filter,
  ArrowRight
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const ProductsPage = ({
  allProducts = [],
  categories = [],
  isLoading = false,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  onNavigateToCategory
}) => {
  const { category: routeCategory } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. URL Query Parameter parsing & initial states
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialSearch = queryParams.get('search') || '';
  const initialSort = queryParams.get('sort') || 'featured';
  const initialBadge = queryParams.get('badge') || 'all';
  const initialMinPrice = queryParams.get('minPrice') ? Number(queryParams.get('minPrice')) : 0;
  const initialMaxPrice = queryParams.get('maxPrice') ? Number(queryParams.get('maxPrice')) : 10000;
  const initialColors = queryParams.get('colors') ? queryParams.get('colors').split(',').filter(Boolean) : [];
  const initialSizes = queryParams.get('sizes') ? queryParams.get('sizes').split(',').filter(Boolean) : [];
  const initialInStock = queryParams.get('inStock') === 'true';
  const initialOnSale = queryParams.get('onSale') === 'true';
  const initialView = queryParams.get('view') || '3';
  const initialPage = queryParams.get('page') ? parseInt(queryParams.get('page'), 10) : 1;

  // 2. Dynamic Category Resolution
  const activeCategory = useMemo(() => {
    if (!routeCategory || routeCategory.toLowerCase() === 'all') return 'All';
    const match = categories.find((c) => (c.slug || c.name).toLowerCase() === routeCategory.toLowerCase());
    if (match) return match.name;
    return routeCategory.charAt(0).toUpperCase() + routeCategory.slice(1);
  }, [routeCategory, categories]);

  // 3. Filter, Sort, Layout & Pagination States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedBadge, setSelectedBadge] = useState(initialBadge);
  const [priceRange, setPriceRange] = useState([initialMinPrice, initialMaxPrice]);
  const [selectedColors, setSelectedColors] = useState(initialColors);
  const [selectedSizes, setSelectedSizes] = useState(initialSizes);
  const [inStockOnly, setInStockOnly] = useState(initialInStock);
  const [onSaleOnly, setOnSaleOnly] = useState(initialOnSale);
  const [sortBy, setSortBy] = useState(initialSort);
  const [gridDensity, setGridDensity] = useState(initialView);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Sync state if URL changes externally
  useEffect(() => {
    const urlSearch = queryParams.get('search') || '';
    if (urlSearch !== searchQuery) setSearchQuery(urlSearch);
  }, [location.search]);

  // Compute Catalog Max Price dynamically
  const catalogMaxPrice = useMemo(() => {
    if (allProducts.length === 0) return 5000;
    const max = Math.max(...allProducts.map((p) => p.price || 0));
    return Math.max(1000, Math.ceil(max / 100) * 100);
  }, [allProducts]);

  // Dynamic Colors & Sizes derived from actual products
  const availableColors = useMemo(() => {
    const colorMap = new Map();
    allProducts.forEach((p) => {
      if (Array.isArray(p.colors)) {
        p.colors.forEach((c) => {
          if (c && c.name && !colorMap.has(c.name.toLowerCase())) {
            colorMap.set(c.name.toLowerCase(), { name: c.name, hex: c.hex || '#1D241C' });
          }
        });
      }
    });
    if (colorMap.size === 0) {
      return [
        { name: 'Pitch Black', hex: '#1D241C' },
        { name: 'Ivory White', hex: '#FDFBF7' },
        { name: 'Oatmeal Taupe', hex: '#D8CDBF' },
        { name: 'Glam Gold', hex: '#C69E58' },
        { name: 'Botanical Sage', hex: '#506040' },
        { name: 'Midnight Navy', hex: '#1C2841' },
        { name: 'Espresso Brown', hex: '#3E2723' },
      ];
    }
    return Array.from(colorMap.values());
  }, [allProducts]);

  const availableSizes = useMemo(() => {
    const sizeSet = new Set();
    allProducts.forEach((p) => {
      if (Array.isArray(p.sizes)) {
        p.sizes.forEach((s) => {
          if (s) sizeSet.add(s);
        });
      }
    });
    if (sizeSet.size === 0) {
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
    }
    return Array.from(sizeSet);
  }, [allProducts]);

  // Dynamic Category Filter Tree with Live Item Counts
  const collectionFilterList = useMemo(() => {
    const list = [{ label: 'All Collections', slug: 'All', count: allProducts.length }];
    if (Array.isArray(categories) && categories.length > 0) {
      categories.forEach((cat) => {
        const slug = cat.slug || cat.name;
        const count = allProducts.filter(
          (p) =>
            p.category?.toLowerCase() === cat.name?.toLowerCase() ||
            p.categorySlug?.toLowerCase() === slug.toLowerCase() ||
            p.categoryId === cat.id
        ).length;
        list.push({
          label: cat.name,
          slug,
          count
        });
      });
    }
    return list;
  }, [categories, allProducts]);

  // Update URL Query Parameters on Filter Change
  const updateUrlParams = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (sortBy !== 'featured') params.set('sort', sortBy);
    if (selectedBadge !== 'all') params.set('badge', selectedBadge);
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < catalogMaxPrice) params.set('maxPrice', priceRange[1].toString());
    if (selectedColors.length > 0) params.set('colors', selectedColors.join(','));
    if (selectedSizes.length > 0) params.set('sizes', selectedSizes.join(','));
    if (inStockOnly) params.set('inStock', 'true');
    if (onSaleOnly) params.set('onSale', 'true');
    if (gridDensity !== '3') params.set('view', gridDensity);
    if (currentPage > 1) params.set('page', currentPage.toString());

    const searchString = params.toString();
    const targetPath = activeCategory === 'All' ? '/products' : `/products/${activeCategory.toLowerCase()}`;
    navigate({ pathname: targetPath, search: searchString ? `?${searchString}` : '' }, { replace: true });
  }, [searchQuery, sortBy, selectedBadge, priceRange, catalogMaxPrice, selectedColors, selectedSizes, inStockOnly, onSaleOnly, gridDensity, currentPage, activeCategory, navigate]);

  useEffect(() => {
    updateUrlParams();
  }, [searchQuery, sortBy, selectedBadge, priceRange, selectedColors, selectedSizes, inStockOnly, onSaleOnly, gridDensity, currentPage]);

  // Scroll to top of catalog helper
  const scrollToCatalogTop = () => {
    const el = document.getElementById('catalog-content-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Category Hero Banner resolver
  const currentCategoryObj = categories.find((c) => c.name.toLowerCase() === activeCategory.toLowerCase() || (c.slug && c.slug.toLowerCase() === activeCategory.toLowerCase()));
  const currentHeader = {
    title: activeCategory === 'All' ? 'All Products' : `${activeCategory} Collection`,
    subtitle: currentCategoryObj?.description || currentCategoryObj?.subtitle || 'Explore our full range of quality products and find what suits your style best.',
    bannerImg: currentCategoryObj?.image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1800&auto=format&fit=crop',
    badge: 'COLLECTION'
  };

  // Handlers
  const handleCategorySwitch = (catSlug) => {
    setCurrentPage(1);
    if (onNavigateToCategory) onNavigateToCategory(catSlug);
    if (catSlug === 'All') {
      navigate('/products');
    } else {
      navigate(`/products/${catSlug.toLowerCase()}`);
    }
  };

  const toggleColor = (colorName) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
    setCurrentPage(1);
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  const handleResetAllFilters = () => {
    setSelectedBadge('all');
    setPriceRange([0, catalogMaxPrice]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
    navigate(activeCategory === 'All' ? '/products' : `/products/${activeCategory.toLowerCase()}`);
  };

  // 4. Product Filtering & Sorting Pipeline
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Category filter
    if (activeCategory !== 'All') {
      result = result.filter(
        (p) =>
          p.category?.toLowerCase() === activeCategory.toLowerCase() ||
          p.categorySlug?.toLowerCase() === activeCategory.toLowerCase() ||
          (p.categoryId && currentCategoryObj && p.categoryId === currentCategoryObj.id)
      );
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q))
      );
    }

    // 3. Curated Badge filter
    if (selectedBadge === 'bestsellers') {
      result = result.filter((p) => p.isBestSeller || p.badge === 'BESTSELLER');
    } else if (selectedBadge === 'new') {
      result = result.filter((p) => p.isNew || p.badge === 'NEW');
    } else if (selectedBadge === 'sale') {
      result = result.filter((p) => p.badge === 'SALE' || (p.originalPrice && p.originalPrice > p.price));
    } else if (selectedBadge === 'atelier') {
      result = result.filter((p) => p.badge === 'ATELIER' || p.badge === 'LIMITED');
    } else if (selectedBadge === 'organic') {
      result = result.filter((p) => p.badge === 'ORGANIC');
    }

    // 4. Price filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 5. In Stock Only
    if (inStockOnly) {
      result = result.filter((p) => p.isStockAvailable !== false);
    }

    // 6. On Sale Only
    if (onSaleOnly) {
      result = result.filter((p) => p.badge === 'SALE' || (p.originalPrice && p.originalPrice > p.price));
    }

    // 7. Size filter
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes && p.sizes.some((s) => selectedSizes.includes(s)));
    }

    // 8. Color filter
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors && p.colors.some((c) => selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase())))
      );
    }

    // 9. Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 5) - (a.rating || 5));
        break;
      case 'reviews':
        result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      default:
        result.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
        break;
    }

    return result;
  }, [
    allProducts,
    activeCategory,
    currentCategoryObj,
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

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedBadge !== 'all') count++;
    if (priceRange[0] > 0 || priceRange[1] < catalogMaxPrice) count++;
    if (selectedColors.length > 0) count += selectedColors.length;
    if (selectedSizes.length > 0) count += selectedSizes.length;
    if (inStockOnly) count++;
    if (onSaleOnly) count++;
    if (searchQuery) count++;
    return count;
  }, [selectedBadge, priceRange, catalogMaxPrice, selectedColors, selectedSizes, inStockOnly, onSaleOnly, searchQuery]);

  // Shared Filter Sidebar View
  const renderFilterSidebar = () => (
    <div className="space-y-8 text-sm">
      {/* Category Selection */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D241C] mb-3 pb-2 border-b border-[#E8E4DC]">
          Collections
        </h4>
        <div className="space-y-1.5">
          {collectionFilterList.map((cat) => {
            const isSelected = activeCategory.toLowerCase() === cat.slug.toLowerCase() || (activeCategory === 'All' && cat.slug === 'All');
            return (
              <button
                key={cat.slug}
                onClick={() => {
                  handleCategorySwitch(cat.slug);
                  setIsMobileFilterOpen(false);
                }}
                className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-xs text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#1D241C] text-white font-semibold shadow-xs'
                    : 'text-[#687163] hover:text-[#1D241C] hover:bg-[#F3F0E9]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-[#C69E58]' : 'text-neutral-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Single Dual-Thumb Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#E8E4DC]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D241C]">
            Price Range
          </h4>
          <span className="text-xs font-mono font-bold text-[#506040] bg-[#FAF8F5] px-2.5 py-0.5 rounded-lg border border-[#E8E4DC]">
            ₹{priceRange[0]} – ₹{priceRange[1]}
          </span>
        </div>

        {/* Single Dual-Thumb Slider Track */}
        <div className="py-3">
          <div className="relative w-full h-2 flex items-center">
            {/* Background Rail */}
            <div className="absolute w-full h-1.5 bg-[#E8E4DC] rounded-full" />

            {/* Active Range Highlight Between Min and Max */}
            <div
              className="absolute h-1.5 bg-[#1D241C] rounded-full"
              style={{
                left: `${Math.min(100, Math.max(0, (priceRange[0] / catalogMaxPrice) * 100))}%`,
                right: `${Math.min(100, Math.max(0, 100 - (priceRange[1] / catalogMaxPrice) * 100))}%`
              }}
            />

            {/* Min Range Thumb Input */}
            <input
              type="range"
              min="0"
              max={catalogMaxPrice}
              step="50"
              value={priceRange[0]}
              onChange={(e) => {
                const val = Math.min(Number(e.target.value), priceRange[1] - 50);
                setPriceRange([val, priceRange[1]]);
                setCurrentPage(1);
              }}
              className={`absolute top-0 left-0 w-full h-full appearance-none pointer-events-none bg-transparent focus:outline-none ${
                priceRange[0] > catalogMaxPrice - 100 ? 'z-30' : 'z-10'
              } [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1D241C] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#C69E58] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:scale-115 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#1D241C] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#C69E58] [&::-moz-range-thumb]:cursor-pointer`}
            />

            {/* Max Range Thumb Input */}
            <input
              type="range"
              min="0"
              max={catalogMaxPrice}
              step="50"
              value={priceRange[1]}
              onChange={(e) => {
                const val = Math.max(Number(e.target.value), priceRange[0] + 50);
                setPriceRange([priceRange[0], val]);
                setCurrentPage(1);
              }}
              className="absolute top-0 left-0 w-full h-full appearance-none pointer-events-none bg-transparent focus:outline-none z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1D241C] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#C69E58] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:scale-115 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#1D241C] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#C69E58] [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono mt-2">
            <span>₹0 (Min)</span>
            <span>₹{Math.round(catalogMaxPrice / 2)}</span>
            <span>₹{catalogMaxPrice}+ (Max)</span>
          </div>
        </div>

        {/* Quick Min & Max Numeric Display */}
        <div className="grid grid-cols-2 gap-2 mt-1 pt-2 border-t border-[#E8E4DC]">
          <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-2.5 py-1.5 rounded-lg border border-[#E8E4DC]">
            <span className="text-[10px] font-semibold text-[#687163] uppercase">Min:</span>
            <span className="text-xs font-mono font-bold text-[#1D241C]">₹{priceRange[0]}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-2.5 py-1.5 rounded-lg border border-[#E8E4DC]">
            <span className="text-[10px] font-semibold text-[#687163] uppercase">Max:</span>
            <span className="text-xs font-mono font-bold text-[#1D241C]">₹{priceRange[1]}</span>
          </div>
        </div>

        {/* Quick Price Presets */}
        <div className="grid grid-cols-2 gap-1.5 pt-2 mt-1">
          {[
            { label: `Under ₹${Math.round(catalogMaxPrice * 0.25)}`, range: [0, Math.round(catalogMaxPrice * 0.25)] },
            { label: `₹${Math.round(catalogMaxPrice * 0.25)} – ₹${Math.round(catalogMaxPrice * 0.5)}`, range: [Math.round(catalogMaxPrice * 0.25), Math.round(catalogMaxPrice * 0.5)] },
            { label: `₹${Math.round(catalogMaxPrice * 0.5)} – ₹${Math.round(catalogMaxPrice * 0.75)}`, range: [Math.round(catalogMaxPrice * 0.5), Math.round(catalogMaxPrice * 0.75)] },
            { label: `₹${Math.round(catalogMaxPrice * 0.75)}+`, range: [Math.round(catalogMaxPrice * 0.75), catalogMaxPrice] },
          ].map((preset) => {
            const isSelected = priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1];
            return (
              <button
                key={preset.label}
                onClick={() => {
                  setPriceRange(preset.range);
                  setCurrentPage(1);
                }}
                className={`px-2 py-1 text-[10px] font-mono rounded-lg border transition-colors cursor-pointer text-center ${
                  isSelected
                    ? 'bg-[#1D241C] text-white border-[#1D241C]'
                    : 'bg-[#FAF8F5] text-[#687163] border-[#E8E4DC] hover:border-[#1D241C] hover:text-[#1D241C]'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Curated Badges */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D241C] mb-3 pb-2 border-b border-[#E8E4DC]">
          Popular Filters
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'bestsellers', label: 'Best Sellers' },
            { id: 'new', label: 'New Arrivals' },
            { id: 'sale', label: 'On Sale' },
            { id: 'atelier', label: 'Featured' },
            { id: 'organic', label: 'Eco-Friendly' },
          ].map((badge) => (
            <button
              key={badge.id}
              onClick={() => {
                setSelectedBadge(badge.id);
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1.5 text-[11px] font-medium rounded-xs border text-left transition-all cursor-pointer ${
                selectedBadge === badge.id
                  ? 'bg-[#1D241C] text-white border-[#1D241C]'
                  : 'bg-white text-[#687163] border-[#E8E4DC] hover:border-[#1D241C]'
              }`}
            >
              {badge.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes Selection */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D241C] mb-3 pb-2 border-b border-[#E8E4DC]">
          Sizes
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded-xs border transition-all cursor-pointer ${
                selectedSizes.includes(size)
                  ? 'bg-[#1D241C] text-white border-[#1D241C]'
                  : 'bg-white text-[#687163] border-[#E8E4DC] hover:border-[#1D241C]'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D241C] mb-3 pb-2 border-b border-[#E8E4DC]">
          Color Swatches
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => {
            const isSelected = selectedColors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                title={color.name}
                className={`w-6 h-6 rounded-full border flex items-center justify-center transition-transform cursor-pointer ${
                  isSelected ? 'scale-115 ring-2 ring-[#C69E58] ring-offset-1' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex, borderColor: '#CCCCCC' }}
              >
                {isSelected && (
                  <Check
                    className={`w-3 h-3 ${
                      color.hex === '#FDFBF7' || color.hex === '#FAF8F5' ? 'text-black' : 'text-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability Checkboxes */}
      <div className="space-y-2.5 pt-2 border-t border-[#E8E4DC]">
        <label className="flex items-center gap-2.5 text-xs text-[#1D241C] cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => {
              setInStockOnly(e.target.checked);
              setCurrentPage(1);
            }}
            className="w-4 h-4 rounded-xs text-[#506040] accent-[#506040]"
          />
          <span>In Stock Only</span>
        </label>
        <label className="flex items-center gap-2.5 text-xs text-[#1D241C] cursor-pointer">
          <input
            type="checkbox"
            checked={onSaleOnly}
            onChange={(e) => {
              setOnSaleOnly(e.target.checked);
              setCurrentPage(1);
            }}
            className="w-4 h-4 rounded-xs text-[#506040] accent-[#506040]"
          />
          <span>Special Offers & Sale</span>
        </label>
      </div>

      {/* Reset Action */}
      {activeFiltersCount > 0 && (
        <button
          onClick={handleResetAllFilters}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#FAF8F5] hover:bg-[#F3F0E9] text-[#1D241C] border border-[#E8E4DC] rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters ({activeFiltersCount})</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D241C] animate-fade-in pb-24">
      {/* 1. Category Hero Banner */}
      <div className="relative bg-[#1D241C] text-white py-16 md:py-24 px-5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={currentHeader.bannerImg}
            alt={currentHeader.title}
            className="w-full h-full object-cover object-center opacity-30 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1D241C] via-[#1D241C]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-4 uppercase tracking-widest font-mono">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-neutral-600" />
            <Link to="/products" className="hover:text-white transition-colors">Collections</Link>
            {activeCategory !== 'All' && (
              <>
                <ChevronRight className="w-3 h-3 text-neutral-600" />
                <span className="text-[#C69E58] font-bold">{activeCategory}</span>
              </>
            )}
          </nav>

          <div className="max-w-2xl space-y-3">
            <span className="inline-block px-2.5 py-0.5 bg-[#C69E58] text-[#1D241C] text-[10px] font-bold tracking-widest uppercase rounded-xs">
              {currentHeader.badge}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              {currentHeader.title}
            </h1>
            <p className="text-sm md:text-base text-neutral-300 font-sans leading-relaxed pt-1">
              {currentHeader.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Catalog Body Section */}
      <div id="catalog-content-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Top Controls Toolbar: Count, Mobile Filter Trigger, Search, Sort, View Density */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E8E4DC]">
          {/* Left: Total Pieces Count & Mobile Filter Button */}
          <div className="flex items-center justify-between md:justify-start gap-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E4DC] rounded-xs text-xs font-semibold uppercase tracking-wider text-[#1D241C] hover:border-[#1D241C] shadow-2xs cursor-pointer"
            >
              <Filter className="w-4 h-4 text-[#C69E58]" />
              <span>Filters ({activeFiltersCount})</span>
            </button>

            <span className="text-xs font-mono text-[#687163]">
              Showing <strong className="text-[#1D241C]">{filteredProducts.length}</strong> piece{filteredProducts.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Right: Search, Sorting, Grid Density Switches */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Catalog Internal Search Input */}
            <div className="relative min-w-[200px] flex-1 md:flex-initial">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-white border border-[#E8E4DC] rounded-xs focus:outline-none focus:border-[#C69E58] text-[#1D241C] placeholder-neutral-400 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black cursor-pointer"
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
                className="appearance-none pl-3 pr-8 py-1.5 text-xs font-semibold uppercase tracking-wider bg-white border border-[#E8E4DC] rounded-xs text-[#1D241C] cursor-pointer focus:outline-none focus:border-[#C69E58] shadow-2xs"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Popular</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 pointer-events-none" />
            </div>

            {/* Grid Density Switcher (Desktop Only) */}
            <div className="hidden sm:flex items-center gap-1 bg-white border border-[#E8E4DC] p-1 rounded-xs shadow-2xs">
              <button
                onClick={() => setGridDensity('2')}
                title="2 Columns"
                className={`p-1 rounded-xs transition-colors cursor-pointer ${
                  gridDensity === '2' ? 'bg-[#1D241C] text-white' : 'text-[#687163] hover:text-[#1D241C]'
                }`}
              >
                <Grid2X2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridDensity('3')}
                title="3 Columns"
                className={`p-1 rounded-xs transition-colors cursor-pointer ${
                  gridDensity === '3' ? 'bg-[#1D241C] text-white' : 'text-[#687163] hover:text-[#1D241C]'
                }`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridDensity('4')}
                title="4 Columns"
                className={`p-1 rounded-xs transition-colors cursor-pointer ${
                  gridDensity === '4' ? 'bg-[#1D241C] text-white' : 'text-[#687163] hover:text-[#1D241C]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridDensity('list')}
                title="List View"
                className={`p-1 rounded-xs transition-colors cursor-pointer ${
                  gridDensity === 'list' ? 'bg-[#1D241C] text-white' : 'text-[#687163] hover:text-[#1D241C]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-3 rounded-xs border border-[#E8E4DC] shadow-2xs animate-fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1D241C] mr-1">
              Active Filters:
            </span>
            {selectedBadge !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5] text-[#1D241C] border border-[#E8E4DC] text-xs rounded-xs font-medium">
                Edit: {selectedBadge.toUpperCase()}
                <button onClick={() => setSelectedBadge('all')} className="hover:text-red-600 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}
            {(priceRange[0] > 0 || priceRange[1] < catalogMaxPrice) && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5] text-[#1D241C] border border-[#E8E4DC] text-xs rounded-xs font-medium">
                Price: ₹{priceRange[0]}–₹{priceRange[1]}
                <button onClick={() => setPriceRange([0, catalogMaxPrice])} className="hover:text-red-600 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedSizes.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5] text-[#1D241C] border border-[#E8E4DC] text-xs rounded-xs font-medium">
                Size: {s}
                <button onClick={() => toggleSize(s)} className="hover:text-red-600 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            ))}
            {selectedColors.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5] text-[#1D241C] border border-[#E8E4DC] text-xs rounded-xs font-medium">
                Color: {c}
                <button onClick={() => toggleColor(c)} className="hover:text-red-600 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            ))}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5] text-[#1D241C] border border-[#E8E4DC] text-xs rounded-xs font-medium">
                Search: &quot;{searchQuery}&quot;
                <button onClick={() => setSearchQuery('')} className="hover:text-red-600 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              onClick={handleResetAllFilters}
              className="text-xs text-[#C69E58] hover:underline font-semibold ml-auto cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Catalog Grid Layout (Sidebar Left + Grid Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Desktop Sticky Filters Sidebar (3 Cols) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 bg-white p-6 rounded-[4px] border border-[#E8E4DC] shadow-2xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8E4DC]">
                <h3 className="font-serif text-lg font-bold text-[#1D241C] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C69E58]" />
                  <span>Refine Catalog</span>
                </h3>
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 bg-[#C69E58] text-[#1D241C] text-[10px] font-bold rounded-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              {renderFilterSidebar()}
            </div>
          </aside>

          {/* Products Grid / List (9 Cols) */}
          <div className="lg:col-span-9">
            {isLoading ? (
              /* Shimmer Loading Skeletons */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white border border-[#E8E4DC] rounded-[4px] p-4 space-y-4 animate-pulse">
                    <div className="aspect-[3/4] bg-neutral-200 rounded-xs" />
                    <div className="h-4 bg-neutral-200 rounded-xs w-3/4" />
                    <div className="h-3 bg-neutral-200 rounded-xs w-1/2" />
                    <div className="h-4 bg-neutral-200 rounded-xs w-1/3" />
                  </div>
                ))}
              </div>
            ) : currentProducts.length > 0 ? (
              <>
                {/* Responsive Grid mapping density */}
                <div
                  className={`grid gap-6 ${
                    gridDensity === '2'
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
                      key={product.id || product._id}
                      product={product}
                      onAddToCart={onAddToCart}
                      onToggleWishlist={onToggleWishlist}
                      isWishlisted={wishlistIds.includes(product.id || product._id)}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-8 border-t border-[#E8E4DC]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#687163] font-mono">Items per page:</span>
                      {[12, 24, 48].map((num) => (
                        <button
                          key={num}
                          onClick={() => {
                            setItemsPerPage(num);
                            setCurrentPage(1);
                            scrollToCatalogTop();
                          }}
                          className={`px-2.5 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                            itemsPerPage === num
                              ? 'bg-[#1D241C] text-white border-[#1D241C] font-bold'
                              : 'bg-white text-[#687163] border-[#E8E4DC] hover:border-[#1D241C]'
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
                        className="p-2 bg-white border border-[#E8E4DC] text-[#1D241C] rounded-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                        .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                        .map((page, idx, arr) => (
                          <React.Fragment key={page}>
                            {idx > 0 && arr[idx - 1] !== page - 1 && (
                              <span className="px-2 text-xs font-mono text-neutral-400">...</span>
                            )}
                            <button
                              onClick={() => {
                                setCurrentPage(page);
                                scrollToCatalogTop();
                              }}
                              className={`w-8 h-8 rounded-xs text-xs font-mono font-medium transition-colors cursor-pointer ${
                                currentPage === page
                                  ? 'bg-[#1D241C] text-white font-bold'
                                  : 'bg-white border border-[#E8E4DC] text-[#687163] hover:border-[#1D241C] hover:text-[#1D241C]'
                              }`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        ))}

                      <button
                        onClick={() => {
                          setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                          scrollToCatalogTop();
                        }}
                        disabled={currentPage === totalPages}
                        className="p-2 bg-white border border-[#E8E4DC] text-[#1D241C] rounded-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                        aria-label="Next page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-16 px-4 bg-white rounded-[4px] border border-[#E8E4DC] shadow-2xs space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#E8E4DC] flex items-center justify-center mx-auto text-[#C69E58]">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1D241C]">
                  No Products Found
                </h3>
                <p className="text-xs sm:text-sm text-[#687163] max-w-md mx-auto leading-relaxed">
                  No products match your selected filters. Try changing your price range, clearing filters, or searching something else.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleResetAllFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-semibold uppercase tracking-widest transition-colors rounded-xs cursor-pointer shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
          />
          <div className="relative ml-auto w-4/5 max-w-sm bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DC]">
                <div className="flex items-center gap-2 font-serif text-lg font-bold text-[#1D241C]">
                  <Filter className="w-4 h-4 text-[#C69E58]" />
                  <span>Filter Products</span>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-neutral-500 hover:text-black rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6">
                {renderFilterSidebar()}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E4DC]">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#1D241C] text-white text-xs font-semibold uppercase tracking-widest rounded-xs cursor-pointer"
              >
                View {filteredProducts.length} Product{filteredProducts.length === 1 ? '' : 's'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
