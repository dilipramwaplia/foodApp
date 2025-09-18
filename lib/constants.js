/**
 * Application constants
 */

export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  CART: '/api/cart',
  AUTH: '/api/auth',
  ORDERS: '/api/orders',
  USERS: '/api/users'
};

export const STORAGE_KEYS = {
  CART: 'cart',
  WISHLIST: 'wishlist',
  USER: 'user',
  THEME: 'theme'
};

export const PRODUCT_CATEGORIES = [
  { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  { id: 'clothing', name: 'Clothing', slug: 'clothing' },
  { id: 'home', name: 'Home & Garden', slug: 'home-garden' },
  { id: 'sports', name: 'Sports & Outdoors', slug: 'sports-outdoors' },
  { id: 'books', name: 'Books', slug: 'books' },
  { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  { id: 'toys', name: 'Toys & Games', slug: 'toys-games' },
  { id: 'automotive', name: 'Automotive', slug: 'automotive' }
];

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay'
};

export const SHIPPING_OPTIONS = {
  STANDARD: { id: 'standard', name: 'Standard Shipping', price: 0, days: '5-7' },
  EXPRESS: { id: 'express', name: 'Express Shipping', price: 9.99, days: '2-3' },
  OVERNIGHT: { id: 'overnight', name: 'Overnight Shipping', price: 19.99, days: '1' }
};

export const CURRENCY = {
  SYMBOL: '$',
  CODE: 'USD'
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100
};

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PRODUCT_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500
};