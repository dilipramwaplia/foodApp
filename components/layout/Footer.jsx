/**
 * Footer component - Single Responsibility Principle
 */

import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">6</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">6AM Mart</h3>
                <p className="text-sm text-gray-400">Your Ultimate Marketplace</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your one-stop destination for food delivery, grocery shopping, and more. 
              Fast, reliable, and always fresh.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Partner with Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Food Delivery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Grocery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Pharmacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Coffee & Tea</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Gifts & Flowers</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400">support@6ammart.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400">123 Delivery St, NY 10001</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="pt-4">
              <h5 className="font-semibold mb-2">Subscribe to Newsletter</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 6AM Mart. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}