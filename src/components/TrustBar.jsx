import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Leaf } from 'lucide-react';
export const TrustBar = () => {
  const perks = [
    {
      icon: <Truck className="w-5 h-5 text-[#C8A87C]" />,
      title: 'Free Worldwide Shipping',
      description: 'On all orders exceeding ₹5,000'
    },
    {
      icon: <Leaf className="w-5 h-5 text-[#C8A87C]" />,
      title: 'Sustainable Materials',
      description: '100% GOTS organic & recycled fibers'
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-[#C8A87C]" />,
      title: '30-Day Easy Returns',
      description: 'Pre-paid shipping labels included'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#C8A87C]" />,
      title: 'Artisan Guarantee',
      description: 'Heirloom stitching and durability'
    }
  ];
  return (<div className="bg-[#FFFFFF] border-b border-[#E8E3DE] py-6 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E3DE]/80">
      {perks.map((item, idx) => (<div key={idx} className={`flex items-center gap-4 ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}>
        <div className="w-10 h-10 rounded-full bg-[#F8F6F3] border border-[#E8E3DE] flex items-center justify-center flex-shrink-0">
          {item.icon}
        </div>
        <div>
          <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
            {item.title}
          </h4>
          <p className="text-xs text-[#6B6B6B] mt-0.5">{item.description}</p>
        </div>
      </div>))}
    </div>
  </div>);
};
