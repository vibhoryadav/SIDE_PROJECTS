import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Volume2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, productId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { totalCount, openCart, openSearch, openSoundModal } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: string, filterCategory?: string) => {
    setMobileMenuOpen(false);
    onNavigate(view, filterCategory);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'vibe-nav-blur border-b border-[#E7E7E7] py-3.5 shadow-xs'
            : 'bg-white/95 border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Wordmark Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="group text-left text-inherit border-none bg-transparent cursor-pointer p-0"
            aria-label="Vibe District Home"
          >
            <span className="font-extrabold tracking-[0.25em] text-sm sm:text-base text-[#111111] uppercase transition-opacity duration-200 group-hover:opacity-70">
              VIBE DISTRICT
            </span>
            <span className="block text-[9px] tracking-[0.3em] text-[#686868] uppercase -mt-0.5">
              Acoustic Lab
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-9 text-xs uppercase tracking-[0.15em] font-medium text-[#111111]" aria-label="Main Navigation">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors duration-200 cursor-pointer hover:text-black ${
                currentView === 'home' ? 'text-black font-semibold' : 'text-[#686868]'
              }`}
            >
              Collection
            </button>
            <button
              onClick={() => handleNavClick('headphones')}
              className="text-[#686868] hover:text-black transition-colors duration-200 cursor-pointer"
            >
              Headphones
            </button>
            <button
              onClick={() => handleNavClick('earbuds')}
              className="text-[#686868] hover:text-black transition-colors duration-200 cursor-pointer"
            >
              Earbuds
            </button>
            <button
              onClick={openSoundModal}
              className="text-[#686868] hover:text-black transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
            >
              <span>Our Sound</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Interactive Acoustic Simulator" />
            </button>
            <button
              onClick={() => handleNavClick('support')}
              className="text-[#686868] hover:text-black transition-colors duration-200 cursor-pointer"
            >
              Support
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Interactive Sound Lab Button */}
            <button
              onClick={openSoundModal}
              className="p-2 text-[#111111] hover:text-[#686868] transition-colors rounded-full hover:bg-[#F5F5F5] cursor-pointer"
              title="Acoustic Frequency Experience"
              aria-label="Open Sound Experience"
            >
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
            </button>

            {/* Search Icon */}
            <button
              onClick={openSearch}
              className="p-2 text-[#111111] hover:text-[#686868] transition-colors rounded-full hover:bg-[#F5F5F5] cursor-pointer"
              aria-label="Search audio products"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
            </button>

            {/* Shopping Bag Icon with Live Count */}
            <button
              onClick={openCart}
              className="relative p-2 text-[#111111] hover:text-[#686868] transition-colors rounded-full hover:bg-[#F5F5F5] cursor-pointer"
              aria-label={`Shopping bag with ${totalCount} items`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
              {totalCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#101010] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                  {totalCount > 9 ? '9+' : totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 md:hidden text-[#111111] hover:bg-[#F5F5F5] rounded-full transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[1.75]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.75]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E7E7]">
                <span className="font-bold tracking-[0.2em] text-xs uppercase text-[#111111]">
                  VIBE DISTRICT
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#F5F5F5] text-[#111111]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col space-y-5 text-sm uppercase tracking-[0.18em] font-medium">
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-left py-2 border-b border-[#F0F0F0] text-[#111111] hover:text-[#686868] transition-colors"
                >
                  All Products
                </button>
                <button
                  onClick={() => handleNavClick('headphones')}
                  className="text-left py-2 border-b border-[#F0F0F0] text-[#111111] hover:text-[#686868] transition-colors"
                >
                  Headphones
                </button>
                <button
                  onClick={() => handleNavClick('earbuds')}
                  className="text-left py-2 border-b border-[#F0F0F0] text-[#111111] hover:text-[#686868] transition-colors"
                >
                  Earbuds
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openSoundModal();
                  }}
                  className="text-left py-2 border-b border-[#F0F0F0] text-[#111111] hover:text-[#686868] transition-colors flex items-center justify-between"
                >
                  <span>Our Sound</span>
                  <span className="text-[10px] tracking-normal text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-mono">
                    Live Demo
                  </span>
                </button>
                <button
                  onClick={() => handleNavClick('support')}
                  className="text-left py-2 border-b border-[#F0F0F0] text-[#111111] hover:text-[#686868] transition-colors"
                >
                  Support & FAQ
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E7E7E7] text-xs text-[#686868] space-y-3">
              <p className="font-mono text-[11px] text-[#111111]">
                Currency: Indian Rupee (INR ₹)
              </p>
              <p className="text-[11px] leading-relaxed">
                Complimentary express shipping across India on orders above ₹2,000.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
