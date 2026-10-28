import React, { useState } from 'react';
import {
  ShoppingBag,
  ArrowLeft,
  Check,
  Shield,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Box,
  Sliders,
  ChevronRight,
  Share2
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { formatINR } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (productId: string) => void;
  onCheckout: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onSelectProduct,
  onCheckout
}) => {
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'box' | 'shipping'>('specs');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];

  const handleAddToCart = () => {
    addToCart(product, selectedColor.name, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor.name, quantity);
    onCheckout();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FFFFFF] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-8 border-b border-[#E7E7E7] text-xs">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-[#686868] hover:text-[#111111] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="uppercase tracking-widest font-mono text-[11px]">Back to Collection</span>
          </button>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 text-[#686868] hover:text-[#111111] cursor-pointer"
              title="Copy product link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono uppercase">
                {copiedNotification ? 'Link Copied!' : 'Share'}
              </span>
            </button>
            <span className="text-[#C4C4C4]">/</span>
            <span className="text-[11px] font-mono text-[#111111] uppercase font-semibold">
              {product.badge || 'Ref 2026'}
            </span>
          </div>
        </div>

        {/* Main Product Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-10 sm:pt-14 items-start">
          
          {/* Left Column: Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Primary Main Image Frame */}
            <div className="relative aspect-square sm:aspect-4/3 bg-[#F8F8F8] rounded-2xl overflow-hidden p-8 sm:p-12 flex items-center justify-center border border-[#EBEBEB]">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={`${product.name} - ${selectedColor.name}`}
                className="max-h-full max-w-full object-contain drop-shadow-md transition-all duration-300"
              />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-mono uppercase tracking-wider text-[#111111] border border-[#E7E7E7]">
                  {selectedColor.name}
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl bg-[#F8F8F8] p-2 flex items-center justify-center border transition-all cursor-pointer shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#101010] ring-1 ring-[#101010]'
                      : 'border-[#E7E7E7] hover:border-[#101010]/50'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Editorial Highlight Quote Card */}
            <div className="p-6 bg-[#FAFAFA] rounded-xl border border-[#EAEAEA] mt-4">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#686868] block mb-1">
                Acoustic Design Statement
              </span>
              <p className="text-xs sm:text-sm text-[#111111] italic leading-relaxed">
                "{product.editorialHighlight}"
              </p>
            </div>
          </div>

          {/* Right Column: Purchasing Configuration (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            
            {/* Header info */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#686868] block mb-2">
                {product.specs.type}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight-editorial text-[#111111]">
                {product.name}
              </h1>
              <p className="mt-2 text-sm text-[#686868] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price section */}
            <div className="pb-6 border-b border-[#E7E7E7] flex items-baseline space-x-4">
              <span className="text-3xl font-black text-[#111111] font-mono">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-[#686868] line-through font-mono">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Save {formatINR((product.originalPrice || product.price) - product.price)}
              </span>
            </div>

            {/* Color Swatch Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase tracking-wider text-[#686868]">
                  Finish: <span className="font-bold text-[#111111]">{selectedColor.name}</span>
                </span>
                <span className="text-[11px] text-[#686868] font-mono">
                  Matte Anodized
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`group relative p-1 rounded-full border transition-all cursor-pointer ${
                      selectedColorIndex === idx
                        ? 'border-black ring-2 ring-black ring-offset-2'
                        : 'border-[#E7E7E7] hover:border-black/50'
                    }`}
                    title={color.name}
                  >
                    <span
                      className="block w-6 h-6 rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action CTAs */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#E7E7E7] rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-[#F5F5F5] text-[#111111] rounded-lg transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-mono font-bold text-[#111111]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-[#F5F5F5] text-[#111111] rounded-lg transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 bg-[#101010] text-white hover:bg-black font-semibold text-xs uppercase tracking-[0.18em] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-transparent hover:bg-[#F5F5F5] text-[#111111] border border-[#101010] font-semibold text-xs uppercase tracking-[0.18em] rounded-xl transition-all duration-200 cursor-pointer active:scale-98"
              >
                Instant Buy with 1-Click Checkout
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="pt-6 border-t border-[#E7E7E7] grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-[#FAFAFA] rounded-lg border border-[#EAEAEA]">
                <Truck className="w-4 h-4 mx-auto text-[#111111] mb-1.5" />
                <span className="block text-[10px] font-bold text-[#111111] uppercase tracking-wider">Free Delivery</span>
                <span className="text-[9px] text-[#686868]">Across India</span>
              </div>

              <div className="p-3 bg-[#FAFAFA] rounded-lg border border-[#EAEAEA]">
                <RotateCcw className="w-4 h-4 mx-auto text-[#111111] mb-1.5" />
                <span className="block text-[10px] font-bold text-[#111111] uppercase tracking-wider">30-Day Trial</span>
                <span className="text-[9px] text-[#686868]">Risk-Free Return</span>
              </div>

              <div className="p-3 bg-[#FAFAFA] rounded-lg border border-[#EAEAEA]">
                <Shield className="w-4 h-4 mx-auto text-[#111111] mb-1.5" />
                <span className="block text-[10px] font-bold text-[#111111] uppercase tracking-wider">2-Yr Warranty</span>
                <span className="text-[9px] text-[#686868]">Acoustic Coverage</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed In-Depth Information Section */}
        <div className="mt-20 pt-10 border-t border-[#E7E7E7]">
          {/* Navigation Tabs */}
          <div className="flex items-center space-x-2 sm:space-x-4 border-b border-[#E7E7E7] pb-px overflow-x-auto">
            {[
              { key: 'specs', label: 'Technical Specifications' },
              { key: 'features', label: 'Engineered Features' },
              { key: 'box', label: 'What’s In The Box' },
              { key: 'shipping', label: 'Shipping & Warranty' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`pb-4 px-3 text-xs uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                  activeTab === tab.key
                    ? 'border-[#101010] text-[#111111]'
                    : 'border-transparent text-[#686868] hover:text-[#111111]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="pt-8">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="py-3 border-b border-[#F0F0F0] flex justify-between text-xs">
                    <span className="font-mono text-[#686868] uppercase tracking-wider">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="font-semibold text-[#111111] text-right max-w-xs">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {product.features.map(f => (
                  <div key={f.title} className="p-6 rounded-xl bg-[#FAFAFA] border border-[#EAEAEA]">
                    <h4 className="text-sm font-bold uppercase text-[#111111] tracking-wide mb-2">
                      {f.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#686868] leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'box' && (
              <div className="max-w-2xl">
                <p className="text-xs text-[#686868] mb-6">
                  Every Vibe District product ships in 100% plastic-free, FSC-certified unbleached packaging engineered to cradle the hardware securely during transit.
                </p>
                <ul className="space-y-3">
                  {product.inTheBox.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#111111] py-2 border-b border-[#F0F0F0]">
                      <Box className="w-4 h-4 text-[#686868] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-3xl space-y-6 text-xs sm:text-sm text-[#686868] leading-relaxed">
                <div>
                  <h4 className="text-sm font-bold uppercase text-[#111111] tracking-wide mb-1">
                    Complimentary Express Shipping
                  </h4>
                  <p>
                    All orders are dispatched within 24 hours from our Mumbai or Bengaluru distribution centers via express air courier. Average delivery timeline is 2 to 4 business days across India with live end-to-end SMS & WhatsApp tracking.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase text-[#111111] tracking-wide mb-1">
                    30-Day Risk-Free Trial
                  </h4>
                  <p>
                    Take 30 full days to immerse yourself in our sound signature. If it doesn't align with your listening standards, return it in original condition for a 100% refund without restocking fees.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase text-[#111111] tracking-wide mb-1">
                    2-Year Limited Acoustic Warranty
                  </h4>
                  <p>
                    Covers all internal acoustic drivers, electronic battery cells, and structural aluminum hinges against manufacturing defects. Replacement units dispatched with priority air courier.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Audio Portfolio */}
        <div className="mt-24 pt-16 border-t border-[#E7E7E7]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111111]">
              Explore Other Frequencies
            </h3>
            <button
              onClick={onBack}
              className="text-xs uppercase font-mono tracking-wider text-[#686868] hover:text-[#111111]"
            >
              View All (4)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map(rel => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
