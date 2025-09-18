/**
 * Cart slice for state management
 */

// Action types
export const CART_ACTIONS = {
  ADD_ITEM: 'CART_ADD_ITEM',
  REMOVE_ITEM: 'CART_REMOVE_ITEM',
  UPDATE_QUANTITY: 'CART_UPDATE_QUANTITY',
  CLEAR_CART: 'CART_CLEAR',
  LOAD_CART: 'CART_LOAD',
  APPLY_COUPON: 'CART_APPLY_COUPON',
  REMOVE_COUPON: 'CART_REMOVE_COUPON',
};

// Initial state
export const initialCartState = {
  items: [],
  coupon: null,
  isLoading: false,
  error: null,
};

// Reducer
export function cartReducer(state = initialCartState, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...product, quantity }],
      };
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.productId),
      };

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== productId),
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.id === productId ? { ...item, quantity } : item
        ),
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        coupon: null,
      };

    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload.items || [],
        coupon: action.payload.coupon || null,
      };

    case CART_ACTIONS.APPLY_COUPON:
      return {
        ...state,
        coupon: action.payload.coupon,
      };

    case CART_ACTIONS.REMOVE_COUPON:
      return {
        ...state,
        coupon: null,
      };

    default:
      return state;
  }
}

// Action creators
export const cartActions = {
  addItem: (product, quantity) => ({
    type: CART_ACTIONS.ADD_ITEM,
    payload: { product, quantity },
  }),

  removeItem: (productId) => ({
    type: CART_ACTIONS.REMOVE_ITEM,
    payload: { productId },
  }),

  updateQuantity: (productId, quantity) => ({
    type: CART_ACTIONS.UPDATE_QUANTITY,
    payload: { productId, quantity },
  }),

  clearCart: () => ({
    type: CART_ACTIONS.CLEAR_CART,
  }),

  loadCart: (cartData) => ({
    type: CART_ACTIONS.LOAD_CART,
    payload: cartData,
  }),

  applyCoupon: (coupon) => ({
    type: CART_ACTIONS.APPLY_COUPON,
    payload: { coupon },
  }),

  removeCoupon: () => ({
    type: CART_ACTIONS.REMOVE_COUPON,
  }),
};

// Selectors
export const cartSelectors = {
  getItems: (state) => state.cart.items,
  getItemCount: (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0),
  getSubtotal: (state) => state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0),
  getCoupon: (state) => state.cart.coupon,
  getTotal: (state) => {
    const subtotal = cartSelectors.getSubtotal(state);
    const coupon = cartSelectors.getCoupon(state);
    const discount = coupon ? (subtotal * coupon.discount / 100) : 0;
    return subtotal - discount;
  },
};