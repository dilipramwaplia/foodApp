import { apiClient } from './client';

export const productApi = {
  // Get all products with optional filters
  getProducts: async (filters = {}) => {
    return apiClient.get('/products', filters);
  },

  // Get a single product by ID
  getProduct: async (id) => {
    return apiClient.get(`/products/${id}`);
  },

  // Search products
  searchProducts: async (query, filters = {}) => {
    return apiClient.get('/products/search', { q: query, ...filters });
  },

  // Get products by category
  getProductsByCategory: async (categoryId, filters = {}) => {
    return apiClient.get(`/products/category/${categoryId}`, filters);
  },

  // Get featured products
  getFeaturedProducts: async () => {
    return apiClient.get('/products/featured');
  },

  // Get product reviews
  getProductReviews: async (productId) => {
    return apiClient.get(`/products/${productId}/reviews`);
  },

  // Add product review
  addProductReview: async (productId, review) => {
    return apiClient.post(`/products/${productId}/reviews`, review);
  },

  // Get related products
  getRelatedProducts: async (productId) => {
    return apiClient.get(`/products/${productId}/related`);
  },

  // Get product categories
  getCategories: async () => {
    return apiClient.get('/categories');
  },

  // Get products on sale
  getSaleProducts: async (filters = {}) => {
    return apiClient.get('/products/sale', filters);
  }
};