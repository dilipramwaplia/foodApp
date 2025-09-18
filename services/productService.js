/**
 * Product service for business logic
 */

import { productApi } from '@/lib/api/productApi';
import { storage } from '@/lib/utils/storage';

export class ProductService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Get products with caching
  async getProducts(filters = {}) {
    const cacheKey = `products_${JSON.stringify(filters)}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await productApi.getProducts(filters);
      this.setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }

  // Get single product with caching
  async getProduct(id) {
    const cacheKey = `product_${id}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await productApi.getProduct(id);
      this.setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      throw error;
    }
  }

  // Search products
  async searchProducts(query, filters = {}) {
    if (!query.trim()) {
      return { products: [], total: 0 };
    }

    try {
      const response = await productApi.searchProducts(query, filters);
      return response.data;
    } catch (error) {
      console.error('Failed to search products:', error);
      throw error;
    }
  }

  // Get products by category
  async getProductsByCategory(categoryId, filters = {}) {
    const cacheKey = `category_${categoryId}_${JSON.stringify(filters)}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await productApi.getProductsByCategory(categoryId, filters);
      this.setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch category products:', error);
      throw error;
    }
  }

  // Get featured products
  async getFeaturedProducts() {
    const cacheKey = 'featured_products';
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await productApi.getFeaturedProducts();
      this.setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      throw error;
    }
  }

  // Get product categories
  async getCategories() {
    const cacheKey = 'categories';
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await productApi.getCategories();
      this.setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  }

  // Get related products
  async getRelatedProducts(productId) {
    const cacheKey = `related_${productId}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await productApi.getRelatedProducts(productId);
      this.setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch related products:', error);
      return []; // Return empty array on error
    }
  }

  // Filter products locally
  filterProducts(products, filters) {
    return products.filter(product => {
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Price range filter
      if (filters.minPrice && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && product.price > filters.maxPrice) {
        return false;
      }

      // Rating filter
      if (filters.minRating && product.rating < filters.minRating) {
        return false;
      }

      // In stock filter
      if (filters.inStock && !product.inStock) {
        return false;
      }

      // Search query filter
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const searchText = `${product.name} ${product.description}`.toLowerCase();
        if (!searchText.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }

  // Sort products
  sortProducts(products, sortBy = 'name', sortOrder = 'asc') {
    return [...products].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle different data types
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });
  }

  // Get product recommendations based on user behavior
  async getRecommendations(userId, limit = 10) {
    try {
      // This would typically call a recommendation API
      // For now, return featured products as recommendations
      const featured = await this.getFeaturedProducts();
      return featured.slice(0, limit);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      return [];
    }
  }

  // Cache management
  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clearCache() {
    this.cache.clear();
  }

  // Recently viewed products
  addToRecentlyViewed(product) {
    const recentlyViewed = storage.get('recently_viewed', []);
    
    // Remove if already exists
    const filtered = recentlyViewed.filter(item => item.id !== product.id);
    
    // Add to beginning
    filtered.unshift(product);
    
    // Keep only last 10 items
    const updated = filtered.slice(0, 10);
    
    storage.set('recently_viewed', updated);
    return updated;
  }

  getRecentlyViewed() {
    return storage.get('recently_viewed', []);
  }

  clearRecentlyViewed() {
    storage.remove('recently_viewed');
  }
}

export const productService = new ProductService();