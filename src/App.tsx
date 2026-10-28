import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { SupportPage } from './pages/SupportPage';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { SoundExperienceModal } from './components/SoundExperienceModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { useCart } from './context/CartContext';
import { PRODUCTS } from './data/products';
import { ProductCategory, OrderDetails } from './types';
import { Check, X } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { notification, dismissNotification, completedOrder, setCompletedOrder, openSoundModal } = useCart();
  const [currentView, setCurrentView] = useState<'home' | 'product-detail' | 'checkout' | 'support'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('overdrive');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory>('all');

  // Handle browser URL hash synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('product-')) {
        const prodId = hash.replace('product-', '');
        if (PRODUCTS.some(p => p.id === prodId)) {
          setSelectedProductId(prodId);
          setCurrentView('product-detail');
          window.scrollTo(0, 0);
          return;
        }
      }
      if (hash === 'checkout') {
        setCurrentView('checkout');
        window.scrollTo(0, 0);
        return;
      }
      if (hash === 'support') {
        setCurrentView('support');
        window.scrollTo(0, 0);
        return;
      }
      if (hash === 'headphones') {
        setCurrentView('home');
        setCategoryFilter('headphones');
        window.scrollTo(0, 0);
        return;
      }
      if (hash === 'earbuds') {
        setCurrentView('home');
        setCategoryFilter('earbuds');
        window.scrollTo(0, 0);
        return;
      }
      if (hash === 'our-sound') {
        openSoundModal();
        return;
      }
      // default
      setCurrentView('home');
      setCategoryFilter('all');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [openSoundModal]);

  const handleNavigate = (view: string, filter?: string) => {
    if (view === 'headphones') {
      window.location.hash = 'headphones';
      setCurrentView('home');
      setCategoryFilter('headphones');
    } else if (view === 'earbuds') {
      window.location.hash = 'earbuds';
      setCurrentView('home');
      setCategoryFilter('earbuds');
    } else if (view === 'support') {
      window.location.hash = 'support';
      setCurrentView('support');
    } else if (view === 'checkout') {
      window.location.hash = 'checkout';
      setCurrentView('checkout');
    } else {
      window.location.hash = '';
      setCurrentView('home');
      setCategoryFilter((filter as ProductCategory) || 'all');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    window.location.hash = `product-${productId}`;
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentProduct = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Global Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#101010] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-xs animate-slide-up border border-white/10">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span>{notification}</span>
          <button
            onClick={dismissNotification}
            className="p-1 hover:text-white/70 text-white/40 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Views */}
      <div className="flex-1">
        {currentView === 'home' && (
          <HomePage
            categoryFilter={categoryFilter}
            onSelectProduct={handleSelectProduct}
            onExploreSound={openSoundModal}
          />
        )}

        {currentView === 'product-detail' && (
          <ProductDetailPage
            product={currentProduct}
            onBack={() => handleNavigate('home')}
            onSelectProduct={handleSelectProduct}
            onCheckout={() => handleNavigate('checkout')}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            onBack={() => handleNavigate('home')}
            onOrderSuccess={(order: OrderDetails) => {
              setCompletedOrder(order);
            }}
          />
        )}

        {currentView === 'support' && (
          <SupportPage
            onBack={() => handleNavigate('home')}
          />
        )}
      </div>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Global Modals & Drawers */}
      <CartDrawer
        onCheckout={() => handleNavigate('checkout')}
        onSelectProduct={handleSelectProduct}
      />

      <SearchModal
        onSelectProduct={handleSelectProduct}
      />

      <SoundExperienceModal />

      {completedOrder && (
        <OrderConfirmationModal
          order={completedOrder}
          onClose={() => {
            setCompletedOrder(null);
            handleNavigate('home');
          }}
        />
      )}
    </div>
  );
};
