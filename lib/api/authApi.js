import { apiClient } from './client';

export const authApi = {
  // User registration
  register: async (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  // User login
  login: async (email, password) => {
    return apiClient.post('/auth/login', { email, password });
  },

  // User logout
  logout: async () => {
    return apiClient.post('/auth/logout');
  },

  // Refresh access token
  refreshToken: async () => {
    return apiClient.post('/auth/refresh');
  },

  // Get current user profile
  getProfile: async () => {
    return apiClient.get('/auth/profile');
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return apiClient.put('/auth/profile', profileData);
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    return apiClient.put('/auth/password', {
      currentPassword,
      newPassword
    });
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    return apiClient.post('/auth/password-reset', { email });
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    return apiClient.post('/auth/password-reset/confirm', {
      token,
      newPassword
    });
  },

  // Verify email address
  verifyEmail: async (token) => {
    return apiClient.post('/auth/verify-email', { token });
  },

  // Resend email verification
  resendVerification: async () => {
    return apiClient.post('/auth/verify-email/resend');
  }
};