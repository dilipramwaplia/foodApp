/**
 * Configuration management - Single Responsibility Principle
 * @typedef {Object} Config
 * @property {Object} api - API configuration
 * @property {Object} app - Application configuration
 * @property {Object} features - Feature flags
 */
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
    timeout: 10000,
  },
  app: {
    name: '6AM Mart',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableNotifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true',
  },
};