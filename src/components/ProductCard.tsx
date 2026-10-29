import React, { useState } from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/formatters';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { addToCart } = useCart();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor.name, 1);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectProduct(product.id)}
      className="group relative flex flex-col justify-between cursor-pointer bg-white transition-all duration-300"
    >
      {/* Product Image Stage */}
      <div className="relative w-full aspect-square bg-[#F8F8F8] rounded-xl overflow-hidden flex items-center justify-center p-5 sm:p-6 transition-colors duration-300 group-hover:bg-[#F2F2F2]">
        
        {/* Badge (if applicable) */}
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 text-[9px] tracking-[0.18em] uppercase font-mono px-2 py-0.5 rounded bg-white/95 text-[#111111] border border-[#E7E7E7] backdrop-blur-xs">
            {product.badge}
          </span>
        )}

        {/* Category Pill */}
        <span className="absolute top-3 right-3 z-10 text-[10px] tracking-[0.15em] uppercase text-[#686868] font-medium">
          {product.category === 'headphones' ? 'Over-Ear' : 'In-Ear'}
        </span>

        {/* Dual Image Crossfade */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={primaryImage}
            alt={product.name}
            className={`absolute max-h-full max-w-full object-contain transition-all duration-500 ease-out group-hover:scale-103 ${
              isHovered && product.images.length > 1 ? 'opacity-0 scale-95' : 'opacity-100'
            }`}
            loading="lazy"
          />

          {product.images.length > 1 && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate angle`}
              className={`absolute max-h-full max-w-full object-contain transition-all duration-500 ease-out group-hover:scale-103 ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
              loading="lazy"
            />
          )}
        </div>

        {/* Quick Action Overlay (Clean Floating Pill) */}
        <div className="absolute bottom-3 inset-x-3 flex items-center gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1.5 group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-2.5 bg-[#101010] text-white hover:bg-black text-[11px] font-semibold uppercase tracking-[0.15em] rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
            title="Quick add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product.id);
            }}
            className="p-2 bg-white text-[#111111] hover:bg-[#F5F5F5] rounded-lg border border-[#E7E7E7] shadow-xs cursor-pointer"
            title="View full specs"
            aria-label="View product specs"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Details Section (Spacious, Minimalist) */}
      <div className="pt-3 pb-1 flex flex-col space-y-1.5">
        {/* Color Swatch Dots */}
        <div className="flex items-center space-x-1.5" onClick={e => e.stopPropagation()}>
          {product.colors.map((color, idx) => (
            <button
              key={color.name}
              onClick={() => setSelectedColorIndex(idx)}
              className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                selectedColorIndex === idx
                  ? 'ring-1 ring-offset-2 ring-black scale-110'
                  : 'border-black/20 hover:scale-110'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={`Select ${color.name} color`}
            />
          ))}
          <span className="text-[11px] text-[#686868] ml-1.5 font-normal">
            {selectedColor.name}
          </span>
        </div>

        {/* Title and Tagline */}
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#111111] group-hover:text-[#686868] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-[#686868] line-clamp-1 mt-0.5 font-normal">
            {product.tagline}
          </p>
        </div>

        {/* Price and Specs Pill */}
        <div className="flex items-baseline justify-between pt-0.5">
          <div className="flex items-baseline space-x-2">
            <span className="text-sm sm:text-base font-bold text-[#111111]">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-[#686868] line-through font-normal">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono text-[#686868]">
            {product.specs.batteryLife.split(' ')[0]} {product.specs.batteryLife.split(' ')[1]}
          </span>
        </div>
      </div>
    </div>
  );
};
