/**
 * Hero section component - Single Responsibility Principle
 */

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-600 text-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Your Ultimate
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Marketplace
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-emerald-100 leading-relaxed">
                Shop from thousands of products and get them delivered to your doorstep in minutes
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-emerald-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Order Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-emerald-700 transition-all duration-300">
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-emerald-500">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-emerald-200">Stores</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-emerald-200">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">30min</div>
                <div className="text-emerald-200">Delivery</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg"
                alt="Delivery service illustration"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-70 animate-bounce"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}