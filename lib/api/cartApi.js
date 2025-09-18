import { apiClient } from './client';

export const cartApi = {
  // Get user's cart
  getCart: async () => {
    return apiClient.get('/cart');
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1, options = {}) => {
    return apiClient.post('/cart/items', {
      productId,
      quantity,
      options
    });
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    return apiClient.put(`/cart/items/${itemId}`, { quantity });
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    return apiClient.delete(`/cart/items/${itemId}`);
  },

  // Clear entire cart
  clearCart: async () => {
    return apiClient.delete('/cart');
  },

  // Apply coupon code
  applyCoupon: async (couponCode) => {
    return apiClient.post('/cart/coupon', { code: couponCode });
  },

  // Remove coupon
  removeCoupon: async () => {
    return apiClient.delete('/cart/coupon');
  },

  // Get cart totals
  getCartTotals: async () => {
    return apiClient.get('/cart/totals');
  },

  // Sync local cart with server
  syncCart: async (localCartItems) => {
    return apiClient.post('/cart/sync', { items: localCartItems });
  }
};