import { apiClient } from './client';

export const orderApi = {
  // Create new order
  createOrder: async (orderData) => {
    return apiClient.post('/orders', orderData);
  },

  // Get user's orders
  getOrders: async (filters = {}) => {
    return apiClient.get('/orders', filters);
  },

  // Get single order by ID
  getOrder: async (orderId) => {
    return apiClient.get(`/orders/${orderId}`);
  },

  // Update order status (admin only)
  updateOrderStatus: async (orderId, status) => {
    return apiClient.patch(`/orders/${orderId}/status`, { status });
  },

  // Cancel order
  cancelOrder: async (orderId, reason = '') => {
    return apiClient.post(`/orders/${orderId}/cancel`, { reason });
  },

  // Track order
  trackOrder: async (orderId) => {
    return apiClient.get(`/orders/${orderId}/tracking`);
  },

  // Get order invoice
  getOrderInvoice: async (orderId) => {
    return apiClient.get(`/orders/${orderId}/invoice`);
  },

  // Request return/refund
  requestReturn: async (orderId, items, reason) => {
    return apiClient.post(`/orders/${orderId}/return`, {
      items,
      reason
    });
  },

  // Get return status
  getReturnStatus: async (returnId) => {
    return apiClient.get(`/returns/${returnId}`);
  },

  // Rate and review order
  rateOrder: async (orderId, rating, review) => {
    return apiClient.post(`/orders/${orderId}/review`, {
      rating,
      review
    });
  }
};