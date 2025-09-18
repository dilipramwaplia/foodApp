'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Sidebar({ isOpen, onClose }) {
  const categories = [
    { id: 1, name: 'Electronics', count: 120 },
    { id: 2, name: 'Clothing', count: 85 },
    { id: 3, name: 'Home & Garden', count: 67 },
    { id: 4, name: 'Sports', count: 43 },
    { id: 5, name: 'Books', count: 156 },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button onClick={onClose} className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/products?category=${category.id}`}
                      className="flex justify-between items-center text-gray-600 hover:text-blue-600 py-2"
                      onClick={onClose}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-400">({category.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="text-gray-600 hover:text-blue-600 py-2 block" onClick={onClose}>
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-gray-600 hover:text-blue-600 py-2 block" onClick={onClose}>
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="text-gray-600 hover:text-blue-600 py-2 block" onClick={onClose}>
                    Shopping Cart
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}