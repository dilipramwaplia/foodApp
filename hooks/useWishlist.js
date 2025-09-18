'use client';

import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/Toast';

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (productId) => {
    setWishlist(current => {
      if (!current.includes(productId)) {
        toast.success('Added to wishlist');
        return [...current, productId];
      }
      return current;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(current => {
      toast.success('Removed from wishlist');
      return current.filter(id => id !== productId);
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.success('Wishlist cleared');
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist
  };
}