/**
 * Auth slice for state management
 */

// Action types
export const AUTH_ACTIONS = {
  LOGIN_START: 'AUTH_LOGIN_START',
  LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE',
  LOGOUT: 'AUTH_LOGOUT',
  REGISTER_START: 'AUTH_REGISTER_START',
  REGISTER_SUCCESS: 'AUTH_REGISTER_SUCCESS',
  REGISTER_FAILURE: 'AUTH_REGISTER_FAILURE',
  UPDATE_PROFILE: 'AUTH_UPDATE_PROFILE',
  CLEAR_ERROR: 'AUTH_CLEAR_ERROR',
};

// Initial state
export const initialAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Reducer
export function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      };

    case AUTH_ACTIONS.UPDATE_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload.updates },
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Action creators
export const authActions = {
  loginStart: () => ({
    type: AUTH_ACTIONS.LOGIN_START,
  }),

  loginSuccess: (user, token) => ({
    type: AUTH_ACTIONS.LOGIN_SUCCESS,
    payload: { user, token },
  }),

  loginFailure: (error) => ({
    type: AUTH_ACTIONS.LOGIN_FAILURE,
    payload: { error },
  }),

  registerStart: () => ({
    type: AUTH_ACTIONS.REGISTER_START,
  }),

  registerSuccess: (user, token) => ({
    type: AUTH_ACTIONS.REGISTER_SUCCESS,
    payload: { user, token },
  }),

  registerFailure: (error) => ({
    type: AUTH_ACTIONS.REGISTER_FAILURE,
    payload: { error },
  }),

  logout: () => ({
    type: AUTH_ACTIONS.LOGOUT,
  }),

  updateProfile: (updates) => ({
    type: AUTH_ACTIONS.UPDATE_PROFILE,
    payload: { updates },
  }),

  clearError: () => ({
    type: AUTH_ACTIONS.CLEAR_ERROR,
  }),
};

// Selectors
export const authSelectors = {
  getUser: (state) => state.auth.user,
  getToken: (state) => state.auth.token,
  isAuthenticated: (state) => state.auth.isAuthenticated,
  isLoading: (state) => state.auth.isLoading,
  getError: (state) => state.auth.error,
};