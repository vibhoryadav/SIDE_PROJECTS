import React from 'react';
import { BRAND_VALUES } from '../data/products';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FFFFFF] border-t border-[#E7E7E7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Editorial Heading + Statement */}
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 mb-8 sm:mb-10">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#686868] uppercase block">
            // Brand Manifesto
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight-editorial uppercase text-[#111111] leading-[0.98]">
            Less Noise.<br />
            More Feeling.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#686868] leading-relaxed font-light max-w-xl mx-auto">
            “At Vibe District, we believe great sound doesn't need to shout. It should meet you in your own world, bring every detail closer, and make ordinary moments feel extraordinary.”
          </p>
        </div>

        {/* Wide Cinematic Product Landscape Photograph */}
        <div className="relative rounded-2xl overflow-hidden aspect-16/9 sm:aspect-21/9 max-h-[360px] bg-[#101010] mb-10 sm:mb-12 border border-[#E7E7E7] shadow-sm group">
          <img
            src="./images/products/philosophy.jpg"
            alt="Vibe District acoustic transducer and CNC aluminum components"
            className="w-full h-full object-cover object-center opacity-85 transition-transform duration-500 ease-out group-hover:scale-102"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 sm:p-8">
            <div className="text-white max-w-md">
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/70 block mb-0.5">
                Precision Transducer Lab
              </span>
              <p className="text-xs text-white/90 leading-relaxed font-normal">
                Sub-micron diaphragms tensioned under zero-gravity conditions to preserve tonal linearity.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Architectural Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2">
          {BRAND_VALUES.map((item) => (
            <div key={item.number} className="flex flex-col space-y-2">
              <span className="text-xs font-mono font-bold text-[#111111] tracking-widest pb-2 border-b border-[#E7E7E7]">
                [{item.number}]
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#111111] uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs text-[#686868] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
