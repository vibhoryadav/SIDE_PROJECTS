import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Shield } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please provide an email address.');
      return;
    }
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email format (e.g. name@domain.com).');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setErrorMessage('');
    }, 700);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#F9F9F9] border-t border-[#E7E7E7]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        
        <span className="text-[11px] font-mono tracking-[0.25em] text-[#686868] uppercase block mb-3">
          // Private Dispatches
        </span>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight-editorial uppercase text-[#111111]">
          Stay in the Frequency.
        </h2>

        <p className="mt-4 text-sm sm:text-base text-[#686868] max-w-lg mx-auto">
          Get first access to new releases, product stories, and exclusive offers.
        </p>

        {status === 'success' ? (
          <div className="mt-8 p-6 max-w-md mx-auto bg-white rounded-xl border border-emerald-200 shadow-xs flex flex-col items-center space-y-2 animate-fade-in">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
              Subscription Recorded (Demo Mode)
            </h3>
            <p className="text-xs text-[#686868] text-center">
              Welcome to the district. In this demo release, <span className="font-mono text-[#111111]">{email}</span> has been simulated successfully. No spam ever.
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                setEmail('');
              }}
              className="mt-2 text-xs text-[#111111] underline hover:opacity-70 cursor-pointer"
            >
              Sign up another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 bg-white p-1.5 rounded-xl border border-[#E7E7E7] shadow-xs focus-within:border-black transition-colors">
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 text-sm text-[#111111] placeholder-[#A0A0A0] bg-transparent outline-none focus:ring-0"
                disabled={status === 'loading'}
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-[#101010] text-white hover:bg-black font-semibold text-xs uppercase tracking-[0.16em] rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer active:scale-98"
              >
                {status === 'loading' ? (
                  <span>Joining...</span>
                ) : (
                  <>
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {status === 'error' && (
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-rose-600 animate-shake">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#686868]">
              <Shield className="w-3.5 h-3.5 text-[#888888]" />
              <span>We respect your inbox. Unsubscribe anytime with one tap.</span>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
