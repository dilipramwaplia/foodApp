/**
 * Product service - Single Responsibility Principle
 * @typedef {Object} Product
 * @property {string} id - Product ID
 * @property {string} name - Product name
 * @property {string} description - Product description
 * @property {number} price - Product price
 * @property {string} imageUrl - Product image URL
 * @property {string} category - Product category
 */

import { apiClient } from '../lib/api-client.js';

/**
 * Product Service Implementation
 */
class ProductServiceImpl {
  constructor(client) {
    this.client = client;
  }

  async getProducts() {
    return this.client.get('/products');
  }

  async getProduct(id) {
    return this.client.get(`/products/${id}`);
  }

  async searchProducts(query) {
    return this.client.get(`/products/search?q=${encodeURIComponent(query)}`);
  }

  async getProductsByCategory(categoryId) {
    return this.client.get(`/products/category/${categoryId}`);
  }
}

export const productService = new ProductServiceImpl(apiClient);