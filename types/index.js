/**
 * Core type definitions using JSDoc - Following Interface Segregation Principle
 */

/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} email - User email
 * @property {string} name - User name
 * @property {string} [avatar] - User avatar URL
 */

/**
 * @typedef {Object} Product
 * @property {string} id - Product ID
 * @property {string} name - Product name
 * @property {string} description - Product description
 * @property {number} price - Product price
 * @property {string} imageUrl - Product image URL
 * @property {string} category - Product category
 */

/**
 * @typedef {Object} ApiResponse
 * @template T
 * @property {T} data - Response data
 * @property {boolean} success - Success status
 * @property {string} [message] - Optional message
 */

/**
 * @typedef {Object} ApiError
 * @property {string} message - Error message
 * @property {number} code - Error code
 * @property {*} [details] - Optional error details
 */

/**
 * @typedef {Object} LoadingState
 * @property {boolean} isLoading - Loading status
 * @property {string|null} error - Error message
 */

/**
 * @typedef {Object} ComponentProps
 * @property {string} [className] - CSS class name
 * @property {React.ReactNode} [children] - Child components
 */

// Export empty object to make this a module
export {};