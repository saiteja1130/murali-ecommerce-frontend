import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Flame, Tag, RefreshCw, ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
export const ProductGrid = ({ products, selectedCategory, onSelectCategory, onAddToCart, onToggleWishlist, wishlistIds, searchQuery, onClearSearch, onClickProduct }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(400);
  const categories = [
    { label: 'All Items', value: 'All' },
    { label: "Men's", value: 'Men' },
    { label: "Women's", value: 'Women' },
    { label: "Kids'", value: 'Kids' },
    { label: 'Accessories', value: 'Accessories' }
  ];
  const filteredProducts = useMemo(() => {
    let result = [...products];
    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    // Filter by Tab
    if (activeTab === 'bestsellers') {
      result = result.filter((p) => p.isBestSeller || p.badge === 'BESTSELLER');
    }
    else if (activeTab === 'new') {
      result = result.filter((p) => p.isNew || p.badge === 'NEW');
    }
    else if (activeTab === 'sale') {
      result = result.filter((p) => p.isSale || p.badge === 'SALE' || p.originalPrice);
    }
    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q));
    }
    // Filter by Max Price
    result = result.filter((p) => p.price <= maxPrice);
    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Featured default
        break;
    }
    return result;
  }, [products, selectedCategory, activeTab, searchQuery, maxPrice, sortBy]);
  const handleResetFilters = () => {
    onSelectCategory('All');
    setActiveTab('all');
    setSortBy('featured');
    setMaxPrice(400);
    onClearSearch();
  };
  return (<section id="featured-products-section" className="py-16 md:py-24 px-5 max-w-7xl mx-auto">
    {/* Top Header & Tab Filters */}
    <div className="flex flex-col items-center text-center mb-10">
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8A87C] mb-2">
        Featured Apparel & Accessories
      </span>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight mb-4">
        Timeless Essentials
      </h2>
      <p className="text-sm text-[#6B6B6B] max-w-xl font-sans">
        Curated silhouettes designed with quiet luxury, certified natural fibers, and enduring modern tailoring.
      </p>

      {/* Highlight Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8 bg-[#F0EBE4] p-1.5 rounded-xs border border-[#E8E3DE]">
        <button id="tab-filter-all" onClick={() => setActiveTab('all')} className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-xs ${activeTab === 'all'
          ? 'bg-[#1A1A1A] text-white shadow-xs'
          : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}>
          All Products ({products.length})
        </button>
        <button id="tab-filter-bestsellers" onClick={() => setActiveTab('bestsellers')} className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-xs ${activeTab === 'bestsellers'
          ? 'bg-[#1A1A1A] text-white shadow-xs'
          : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}>
          <Flame className="w-3.5 h-3.5 text-[#C8A87C]" />
          <span>Best Sellers</span>
        </button>
        <button id="tab-filter-new" onClick={() => setActiveTab('new')} className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-xs ${activeTab === 'new'
          ? 'bg-[#1A1A1A] text-white shadow-xs'
          : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}>
          <Sparkles className="w-3.5 h-3.5 text-[#C8A87C]" />
          <span>New Arrivals</span>
        </button>
        <button id="tab-filter-sale" onClick={() => setActiveTab('sale')} className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-xs ${activeTab === 'sale'
          ? 'bg-[#1A1A1A] text-white shadow-xs'
          : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}>
          <Tag className="w-3.5 h-3.5 text-[#C8A87C]" />
          <span>On Sale</span>
        </button>
      </div>
    </div>

    {/* Filter and Sort Toolbar */}
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E3DE]">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          return (<button key={cat.value} id={`filter-pill-${cat.value.toLowerCase()}`} onClick={() => onSelectCategory(cat.value)} className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all rounded-xs border ${isSelected
            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
            : 'bg-white text-[#6B6B6B] border-[#E8E3DE] hover:border-neutral-400 hover:text-[#1A1A1A]'}`}>
            {cat.label}
          </button>);
        })}
      </div>

      {/* Right Controls: Sort & Count */}
      <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4">
        {searchQuery && (<div className="flex items-center gap-2 text-xs bg-[#E8D5D0]/40 px-3 py-1.5 rounded-xs">
          <span>Search: &ldquo;<strong>{searchQuery}</strong>&rdquo;</span>
          <button onClick={onClearSearch} className="text-neutral-500 hover:text-neutral-900 font-bold ml-1">
            ×
          </button>
        </div>)}

        <div className="text-xs text-[#6B6B6B]">
          Showing <strong className="text-[#1A1A1A]">{filteredProducts.length}</strong> items
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B6B6B] flex items-center gap-1 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort:
          </span>
          <select id="sort-select-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white border border-[#E8E3DE] text-xs text-[#1A1A1A] font-medium py-1.5 px-3 rounded-xs focus:outline-none focus:border-[#C8A87C] cursor-pointer">
            <option value="featured">Featured Curations</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="reviews">Most Reviewed</option>
          </select>
        </div>
      </div>
    </div>

    {/* Product Grid (4 columns desktop, 3 columns tablet, 2 columns mobile) */}
    {filteredProducts.length > 0 ? (
      <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.slice(0, 12).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} isWishlisted={wishlistIds.includes(product.id)} onClickProduct={onClickProduct} />
          ))}
        </div>

        {/* Explore All Products Full Collection Banner CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => {
              if (selectedCategory !== 'All') {
                navigate(`/products/${selectedCategory.toLowerCase()}`);
              } else {
                navigate('/products');
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <span>Explore All {products.length}+ Pieces in Atelier</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </button>
          <p className="text-xs text-[#6B6B6B] font-mono mt-3">
            Faceted filtering across Men, Women, Kids & Fine Accessories
          </p>
        </div>
      </>
    ) : (
      /* Empty State */
      <div className="py-20 text-center bg-white border border-dashed border-[#E8E3DE] rounded-sm p-8">
        <div className="w-12 h-12 rounded-full bg-[#F8F6F3] border border-[#E8E3DE] flex items-center justify-center mx-auto mb-4 text-[#6B6B6B]">
          <SlidersHorizontal className="w-5 h-5" />
        </div>
        <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-2">
          No items matched your current filters
        </h3>
        <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-md mx-auto mb-6">
          Try adjusting your search criteria, category selection, or price filters to explore our full collection.
        </p>
        <button onClick={handleResetFilters} className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider transition-colors rounded-xs">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    )}
  </section>);
};
