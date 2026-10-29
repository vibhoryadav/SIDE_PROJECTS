import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Sliders, BatteryCharging, ShieldCheck } from 'lucide-react';

interface StorySectionProps {
  onExploreClick: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onExploreClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            // Calculate progress through viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
              setOffsetY((scrollProgress - 0.5) * 35);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-36 bg-[#FFFFFF] border-t border-[#F0F0F0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column (55% width on desktop) with Restrained Parallax */}
          <div className="lg:col-span-7 relative">
            <div 
              className="relative rounded-2xl bg-[#F8F8F8] overflow-hidden aspect-4/3 sm:aspect-16/10 flex items-center justify-center border border-[#EBEBEB] group"
              style={{
                transform: `translateY(${offsetY}px)`,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <img
                src="./images/products/overdrive-angle.jpg"
                alt="Vibe District acoustic engineering and matte black finishes"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Minimal architectural caption badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-lg border border-[#E7E7E7] shadow-xs text-left">
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
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8">
            <div className="inline-block text-[11px] font-mono tracking-[0.25em] text-[#686868] uppercase">
              // Chapter 01 — Philosophy
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight-editorial uppercase text-[#111111] leading-[1.05]">
              Made For<br />
              Your World.
            </h2>

            <p className="text-[#686868] text-base sm:text-lg leading-relaxed font-normal">
              From your first track in the morning to the last song at night, discover audio designed around the way you live.
            </p>

            <p className="text-sm text-[#686868] leading-relaxed">
              We remove every non-essential line, logo, and LED indicator. What remains is honest material integrity: cool anodized aluminum, memory-mesh cushioning, and low-frequency clarity that lets the music speak without embellishment.
            </p>

            {/* Micro spec points */}
            <div className="pt-4 border-t border-[#E7E7E7] grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#111111]">
                  <Sliders className="w-4 h-4 text-[#686868]" />
                  <span>Custom Drivers</span>
                </div>
                <p className="text-xs text-[#686868]">40mm beryllium diaphragm</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#111111]">
                  <BatteryCharging className="w-4 h-4 text-[#686868]" />
                  <span>40H Playback</span>
                </div>
                <p className="text-xs text-[#686868]">USB-C fast charge enabled</p>
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
