/**
 * Utility functions for localStorage operations
 */

export const storage = {
  // Get item from localStorage
  get: (key, defaultValue = null) => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  // Set item in localStorage
  set: (key, value) => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  },

  // Remove item from localStorage
  remove: (key) => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  },

  // Clear all localStorage
  clear: () => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // Check if localStorage is available
  isAvailable: () => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const testKey = '__localStorage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  },

  // Get all keys from localStorage
  getAllKeys: () => {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('Error getting localStorage keys:', error);
      return [];
    }
  },

  // Get localStorage usage info
  getUsageInfo: () => {
    if (typeof window === 'undefined') {
      return { used: 0, remaining: 0, total: 0 };
    }

    try {
      let used = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length + key.length;
        }
      }

      // Most browsers have a 5MB limit for localStorage
      const total = 5 * 1024 * 1024; // 5MB in bytes
      const remaining = total - used;

      return {
        used,
        remaining,
        total,
        usedPercentage: (used / total) * 100
      };
    } catch (error) {
      console.error('Error getting localStorage usage info:', error);
      return { used: 0, remaining: 0, total: 0, usedPercentage: 0 };
    }
  }
};

// Session storage utilities
export const sessionStorage = {
  get: (key, defaultValue = null) => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from sessionStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to sessionStorage key "${key}":`, error);
      return false;
    }
  },

  remove: (key) => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error);
      return false;
    }
  },

  clear: () => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      window.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
      return false;
    }
  }
};