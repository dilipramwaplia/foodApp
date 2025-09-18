/**
 * Wishlist slice for state management
 */

// Action types
export const WISHLIST_ACTIONS = {
  ADD_ITEM: 'WISHLIST_ADD_ITEM',
  REMOVE_ITEM: 'WISHLIST_REMOVE_ITEM',
  CLEAR_WISHLIST: 'WISHLIST_CLEAR',
  LOAD_WISHLIST: 'WISHLIST_LOAD',
  TOGGLE_ITEM: 'WISHLIST_TOGGLE_ITEM',
};

// Initial state
export const initialWishlistState = {
  items: [],
  isLoading: false,
  error: null,
};

// Reducer
export function wishlistReducer(state = initialWishlistState, action) {
  switch (action.type) {
    case WISHLIST_ACTIONS.ADD_ITEM: {
      const { productId } = action.payload;
      
      if (state.items.includes(productId)) {
        return state; // Item already in wishlist
      }

      return {
        ...state,
        items: [...state.items, productId],
      };
    }

    case WISHLIST_ACTIONS.REMOVE_ITEM: {
      const { productId } = action.payload;
      
      return {
        ...state,
        items: state.items.filter(id => id !== productId),
      };
    }

    case WISHLIST_ACTIONS.TOGGLE_ITEM: {
      const { productId } = action.payload;
      const isInWishlist = state.items.includes(productId);

      if (isInWishlist) {
        return {
          ...state,
          items: state.items.filter(id => id !== productId),
        };
      } else {
        return {
          ...state,
          items: [...state.items, productId],
        };
      }
    }

    case WISHLIST_ACTIONS.CLEAR_WISHLIST:
      return {
        ...state,
        items: [],
      };

    case WISHLIST_ACTIONS.LOAD_WISHLIST:
      return {
        ...state,
        items: action.payload.items || [],
      };

    default:
      return state;
  }
}

// Action creators
export const wishlistActions = {
  addItem: (productId) => ({
    type: WISHLIST_ACTIONS.ADD_ITEM,
    payload: { productId },
  }),

  removeItem: (productId) => ({
    type: WISHLIST_ACTIONS.REMOVE_ITEM,
    payload: { productId },
  }),

  toggleItem: (productId) => ({
    type: WISHLIST_ACTIONS.TOGGLE_ITEM,
    payload: { productId },
  }),

  clearWishlist: () => ({
    type: WISHLIST_ACTIONS.CLEAR_WISHLIST,
  }),

  loadWishlist: (items) => ({
    type: WISHLIST_ACTIONS.LOAD_WISHLIST,
    payload: { items },
  }),
};

// Selectors
export const wishlistSelectors = {
  getItems: (state) => state.wishlist.items,
  getItemCount: (state) => state.wishlist.items.length,
  isInWishlist: (state, productId) => state.wishlist.items.includes(productId),
  isLoading: (state) => state.wishlist.isLoading,
  getError: (state) => state.wishlist.error,
};