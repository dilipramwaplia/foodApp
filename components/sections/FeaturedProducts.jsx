'use client';

/**
 * Featured products component - Single Responsibility Principle
 */

import { Star, Clock, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

const featuredProducts = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Fresh tomato sauce, mozzarella, and basil',
    price: 18.99,
    originalPrice: 24.99,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
    rating: 4.8,
    reviews: 245,
    deliveryTime: '25-35 min',
    storeName: 'Pizza Palace',
    discount: 25
  },
  {
    id: '2',
    name: 'Fresh Avocado',
    description: 'Organic, locally sourced avocados',
    price: 3.99,
    originalPrice: 5.49,
    image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg',
    rating: 4.6,
    reviews: 189,
    deliveryTime: '15-25 min',
    storeName: 'Green Market',
    discount: 27
  },
  {
    id: '3',
    name: 'Gourmet Burger',
    description: 'Beef patty with premium toppings',
    price: 14.99,
    originalPrice: 18.99,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    rating: 4.7,
    reviews: 156,
    deliveryTime: '20-30 min',
    storeName: 'Burger House',
    discount: 21
  },
  {
    id: '4',
    name: 'Fresh Sushi Roll',
    description: 'Premium salmon and avocado roll',
    price: 12.99,
    originalPrice: 16.99,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
    rating: 4.9,
    reviews: 312,
    deliveryTime: '30-40 min',
    storeName: 'Sushi Master',
    discount: 24
  }
];

export function FeaturedProducts() {
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-4">
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Hand-picked favorites from our top-rated stores
            </p>
          </div>
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
            View All Products
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.discount}% OFF
                </div>
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
                >
                  <svg
                    className={`w-5 h-5 ${favorites.has(product.id) ? 'text-red-500' : 'text-gray-400'}`}
                    fill={favorites.has(product.id) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>{product.storeName}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{product.deliveryTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-sm">{product.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-emerald-600">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <button className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}