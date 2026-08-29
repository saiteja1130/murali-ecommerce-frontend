import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
export const CategoryGrid = ({ categories = [], onSelectCategory }) => {
  const navigate = useNavigate();
  const handleCategoryClick = (slug) => {
    if (onSelectCategory) onSelectCategory(slug);
    navigate(`/products/${slug.toLowerCase()}`);
  };

  const displayCategories = categories.filter((c) => c.isFeatured !== false);

  if (!displayCategories || displayCategories.length === 0) {
    return null;
  }

  return (<section id="shop-by-category-section" className="py-16 md:py-24 px-5 max-w-7xl mx-auto">
    {/* Section Header */}
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 pb-4 border-b border-[#E8E4DC]">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C69E58] block mb-2">
          Collections
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1D241C] tracking-tight">
          Shop by Category
        </h2>
      </div>
      <p className="text-sm text-[#687163] mt-2 md:mt-0 max-w-md font-sans">
        Browse our categories and find the perfect items for your style.
      </p>
    </div>

    {/* Responsive Category Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayCategories.map((cat) => {
        const imgSource = cat.image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800';

        return (
          <div
            key={cat.id || cat.slug}
            id={`category-card-${cat.slug.toLowerCase()}`}
            onClick={() => handleCategoryClick(cat.slug)}
            className="group relative h-[380px] sm:h-[420px] lg:h-[460px] overflow-hidden bg-neutral-900 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-500 rounded-[4px]"
          >
            {/* Background Image with Zoom */}
            <img
              src={imgSource}
              alt={cat.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 group-hover:opacity-90 opacity-80"
              loading="lazy"
            />

            {/* Dark Aesthetic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-300" />

            {/* Top Item Count Tag */}
            {cat.itemCount !== undefined && cat.itemCount > 0 && (
              <div className="absolute top-4 right-4 z-10">
                <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono tracking-wider rounded-xs">
                  {cat.itemCount} items
                </span>
              </div>
            )}

            {/* Bottom Content Info */}
            <div className="absolute bottom-0 inset-x-0 p-6 z-10 text-white flex flex-col justify-end transform transition-transform duration-300">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C69E58] font-semibold mb-1">
                Category
              </span>
              <h3 className="font-serif text-2xl font-bold text-white tracking-wide mb-1 group-hover:text-[#FAF8F5]">
                {cat.name}
              </h3>
              <p className="text-xs text-neutral-300 line-clamp-1 mb-4 font-sans">
                {cat.subtitle || cat.description || 'Explore the curated collection'}
              </p>

              {/* Shop Now CTA */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white group-hover:text-[#C69E58] transition-colors pt-2 border-t border-white/20">
                <span>Shop Now</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </section>);
};
