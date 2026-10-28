import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppContent } from './App';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <AppContent />
    </CartProvider>
  </React.StrictMode>
);
