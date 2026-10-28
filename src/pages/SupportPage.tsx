import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Shield, Truck, RotateCcw, Headphones, Send, CheckCircle2 } from 'lucide-react';

interface SupportPageProps {
  onBack: () => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ onBack }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactSent, setContactSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const faqs = [
    {
      q: 'How does Vibe District hybrid active noise cancellation work?',
      a: 'Our headphones utilize 4 external beamforming microphones to sample incoming sound waves 32,000 times per second, generating an inverted 180° anti-phase acoustic wave that cancels out steady background noise such as airplane engines, air conditioning hums, and transit chatter up to -42dB.'
    },
    {
      q: 'What is the 30-day listening trial policy?',
      a: 'We want you to test our acoustic signature in your everyday environment. From the moment your delivery arrives, you have 30 calendar days to evaluate the sound. If you are not completely satisfied, initiate a return from our portal for a 100% full refund with zero restocking fees.'
    },
    {
      q: 'What does the 2-year warranty cover?',
      a: 'The warranty covers internal audio transducer degradation, driver defects, active noise cancellation hardware failure, lithium battery capacity drops beyond normal wear, and aluminum hinge mechanics. Physical water submersion beyond rated IPX standards is not covered.'
    },
    {
      q: 'How does Bluetooth Multipoint dual-device pairing work?',
      a: 'Vibe District Overdrive and Studio can connect to two devices simultaneously (e.g. your MacBook and iPhone). When a call comes in on your phone while watching a video on your laptop, the audio automatically routes to the call.'
    },
    {
      q: 'What are the delivery timelines across India?',
      a: 'All orders placed before 3:00 PM IST are dispatched the same business day via Blue Dart or Delhivery Air Express. Metro cities typically receive deliveries within 48 to 72 hours; all other pin codes arrive in 3 to 5 business days.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.email && contactForm.message) {
      setContactSent(true);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FFFFFF] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="pb-8 border-b border-[#E7E7E7] text-xs">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-[#686868] hover:text-[#111111] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="uppercase tracking-widest font-mono text-[11px]">Back to Collection</span>
          </button>
        </div>

        {/* Header */}
        <div className="py-10 text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#686868] block mb-2">
            // Client Relations & Technical Care
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight-editorial text-[#111111]">
            How Can We Assist?
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#686868]">
            Direct answers on shipping, acoustic calibration, warranties, and device maintenance.
          </p>
        </div>

        {/* 3 Core Guarantee Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#E7E7E7] text-center">
            <Truck className="w-6 h-6 mx-auto text-[#111111] mb-2" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">Air Express Shipping</h3>
            <p className="text-xs text-[#686868] mt-1">2-4 days across India. Free on orders &gt; ₹2,000.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#E7E7E7] text-center">
            <RotateCcw className="w-6 h-6 mx-auto text-[#111111] mb-2" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">30-Day Risk-Free Trial</h3>
            <p className="text-xs text-[#686868] mt-1">Full refund if the sound signature isn't for you.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#E7E7E7] text-center">
            <Shield className="w-6 h-6 mx-auto text-[#111111] mb-2" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">2-Year Acoustic Warranty</h3>
            <p className="text-xs text-[#686868] mt-1">Comprehensive driver and electronics guarantee.</p>
          </div>
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="mb-20">
          <h2 className="text-xl font-bold uppercase tracking-wide text-[#111111] mb-6">
            Frequently Asked Questions
          </h2>

          <div className="divide-y divide-[#E7E7E7] border-y border-[#E7E7E7]">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between text-left font-semibold text-sm sm:text-base text-[#111111] hover:text-[#686868] transition-colors cursor-pointer py-1"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#686868] transition-transform duration-200 shrink-0 ml-4 ${
                      openFaq === index ? 'rotate-180 text-black' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <p className="mt-3 text-xs sm:text-sm text-[#686868] leading-relaxed pr-6 animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Direct Contact Form */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#F9F9F9] border border-[#E7E7E7]">
          <div className="max-w-xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#686868] block mb-1">
              Direct Contact
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#111111] mb-2">
              Speak with an Acoustic Specialist
            </h3>
            <p className="text-xs text-[#686868] mb-6">
              Need tailored recommendations on frequency curves or fit? Our studio team responds within 4 business hours.
            </p>

            {contactSent ? (
              <div className="p-6 bg-white rounded-xl border border-emerald-200 text-center space-y-2 animate-fade-in">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                  Dispatch Received
                </h4>
                <p className="text-xs text-[#686868]">
                  Thank you, <span className="font-semibold text-[#111111]">{contactForm.name || 'there'}</span>. In this prototype preview, your message has been logged. We will reach back out to {contactForm.email}.
                </p>
                <button
                  onClick={() => {
                    setContactSent(false);
                    setContactForm({ name: '', email: '', message: '' });
                  }}
                  className="mt-3 text-xs text-[#111111] underline cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Maya Patel"
                      className="w-full px-3.5 py-2.5 text-xs bg-white rounded-lg border border-[#E7E7E7] outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="maya@domain.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-white rounded-lg border border-[#E7E7E7] outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#686868] mb-1">
                    Your Question / Inquiry
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us what you'd like to know about our headphones, DAC compatibility, or ordering..."
                    className="w-full px-3.5 py-2.5 text-xs bg-white rounded-lg border border-[#E7E7E7] outline-none focus:border-black resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#101010] text-white hover:bg-black font-semibold text-xs uppercase tracking-[0.18em] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Dispatch</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
