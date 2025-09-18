'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/hooks/useSearch';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/EmptyState';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const { results, isLoading, search } = useSearch();

  useEffect(() => {
    if (initialQuery) {
      search(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      search(query);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Products</h1>
        
        <form onSubmit={handleSearch} className="max-w-md">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div>
          <p className="text-gray-600 mb-6">
            Found {results.length} results for "{query}"
          </p>
          <ProductGrid products={results} />
        </div>
      ) : query ? (
        <EmptyState
          title="No results found"
          description={`No products found for "${query}". Try different keywords.`}
          actionLabel="Browse All Products"
          actionHref="/products"
        />
      ) : null}
    </div>
  );
}