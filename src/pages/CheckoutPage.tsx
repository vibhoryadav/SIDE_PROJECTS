import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  Truck,
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';
import { ShippingAddress, OrderDetails } from '../types';

interface CheckoutPageProps {
  onBack: () => void;
  onOrderSuccess: (order: OrderDetails) => void;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab',
  'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
];

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBack, onOrderSuccess }) => {
  const { cart, subtotal, discount, shipping, total, promoCode, clearCart } = useCart();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = '10-digit mobile number required';
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Delivery address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) newErrors.pincode = '6-digit PIN code required';

    if (paymentMethod === 'upi' && !upiId.includes('@')) {
      newErrors.upiId = 'Enter a valid UPI ID (e.g. name@okhdfcbank)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    if (cart.length === 0) {
      alert('Your shopping bag is empty.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Fire confetti celebratory fireworks
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // fallback
      }

      const generatedId = `VD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

      const order: OrderDetails = {
        orderId: generatedId,
        items: [...cart],
        subtotal,
        discount,
        shipping,
        total,
        shippingAddress: { ...formData },
        paymentMethod:
          paymentMethod === 'upi'
            ? `UPI (${upiId})`
            : paymentMethod === 'card'
            ? 'Credit/Debit Card (Demo)'
            : paymentMethod === 'netbanking'
            ? 'Net Banking'
            : 'Cash on Delivery',
        createdAt: new Date().toISOString()
      };

      clearCart();
      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 1200);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FFFFFF] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Breadcrumb */}
        <div className="pb-8 border-b border-[#E7E7E7] flex items-center justify-between text-xs">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-[#686868] hover:text-[#111111] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="uppercase tracking-widest font-mono text-[11px]">Return to Collection</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-[#686868]">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-mono text-[11px]">256-bit Encrypted Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-10 items-start">
          
          {/* Left Column: Checkout Forms (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#686868] block mb-1">
                Step 01 / Shipping Details
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight-editorial text-[#111111]">
                Express Delivery Destination
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-[#F0F0F0]">
                  Contact & Identification
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikramaditya Rao"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black"
                    />
                    {errors.fullName && <p className="text-[10px] text-rose-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                      Email Address (for order tracking) *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikram@example.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black"
                    />
                    {errors.email && <p className="text-[10px] text-rose-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                    Mobile Phone Number (for delivery OTP) *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-xs text-[#686868] bg-[#F5F5F5] border border-r-0 border-[#E7E7E7] rounded-l-lg font-mono">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 text-xs rounded-r-lg border border-[#E7E7E7] bg-white outline-none focus:border-black font-mono"
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-[#F0F0F0]">
                  Address Details
                </h3>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                    Street Address, Flat / Apartment / House No. *
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine1}
                    onChange={e => setFormData({ ...formData, addressLine1: e.target.value })}
                    placeholder="e.g. 402, Signature Towers, Indiranagar"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black"
                  />
                  {errors.addressLine1 && <p className="text-[10px] text-rose-600 mt-1">{errors.addressLine1}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                    Landmark / Floor (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={e => setFormData({ ...formData, addressLine2: e.target.value })}
                    placeholder="Near 100 Feet Road"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Bengaluru"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black"
                    />
                    {errors.city && <p className="text-[10px] text-rose-600 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                      State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black"
                    >
                      {INDIAN_STATES.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                      PIN Code (6 digits) *
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={e => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                      placeholder="560038"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black font-mono"
                    />
                    {errors.pincode && <p className="text-[10px] text-rose-600 mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#F0F0F0]">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
                    Payment Mode
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Demo Simulation Mode
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                    { id: 'card', label: 'Card', icon: CreditCard },
                    { id: 'netbanking', label: 'NetBanking', icon: Building },
                    { id: 'cod', label: 'Pay on Delivery', icon: Truck }
                  ].map(method => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                          paymentMethod === method.id
                            ? 'border-[#101010] bg-[#101010] text-white shadow-xs'
                            : 'border-[#E7E7E7] bg-white hover:border-[#101010]/30 text-[#111111]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] font-semibold">{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-form based on selected payment method */}
                <div className="p-4 bg-[#FAFAFA] rounded-xl border border-[#E7E7E7] text-xs">
                  {paymentMethod === 'upi' && (
                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono uppercase text-[#686868]">
                        UPI Virtual Address (Google Pay / PhonePe / Paytm)
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="username@okhdfcbank"
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black font-mono"
                      />
                      {errors.upiId && <p className="text-[10px] text-rose-600">{errors.upiId}</p>}
                      <p className="text-[10px] text-[#686868]">
                        Sample test: type <code className="bg-white px-1 py-0.5 border rounded">demo@upi</code>
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#686868] mb-1">
                          Card Number (Demo Sandbox)
                        </label>
                        <input
                          type="text"
                          placeholder="4111 2222 3333 4444"
                          value={cardDetails.number}
                          onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#E7E7E7] bg-white font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="px-3 py-2 text-xs rounded-lg border border-[#E7E7E7] bg-white font-mono"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          maxLength={3}
                          className="px-3 py-2 text-xs rounded-lg border border-[#E7E7E7] bg-white font-mono"
                        />
                      </div>
                      <p className="text-[10px] text-[#686868]">
                        * No actual card charge will occur. Prototype handles mock authorization.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-[#686868]">
                        Select Banking Partner
                      </label>
                      <select className="w-full px-3 py-2 text-xs rounded-lg border border-[#E7E7E7] bg-white">
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>State Bank of India</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="text-[11px] text-[#686868] leading-relaxed">
                      Cash or UPI on delivery is supported across all serviceable pin codes in India. Please keep exact change or have your UPI app open when the courier arrives.
                    </div>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 bg-[#101010] text-white hover:bg-black font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-200 cursor-pointer shadow-md disabled:opacity-50 active:scale-98 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Order Dispatch...</span>
                ) : (
                  <>
                    <span>Place Order • {formatINR(total)}</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Column: Order Summary (5 Cols) */}
          <div className="lg:col-span-5 bg-[#FAFAFA] rounded-2xl p-6 sm:p-8 border border-[#E7E7E7] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E7]">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#111111]">
                Order Summary
              </h2>
              <span className="text-xs text-[#686868]">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items
              </span>
            </div>

            {/* Items scroll */}
            <div className="max-h-80 overflow-y-auto divide-y divide-[#EAEAEA] pr-1">
              {cart.map(item => (
                <div key={item.id} className="py-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-lg p-1 border border-[#E7E7E7] flex items-center justify-center shrink-0">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <div className="font-bold text-[#111111]">{item.name}</div>
                      <div className="text-[11px] text-[#686868]">
                        Color: {item.color} • Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-mono font-semibold text-[#111111]">
                    {formatINR(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-[#E7E7E7] space-y-2 text-xs text-[#686868]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#111111]">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Coupon Discount ({promoCode})</span>
                  <span className="font-mono">-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Courier Shipping</span>
                <span className="text-[#111111] font-mono">
                  {shipping === 0 ? 'Complimentary' : formatINR(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST (Included)</span>
                <span className="font-mono text-[#111111]">₹0 (Included in MRP)</span>
              </div>
              <div className="pt-3 border-t border-[#E7E7E7] flex justify-between text-base font-bold text-[#111111]">
                <span>Total Amount</span>
                <span className="font-mono text-lg">{formatINR(total)}</span>
              </div>
            </div>

            {/* Guarantees */}
            <div className="pt-4 border-t border-[#E7E7E7] space-y-2 text-[11px] text-[#686868]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>30-Day Money-Back Acoustic Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#111111] shrink-0" />
                <span>Dispatched from Mumbai Hub within 24 Hours</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
