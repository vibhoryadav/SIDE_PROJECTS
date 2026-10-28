import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';

interface CartDrawerProps {
  onCheckout: () => void;
  onSelectProduct: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout, onSelectProduct }) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    totalCount,
    promoCode,
    promoApplied,
    promoError,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 2000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode.trim());
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={closeCart} />

      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full z-10 animate-slide-left">
        
        {/* Cart Header */}
        <div className="p-6 border-b border-[#E7E7E7] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold tracking-[0.2em] text-xs uppercase text-[#111111]">
              Shopping Bag
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#F5F5F5] text-[11px] font-mono text-[#686868]">
              {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={closeCart}
            className="p-1.5 rounded-full hover:bg-[#F5F5F5] text-[#111111] transition-colors cursor-pointer"
            aria-label="Close shopping bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3 bg-[#F9F9F9] border-b border-[#E7E7E7] text-xs">
          {remainingForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <p className="text-[#686868]">
                Add <span className="font-bold text-[#111111]">{formatINR(remainingForFreeShipping)}</span> more for complimentary shipping
              </p>
              <div className="w-full bg-[#E7E7E7] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#101010] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Complimentary express delivery unlocked!</span>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#F0F0F0]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#686868] mb-4">
                <Tag className="w-7 h-7 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-[#111111] uppercase tracking-wide">
                Your bag is empty
              </h3>
              <p className="mt-1 text-xs text-[#686868] max-w-xs">
                Discover our precision headphones and earbuds engineered for high-fidelity audio.
              </p>
              <button
                onClick={closeCart}
                className="mt-6 px-6 py-2.5 bg-[#101010] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-start">
                {/* Product Thumbnail */}
                <div
                  onClick={() => {
                    closeCart();
                    onSelectProduct(item.productId);
                  }}
                  className="w-20 h-20 bg-[#F8F8F8] rounded-lg p-2 shrink-0 cursor-pointer flex items-center justify-center border border-[#EBEBEB] hover:opacity-80 transition-opacity"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4
                      onClick={() => {
                        closeCart();
                        onSelectProduct(item.productId);
                      }}
                      className="text-xs sm:text-sm font-bold text-[#111111] truncate cursor-pointer hover:text-[#686868] transition-colors"
                    >
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#686868] hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-[#686868]">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: item.colorHex }}
                    />
                    <span>{item.color}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-[#E7E7E7] rounded-md bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#F5F5F5] text-[#111111] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-mono font-medium text-[#111111]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-[#F5F5F5] text-[#111111] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-bold text-[#111111]">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo Code Input & Summary Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E7E7E7] bg-[#FAFAFA] space-y-4">
            
            {/* Promo Code Form */}
            <div>
              {promoApplied ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Tag className="w-3.5 h-3.5" />
                    <span className="font-mono font-semibold">{promoCode} Applied</span>
                    <span>(-{formatINR(discount)})</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-rose-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={e => setInputCode(e.target.value)}
                    placeholder="Coupon code (e.g. VIBE10)"
                    className="flex-1 px-3 py-2 text-xs uppercase bg-white border border-[#E7E7E7] rounded-lg outline-none focus:border-black font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-white text-[#111111] hover:bg-[#F0F0F0] text-xs font-semibold uppercase tracking-wider rounded-lg border border-[#E7E7E7] cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="mt-1 text-[11px] text-rose-600">{promoError}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#686868]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#111111] font-mono">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span className="font-mono">-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-[#111111] font-mono">
                  {shipping === 0 ? 'Complimentary' : formatINR(shipping)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E7E7E7] flex justify-between text-sm sm:text-base font-bold text-[#111111]">
                <span>Total</span>
                <span className="font-mono">{formatINR(total)}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => {
                closeCart();
                onCheckout();
              }}
              className="w-full py-3.5 bg-[#101010] text-white hover:bg-black font-semibold text-xs uppercase tracking-[0.18em] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-[#686868]">
              Taxes calculated at checkout • 30-day trial with full refund
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
