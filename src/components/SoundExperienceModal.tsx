import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Play, Square, Activity, Waves, Sparkles, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { soundEngine } from '../utils/audioEngine';

export const SoundExperienceModal: React.FC = () => {
  const { isSoundModalOpen, closeSoundModal } = useCart();
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState<number[]>([12, 18, 25, 40, 30, 20, 15, 35, 45, 20, 14, 8]);

  const soundProfiles = [
    {
      id: 'sub-bass',
      name: '40Hz Sub-Bass Depth',
      category: 'Low Frequency Transducer',
      description: 'Clean acoustic pressure without harmonic distortion or muddy resonance.',
      icon: Activity,
      action: () => soundEngine.playTone(45, 'sine', 3.5),
      meterColor: 'bg-[#101010]'
    },
    {
      id: 'mids',
      name: '1,000Hz Vocal Presence',
      category: 'Midrange Neutrality',
      description: 'Intimate, uncompressed vocal realism calibrated to the natural human ear canal curve.',
      icon: Waves,
      action: () => soundEngine.playTone(1000, 'sine', 3.5),
      meterColor: 'bg-[#101010]'
    },
    {
      id: 'highs',
      name: '8,000Hz Spatial Air',
      category: 'Micro-Detail & Shimmer',
      description: 'Ultra-fast beryllium transient response revealing breath and acoustic reflections.',
      icon: Sparkles,
      action: () => soundEngine.playTone(8000, 'sine', 3.5),
      meterColor: 'bg-[#101010]'
    },
    {
      id: 'harmony',
      name: 'Acoustic Tuning Chord',
      category: 'Harmonic Coherence',
      description: 'Multi-frequency triad (220Hz + 440Hz + 660Hz) testing multi-driver coherence.',
      icon: Volume2,
      action: () => soundEngine.playChord([220, 440, 660], 4, 'harmony'),
      meterColor: 'bg-[#101010]'
    }
  ];

  // Frequency animation loop while playing
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setBars(prev =>
          prev.map(() => Math.floor(Math.random() * 50) + 10)
        );
      }, 90);
    } else {
      setBars([12, 18, 25, 40, 30, 20, 15, 35, 45, 20, 14, 8]);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Clean up sound when closing modal
  useEffect(() => {
    if (!isSoundModalOpen) {
      soundEngine.stop();
      setIsPlaying(false);
      setActivePreset(null);
    }
  }, [isSoundModalOpen]);

  if (!isSoundModalOpen) return null;

  const handlePlayPreset = (profile: typeof soundProfiles[0]) => {
    if (activePreset === profile.id && isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
      setActivePreset(null);
    } else {
      setActivePreset(profile.id);
      setIsPlaying(true);
      profile.action();
      setTimeout(() => {
        setIsPlaying(false);
        setActivePreset(null);
      }, 3600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="absolute inset-0" onClick={closeSoundModal} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E7E7E7] overflow-hidden z-10 animate-scale-in">
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[#E7E7E7] flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.25em] text-[#686868] uppercase mb-1">
              <Shield className="w-3 h-3 text-[#111111]" />
              <span>Vibe District Acoustic Laboratory</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight-editorial text-[#111111]">
              Acoustic Spectrum Lab
            </h3>
          </div>

          <button
            onClick={closeSoundModal}
            className="p-2 text-[#686868] hover:text-[#111111] rounded-full hover:bg-[#F5F5F5] transition-colors cursor-pointer"
            aria-label="Close sound experience"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visualizer Canvas */}
        <div className="p-6 sm:p-8 bg-[#FAFAFA] border-b border-[#E7E7E7] flex flex-col items-center justify-center">
          <div className="text-[11px] font-mono text-[#686868] uppercase tracking-[0.2em] mb-4">
            {isPlaying ? `Sampling: ${soundProfiles.find(p => p.id === activePreset)?.name}` : 'Click any preset below to test frequency response'}
          </div>

          {/* Animated Frequency Bars */}
          <div className="flex items-end justify-center gap-2 h-24 w-full max-w-md px-4">
            {bars.map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-[#101010] rounded-t-sm transition-all duration-100 ease-in-out"
                style={{
                  height: `${isPlaying ? height : 8}%`,
                  opacity: isPlaying ? 0.95 : 0.25
                }}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs font-mono text-[#686868]">
            <span>20 Hz</span>
            <div className="w-48 h-px bg-[#E7E7E7]" />
            <span>20,000 Hz</span>
          </div>
        </div>

        {/* Presets List */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {soundProfiles.map(profile => {
            const Icon = profile.icon;
            const isThisActive = activePreset === profile.id && isPlaying;
            return (
              <div
                key={profile.id}
                onClick={() => handlePlayPreset(profile)}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isThisActive
                    ? 'border-[#101010] bg-[#F5F5F5] shadow-xs'
                    : 'border-[#E7E7E7] bg-white hover:border-[#101010]/40 hover:bg-[#FBFBFB]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#686868]">
                      {profile.category}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#F0F0F0] flex items-center justify-center text-[#111111]">
                      {isThisActive ? (
                        <Square className="w-3 h-3 fill-current" />
                      ) : (
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      )}
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-[#111111]">
                    {profile.name}
                  </h4>
                  <p className="mt-1 text-xs text-[#686868] leading-relaxed">
                    {profile.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-[#EAEAEA] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#686868]">
                    {isThisActive ? 'Tone playing...' : 'Opt-in preview'}
                  </span>
                  <span className="text-[#111111] font-semibold">
                    {isThisActive ? 'Stop' : 'Play tone'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Footer */}
        <div className="p-4 bg-white border-t border-[#E7E7E7] text-center text-[11px] text-[#686868]">
          Opt-in audio generated via Web Audio API. Please adjust your system volume responsibly.
        </div>

      </div>
    </div>
  );
};
