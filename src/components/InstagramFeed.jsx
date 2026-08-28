import React from 'react';
import { Heart, Instagram } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/mockData';
export const InstagramFeed = () => {
  return (<section className="py-16 md:py-20 bg-white border-t border-[#E8E3DE]">
    <div className="max-w-7xl mx-auto px-5">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E8E3DE]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A87C] block mb-1">
            Community Gallery
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A]">
            Styled by You #SumiluxStyle
          </h2>
        </div>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:text-[#C8A87C] transition-colors mt-2 md:mt-0">
          <Instagram className="w-4 h-4" />
          <span>Follow @sumilux.studios</span>
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {INSTAGRAM_POSTS.map((post) => (<div key={post.id} className="group relative aspect-square overflow-hidden rounded-xs bg-[#F4EFEA]">
          <img src={post.image} alt="Instagram Community Style" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-2 text-center">
            <Instagram className="w-5 h-5 mb-1 text-[#C8A87C]" />
            <span className="text-xs font-medium">{post.handle}</span>
            <span className="text-[11px] text-neutral-300 flex items-center gap-1 mt-1">
              <Heart className="w-3 h-3 fill-current text-rose-400" /> {post.likes}
            </span>
          </div>
        </div>))}
      </div>
    </div>
  </section>);
};
