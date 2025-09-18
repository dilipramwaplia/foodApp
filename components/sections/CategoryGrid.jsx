/**
 * Category grid component - Single Responsibility Principle
 */

import { ShoppingBag, Coffee, Pizza, Car, Heart, Gift } from 'lucide-react';

const categories = [
  {
    id: '1',
    name: 'Food Delivery',
    description: 'Restaurants & Fast Food',
    icon: Pizza,
    color: 'bg-red-100 text-red-600',
    count: '150+ stores'
  },
  {
    id: '2',
    name: 'Grocery',
    description: 'Fresh & Organic',
    icon: ShoppingBag,
    color: 'bg-green-100 text-green-600',
    count: '80+ stores'
  },
  {
    id: '3',
    name: 'Pharmacy',
    description: 'Medicines & Healthcare',
    icon: Heart,
    color: 'bg-blue-100 text-blue-600',
    count: '45+ stores'
  },
  {
    id: '4',
    name: 'Coffee & Tea',
    description: 'Beverages & Snacks',
    icon: Coffee,
    color: 'bg-orange-100 text-orange-600',
    count: '60+ stores'
  },
  {
    id: '5',
    name: 'Gifts & Flowers',
    description: 'Special Occasions',
    icon: Gift,
    color: 'bg-purple-100 text-purple-600',
    count: '30+ stores'
  },
  {
    id: '6',
    name: 'Automotive',
    description: 'Car Wash & Services',
    icon: Car,
    color: 'bg-gray-100 text-gray-600',
    count: '25+ stores'
  }
];

export function CategoryGrid() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover thousands of products across different categories delivered to your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{category.count}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="mt-6">
                  <span className="text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors">
                    Explore now →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}