/**
 * Order service for business logic
 */

import { orderApi } from '@/lib/api/orderApi';
import { cartService } from './cartService';
import { storage } from '@/lib/utils/storage';

export class OrderService {
  constructor() {
    this.storageKey = 'order_history';
  }

  // Create new order
  async createOrder(orderData) {
    try {
      // Validate cart before creating order
      const cartValidation = await cartService.validateCart();
      
      if (!cartValidation.isValid) {
        throw new Error('Cart validation failed');
      }

      // Get cart with totals
      const cart = cartService.getCartWithTotals();
      
      // Prepare order data
      const order = {
        items: cart.items,
        totals: cart.totals,
        coupon: cart.coupon,
        shippingAddress: orderData.shippingAddress,
        billingAddress: orderData.billingAddress || orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        notes: orderData.notes || '',
        createdAt: new Date().toISOString()
      };

      // Create order on server
      const response = await orderApi.createOrder(order);
      
      if (response.success) {
        // Clear cart after successful order
        await cartService.clearCart();
        
        // Save order to local history
        this.addToOrderHistory(response.data);
        
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  }

  // Get user's orders
  async getOrders(filters = {}) {
    try {
      const response = await orderApi.getOrders(filters);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      // Return local order history as fallback
      return this.getOrderHistory();
    }
  }

  // Get single order
  async getOrder(orderId) {
    try {
      const response = await orderApi.getOrder(orderId);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch order:', error);
      // Try to find in local history
      const history = this.getOrderHistory();
      return history.find(order => order.id === orderId) || null;
    }
  }

  // Cancel order
  async cancelOrder(orderId, reason = '') {
    try {
      const response = await orderApi.cancelOrder(orderId, reason);
      
      if (response.success) {
        // Update local history
        this.updateOrderInHistory(orderId, { status: 'cancelled', cancelReason: reason });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Failed to cancel order:', error);
      throw error;
    }
  }

  // Track order
  async trackOrder(orderId) {
    try {
      const response = await orderApi.trackOrder(orderId);
      return response.data;
    } catch (error) {
      console.error('Failed to track order:', error);
      throw error;
    }
  }

  // Request return/refund
  async requestReturn(orderId, items, reason) {
    try {
      const response = await orderApi.requestReturn(orderId, items, reason);
      
      if (response.success) {
        // Update local history
        this.updateOrderInHistory(orderId, { 
          returnRequested: true, 
          returnReason: reason,
          returnItems: items
        });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to request return');
      }
    } catch (error) {
      console.error('Failed to request return:', error);
      throw error;
    }
  }

  // Rate and review order
  async rateOrder(orderId, rating, review) {
    try {
      const response = await orderApi.rateOrder(orderId, rating, review);
      
      if (response.success) {
        // Update local history
        this.updateOrderInHistory(orderId, { 
          rating, 
          review,
          reviewedAt: new Date().toISOString()
        });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Failed to rate order:', error);
      throw error;
    }
  }

  // Calculate estimated delivery date
  calculateEstimatedDelivery(shippingMethod = 'standard') {
    const now = new Date();
    let deliveryDays;

    switch (shippingMethod) {
      case 'express':
        deliveryDays = 2;
        break;
      case 'overnight':
        deliveryDays = 1;
        break;
      default:
        deliveryDays = 5;
    }

    const deliveryDate = new Date(now);
    deliveryDate.setDate(now.getDate() + deliveryDays);
    
    return deliveryDate;
  }

  // Get order status display info
  getOrderStatusInfo(status) {
    const statusMap = {
      pending: {
        label: 'Pending',
        color: 'yellow',
        description: 'Order is being processed'
      },
      confirmed: {
        label: 'Confirmed',
        color: 'blue',
        description: 'Order has been confirmed'
      },
      processing: {
        label: 'Processing',
        color: 'blue',
        description: 'Order is being prepared'
      },
      shipped: {
        label: 'Shipped',
        color: 'purple',
        description: 'Order is on its way'
      },
      delivered: {
        label: 'Delivered',
        color: 'green',
        description: 'Order has been delivered'
      },
      cancelled: {
        label: 'Cancelled',
        color: 'red',
        description: 'Order has been cancelled'
      }
    };

    return statusMap[status] || statusMap.pending;
  }

  // Local order history management
  getOrderHistory() {
    return storage.get(this.storageKey, []);
  }

  addToOrderHistory(order) {
    const history = this.getOrderHistory();
    history.unshift(order);
    
    // Keep only last 50 orders
    const updated = history.slice(0, 50);
    storage.set(this.storageKey, updated);
    
    return updated;
  }

  updateOrderInHistory(orderId, updates) {
    const history = this.getOrderHistory();
    const orderIndex = history.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      history[orderIndex] = { ...history[orderIndex], ...updates };
      storage.set(this.storageKey, history);
    }
    
    return history;
  }

  clearOrderHistory() {
    storage.remove(this.storageKey);
  }

  // Order analytics
  getOrderStats() {
    const history = this.getOrderHistory();
    
    const stats = {
      totalOrders: history.length,
      totalSpent: history.reduce((sum, order) => sum + (order.totals?.total || 0), 0),
      averageOrderValue: 0,
      statusBreakdown: {},
      monthlySpending: {}
    };

    if (stats.totalOrders > 0) {
      stats.averageOrderValue = stats.totalSpent / stats.totalOrders;
    }

    // Status breakdown
    history.forEach(order => {
      const status = order.status || 'pending';
      stats.statusBreakdown[status] = (stats.statusBreakdown[status] || 0) + 1;
    });

    // Monthly spending
    history.forEach(order => {
      const date = new Date(order.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      stats.monthlySpending[monthKey] = (stats.monthlySpending[monthKey] || 0) + (order.totals?.total || 0);
    });

    return stats;
  }
}

export const orderService = new OrderService();