import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
export const SearchModal = ({ isOpen, onClose, products, onSelectProduct, onSearchSubmit }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null);
    const trendingTags = [
        'Trench Coat',
        'Wool Blazer',
        'Silk Dress',
        'Leather Jacket',
        'Wide-Leg Trousers',
        'Boxy T-Shirt',
        'Overalls',
        'Crossbody Bag'
    ];
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
        else {
            setSearchTerm('');
        }
    }, [isOpen]);
    if (!isOpen)
        return null;
    const matchedProducts = searchTerm.trim()
        ? products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase()))
        : [];
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearchSubmit(searchTerm.trim());
            onClose();
        }
    };
    const handleTagClick = (tag) => {
        setSearchTerm(tag);
        onSearchSubmit(tag);
        onClose();
    };
    return (<div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity" onClick={onClose}/>

      {/* Modal Card */}
      <div id="search-dialog-modal" className="relative bg-white w-full max-w-2xl rounded-[4px] shadow-2xl z-10 border border-[#E8E3DE] overflow-hidden animate-fade-in">
        {/* Search Input Bar */}
        <form onSubmit={handleFormSubmit} className="p-4 sm:p-6 border-b border-[#E8E3DE] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C8A87C] flex-shrink-0"/>
          <input ref={inputRef} id="search-input-field" type="text" placeholder="Search our catalog by style, fabric, or category..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full text-base md:text-lg text-[#1A1A1A] placeholder-neutral-400 bg-transparent focus:outline-none font-sans"/>
          {searchTerm && (<button type="button" onClick={() => setSearchTerm('')} className="text-neutral-400 hover:text-black p-1">
              <X className="w-4 h-4"/>
            </button>)}
          <button type="button" onClick={onClose} className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] hover:text-[#1A1A1A] px-2 py-1">
            ESC
          </button>
        </form>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Matched Results */}
          {searchTerm.trim() ? (<div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-4">
                <span>Matching Items ({matchedProducts.length})</span>
                {matchedProducts.length > 0 && (<button onClick={handleFormSubmit} className="text-[#C8A87C] hover:underline flex items-center gap-1">
                    <span>View all results</span>
                    <ArrowRight className="w-3 h-3"/>
                  </button>)}
              </div>

              {matchedProducts.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchedProducts.slice(0, 6).map((product) => (<div key={product.id} onClick={() => {
                        onSelectProduct(product);
                        onClose();
                    }} className="p-2.5 rounded-xs border border-[#E8E3DE] hover:border-[#C8A87C] flex items-center gap-3 cursor-pointer group bg-white hover:bg-[#F8F6F3] transition-colors">
                      <img src={product.image} alt={product.name} className="w-14 h-18 object-cover rounded-xs bg-[#F4EFEA]"/>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C8A87C]">
                          {product.category}
                        </span>
                        <h4 className="text-xs font-semibold text-[#1A1A1A] truncate group-hover:text-[#C8A87C] transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs font-bold text-[#1A1A1A] mt-1">
                          ₹{product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>))}
                </div>) : (<div className="py-8 text-center text-xs text-[#6B6B6B]">
                  No exact matches found for &ldquo;{searchTerm}&rdquo;. Try browsing popular suggestions below.
                </div>)}
            </div>) : null}

          {/* Trending Searches */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-[#C8A87C]"/>
              <span>Popular Searches</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag) => (<button key={tag} onClick={() => handleTagClick(tag)} className="px-3 py-1.5 bg-[#F8F6F3] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white border border-[#E8E3DE] rounded-xs text-xs font-medium transition-all">
                  {tag}
                </button>))}
            </div>
          </div>
        </div>
      </div>
    </div>);
};
