export type ProductCategory = 'headphones' | 'earbuds' | 'all';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSpecs {
  type: string;
  driver: string;
  batteryLife: string;
  anc: string;
  charging: string;
  connectivity: string;
  weight: string;
  waterResistance: string;
  frequencyResponse: string;
  latency?: string;
  intendedUsage: string;
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'headphones' | 'earbuds';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  longDescription: string;
  editorialHighlight: string;
  colors: ProductColor[];
  specs: ProductSpecs;
  features: ProductFeature[];
  inTheBox: string[];
  images: string[];
  badge?: string;
  highlighted?: boolean;
}

export interface CartItem {
  id: string; // unique cart item key: `${productId}-${colorName}`
  productId: string;
  name: string;
  price: number;
  color: string;
  colorHex: string;
  quantity: number;
  image: string;
  category: 'headphones' | 'earbuds';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  product: string;
  rating: number;
  headline: string;
  review: string;
  date: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  createdAt: string;
}
