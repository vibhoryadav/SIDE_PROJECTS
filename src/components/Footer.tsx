import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E7E7E7] pt-16 sm:pt-24 pb-12 text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-12 pb-16 border-b border-[#E7E7E7]">
          
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <span className="font-extrabold tracking-[0.25em] text-base text-[#111111] uppercase block">
              VIBE DISTRICT
            </span>
            <p className="text-xs sm:text-sm text-[#686868] max-w-sm leading-relaxed">
              Precision acoustic instruments crafted with monochromatic minimalism. Designed for those who demand transparent sound, architectural comfort, and quiet luxury.
            </p>
            <div className="text-[11px] font-mono text-[#686868]">
              Operating in: India • Global Inquiries Open
            </div>
          </div>

          {/* Column 1: Audio Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#111111]">
              Products
            </h4>
            <ul className="space-y-2 text-xs text-[#686868]">
              <li>
                <button
                  onClick={() => onNavigate('home', 'headphones')}
                  className="hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Overdrive Flagship
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'headphones')}
                  className="hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Studio Reference
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'earbuds')}
                  className="hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Pulse Wireless ANC
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'earbuds')}
                  className="hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Air Featherweight
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Studio & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#111111]">
              Service & Care
            </h4>
            <ul className="space-y-2 text-xs text-[#686868]">
              <li>
                <button
                  onClick={() => onNavigate('support')}
                  className="hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('support')}
                  className="hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Returns & 30-Day Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('support')}
                  className="hover:text-[#111111] transition-colors cursor-pointer"
                >
                  2-Year Warranty Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('support')}
                  className="hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Acoustic Calibration Help
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: District Studio */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#111111]">
              Manifesto
            </h4>
            <ul className="space-y-2 text-xs text-[#686868]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Acoustic Transducer Lab
                </button>
              </li>
              <li>
                <span className="text-[#A0A0A0] text-xs">Sustainability Report</span>
              </li>
              <li>
                <div className="flex items-center gap-1 text-xs text-[#111111]">
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-[#686868]" />
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#686868] gap-4">
          <div>
            © {new Date().getFullYear()} VIBE DISTRICT ACOUSTICS LAB. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => onNavigate('support')} className="hover:text-[#111111] cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('support')} className="hover:text-[#111111] cursor-pointer">
              Terms of Service
            </button>
            <button onClick={() => onNavigate('support')} className="hover:text-[#111111] cursor-pointer">
              Disclosures
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
