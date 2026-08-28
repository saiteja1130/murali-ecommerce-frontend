import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plus, ShoppingBag, X } from 'lucide-react';
export const ShopTheLook = ({ scene, products, onAddToCart, onClickProduct }) => {
  const navigate = useNavigate();
  const [activeHotspotId, setActiveHotspotId] = useState(scene.hotspots[0]?.id || null);
  const getProduct = (productId) => {
    return products.find((p) => p.id === productId);
  };
  const handleProductClick = (product) => {
    if (onClickProduct) {
      onClickProduct(product);
    }
    else {
      navigate(`/product/${product.id}`);
    }
  };
  return (<section id="lookbook-section" className="py-16 md:py-24 px-5 max-w-7xl mx-auto">
    <div className="flex flex-col items-center text-center mb-12">
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8A87C] mb-2">
        Editorial Curation
      </span>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight mb-3">
        Shop The Look
      </h2>
      <p className="text-sm text-[#6B6B6B] max-w-lg font-sans">
        Click any pulsing hotspot marker on the model to inspect and purchase individual pieces from the styled outfit.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFFFF] border border-[#E8E3DE] rounded-[4px] p-4 md:p-8 shadow-xs">
      {/* Interactive Image with Hotspots (Left 7 cols) */}
      <div className="lg:col-span-7 relative overflow-hidden rounded-[4px] bg-[#F4EFEA] aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] select-none">
        <img src={scene.image} alt={scene.title} className="w-full h-full object-cover object-center" loading="lazy" />

        {/* Dark subtle overlay */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        {/* Hotspot Markers */}
        {scene.hotspots.map((hs) => {
          const isActive = activeHotspotId === hs.id;
          const p = getProduct(hs.productId);
          return (<div key={hs.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20" style={{ left: `${hs.x}%`, top: `${hs.y}%` }}>
            {/* Pulsing ring */}
            <div className="relative">
              <button id={`hotspot-pin-${hs.id}`} onClick={() => setActiveHotspotId(isActive ? null : hs.id)} className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl focus:outline-none ${isActive
                ? 'bg-[#C8A87C] text-[#1A1A1A] scale-110'
                : 'bg-[#1A1A1A] text-white hover:bg-[#C8A87C] hover:text-[#1A1A1A]'}`} aria-label={`Hotspot for ${hs.label}`}>
                {isActive ? (<X className="w-4 h-4" />) : (<Plus className="w-4 h-4 animate-spin-slow" />)}
              </button>
              <span className="absolute -inset-1 rounded-full bg-[#C8A87C]/30 animate-ping pointer-events-none" />
            </div>
          </div>);
        })}
      </div>

      {/* Hotspot Product Preview Cards (Right 5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
        <div className="border-b border-[#E8E3DE] pb-4">
          <span className="text-xs uppercase tracking-widest text-[#6B6B6B] font-semibold">
            Outfit Breakdown ({scene.hotspots.length} Items)
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-1">
            Spring Tailored Capsule
          </h3>
        </div>

        <div className="space-y-3 pt-2">
          {scene.hotspots.map((hs) => {
            const p = getProduct(hs.productId);
            if (!p)
              return null;
            const isActive = activeHotspotId === hs.id;
            return (<div key={hs.id} id={`lookbook-card-${hs.productId}`} onClick={() => {
              setActiveHotspotId(hs.id);
              handleProductClick(p);
            }} className={`p-3.5 rounded-[4px] border transition-all duration-200 cursor-pointer flex items-center gap-4 ${isActive
              ? 'border-[#C8A87C] bg-[#F8F6F3] shadow-xs'
              : 'border-[#E8E3DE] bg-white hover:border-neutral-300'}`}>
              <img src={p.image} alt={p.name} className="w-16 h-20 object-cover rounded-xs bg-[#F4EFEA] flex-shrink-0" />

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C8A87C]">
                  {p.category}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-[#1A1A1A] truncate hover:text-[#C8A87C] transition-colors">
                  {p.name}
                </h4>
                <p className="text-xs font-bold text-[#1A1A1A] mt-1">
                  ₹{p.price.toFixed(2)}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button id={`lookbook-view-details-${p.id}`} onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(p);
                  }} className="text-[11px] font-semibold text-[#1A1A1A] hover:text-[#C8A87C] flex items-center gap-1">
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3 text-[#C8A87C]" />
                  </button>
                  <span className="text-neutral-300">•</span>
                  <button id={`lookbook-add-${p.id}`} onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(p);
                  }} className="text-[11px] font-semibold text-[#C8A87C] hover:text-[#B8956A] flex items-center gap-1">
                    <ShoppingBag className="w-3 h-3" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>);
          })}
        </div>
      </div>
    </div>
  </section>);
};
