'use client';

import { useState } from 'react';

export function useSearch() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  const search = async (searchQuery) => {
    setIsLoading(true);
    setQuery(searchQuery);

    try {
      // Mock API call - replace with actual search API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock search results
      const mockResults = [
        {
          id: '1',
          name: 'Premium Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 199.99,
          originalPrice: 249.99,
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
          rating: 4.8,
          discount: 20
        },
        {
          id: '2',
          name: 'Smart Fitness Watch',
          description: 'Track your fitness goals with this advanced smartwatch',
          price: 299.99,
          originalPrice: 399.99,
          image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
          rating: 4.6,
          discount: 25
        }
      ].filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setResults(mockResults);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setQuery('');
  };

  return {
    results,
    isLoading,
    query,
    search,
    clearResults
  };
}