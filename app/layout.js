import './globals.css';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toast } from '@/components/ui/Toast';
import { StoreProvider } from '@/store';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'E-Commerce Store - Shop the Best Products',
  description: 'Discover amazing products at unbeatable prices. Fast shipping, secure checkout, and excellent customer service.',
  keywords: 'ecommerce, shopping, products, online store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}