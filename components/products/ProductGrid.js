'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { PageLoader } from '@/components/ui/Loader';
import { EmptyState } from '@/components/EmptyState';

export function ProductGrid({ products: propProducts }) {
  const [products, setProducts] = useState(propProducts || []);
  const [isLoading, setIsLoading] = useState(!propProducts);

  useEffect(() => {
    if (!propProducts) {
      // Mock API call - replace with actual API
      setTimeout(() => {
        setProducts([
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
          },
          {
            id: '3',
            name: 'Portable Bluetooth Speaker',
            description: 'Compact speaker with powerful sound and long battery life',
            price: 79.99,
            originalPrice: 99.99,
            image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg',
            rating: 4.5,
            discount: 20
          },
          {
            id: '4',
            name: 'Wireless Charging Pad',
            description: 'Fast wireless charging for all compatible devices',
            price: 39.99,
            originalPrice: 59.99,
            image: 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg',
            rating: 4.3,
            discount: 33
          },
          {
            id: '5',
            name: 'USB-C Hub',
            description: 'Multi-port hub with HDMI, USB 3.0, and SD card slots',
            price: 49.99,
            originalPrice: 69.99,
            image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
            rating: 4.4,
            discount: 29
          },
          {
            id: '6',
            name: 'Laptop Stand',
            description: 'Ergonomic aluminum laptop stand for better posture',
            price: 59.99,
            originalPrice: 79.99,
            image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
            rating: 4.7,
            discount: 25
          }
        ]);
        setIsLoading(false);
      }, 1000);
    }
  }, [propProducts]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Try adjusting your search or filters"
        actionLabel="Browse All Products"
        actionHref="/products"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}