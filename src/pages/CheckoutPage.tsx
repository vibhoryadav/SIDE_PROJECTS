import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Smartphone,
  Lock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  QrCode,
  ArrowRight,
  Upload,
  RefreshCw
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

  // Multi-step: 'address' -> 'payment'
  const [currentStep, setCurrentStep] = useState<'address' | 'payment'>('address');

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

  // Default UPI details - easy to edit or replace
  const DEFAULT_UPI_ID = 'vibhordistrict@upi';
  const [upiId] = useState(DEFAULT_UPI_ID);
  const [utrNumber, setUtrNumber] = useState('');
  const [customQrImage, setCustomQrImage] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate Step 1 (Address)
  const validateAddress = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = '10-digit mobile number required';
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) newErrors.pincode = '6-digit PIN code required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddress()) {
      setCurrentStep('payment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyUpi = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  // Allow uploading a custom QR code image
  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCustomQrImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate Step 2 (UPI Payment Confirmation)
  const handleConfirmOrder = () => {
    if (!utrNumber.trim() || utrNumber.trim().length < 6) {
      setErrors({ utr: 'Please enter your 12-digit UPI Transaction / UTR Reference ID after scanning.' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
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
        paymentMethod: `UPI QR Code (Ref / UTR: ${utrNumber})`,
        createdAt: new Date().toISOString()
      };

      clearCart();
      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 1200);
  };

  return (
    <div className="pt-20 sm:pt-24 pb-16 bg-[#FFFFFF] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Breadcrumb & Step Progress Indicator */}
        <div className="pb-6 border-b border-[#E7E7E7] flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-4">
          <button
            onClick={currentStep === 'payment' ? () => setCurrentStep('address') : onBack}
            className="inline-flex items-center space-x-2 text-[#686868] hover:text-[#111111] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="uppercase tracking-widest font-mono text-[11px]">
              {currentStep === 'payment' ? 'Back to Address' : 'Return to Bag'}
            </span>
          </button>

          {/* Stepper Tabs */}
          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={() => setCurrentStep('address')}
              className={`flex items-center gap-1.5 font-semibold transition-colors ${
                currentStep === 'address' ? 'text-black' : 'text-emerald-700'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentStep === 'payment' ? 'bg-emerald-600 text-white' : 'bg-[#101010] text-white'
              }`}>
                {currentStep === 'payment' ? '✓' : '1'}
              </span>
              <span>1. Shipping Address</span>
            </button>

            <span className="text-[#C4C4C4]">→</span>

            <span className={`flex items-center gap-1.5 font-semibold ${
              currentStep === 'payment' ? 'text-black' : 'text-[#8E8E8E]'
            }`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentStep === 'payment' ? 'bg-[#101010] text-white' : 'bg-[#E7E7E7] text-[#686868]'
              }`}>
                2
              </span>
              <span>2. UPI QR Code Payment</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#686868]">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-mono text-[11px]">256-bit Encrypted</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 items-start">
          
          {/* Left Column: Multi-Step Forms (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: ADDRESS DETAILS */}
            {currentStep === 'address' && (
              <form onSubmit={handleContinueToPayment} className="space-y-6">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#686868] block mb-1">
                    Step 01 / Delivery Information
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight-editorial text-[#111111]">
                    Where Should We Ship?
                  </h1>
                </div>

                {/* Contact Information */}
                <div className="space-y-3.5 pt-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111] pb-1.5 border-b border-[#F0F0F0]">
                    Contact & Identification
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikramaditya Rao"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black"
                      />
                      {errors.fullName && <p className="text-[10px] text-rose-600 mt-0.5">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vikram@example.com"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black"
                      />
                      {errors.email && <p className="text-[10px] text-rose-600 mt-0.5">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                      Mobile Phone Number (for delivery tracking) *
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
                        className="w-full px-3 py-2 text-xs rounded-r-lg border border-[#E7E7E7] bg-white outline-none focus:border-black font-mono"
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-rose-600 mt-0.5">{errors.phone}</p>}
                  </div>
                </div>

                {/* Street Address */}
                <div className="space-y-3.5 pt-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111] pb-1.5 border-b border-[#F0F0F0]">
                    Shipping Destination
                  </h3>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                      Street Address, Flat / House / Building *
                    </label>
                    <input
                      type="text"
                      value={formData.addressLine1}
                      onChange={e => setFormData({ ...formData, addressLine1: e.target.value })}
                      placeholder="e.g. 402, Signature Towers, Indiranagar"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black"
                    />
                    {errors.addressLine1 && <p className="text-[10px] text-rose-600 mt-0.5">{errors.addressLine1}</p>}
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
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Bengaluru"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black"
                      />
                      {errors.city && <p className="text-[10px] text-rose-600 mt-0.5">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                        State *
                      </label>
                      <select
                        value={formData.state}
                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-2.5 py-2 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black"
                      >
                        {INDIAN_STATES.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={e => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                        placeholder="560038"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black font-mono"
                      />
                      {errors.pincode && <p className="text-[10px] text-rose-600 mt-0.5">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>

                {/* Continue to UPI CTA */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#101010] text-white hover:bg-black font-semibold text-xs uppercase tracking-[0.18em] rounded-xl transition-all duration-200 cursor-pointer shadow-md active:scale-98 flex items-center justify-center gap-2 mt-4"
                >
                  <span>Continue to UPI QR Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: PAY BILL VIA UPI QR CODE */}
            {currentStep === 'payment' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#686868] block mb-1">
                    Step 02 / Direct UPI Settlement
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight-editorial text-[#111111]">
                    Scan QR to Pay {formatINR(total)}
                  </h1>
                  <p className="mt-1 text-xs text-[#686868]">
                    Deliver to: <strong>{formData.fullName}</strong>, {formData.city}, {formData.pincode} (
                    <button
                      onClick={() => setCurrentStep('address')}
                      className="text-xs text-[#111111] underline cursor-pointer"
                    >
                      Change
                    </button>
                    )
                  </p>
                </div>

                {/* Main UPI QR Code Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#FAFAFA] border-2 border-[#101010] shadow-sm flex flex-col items-center text-center space-y-5">
                  <div className="flex items-center justify-between w-full pb-3 border-b border-[#E7E7E7]">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-[#111111]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                        Instant UPI Payment
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold">
                      Zero Processing Fee
                    </span>
                  </div>

                  {/* High Definition QR Code Display */}
                  <div className="relative p-4 bg-white rounded-2xl border border-[#E7E7E7] shadow-sm flex flex-col items-center">
                    {customQrImage ? (
                      <img
                        src={customQrImage}
                        alt="Custom UPI QR Code"
                        className="w-56 h-56 object-contain rounded-lg"
                      />
                    ) : (
                      <div className="w-56 h-56 relative flex items-center justify-center bg-white p-2">
                        {/* High-fidelity Stylized UPI QR Vector */}
                        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Corner Markers */}
                          <rect x="10" y="10" width="50" height="50" rx="6" fill="#101010" />
                          <rect x="18" y="18" width="34" height="34" rx="2" fill="white" />
                          <rect x="25" y="25" width="20" height="20" rx="2" fill="#101010" />

                          <rect x="140" y="10" width="50" height="50" rx="6" fill="#101010" />
                          <rect x="148" y="18" width="34" height="34" rx="2" fill="white" />
                          <rect x="155" y="25" width="20" height="20" rx="2" fill="#101010" />

                          <rect x="10" y="140" width="50" height="50" rx="6" fill="#101010" />
                          <rect x="18" y="148" width="34" height="34" rx="2" fill="white" />
                          <rect x="25" y="155" width="20" height="20" rx="2" fill="#101010" />

                          {/* Data Pattern Grid */}
                          <rect x="70" y="15" width="10" height="10" fill="#101010" />
                          <rect x="90" y="15" width="10" height="10" fill="#101010" />
                          <rect x="115" y="15" width="10" height="10" fill="#101010" />

                          <rect x="70" y="35" width="10" height="10" fill="#101010" />
                          <rect x="100" y="35" width="10" height="10" fill="#101010" />
                          <rect x="120" y="35" width="10" height="10" fill="#101010" />

                          <rect x="70" y="55" width="10" height="10" fill="#101010" />
                          <rect x="85" y="55" width="10" height="10" fill="#101010" />
                          <rect x="110" y="55" width="10" height="10" fill="#101010" />

                          {/* Center Alignment / Brand Accent */}
                          <rect x="15" y="75" width="10" height="10" fill="#101010" />
                          <rect x="35" y="75" width="10" height="10" fill="#101010" />
                          <rect x="55" y="75" width="10" height="10" fill="#101010" />
                          <rect x="75" y="75" width="10" height="10" fill="#101010" />
                          <rect x="115" y="75" width="10" height="10" fill="#101010" />
                          <rect x="135" y="75" width="10" height="10" fill="#101010" />
                          <rect x="175" y="75" width="10" height="10" fill="#101010" />

                          <rect x="25" y="95" width="10" height="10" fill="#101010" />
                          <rect x="45" y="95" width="10" height="10" fill="#101010" />
                          <rect x="65" y="95" width="10" height="10" fill="#101010" />
                          <rect x="125" y="95" width="10" height="10" fill="#101010" />
                          <rect x="145" y="95" width="10" height="10" fill="#101010" />
                          <rect x="165" y="95" width="10" height="10" fill="#101010" />

                          <rect x="15" y="115" width="10" height="10" fill="#101010" />
                          <rect x="35" y="115" width="10" height="10" fill="#101010" />
                          <rect x="55" y="115" width="10" height="10" fill="#101010" />
                          <rect x="75" y="115" width="10" height="10" fill="#101010" />
                          <rect x="115" y="115" width="10" height="10" fill="#101010" />
                          <rect x="155" y="115" width="10" height="10" fill="#101010" />
                          <rect x="175" y="115" width="10" height="10" fill="#101010" />

                          {/* Bottom Patterns */}
                          <rect x="70" y="135" width="10" height="10" fill="#101010" />
                          <rect x="95" y="135" width="10" height="10" fill="#101010" />
                          <rect x="115" y="135" width="10" height="10" fill="#101010" />
                          <rect x="145" y="135" width="10" height="10" fill="#101010" />
                          <rect x="170" y="135" width="10" height="10" fill="#101010" />

                          <rect x="70" y="155" width="10" height="10" fill="#101010" />
                          <rect x="100" y="155" width="10" height="10" fill="#101010" />
                          <rect x="135" y="155" width="10" height="10" fill="#101010" />
                          <rect x="160" y="155" width="10" height="10" fill="#101010" />

                          <rect x="70" y="175" width="10" height="10" fill="#101010" />
                          <rect x="90" y="175" width="10" height="10" fill="#101010" />
                          <rect x="120" y="175" width="10" height="10" fill="#101010" />
                          <rect x="150" y="175" width="10" height="10" fill="#101010" />
                          <rect x="175" y="175" width="10" height="10" fill="#101010" />

                          {/* Center Brand Monogram */}
                          <rect x="82" y="82" width="36" height="36" rx="6" fill="#101010" />
                          <text x="100" y="104" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                            UPI
                          </text>
                        </svg>
                      </div>
                    )}

                    <div className="mt-2 text-center">
                      <span className="text-[10px] font-mono text-[#686868] uppercase">
                        Amount to Pay: <strong className="text-black font-mono text-xs">{formatINR(total)}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Option to replace/upload own QR code if desired */}
                  <div className="flex items-center gap-3 text-xs text-[#686868]">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7E7E7] hover:border-black transition-colors cursor-pointer text-[11px] font-medium text-[#111111]">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{customQrImage ? 'Replace QR Code' : 'Upload Your QR Code'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleQrUpload}
                        className="hidden"
                      />
                    </label>
                    {customQrImage && (
                      <button
                        onClick={() => setCustomQrImage(null)}
                        className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                      >
                        Reset to Default
                      </button>
                    )}
                  </div>

                  {/* UPI ID Row with Copy button */}
                  <div className="w-full p-3 bg-white rounded-xl border border-[#E7E7E7] flex items-center justify-between">
                    <div className="text-left">
                      <span className="block text-[10px] font-mono uppercase text-[#686868]">
                        UPI Virtual Payment Address (VPA)
                      </span>
                      <span className="font-mono font-bold text-xs sm:text-sm text-[#111111]">
                        {upiId}
                      </span>
                    </div>

                    <button
                      onClick={handleCopyUpi}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#111111] rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      title="Copy UPI ID"
                    >
                      {copiedUpi ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy ID</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Supported UPI Apps Pills */}
                  <div className="flex items-center justify-center gap-2 flex-wrap text-[10px] font-mono text-[#686868]">
                    <span>Scan with:</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#E7E7E7] text-[#111111]">Google Pay</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#E7E7E7] text-[#111111]">PhonePe</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#E7E7E7] text-[#111111]">Paytm</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#E7E7E7] text-[#111111]">BHIM</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#E7E7E7] text-[#111111]">Cred</span>
                  </div>

                  {/* UTR Reference Input */}
                  <div className="w-full pt-3 border-t border-[#E7E7E7] text-left space-y-1.5">
                    <label className="block text-[11px] font-mono uppercase text-[#111111] font-bold">
                      Enter UPI Reference / UTR Number (From Payment Confirmation Screen) *
                    </label>
                    <input
                      type="text"
                      value={utrNumber}
                      onChange={e => {
                        setUtrNumber(e.target.value.replace(/\s+/g, ''));
                        if (errors.utr) setErrors({});
                      }}
                      placeholder="e.g. 429184918291 (12 digits)"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E7E7E7] bg-white outline-none focus:border-black font-mono"
                    />
                    {errors.utr && <p className="text-[10px] text-rose-600">{errors.utr}</p>}
                    <p className="text-[10px] text-[#686868]">
                      Once paid on your UPI app, paste the 12-digit UTR/Reference ID here to automatically verify and dispatch.
                    </p>
                  </div>

                  {/* Confirm & Place Order CTA */}
                  <button
                    onClick={handleConfirmOrder}
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#101010] text-white hover:bg-black font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-200 cursor-pointer shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Verifying Payment & Dispatching...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>I Have Paid • Complete Order ({formatINR(total)})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Order Summary (5 Cols) */}
          <div className="lg:col-span-5 bg-[#FAFAFA] rounded-2xl p-5 sm:p-7 border border-[#E7E7E7] space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#E7E7E7]">
              <h2 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#111111]">
                Order Summary
              </h2>
              <span className="text-xs text-[#686868]">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items
              </span>
            </div>

            {/* Items scroll */}
            <div className="max-h-72 overflow-y-auto divide-y divide-[#EAEAEA] pr-1">
              {cart.map(item => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 bg-white rounded-lg p-1 border border-[#E7E7E7] flex items-center justify-center shrink-0">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <div className="font-bold text-[#111111]">{item.name}</div>
                      <div className="text-[10px] sm:text-[11px] text-[#686868]">
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
            <div className="pt-3 border-t border-[#E7E7E7] space-y-1.5 text-xs text-[#686868]">
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
              <div className="pt-2.5 border-t border-[#E7E7E7] flex justify-between text-sm sm:text-base font-bold text-[#111111]">
                <span>Total Amount</span>
                <span className="font-mono text-base sm:text-lg">{formatINR(total)}</span>
              </div>
            </div>

            {/* Guarantees */}
            <div className="pt-3 border-t border-[#E7E7E7] space-y-1.5 text-[10px] sm:text-[11px] text-[#686868]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>30-Day Money-Back Acoustic Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                <span>Dispatched within 24 Hours via Blue Dart Air</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
