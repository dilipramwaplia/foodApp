/**
 * User service - Single Responsibility Principle
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} email - User email
 * @property {string} name - User name
 * @property {string} [avatar] - User avatar URL
 */

import { apiClient } from '../lib/api-client.js';

/**
 * User Service Implementation
 */
class UserServiceImpl {
  constructor(client) {
    this.client = client;
  }

  async getCurrentUser() {
    return this.client.get('/user/profile');
  }

  async updateUser(id, userData) {
    return this.client.put(`/users/${id}`, userData);
  }

  async deleteUser(id) {
    return this.client.delete(`/users/${id}`);
  }
}

export const userService = new UserServiceImpl(apiClient);