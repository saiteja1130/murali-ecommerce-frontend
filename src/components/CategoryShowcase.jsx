import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoryShowcase = ({ categories = [], isMainCategories = false, onSelectCategory }) => {
  const navigate = useNavigate();

  const handleExplore = (slug) => {
    if (onSelectCategory) onSelectCategory(slug);
    navigate(`/products/${slug.toLowerCase()}`);
  };

  const showcaseItems = categories.filter((c) => c.isActive !== false && c.isFeatured !== false);
  if (!showcaseItems || showcaseItems.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF] border-y border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-5 space-y-20 md:space-y-32">
        {showcaseItems.map((cat, idx) => {
          const isEven = idx % 2 === 0;
          const imgSource = cat.image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop';

          return (
            <div key={cat.id || cat.slug || idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              {/* Category Image Container */}
              <div className={`lg:col-span-7 relative group overflow-hidden rounded-xl bg-[#FAF8F5] ${isEven ? '' : 'order-1 lg:order-2'}`}>
                <img
                  src={imgSource}
                  alt={cat.name}
                  className="w-full h-[440px] md:h-[540px] object-cover object-center transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                />
                <div className={`absolute top-6 ${isEven ? 'left-6' : 'right-6'} bg-[#1D241C]/85 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20`}>
                  {cat.name} {isMainCategories ? 'Department' : 'Collection'}
                </div>
              </div>

              {/* Category Details & CTA */}
              <div className={`lg:col-span-5 space-y-6 ${isEven ? '' : 'order-2 lg:order-1'}`}>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C69E58]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isMainCategories ? 'Featured Department' : 'Featured Collection'}</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#1D241C] leading-tight">
                  {cat.subtitle || `${cat.name} Haute Couture`}
                </h3>
                <p className="text-sm md:text-base text-[#687163] leading-relaxed font-sans">
                  {cat.description || `Discover our collection of ${cat.name.toLowerCase()} designed for everyday luxury, quality, and style.`}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => handleExplore(cat.slug || cat.name)}
                    className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-semibold uppercase tracking-widest transition-all rounded-lg group cursor-pointer shadow-xs"
                  >
                    <span>Explore {cat.name}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
