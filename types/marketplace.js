/**
 * Marketplace-specific type definitions using JSDoc - Following Interface Segregation Principle
 */

/**
 * @typedef {Object} Category
 * @property {string} id - Category ID
 * @property {string} name - Category name
 * @property {string} description - Category description
 * @property {string} imageUrl - Category image URL
 * @property {string} iconUrl - Category icon URL
 * @property {number} productCount - Number of products in category
 * @property {boolean} isActive - Whether category is active
 */

/**
 * @typedef {Object} Store
 * @property {string} id - Store ID
 * @property {string} name - Store name
 * @property {string} description - Store description
 * @property {string} imageUrl - Store image URL
 * @property {string} coverImageUrl - Store cover image URL
 * @property {number} rating - Store rating
 * @property {number} reviewCount - Number of reviews
 * @property {string} deliveryTime - Estimated delivery time
 * @property {number} deliveryFee - Delivery fee
 * @property {boolean} isOpen - Whether store is open
 * @property {string[]} categories - Store categories
 * @property {StoreLocation} location - Store location
 */

/**
 * @typedef {Object} StoreLocation
 * @property {string} address - Store address
 * @property {number} latitude - Store latitude
 * @property {number} longitude - Store longitude
 */

/**
 * @typedef {Object} CartItem
 * @property {string} id - Cart item ID
 * @property {string} productId - Product ID
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {number} quantity - Item quantity
 * @property {string} imageUrl - Product image URL
 * @property {string} storeId - Store ID
 * @property {ProductVariation[]} [variations] - Product variations
 */

/**
 * @typedef {Object} ProductVariation
 * @property {string} id - Variation ID
 * @property {string} name - Variation name
 * @property {VariationOption[]} options - Variation options
 */

/**
 * @typedef {Object} VariationOption
 * @property {string} id - Option ID
 * @property {string} name - Option name
 * @property {number} price - Option price
 */

/**
 * @typedef {Object} Order
 * @property {string} id - Order ID
 * @property {string} userId - User ID
 * @property {string} storeId - Store ID
 * @property {CartItem[]} items - Order items
 * @property {number} subtotal - Order subtotal
 * @property {number} deliveryFee - Delivery fee
 * @property {number} tax - Tax amount
 * @property {number} total - Total amount
 * @property {OrderStatus} status - Order status
 * @property {Address} deliveryAddress - Delivery address
 * @property {string} estimatedDeliveryTime - Estimated delivery time
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Update timestamp
 */

/**
 * @typedef {'pending'|'confirmed'|'preparing'|'ready'|'picked_up'|'delivered'|'cancelled'} OrderStatus
 */

/**
 * @typedef {Object} Address
 * @property {string} id - Address ID
 * @property {'home'|'office'|'other'} type - Address type
 * @property {string} street - Street address
 * @property {string} city - City
 * @property {string} state - State
 * @property {string} zipCode - ZIP code
 * @property {string} country - Country
 * @property {boolean} isDefault - Whether this is the default address
 */

/**
 * @typedef {Object} DeliveryOption
 * @property {string} id - Delivery option ID
 * @property {string} name - Delivery option name
 * @property {string} description - Delivery option description
 * @property {string} estimatedTime - Estimated delivery time
 * @property {number} fee - Delivery fee
 * @property {boolean} isAvailable - Whether option is available
 */

// Export empty object to make this a module
export {};