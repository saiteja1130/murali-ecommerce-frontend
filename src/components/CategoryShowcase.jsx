import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
export const CategoryShowcase = ({ onSelectCategory }) => {
  const navigate = useNavigate();
  const handleExplore = (category) => {
    onSelectCategory(category);
    navigate(`/products/${category.toLowerCase()}`);
  };
  return (<section className="py-16 md:py-24 bg-[#FFFFFF] border-y border-[#E8E3DE]">
    <div className="max-w-7xl mx-auto px-5 space-y-20 md:space-y-32">
      {/* Showcase Item 1: Women's Tailoring (Image Left, Text Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="lg:col-span-7 relative group overflow-hidden rounded-[4px] bg-[#F4EFEA]">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop" alt="Women's Editorial Capsule" className="w-full h-[440px] md:h-[540px] object-cover object-center transition-transform duration-700 group-hover:scale-103" loading="lazy" />
          <div className="absolute top-6 left-6 bg-[#1A1A1A]/85 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-xs border border-white/20">
            Women’s Capsule • 2026
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A87C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architectural Silhouettes</span>
          </div>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight">
            Sculpted Drapery & Pure Silk Charmeuse
          </h3>
          <p className="text-sm md:text-base text-[#6B6B6B] leading-relaxed font-sans">
            Our women’s capsule focuses on clean geometry and sensory fabrications: double-breasted recycled wools, fluid 19mm mulberry silks, and sharp pleated trousers that move effortlessly between occasion and boardroom.
          </p>
          <div className="pt-2">
            <button id="showcase-explore-women" onClick={() => handleExplore('Women')} className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest transition-all rounded-xs group">
              <span>Shop Women’s Capsule</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Showcase Item 2: Men's Tailoring (Text Left, Image Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A87C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Subtle Refinement</span>
          </div>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight">
            Engineered Proportions & Heirloom Leather
          </h3>
          <p className="text-sm md:text-base text-[#6B6B6B] leading-relaxed font-sans">
            Crafted from 280 GSM combed organic cottons and vegetable-tanned Italian calfskin, our men&apos;s collection delivers relaxed yet structural staples built for multi-season endurance.
          </p>
          <div className="pt-2">
            <button id="showcase-explore-men" onClick={() => handleExplore('Men')} className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest transition-all rounded-xs group">
              <span>Shop Men’s Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 relative group overflow-hidden rounded-[4px] bg-[#F4EFEA] order-1 lg:order-2">
          <img src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop" alt="Men's Tailoring Edition" className="w-full h-[440px] md:h-[540px] object-cover object-center transition-transform duration-700 group-hover:scale-103" loading="lazy" />
          <div className="absolute top-6 right-6 bg-[#1A1A1A]/85 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-xs border border-white/20">
            Men’s Edit • Italian Leather
          </div>
        </div>
      </div>

      {/* Showcase Item 3: Kids & Accessories (Image Left, Text Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="lg:col-span-7 relative group overflow-hidden rounded-[4px] bg-[#F4EFEA]">
          <img src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?q=80&w=1200&auto=format&fit=crop" alt="Kids and Accessories Collection" className="w-full h-[440px] md:h-[540px] object-cover object-center transition-transform duration-700 group-hover:scale-103" loading="lazy" />
          <div className="absolute top-6 left-6 bg-[#1A1A1A]/85 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-xs border border-white/20">
            Junior & Leather Objects
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A87C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Conscious Craftsmanship</span>
          </div>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight">
            Playful Elegance for Young Explorers
          </h3>
          <p className="text-sm md:text-base text-[#6B6B6B] leading-relaxed font-sans">
            100% GOTS organic waffle-knits, reinforced denim overalls, and vegetable-tanned accessories created without harmful synthetic dyes for complete peace of mind.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button id="showcase-explore-kids" onClick={() => handleExplore('Kids')} className="inline-flex items-center gap-2 px-5 py-3 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest transition-all rounded-xs">
              <span>Shop Kids</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button id="showcase-explore-accessories" onClick={() => handleExplore('Accessories')} className="inline-flex items-center gap-2 px-5 py-3 bg-transparent border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest transition-all rounded-xs">
              <span>Accessories</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>);
};
