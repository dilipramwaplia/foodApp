/**
 * Cart service for business logic
 */

import { cartApi } from '@/lib/api/cartApi';
import { storage } from '@/lib/utils/storage';
import { STORAGE_KEYS } from '@/lib/constants';

export class CartService {
  constructor() {
    this.storageKey = STORAGE_KEYS.CART;
  }

  // Get cart from localStorage
  getLocalCart() {
    return storage.get(this.storageKey, { items: [], coupon: null });
  }

  // Save cart to localStorage
  saveLocalCart(cart) {
    return storage.set(this.storageKey, cart);
  }

  // Add item to cart
  async addToCart(product, quantity = 1, options = {}) {
    try {
      // Try to add to server cart first
      const response = await cartApi.addToCart(product.id, quantity, options);
      
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      console.warn('Failed to add to server cart, using local cart:', error);
    }

    // Fallback to local cart
    const cart = this.getLocalCart();
    const existingItem = cart.items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        ...product,
        quantity,
        options,
        addedAt: new Date().toISOString()
      });
    }

    this.saveLocalCart(cart);
    return cart;
  }

  // Remove item from cart
  async removeFromCart(productId) {
    try {
      await cartApi.removeFromCart(productId);
    } catch (error) {
      console.warn('Failed to remove from server cart:', error);
    }

    const cart = this.getLocalCart();
    cart.items = cart.items.filter(item => item.id !== productId);
    this.saveLocalCart(cart);
    return cart;
  }

  // Update item quantity
  async updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      return this.removeFromCart(productId);
    }

    try {
      await cartApi.updateCartItem(productId, quantity);
    } catch (error) {
      console.warn('Failed to update server cart:', error);
    }

    const cart = this.getLocalCart();
    const item = cart.items.find(item => item.id === productId);
    
    if (item) {
      item.quantity = quantity;
      this.saveLocalCart(cart);
    }

    return cart;
  }

  // Clear entire cart
  async clearCart() {
    try {
      await cartApi.clearCart();
    } catch (error) {
      console.warn('Failed to clear server cart:', error);
    }

    const emptyCart = { items: [], coupon: null };
    this.saveLocalCart(emptyCart);
    return emptyCart;
  }

  // Apply coupon code
  async applyCoupon(couponCode) {
    try {
      const response = await cartApi.applyCoupon(couponCode);
      
      if (response.success) {
        const cart = this.getLocalCart();
        cart.coupon = response.data.coupon;
        this.saveLocalCart(cart);
        return response.data;
      }
    } catch (error) {
      throw new Error('Invalid coupon code');
    }
  }

  // Remove coupon
  async removeCoupon() {
    try {
      await cartApi.removeCoupon();
    } catch (error) {
      console.warn('Failed to remove coupon from server:', error);
    }

    const cart = this.getLocalCart();
    cart.coupon = null;
    this.saveLocalCart(cart);
    return cart;
  }

  // Calculate cart totals
  calculateTotals(cart) {
    const subtotal = cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    let discount = 0;
    if (cart.coupon) {
      if (cart.coupon.type === 'percentage') {
        discount = subtotal * (cart.coupon.value / 100);
      } else if (cart.coupon.type === 'fixed') {
        discount = Math.min(cart.coupon.value, subtotal);
      }
    }

    const tax = (subtotal - discount) * 0.08; // 8% tax
    const shipping = subtotal >= 100 ? 0 : 9.99; // Free shipping over $100
    const total = subtotal - discount + tax + shipping;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      shipping: Math.round(shipping * 100) / 100,
      total: Math.round(total * 100) / 100
    };
  }

  // Get cart with calculated totals
  getCartWithTotals() {
    const cart = this.getLocalCart();
    const totals = this.calculateTotals(cart);
    
    return {
      ...cart,
      totals,
      itemCount: cart.items.reduce((total, item) => total + item.quantity, 0)
    };
  }

  // Sync local cart with server
  async syncCart() {
    const localCart = this.getLocalCart();
    
    if (localCart.items.length === 0) {
      return localCart;
    }

    try {
      const response = await cartApi.syncCart(localCart.items);
      
      if (response.success) {
        this.saveLocalCart(response.data);
        return response.data;
      }
    } catch (error) {
      console.warn('Failed to sync cart with server:', error);
    }

    return localCart;
  }

  // Validate cart items (check availability, prices, etc.)
  async validateCart() {
    const cart = this.getLocalCart();
    const validationErrors = [];

    for (const item of cart.items) {
      try {
        // Check if product still exists and is available
        const product = await productApi.getProduct(item.id);
        
        if (!product.inStock) {
          validationErrors.push({
            itemId: item.id,
            error: 'Product is out of stock',
            type: 'out_of_stock'
          });
        }
        
        if (product.price !== item.price) {
          validationErrors.push({
            itemId: item.id,
            error: 'Price has changed',
            type: 'price_change',
            oldPrice: item.price,
            newPrice: product.price
          });
        }
      } catch (error) {
        validationErrors.push({
          itemId: item.id,
          error: 'Product no longer available',
          type: 'not_found'
        });
      }
    }

    return {
      isValid: validationErrors.length === 0,
      errors: validationErrors
    };
  }
}

export const cartService = new CartService();