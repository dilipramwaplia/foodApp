/**
 * Product slice for state management
 */

// Action types
export const PRODUCT_ACTIONS = {
  FETCH_PRODUCTS_START: 'PRODUCTS_FETCH_START',
  FETCH_PRODUCTS_SUCCESS: 'PRODUCTS_FETCH_SUCCESS',
  FETCH_PRODUCTS_FAILURE: 'PRODUCTS_FETCH_FAILURE',
  FETCH_PRODUCT_START: 'PRODUCT_FETCH_START',
  FETCH_PRODUCT_SUCCESS: 'PRODUCT_FETCH_SUCCESS',
  FETCH_PRODUCT_FAILURE: 'PRODUCT_FETCH_FAILURE',
  SEARCH_PRODUCTS_START: 'PRODUCTS_SEARCH_START',
  SEARCH_PRODUCTS_SUCCESS: 'PRODUCTS_SEARCH_SUCCESS',
  SEARCH_PRODUCTS_FAILURE: 'PRODUCTS_SEARCH_FAILURE',
  SET_FILTERS: 'PRODUCTS_SET_FILTERS',
  CLEAR_FILTERS: 'PRODUCTS_CLEAR_FILTERS',
  SET_SORT: 'PRODUCTS_SET_SORT',
};

// Initial state
export const initialProductState = {
  products: [],
  currentProduct: null,
  searchResults: [],
  categories: [],
  filters: {
    category: '',
    priceRange: '',
    rating: '',
    inStock: false,
  },
  sort: {
    field: 'name',
    direction: 'asc',
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
  isLoading: false,
  isSearching: false,
  error: null,
};

// Reducer
export function productReducer(state = initialProductState, action) {
  switch (action.type) {
    case PRODUCT_ACTIONS.FETCH_PRODUCTS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case PRODUCT_ACTIONS.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        pagination: action.payload.pagination,
        isLoading: false,
        error: null,
      };

    case PRODUCT_ACTIONS.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        products: [],
        isLoading: false,
        error: action.payload.error,
      };

    case PRODUCT_ACTIONS.FETCH_PRODUCT_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case PRODUCT_ACTIONS.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        currentProduct: action.payload.product,
        isLoading: false,
        error: null,
      };

    case PRODUCT_ACTIONS.FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        currentProduct: null,
        isLoading: false,
        error: action.payload.error,
      };

    case PRODUCT_ACTIONS.SEARCH_PRODUCTS_START:
      return {
        ...state,
        isSearching: true,
        error: null,
      };

    case PRODUCT_ACTIONS.SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        searchResults: action.payload.results,
        isSearching: false,
        error: null,
      };

    case PRODUCT_ACTIONS.SEARCH_PRODUCTS_FAILURE:
      return {
        ...state,
        searchResults: [],
        isSearching: false,
        error: action.payload.error,
      };

    case PRODUCT_ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload.filters },
        pagination: { ...state.pagination, page: 1 }, // Reset to first page
      };

    case PRODUCT_ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        filters: initialProductState.filters,
        pagination: { ...state.pagination, page: 1 },
      };

    case PRODUCT_ACTIONS.SET_SORT:
      return {
        ...state,
        sort: action.payload.sort,
        pagination: { ...state.pagination, page: 1 }, // Reset to first page
      };

    default:
      return state;
  }
}

// Action creators
export const productActions = {
  fetchProductsStart: () => ({
    type: PRODUCT_ACTIONS.FETCH_PRODUCTS_START,
  }),

  fetchProductsSuccess: (products, pagination) => ({
    type: PRODUCT_ACTIONS.FETCH_PRODUCTS_SUCCESS,
    payload: { products, pagination },
  }),

  fetchProductsFailure: (error) => ({
    type: PRODUCT_ACTIONS.FETCH_PRODUCTS_FAILURE,
    payload: { error },
  }),

  fetchProductStart: () => ({
    type: PRODUCT_ACTIONS.FETCH_PRODUCT_START,
  }),

  fetchProductSuccess: (product) => ({
    type: PRODUCT_ACTIONS.FETCH_PRODUCT_SUCCESS,
    payload: { product },
  }),

  fetchProductFailure: (error) => ({
    type: PRODUCT_ACTIONS.FETCH_PRODUCT_FAILURE,
    payload: { error },
  }),

  searchProductsStart: () => ({
    type: PRODUCT_ACTIONS.SEARCH_PRODUCTS_START,
  }),

  searchProductsSuccess: (results) => ({
    type: PRODUCT_ACTIONS.SEARCH_PRODUCTS_SUCCESS,
    payload: { results },
  }),

  searchProductsFailure: (error) => ({
    type: PRODUCT_ACTIONS.SEARCH_PRODUCTS_FAILURE,
    payload: { error },
  }),

  setFilters: (filters) => ({
    type: PRODUCT_ACTIONS.SET_FILTERS,
    payload: { filters },
  }),

  clearFilters: () => ({
    type: PRODUCT_ACTIONS.CLEAR_FILTERS,
  }),

  setSort: (field, direction) => ({
    type: PRODUCT_ACTIONS.SET_SORT,
    payload: { sort: { field, direction } },
  }),
};

// Selectors
export const productSelectors = {
  getProducts: (state) => state.products.products,
  getCurrentProduct: (state) => state.products.currentProduct,
  getSearchResults: (state) => state.products.searchResults,
  getFilters: (state) => state.products.filters,
  getSort: (state) => state.products.sort,
  getPagination: (state) => state.products.pagination,
  isLoading: (state) => state.products.isLoading,
  isSearching: (state) => state.products.isSearching,
  getError: (state) => state.products.error,
};