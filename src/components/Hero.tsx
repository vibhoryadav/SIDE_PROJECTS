import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeroProps {
  onShopClick: () => void;
  onExploreSound: () => void;
  onProductSelect: (productId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onExploreSound, onProductSelect }) => {
  const { openSoundModal } = useCart();
  const [scrollY, setScrollY] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle scroll-linked depth calculation
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop subtle cursor-responsive tilt (limited to 3.5 degrees max, smooth resting return)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return; // Disable on touch/mobile
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMouseOffset({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y))
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Scroll factor (very restrained)
  const parallaxY = Math.min(scrollY * 0.12, 60);

  // Tilt transforms
  const rotateX = isHovered ? -mouseOffset.y * 3.5 : 0;
  const rotateY = isHovered ? mouseOffset.x * 4.5 : 0;

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] sm:min-h-screen pt-24 sm:pt-28 pb-16 flex flex-col justify-between items-center bg-[#FFFFFF] overflow-hidden"
    >
      {/* Studio Lighting Ambient Glow (Restrained & Clean) */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[680px] h-[480px] sm:h-[680px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(240,240,240,0.9) 0%, rgba(255,255,255,0) 70%)'
        }}
      />

      {/* Top Editorial Sub-bar */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 text-center pt-2 sm:pt-4 z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F5F5F5] border border-[#E7E7E7] text-[11px] tracking-[0.2em] uppercase font-medium text-[#111111] animate-fade-in">
          <Sparkles className="w-3 h-3 text-[#111111]" />
          <span>The New Standard in Spatial Clarity</span>
        </div>
      </div>

      {/* Main Composition: Centerpiece Headline + Floating Photorealistic Visual */}
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 my-auto flex flex-col items-center justify-center text-center z-10">
        {/* Large Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#111111] tracking-tight-editorial uppercase leading-[0.95] max-w-4xl mx-auto transition-transform duration-700 ease-out">
          Hear What<br />
          <span className="text-[#686868] font-medium">You’ve Been Missing.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#686868] max-w-xl mx-auto font-normal tracking-normal leading-relaxed">
          Immersive sound. Sculpted comfort. Nothing unnecessary.
        </p>

        {/* Primary Product Visual with Studio Shadow & Cursor-Tilt */}
        <div 
          className="relative mt-8 sm:mt-10 mb-8 w-full max-w-md sm:max-w-lg lg:max-w-xl aspect-4/3 flex items-center justify-center cursor-pointer group"
          onClick={() => onProductSelect('overdrive')}
          style={{
            transform: `translateY(${parallaxY}px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          title="Click to view Vibe District Overdrive specifications"
        >
          {/* Natural Studio Drop Shadow */}
          <div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/10 rounded-full blur-xl scale-y-50 group-hover:scale-105 transition-transform duration-500"
          />

          {/* High-Resolution Studio Matte Black Headphone Image */}
          <img
            src="/images/products/hero-overdrive.jpg"
            alt="Vibe District Overdrive Flagship Over-Ear Wireless Headphones in Matte Black"
            className="relative z-10 w-full h-full object-contain drop-shadow-sm transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="eager"
            fetchPriority="high"
          />

          {/* Subtle Tag Overlay on Hover */}
          <div className="absolute bottom-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E7E7E7] text-[11px] font-medium text-[#111111] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xs flex items-center gap-1.5">
            <span>Flagship Overdrive</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#686868]" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto">
          <button
            onClick={onShopClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#101010] text-white hover:bg-black font-semibold text-xs uppercase tracking-[0.18em] rounded-full transition-all duration-200 hover:shadow-md active:scale-98 cursor-pointer text-center"
          >
            Shop Headphones
          </button>
          <button
            onClick={() => {
              onExploreSound();
              openSoundModal();
            }}
            className="w-full sm:w-auto px-7 py-3.5 bg-transparent hover:bg-[#F5F5F5] text-[#111111] border border-[#E7E7E7] font-semibold text-xs uppercase tracking-[0.18em] rounded-full transition-all duration-200 active:scale-98 cursor-pointer text-center"
          >
            Explore the Experience
          </button>
        </div>
      </div>

      {/* Understated Scroll Indicator */}
      <div className="mt-8 flex flex-col items-center justify-center text-[#686868] hover:text-[#111111] transition-colors cursor-pointer group z-10">
        <span className="text-[10px] tracking-[0.25em] uppercase font-mono mb-1.5 opacity-70 group-hover:opacity-100">
          Scroll to Discover
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce opacity-60 group-hover:opacity-100 stroke-[1.5]" />
      </div>
    </section>
  );
};
