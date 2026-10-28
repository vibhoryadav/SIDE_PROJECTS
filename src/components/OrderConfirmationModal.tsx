import React from 'react';
import { CheckCircle2, Package, Truck, ShieldCheck, ArrowRight, Printer } from 'lucide-react';
import { OrderDetails } from '../types';
import { formatINR } from '../utils/formatters';

interface OrderConfirmationModalProps {
  order: OrderDetails;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E7E7E7] overflow-hidden my-auto animate-scale-in">
        
        {/* Header with success badge */}
        <div className="p-6 sm:p-8 bg-[#FAFAFA] border-b border-[#E7E7E7] text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[10px] font-mono tracking-[0.25em] text-[#686868] uppercase block mb-1">
            Order Confirmed • Demo Simulation
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight-editorial text-[#111111]">
            Thank You for Your Order
          </h2>
          <p className="mt-1 text-xs text-[#686868]">
            Order Reference: <span className="font-mono font-bold text-[#111111]">{order.orderId}</span>
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Status Banner */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-3">
            <Package className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Acoustic Dispatch Preparation</span>
              <span>
                Your hardware is being calibrated and packaged. Confirmation notice simulated to <strong className="font-mono">{order.shippingAddress.email}</strong>.
              </span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#686868] mb-3">
              Items Ordered ({order.items.reduce((s, i) => s + i.quantity, 0)})
            </h4>
            <div className="divide-y divide-[#F0F0F0] border border-[#E7E7E7] rounded-xl overflow-hidden">
              {order.items.map(item => (
                <div key={item.id} className="p-3.5 flex items-center justify-between text-xs bg-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded bg-[#F8F8F8] p-1 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <div className="font-bold text-[#111111]">{item.name}</div>
                      <div className="text-[11px] text-[#686868]">Finish: {item.color} • Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-[#111111]">
                    {formatINR(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Billing Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E7E7E7]">
              <span className="font-mono text-[10px] text-[#686868] uppercase block mb-1">
                Shipping Destination
              </span>
              <p className="font-bold text-[#111111]">{order.shippingAddress.fullName}</p>
              <p className="text-[#686868] mt-0.5">{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p className="text-[#686868]">{order.shippingAddress.addressLine2}</p>}
              <p className="text-[#686868]">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p className="text-[#686868] mt-1 font-mono">Mobile: {order.shippingAddress.phone}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E7E7E7] space-y-1.5">
              <span className="font-mono text-[10px] text-[#686868] uppercase block mb-1">
                Payment Breakdown
              </span>
              <div className="flex justify-between text-[#686868]">
                <span>Payment Mode:</span>
                <span className="font-bold text-[#111111]">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-[#686868]">
                <span>Subtotal:</span>
                <span className="font-mono text-[#111111]">{formatINR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount:</span>
                  <span className="font-mono">-{formatINR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#686868]">
                <span>Shipping:</span>
                <span className="text-[#111111]">{order.shipping === 0 ? 'Complimentary' : formatINR(order.shipping)}</span>
              </div>
              <div className="pt-2 border-t border-[#E7E7E7] flex justify-between font-bold text-sm text-[#111111]">
                <span>Total Paid:</span>
                <span className="font-mono">{formatINR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Prototype Notice */}
          <div className="text-[11px] text-[#686868] bg-[#F5F5F5] p-3 rounded-lg border border-[#E7E7E7] text-center">
            <strong>Architecture Notice:</strong> This completes the end-to-end checkout demo. In a live production environment, this is where Razorpay / Stripe webhooks securely verify the settlement token.
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 bg-white border-t border-[#E7E7E7] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 text-xs text-[#111111] hover:bg-[#F5F5F5] rounded-lg border border-[#E7E7E7] font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#101010] text-white hover:bg-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
