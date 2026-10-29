import React from 'react';
import { ArrowRight, Sliders, BatteryCharging } from 'lucide-react';

interface StorySectionProps {
  onExploreClick: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onExploreClick }) => {
  return (
    <section className="py-12 sm:py-16 bg-[#FFFFFF] border-t border-[#F0F0F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Visual Column (55% width on desktop) cleanly contained */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl bg-[#F8F8F8] overflow-hidden aspect-4/3 sm:aspect-16/10 max-h-[420px] flex items-center justify-center border border-[#EBEBEB] group">
              <img
                src="./images/products/overdrive-angle.jpg"
                alt="Vibe District acoustic engineering and matte black finishes"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
                loading="lazy"
              />

              {/* Minimal architectural caption badge */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[#E7E7E7] shadow-xs text-left z-10">
                <span className="block text-[10px] tracking-[0.2em] uppercase font-mono text-[#686868]">
                  Acoustic Integrity
                </span>
                <span className="text-xs font-semibold text-[#111111]">
                  CNC Machined Aluminum Pivot Hinges
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-6">
            <div className="inline-block text-[11px] font-mono tracking-[0.25em] text-[#686868] uppercase">
              // Chapter 01 — Philosophy
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight-editorial uppercase text-[#111111] leading-[1.05]">
              Made For<br />
              Your World.
            </h2>

            <p className="text-[#686868] text-sm sm:text-base leading-relaxed font-normal">
              From your first track in the morning to the last song at night, discover audio designed around the way you live.
            </p>

            <p className="text-xs sm:text-sm text-[#686868] leading-relaxed">
              We remove every non-essential line, logo, and LED indicator. What remains is honest material integrity: cool anodized aluminum, memory-mesh cushioning, and low-frequency clarity that lets the music speak without embellishment.
            </p>

            {/* Micro spec points */}
            <div className="pt-3 border-t border-[#E7E7E7] grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#111111]">
                  <Sliders className="w-3.5 h-3.5 text-[#686868]" />
                  <span>Custom Drivers</span>
                </div>
                <p className="text-[11px] text-[#686868]">40mm beryllium diaphragm</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#111111]">
                  <BatteryCharging className="w-3.5 h-3.5 text-[#686868]" />
                  <span>40H Playback</span>
                </div>
                <p className="text-[11px] text-[#686868]">USB-C fast charge enabled</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#111111] hover:text-[#686868] transition-colors group cursor-pointer"
              >
                <span>Read the Engineering Story</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
