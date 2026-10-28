import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, OrderDetails } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, colorName?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  totalCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isSoundModalOpen: boolean;
  openSoundModal: () => void;
  closeSoundModal: () => void;
  promoCode: string;
  promoApplied: boolean;
  promoError: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  lastAddedItem: CartItem | null;
  notification: string | null;
  dismissNotification: () => void;
  completedOrder: OrderDetails | null;
  setCompletedOrder: (order: OrderDetails | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'vibe_district_cart_v1';
const FREE_SHIPPING_THRESHOLD = 2000;
const STANDARD_SHIPPING_FEE = 150;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSoundModalOpen, setIsSoundModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product: Product, colorName?: string, quantity: number = 1) => {
    const selectedColorObj = colorName
      ? product.colors.find(c => c.name.toLowerCase() === colorName.toLowerCase()) || product.colors[0]
      : product.colors[0];

    const chosenColor = selectedColorObj.name;
    const chosenHex = selectedColorObj.hex;
    const cartItemId = `${product.id}-${chosenColor.replace(/\s+/g, '-').toLowerCase()}`;

    let itemAdded: CartItem;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        itemAdded = updated[existingIndex];
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          color: chosenColor,
          colorHex: chosenHex,
          quantity: quantity,
          image: product.images[0],
          category: product.category
        };
        itemAdded = newItem;
        return [...prev, newItem];
      }
    });

    setLastAddedItem({
      id: cartItemId,
      productId: product.id,
      name: product.name,
      price: product.price,
      color: chosenColor,
      colorHex: chosenHex,
      quantity: quantity,
      image: product.images[0],
      category: product.category
    });

    setNotification(`Added "${product.name} (${chosenColor})" to your bag`);
    setTimeout(() => {
      setNotification(prev => (prev?.includes(product.name) ? null : prev));
    }, 3800);

    // Auto open cart drawer smoothly
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    setPromoApplied(false);
    setPromoCode('');
  };

  const applyPromoCode = (code: string): boolean => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'VIBE10') {
      setPromoCode('VIBE10');
      setPromoApplied(true);
      setPromoError(null);
      return true;
    } else if (cleaned === 'FIRSTVIBE') {
      setPromoCode('FIRSTVIBE');
      setPromoApplied(true);
      setPromoError(null);
      return true;
    } else {
      setPromoError('Invalid coupon code. Try "VIBE10" for 10% off.');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoApplied(false);
    setPromoError(null);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  let discount = 0;
  if (promoApplied) {
    if (promoCode === 'VIBE10') {
      discount = Math.round(subtotal * 0.1);
    } else if (promoCode === 'FIRSTVIBE') {
      discount = Math.min(subtotal, 500);
    }
  }

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        shipping,
        total,
        totalCount,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(prev => !prev),
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        isSoundModalOpen,
        openSoundModal: () => setIsSoundModalOpen(true),
        closeSoundModal: () => setIsSoundModalOpen(false),
        promoCode,
        promoApplied,
        promoError,
        applyPromoCode,
        removePromoCode,
        lastAddedItem,
        notification,
        dismissNotification: () => setNotification(null),
        completedOrder,
        setCompletedOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
