import React from 'react';
import { BRAND_VALUES } from '../data/products';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section className="py-24 sm:py-36 bg-[#FFFFFF] border-t border-[#E7E7E7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Editorial Heading + Statement */}
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 mb-16 sm:mb-24">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#686868] uppercase block">
            // Brand Manifesto
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight-editorial uppercase text-[#111111] leading-[0.95]">
            Less Noise.<br />
            More Feeling.
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-[#686868] leading-relaxed font-light max-w-2xl mx-auto">
            “At Vibe District, we believe great sound doesn't need to shout. It should meet you in your own world, bring every detail closer, and make ordinary moments feel extraordinary.”
          </p>
        </div>

        {/* Wide Cinematic Product Landscape Photograph */}
        <div className="relative rounded-2xl overflow-hidden aspect-16/9 sm:aspect-21/9 bg-[#101010] mb-20 sm:mb-28 border border-[#E7E7E7] shadow-lg group">
          <img
            src="./images/products/philosophy.jpg"
            alt="Vibe District acoustic transducer and CNC aluminum components"
            className="w-full h-full object-cover object-center opacity-85 transition-transform duration-700 ease-out group-hover:scale-103"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8 sm:p-12">
            <div className="text-white max-w-lg">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/70 block mb-1">
                Precision Transducer Lab
              </span>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                Sub-micron diaphragms tensioned under zero-gravity conditions to preserve tonal linearity.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Architectural Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 pt-4">
          {BRAND_VALUES.map((item) => (
            <div key={item.number} className="flex flex-col space-y-3">
              <span className="text-xs font-mono font-bold text-[#111111] tracking-widest pb-3 border-b border-[#E7E7E7]">
                [{item.number}]
              </span>
              <h3 className="text-base font-bold text-[#111111] uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#686868] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
