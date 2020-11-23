import {
  SET_USER_LOADING,
  LOGIN,
  REGISTER,
  SET_USER_LOADED,
  SET_AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  LOGOUT,
  SET_LOGIN_REDIRECT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  initialLoading: true,
  user: {},
  error: {},
  loginRedirect: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SET_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        initialLoading: false,
        user: action.payload
      };
    case LOGIN:
    case REGISTER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        error: {},
        ...action.payload
      };
    case SET_LOGIN_REDIRECT:
      return {
        ...state,
        loginRedirect: action.payload
      };
    case SET_AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        initialLoading: false,
        error: action.payload
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: {}
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...initialState,
        initialLoading: false
      };
    default:
      return state;
  }
};
