import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
export const CustomerReviews = ({ reviews }) => {
  return (<section className="py-16 md:py-24 bg-[#FAF8F5] border-t border-[#E8E4DC]">
    <div className="max-w-7xl mx-auto px-5">
      <div className="flex flex-col items-center text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C69E58] mb-2">
          Customer Reviews
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1D241C] tracking-tight mb-3">
          What Our Customers Say
        </h2>
        <div className="flex items-center gap-2 text-sm text-[#1D241C]">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-current" />))}
          </div>
          <span className="font-bold">4.9 / 5.0</span>
          <span className="text-[#687163]">based on 1,480+ verified reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((rev) => (<div key={rev.id} className="bg-white border border-[#E8E4DC] rounded-[4px] p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow relative">
          <div>
            <Quote className="w-8 h-8 text-[#C69E58]/30 mb-3" />
            <div className="flex text-amber-500 mb-3">
              {[...Array(rev.rating)].map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-current" />))}
            </div>
            <h4 className="font-serif text-base font-bold text-[#1D241C] mb-2 leading-snug">
              &ldquo;{rev.title}&rdquo;
            </h4>
            <p className="text-xs sm:text-sm text-[#687163] leading-relaxed font-sans line-clamp-4">
              {rev.comment}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8E4DC] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#1D241C]">{rev.author}</span>
                {rev.verified && (<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />)}
              </div>
              <span className="text-[11px] text-[#687163]">{rev.location}</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">{rev.date}</span>
          </div>
        </div>))}
      </div>
    </div>
  </section>);
};
