import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  initialCategory?: ProductCategory;
  onSelectProduct: (productId: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  initialCategory = 'all',
  onSelectProduct
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialCategory);

  const filteredProducts = products.filter(product => {
    if (activeCategory === 'all') return true;
    return product.category === activeCategory;
  });

  return (
    <section id="collection" className="py-12 sm:py-16 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 sm:pb-8 border-b border-[#E7E7E7] gap-4 sm:gap-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#686868] uppercase block mb-1.5">
              // Premium Audio Portfolio
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight-editorial uppercase text-[#111111]">
              Find Your Frequency.
            </h2>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-2 bg-[#F5F5F5] p-1 rounded-xl self-start md:self-auto border border-[#E7E7E7]">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em] rounded-lg transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white text-[#111111] shadow-xs font-semibold'
                  : 'text-[#686868] hover:text-[#111111]'
              }`}
            >
              All Series ({products.length})
            </button>
            <button
              onClick={() => setActiveCategory('headphones')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em] rounded-lg transition-all cursor-pointer ${
                activeCategory === 'headphones'
                  ? 'bg-white text-[#111111] shadow-xs font-semibold'
                  : 'text-[#686868] hover:text-[#111111]'
              }`}
            >
              Over-Ear
            </button>
            <button
              onClick={() => setActiveCategory('earbuds')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em] rounded-lg transition-all cursor-pointer ${
                activeCategory === 'earbuds'
                  ? 'bg-white text-[#111111] shadow-xs font-semibold'
                  : 'text-[#686868] hover:text-[#111111]'
              }`}
            >
              Earbuds
            </button>
          </div>
        </div>

        {/* Product Cards Grid with Balanced Vertical Margins */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10 pt-8 sm:pt-10">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
