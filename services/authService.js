/**
 * Authentication service for business logic
 */

import { authApi } from '@/lib/api/authApi';
import { storage } from '@/lib/utils/storage';
import { STORAGE_KEYS } from '@/lib/constants';

export class AuthService {
  constructor() {
    this.tokenKey = 'authToken';
    this.userKey = STORAGE_KEYS.USER;
    this.refreshTokenKey = 'refreshToken';
  }

  // User registration
  async register(userData) {
    try {
      const response = await authApi.register(userData);
      
      if (response.success) {
        this.setAuthData(response.data.user, response.data.token, response.data.refreshToken);
        return response.data;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  // User login
  async login(email, password) {
    try {
      const response = await authApi.login(email, password);
      
      if (response.success) {
        this.setAuthData(response.data.user, response.data.token, response.data.refreshToken);
        return response.data;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // User logout
  async logout() {
    try {
      await authApi.logout();
    } catch (error) {
      console.warn('Server logout failed:', error);
    } finally {
      this.clearAuthData();
    }
  }

  // Get current user
  getCurrentUser() {
    return storage.get(this.userKey, null);
  }

  // Get auth token
  getToken() {
    return storage.get(this.tokenKey, null);
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getCurrentUser();
    
    if (!token || !user) {
      return false;
    }

    // Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp && payload.exp < Date.now() / 1000;
      
      if (isExpired) {
        this.clearAuthData();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      this.clearAuthData();
      return false;
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await authApi.updateProfile(profileData);
      
      if (response.success) {
        const currentUser = this.getCurrentUser();
        const updatedUser = { ...currentUser, ...response.data };
        storage.set(this.userKey, updatedUser);
        return updatedUser;
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  }

  // Change password
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await authApi.changePassword(currentPassword, newPassword);
      
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || 'Password change failed');
      }
    } catch (error) {
      console.error('Password change failed:', error);
      throw error;
    }
  }

  // Request password reset
  async requestPasswordReset(email) {
    try {
      const response = await authApi.requestPasswordReset(email);
      
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || 'Password reset request failed');
      }
    } catch (error) {
      console.error('Password reset request failed:', error);
      throw error;
    }
  }

  // Reset password with token
  async resetPassword(token, newPassword) {
    try {
      const response = await authApi.resetPassword(token, newPassword);
      
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || 'Password reset failed');
      }
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  }

  // Refresh access token
  async refreshToken() {
    try {
      const refreshToken = storage.get(this.refreshTokenKey);
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await authApi.refreshToken();
      
      if (response.success) {
        storage.set(this.tokenKey, response.data.token);
        return response.data.token;
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAuthData();
      throw error;
    }
  }

  // Set authentication data
  setAuthData(user, token, refreshToken) {
    storage.set(this.userKey, user);
    storage.set(this.tokenKey, token);
    
    if (refreshToken) {
      storage.set(this.refreshTokenKey, refreshToken);
    }
  }

  // Clear authentication data
  clearAuthData() {
    storage.remove(this.userKey);
    storage.remove(this.tokenKey);
    storage.remove(this.refreshTokenKey);
  }

  // Get user permissions
  getUserPermissions() {
    const user = this.getCurrentUser();
    return user?.permissions || [];
  }

  // Check if user has specific permission
  hasPermission(permission) {
    const permissions = this.getUserPermissions();
    return permissions.includes(permission);
  }

  // Get user roles
  getUserRoles() {
    const user = this.getCurrentUser();
    return user?.roles || [];
  }

  // Check if user has specific role
  hasRole(role) {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }

  // Auto-refresh token before expiration
  setupTokenRefresh() {
    const token = this.getToken();
    
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;
      
      // Refresh token 5 minutes before expiration
      const refreshTime = timeUntilExpiration - (5 * 60 * 1000);
      
      if (refreshTime > 0) {
        setTimeout(() => {
          this.refreshToken().catch(() => {
            // If refresh fails, logout user
            this.logout();
          });
        }, refreshTime);
      }
    } catch (error) {
      console.error('Failed to setup token refresh:', error);
    }
  }

  // Initialize auth service
  init() {
    // Setup token refresh if user is authenticated
    if (this.isAuthenticated()) {
      this.setupTokenRefresh();
    }
  }
}

export const authService = new AuthService();

// Initialize auth service
if (typeof window !== 'undefined') {
  authService.init();
}