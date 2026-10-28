import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { formatINR } from '../utils/formatters';

interface SearchModalProps {
  onSelectProduct: (productId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onSelectProduct }) => {
  const { isSearchOpen, closeSearch } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim() === ''
    ? PRODUCTS
    : PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tagline.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.specs.type.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-fade-in">
      <div className="absolute inset-0" onClick={closeSearch} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E7E7E7] overflow-hidden z-10 animate-scale-in">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E7E7E7] flex items-center gap-3 bg-[#FFFFFF]">
          <Search className="w-5 h-5 text-[#686868] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search headphones, earbuds, active noise cancellation..."
            className="w-full text-sm sm:text-base text-[#111111] placeholder-[#8E8E8E] bg-transparent outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#686868] hover:text-[#111111] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1 text-[#686868] hover:text-[#111111] rounded-full hover:bg-[#F5F5F5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-[#F0F0F0]">
          <div className="pb-3 text-[11px] font-mono uppercase tracking-[0.18em] text-[#686868] flex justify-between">
            <span>{query ? `Results for "${query}"` : 'Featured Audio Models'}</span>
            <span>{results.length} available</span>
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-[#686868] text-sm">
              No products found matching "{query}". Try searching "Overdrive", "Studio", or "Earbuds".
            </div>
          ) : (
            results.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  closeSearch();
                  onSelectProduct(product.id);
                }}
                className="py-3.5 flex items-center justify-between group cursor-pointer hover:bg-[#F9F9F9] px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-[#F5F5F5] p-1.5 flex items-center justify-center shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111111] group-hover:text-[#686868] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#686868] line-clamp-1">
                      {product.tagline} • {product.specs.batteryLife.split(' ')[0]} {product.specs.batteryLife.split(' ')[1]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-sm font-bold text-[#111111]">
                    {formatINR(product.price)}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#F5F5F5] group-hover:bg-[#101010] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-4 bg-[#FAFAFA] border-t border-[#E7E7E7] flex items-center gap-2 flex-wrap text-xs text-[#686868]">
          <span className="font-mono text-[11px]">Popular:</span>
          {['Overdrive', 'Pulse', 'ANC', 'Studio', 'Air'].map(term => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 rounded bg-white border border-[#E7E7E7] hover:border-black text-[11px] text-[#111111] transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
