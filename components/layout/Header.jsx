'use client';

/**
 * Header component - Single Responsibility Principle
 */

import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, MapPin, User } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar with location and contact */}
      <div className="bg-emerald-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Deliver to: New York, NY</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>📞 +1 (555) 123-4567</span>
            <span>🕐 24/7 Service</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">6</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-800">6AM Mart</h1>
              <p className="text-xs text-gray-500">Your Ultimate Marketplace</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products, stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors">
              <User className="w-5 h-5" />
              <span>Account</span>
            </button>
            <button className="relative flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden md:inline">Cart</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a href="#" className="block text-gray-700 hover:text-emerald-600">Home</a>
            <a href="#" className="block text-gray-700 hover:text-emerald-600">Categories</a>
            <a href="#" className="block text-gray-700 hover:text-emerald-600">Stores</a>
            <a href="#" className="block text-gray-700 hover:text-emerald-600">My Account</a>
            <a href="#" className="block text-gray-700 hover:text-emerald-600">Orders</a>
          </nav>
        </div>
      )}
    </header>
  );
}