import React from 'react';
import { Shield, Sparkles, BatteryMedium, Cpu } from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const highlights = [
    {
      icon: Shield,
      title: 'Active Noise Cancellation',
      subtitle: 'Hybrid Acoustic Filtering',
      description: 'Continuous dual-microphone phase sampling isolates and suppresses city din, flight drone, and chatter up to -42dB.'
    },
    {
      icon: Sparkles,
      title: 'All-Day Comfort',
      subtitle: 'Ergonomic Memory Mesh',
      description: 'Lightweight structural headband and ventilated memory foam disperse weight effortlessly across temples for zero fatigue.'
    },
    {
      icon: BatteryMedium,
      title: 'Long Battery Life',
      subtitle: 'Up to 50 Hours Endurance',
      description: 'High-density lithium polymer cells power full days of immersive playback, with a 10-minute fast charge granting 5 hours.'
    },
    {
      icon: Cpu,
      title: 'Seamless Connectivity',
      subtitle: 'Bluetooth 5.4 + Multipoint',
      description: 'Zero-drop transmission, ultra-low latency gaming modes, and instant dual-device handover between laptop and phone.'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] border-t border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Subtle Section Label */}
        <div className="mb-14 sm:mb-20 text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#686868] uppercase block mb-2">
            // Core Engineering Pillars
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight-editorial uppercase text-[#111111]">
            Precision In Every Detail.
          </h2>
        </div>

        {/* 4 Spacious Minimalist Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {highlights.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.title}
                className="flex flex-col space-y-4 p-6 sm:p-7 rounded-xl bg-[#FAFAFA] border border-[#EBEBEB] hover:border-[#D4D4D4] transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E7E7E7] flex items-center justify-center text-[#111111]">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#686868]">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#111111] uppercase tracking-wide">
                    {feat.title}
                  </h3>
                  <span className="text-[11px] font-mono text-[#686868] block mt-0.5">
                    {feat.subtitle}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#686868] leading-relaxed pt-2 border-t border-[#EAEAEA]">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
