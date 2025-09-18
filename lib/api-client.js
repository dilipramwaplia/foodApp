/**
 * API client abstraction - Dependency Inversion Principle
 * @typedef {Object} ApiResponse
 * @property {any} data - Response data
 * @property {boolean} success - Success status
 * @property {string} [message] - Optional message
 */

import { config } from './config.js';

/**
 * HTTP API Client implementation
 */
class HttpApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    return this.request('GET', endpoint);
  }

  async post(endpoint, data) {
    return this.request('POST', endpoint, data);
  }

  async put(endpoint, data) {
    return this.request('PUT', endpoint, data);
  }

  async delete(endpoint) {
    return this.request('DELETE', endpoint);
  }

  async request(method, endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return { data: result, success: true };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: error.message || 'An error occurred',
      };
    }
  }
}

export const apiClient = new HttpApiClient(config.api.baseUrl);