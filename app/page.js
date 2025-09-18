import { BannerCarousel } from '@/components/BannerCarousel';
import { ProductGrid } from '@/components/products/ProductGrid';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <BannerCarousel />
      
      <section className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Store
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
          <ProductGrid />
        </div>
      </section>
    </div>
  );
}