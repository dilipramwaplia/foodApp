/**
 * Utility functions for formatting prices and currency
 */

export function formatPrice(price, currency = 'USD', locale = 'en-US') {
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0.00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatPriceRange(minPrice, maxPrice, currency = 'USD', locale = 'en-US') {
  const min = formatPrice(minPrice, currency, locale);
  const max = formatPrice(maxPrice, currency, locale);
  
  if (minPrice === maxPrice) {
    return min;
  }
  
  return `${min} - ${max}`;
}

export function calculateDiscount(originalPrice, salePrice) {
  if (originalPrice <= salePrice) {
    return 0;
  }
  
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

export function formatDiscount(originalPrice, salePrice) {
  const discount = calculateDiscount(originalPrice, salePrice);
  return discount > 0 ? `${discount}% OFF` : '';
}

export function parsePriceString(priceString) {
  // Remove currency symbols and parse as float
  const cleaned = priceString.replace(/[^0-9.-]+/g, '');
  return parseFloat(cleaned) || 0;
}

export function addTax(price, taxRate = 0.08) {
  return price * (1 + taxRate);
}

export function calculateShipping(subtotal, shippingRate = 0, freeShippingThreshold = 100) {
  if (subtotal >= freeShippingThreshold) {
    return 0;
  }
  return shippingRate;
}

export function calculateTotal(subtotal, tax = 0, shipping = 0, discount = 0) {
  return Math.max(0, subtotal + tax + shipping - discount);
}