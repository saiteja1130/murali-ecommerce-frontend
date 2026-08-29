import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Leaf } from 'lucide-react';
export const TrustBar = () => {
  const perks = [
    {
      icon: <Truck className="w-5 h-5 text-[#C69E58]" />,
      title: 'Free Delivery',
      description: 'On all orders over ₹5,000'
    },
    {
      icon: <Leaf className="w-5 h-5 text-[#506040]" />,
      title: 'Premium Quality',
      description: 'Made with comfortable, durable materials'
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-[#C69E58]" />,
      title: 'Easy 30-Day Returns',
      description: 'Simple and hassle-free returns'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#506040]" />,
      title: '100% Secure Payments',
      description: 'Safe and encrypted checkout'
    }
  ];
  return (<div className="bg-[#FFFFFF] border-b border-[#E8E4DC] py-6 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E4DC]/80">
      {perks.map((item, idx) => (<div key={idx} className={`flex items-center gap-4 ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}>
        <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E4DC] flex items-center justify-center flex-shrink-0">
          {item.icon}
        </div>
        <div>
          <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[#1D241C]">
            {item.title}
          </h4>
          <p className="text-xs text-[#6B6864] mt-0.5">{item.description}</p>
        </div>
      </div>))}
    </div>
  </div>);
};
