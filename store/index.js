'use client';

import { createContext, useContext, useReducer } from 'react';
import { cartReducer, initialCartState } from './slices/cartSlice';
import { authReducer, initialAuthState } from './slices/authSlice';
import { productReducer, initialProductState } from './slices/productSlice';
import { wishlistReducer, initialWishlistState } from './slices/wishlistSlice';

// Combine initial states
const initialState = {
  cart: initialCartState,
  auth: initialAuthState,
  products: initialProductState,
  wishlist: initialWishlistState,
};

// Root reducer
function rootReducer(state, action) {
  return {
    cart: cartReducer(state.cart, action),
    auth: authReducer(state.auth, action),
    products: productReducer(state.products, action),
    wishlist: wishlistReducer(state.wishlist, action),
  };
}

// Create context
const StoreContext = createContext();

// Store provider component
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// Hook to use store
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

// Selector hooks for specific slices
export function useCartStore() {
  const { state, dispatch } = useStore();
  return { cart: state.cart, dispatch };
}

export function useAuthStore() {
  const { state, dispatch } = useStore();
  return { auth: state.auth, dispatch };
}

export function useProductStore() {
  const { state, dispatch } = useStore();
  return { products: state.products, dispatch };
}

export function useWishlistStore() {
  const { state, dispatch } = useStore();
  return { wishlist: state.wishlist, dispatch };
}