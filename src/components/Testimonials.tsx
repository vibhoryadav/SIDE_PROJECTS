import React from 'react';
import { Star, Info } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] border-t border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#686868] uppercase block mb-2">
              // Community Perspectives
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight-editorial uppercase text-[#111111]">
              Heard Worldwide.
            </h2>
          </div>

          {/* Transparent Demonstration Disclaimer Notice */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F5F5F5] border border-[#E7E7E7] text-xs text-[#686868] self-start md:self-auto">
            <Info className="w-3.5 h-3.5 text-[#111111]" />
            <span>Sample customer impressions (illustrative preview)</span>
          </div>
        </div>

        {/* 4 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] flex flex-col justify-between hover:border-[#D4D4D4] transition-all duration-300"
            >
              <div>
                {/* 5 Star Rating */}
                <div className="flex items-center space-x-1 mb-4 text-[#111111]" aria-label={`${item.rating} out of 5 stars`}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Review Title */}
                <h3 className="text-sm font-bold text-[#111111] mb-2 leading-snug">
                  “{item.headline}”
                </h3>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#686868] leading-relaxed">
                  {item.review}
                </p>
              </div>

              {/* Author & Product Information */}
              <div className="pt-6 mt-6 border-t border-[#EAEAEA]">
                <div className="text-xs font-bold text-[#111111]">
                  {item.name}
                </div>
                <div className="text-[11px] text-[#686868] mt-0.5">
                  {item.location}
                </div>
                <div className="text-[10px] font-mono text-[#111111] mt-2 bg-white px-2 py-0.5 rounded border border-[#E7E7E7] inline-block">
                  Purchased: {item.product.replace('Vibe District ', '')}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
