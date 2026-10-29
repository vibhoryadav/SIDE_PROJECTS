import React from 'react';
import { Product } from '../types';
import { formatINR } from '../utils/formatters';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductComparisonProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({ products, onSelectProduct }) => {
  const { addToCart } = useCart();

  const comparisonRows: Array<{
    label: string;
    getValue: (p: Product) => string;
  }> = [
    { label: 'Form Factor', getValue: (p) => p.specs.type },
    { label: 'Acoustic Driver', getValue: (p) => p.specs.driver },
    { label: 'Noise Cancellation', getValue: (p) => p.specs.anc },
    { label: 'Battery Life', getValue: (p) => p.specs.batteryLife },
    { label: 'Connectivity', getValue: (p) => p.specs.connectivity },
    { label: 'Water Resistance', getValue: (p) => p.specs.waterResistance },
    { label: 'Weight', getValue: (p) => p.specs.weight },
    { label: 'Ideal Setting', getValue: (p) => p.specs.intendedUsage }
  ];

  return (
    <section id="compare" className="py-12 sm:py-16 bg-[#FAFAFA] border-t border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#686868] uppercase block mb-1.5">
            // Side-by-Side Analysis
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight-editorial uppercase text-[#111111]">
            Compare Models.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#686868]">
            Find the sound signature that matches your everyday routine.
          </p>
        </div>

        {/* Responsive Horizontal Scroll Container */}
        <div className="overflow-x-auto pb-4 -mx-6 px-6 sm:mx-0 sm:px-0">
          <div className="min-w-[800px] bg-white rounded-2xl border border-[#E7E7E7] shadow-xs overflow-hidden">
            
            {/* Table Header: Product Visuals & Names */}
            <div className="grid grid-cols-5 p-5 border-b border-[#E7E7E7] bg-[#FFFFFF] items-end">
              <div className="col-span-1 pr-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#686868]">
                  Specifications
                </span>
              </div>

              {products.map(p => (
                <div key={p.id} className="col-span-1 px-3 text-center flex flex-col items-center">
                  <div className="w-16 h-16 mb-2 bg-[#F8F8F8] rounded-lg p-1.5 flex items-center justify-center">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="text-xs font-bold text-[#111111] leading-tight">
                    {p.name.replace('Vibe District ', '')}
                  </h3>
                  <div className="mt-0.5 text-xs font-bold text-[#111111]">
                    {formatINR(p.price)}
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    className="mt-2 w-full py-1.5 px-2 bg-[#101010] text-white hover:bg-black text-[10px] uppercase tracking-wider font-semibold rounded-md transition-colors cursor-pointer"
                  >
                    Quick Add
                  </button>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-[#F0F0F0]">
              {comparisonRows.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-5 p-4 text-xs items-center transition-colors hover:bg-[#FDFDFD] ${
                    index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#FAFAFA]/70'
                  }`}
                >
                  <div className="col-span-1 font-semibold text-[#111111] pr-4">
                    {row.label}
                  </div>

                  {products.map(p => {
                    const val = row.getValue(p);
                    return (
                      <div key={p.id} className="col-span-1 px-3 text-center text-[#686868] leading-relaxed text-[11px] sm:text-xs">
                        {val}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer Row: Detail Links */}
            <div className="grid grid-cols-5 p-4 bg-[#FFFFFF] border-t border-[#E7E7E7] items-center">
              <div className="col-span-1 text-[10px] text-[#686868] font-mono">
                Comprehensive Specs
              </div>
              {products.map(p => (
                <div key={p.id} className="col-span-1 px-3 text-center">
                  <button
                    onClick={() => onSelectProduct(p.id)}
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-[#111111] hover:text-[#686868] transition-colors cursor-pointer"
                  >
                    <span>Full Spec Sheet</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
