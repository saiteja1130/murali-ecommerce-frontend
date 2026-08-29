import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Flame, Tag, RefreshCw, ArrowRight } from 'lucide-react';
import { useStore } from '../context/RootContext';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({
  products: propProducts,
  categories: propCategories,
  selectedCategory = 'All',
  onSelectCategory,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  searchQuery = '',
  onClearSearch,
  onClickProduct
}) => {
  const navigate = useNavigate();
  const { categories: ctxCategories, products: ctxProducts } = useStore();

  const categoriesList = propCategories && propCategories.length > 0 ? propCategories : (ctxCategories || []);
  const products = propProducts && propProducts.length > 0 ? propProducts : (ctxProducts || []);

  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(10000);

  const dynamicCategories = useMemo(() => {
    const list = [{ label: 'All Items', value: 'All' }];
    if (Array.isArray(categoriesList) && categoriesList.length > 0) {
      categoriesList.forEach((cat) => {
        list.push({ label: cat.name, value: cat.slug || cat.name });
      });
    }
    return list;
  }, [categoriesList]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) =>
          p.category?.toLowerCase() === selectedCategory.toLowerCase() ||
          p.categorySlug?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Tab
    if (activeTab === 'bestsellers') {
      result = result.filter((p) => p.isBestSeller || p.badge === 'BESTSELLER');
    } else if (activeTab === 'new') {
      result = result.filter((p) => p.isNew || p.badge === 'NEW');
    } else if (activeTab === 'sale') {
      result = result.filter((p) => p.badge === 'SALE' || (p.originalPrice && p.originalPrice > p.price));
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
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
        result.sort((a, b) => (b.rating || 5) - (a.rating || 5));
        break;
      case 'reviews':
        result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      default:
        // Featured default
        break;
    }

    return result;
  }, [products, selectedCategory, activeTab, searchQuery, maxPrice, sortBy]);

  const handleResetFilters = () => {
    if (onSelectCategory) onSelectCategory('All');
    setActiveTab('all');
    setSortBy('featured');
    setMaxPrice(10000);
    if (onClearSearch) onClearSearch();
  };

  return (
    <section id="featured-products-section" className="py-16 md:py-24 px-5 max-w-7xl mx-auto">
      {/* Top Header & Tab Filters */}
      <div className="flex flex-col items-center text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C69E58] mb-2">
          Our Collection
        </span>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D241C] tracking-tight mb-4">
          Featured Products
        </h2>
        <p className="text-sm text-[#687163] max-w-xl font-sans">
          Explore our most popular and loved products, made with quality materials for everyday comfort.
        </p>

        {/* Highlight Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8 bg-[#F3F0E9] p-1.5 rounded-xs border border-[#E8E4DC]">
          <button
            id="tab-filter-all"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-xs cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#1D241C] text-white shadow-xs'
                : 'text-[#687163] hover:text-[#1D241C]'
            }`}
          >
            All ({products.length})
          </button>
          <button
            id="tab-filter-bestsellers"
            onClick={() => setActiveTab('bestsellers')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-xs cursor-pointer ${
              activeTab === 'bestsellers'
                ? 'bg-[#1D241C] text-white shadow-xs'
                : 'text-[#687163] hover:text-[#1D241C]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#C69E58]" />
            <span>Best Sellers</span>
          </button>
          <button
            id="tab-filter-new"
            onClick={() => setActiveTab('new')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-xs cursor-pointer ${
              activeTab === 'new'
                ? 'bg-[#1D241C] text-white shadow-xs'
                : 'text-[#687163] hover:text-[#1D241C]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C69E58]" />
            <span>New Arrivals</span>
          </button>
          <button
            id="tab-filter-sale"
            onClick={() => setActiveTab('sale')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-xs cursor-pointer ${
              activeTab === 'sale'
                ? 'bg-[#1D241C] text-white shadow-xs'
                : 'text-[#687163] hover:text-[#1D241C]'
            }`}
          >
            <Tag className="w-3.5 h-3.5 text-[#C69E58]" />
            <span>On Sale</span>
          </button>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E4DC]">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {dynamicCategories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.value.toLowerCase();
            return (
              <button
                key={cat.value}
                id={`filter-pill-${cat.value.toLowerCase()}`}
                onClick={() => onSelectCategory && onSelectCategory(cat.value)}
                className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all rounded-xs border cursor-pointer ${
                  isSelected
                    ? 'bg-[#1D241C] text-white border-[#1D241C]'
                    : 'bg-white text-[#687163] border-[#E8E4DC] hover:border-neutral-400 hover:text-[#1D241C]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Right Controls: Sort & Count */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4">
          {searchQuery && (
            <div className="flex items-center gap-2 text-xs bg-[#E8D5D0]/40 px-3 py-1.5 rounded-xs">
              <span>Search: &ldquo;<strong>{searchQuery}</strong>&rdquo;</span>
              <button onClick={onClearSearch} className="text-neutral-500 hover:text-neutral-900 font-bold ml-1 cursor-pointer">
                ×
              </button>
            </div>
          )}

          <div className="text-xs text-[#687163]">
            Showing <strong className="text-[#1D241C]">{filteredProducts.length}</strong> items
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#687163] flex items-center gap-1 font-medium">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort by:
            </span>
            <select
              id="sort-select-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E8E4DC] text-xs text-[#1D241C] font-medium py-1.5 px-3 rounded-xs focus:outline-none focus:border-[#C69E58] cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.slice(0, 12).map((product) => (
              <ProductCard
                key={product.id || product._id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id || product._id)}
                onClickProduct={onClickProduct}
              />
            ))}
          </div>

          {/* Explore All Products Button */}
          <div className="mt-14 text-center">
            <button
              onClick={() => {
                if (selectedCategory !== 'All') {
                  navigate(`/products/${selectedCategory.toLowerCase()}`);
                } else {
                  navigate('/products');
                }
              }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </button>
            <p className="text-xs text-[#687163] font-mono mt-3">
              Explore our complete collection and find what fits you best
            </p>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="py-20 text-center bg-white border border-dashed border-[#E8E4DC] rounded-sm p-8">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E8E4DC] flex items-center justify-center mx-auto mb-4 text-[#687163]">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1D241C] mb-2">
            No products found
          </h3>
          <p className="text-xs sm:text-sm text-[#687163] max-w-md mx-auto mb-6">
            No items matched your current filters. Try changing your search or resetting filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-semibold uppercase tracking-wider transition-colors rounded-xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
};
