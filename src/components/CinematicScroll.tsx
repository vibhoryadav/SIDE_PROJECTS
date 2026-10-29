import React, { useState, useEffect, useRef } from 'react';
import { VolumeX, Waves, Sparkles } from 'lucide-react';

interface CinematicScrollProps {
  onLearnMore?: () => void;
}

export const CinematicScroll: React.FC<CinematicScrollProps> = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      id: 'step-1',
      tag: '01 / Active Isolation',
      headline: 'Silence the noise.',
      copy: 'Find your focus with immersive listening and active noise cancellation. Dual-chamber acoustics cancel out 98% of ambient city frequencies.',
      icon: VolumeX,
      imageScale: 1.0,
      imageAngle: 0,
      bgTint: 'bg-white',
      accentMetric: '-42 dB Noise Reduction'
    },
    {
      id: 'step-2',
      tag: '02 / Custom Transducers',
      headline: 'Feel every detail.',
      copy: 'Experience rich lows, balanced mids, and crisp highs. Custom beryllium diaphragms vibrate with surgical precision across 10Hz to 42,000Hz.',
      icon: Waves,
      imageScale: 1.08,
      imageAngle: 6,
      bgTint: 'bg-[#F9F9F9]',
      accentMetric: '10Hz – 42kHz Hi-Res'
    },
    {
      id: 'step-3',
      tag: '03 / Ergonomic Balance',
      headline: 'Comfort without compromise.',
      copy: 'Designed for long listening sessions with a carefully considered fit. Pressure-relieving memory mesh cradles your cranium for all-day effortless wear.',
      icon: Sparkles,
      imageScale: 1.15,
      imageAngle: -4,
      bgTint: 'bg-[#F5F5F5]',
      accentMetric: '254g Featherweight Clamping'
    }
  ];

  // Scroll detection to update active step gracefully as user scrolls
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.3) {
              const totalDist = rect.height - windowHeight * 0.4;
              const currentDist = Math.max(0, -rect.top + windowHeight * 0.3);
              const progress = Math.min(0.99, Math.max(0, currentDist / totalDist));
              const stepIndex = Math.floor(progress * features.length);
              setActiveStep(stepIndex);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [features.length]);

  const currentFeature = features[activeStep] || features[0];

  return (
    <section
      ref={containerRef}
      className={`relative py-28 sm:py-36 transition-colors duration-700 ease-out ${currentFeature.bgTint} border-t border-[#E7E7E7] overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#686868] uppercase block mb-3">
            // Cinematic Audio Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight-editorial uppercase text-[#111111] leading-none">
            Sound That<br />
            Moves You.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#686868] max-w-lg mx-auto">
            An intimate choreography of materials, acoustic tuning, and spatial separation.
          </p>
        </div>

        {/* Feature Progression Navigation Tabs */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="inline-flex items-center p-1 bg-white border border-[#E7E7E7] rounded-full shadow-xs">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer ${
                    activeStep === idx
                      ? 'bg-[#101010] text-white shadow-xs'
                      : 'text-[#686868] hover:text-[#111111]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Feature 0{idx + 1}</span>
                  <span className="sm:hidden">0{idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cinematic Presentation Canvas: Dynamic Central Product Visual + Highlight Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Central Product Visual with Layered Transformation */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[340px] sm:min-h-[440px]">
            {/* Dynamic Halo Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div 
                className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-black/5 blur-3xl transition-transform duration-700"
                style={{ transform: `scale(${currentFeature.imageScale * 1.1})` }}
              />
            </div>

            {/* High-Res Studio Visual */}
            <div 
              className="relative z-10 w-full max-w-md sm:max-w-lg transition-all duration-700 ease-out"
              style={{
                transform: `scale(${currentFeature.imageScale}) rotate(${currentFeature.imageAngle}deg)`
              }}
            >
              <img
                src="./images/products/overdrive-main.jpg"
                alt="Vibe District Cinematic Sound Architecture"
                className="w-full h-auto object-contain drop-shadow-xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* Feature Narrative Card */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-4 bg-white/80 backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-[#E7E7E7] shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#686868]">
                  {currentFeature.tag}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#F5F5F5] text-[10px] font-mono text-[#111111] font-semibold border border-[#E7E7E7]">
                  {currentFeature.accentMetric}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight-editorial uppercase text-[#111111] leading-tight transition-all duration-300">
                {currentFeature.headline}
              </h3>

              <p className="text-sm sm:text-base text-[#686868] leading-relaxed transition-all duration-300 font-normal">
                {currentFeature.copy}
              </p>

              {/* Progress Bar Indicator */}
              <div className="pt-4 flex items-center space-x-2">
                {features.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 cursor-pointer ${
                      activeStep === i ? 'bg-[#101010]' : 'bg-[#E7E7E7] hover:bg-[#D4D4D4]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
