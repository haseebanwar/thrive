import {
  SET_USER_LOADING,
  LOGIN,
  REGISTER,
  LOGOUT,
  SET_USER_LOADED,
  SET_AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  SET_LOGIN_REDIRECT
} from './types';
import axios from 'axios';

/*
 * Check if user is logged in
 */
export const loadUser = () => async (dispatch, getState) => {
  // set user as loading
  dispatch({ type: SET_USER_LOADING });

  // making request to load user with token
  try {
    const { data } = await axios.get('/api/users/user', tokenConfig(getState));
    dispatch({ type: SET_USER_LOADED, payload: data });
  } catch (error) {
    const errorInfo = {
      id: null,
      status: error.response.status,
      msg: error.response.data.msg
    };
    dispatch({ type: SET_AUTH_ERROR, payload: errorInfo });
  }
};

/*
 * Register a user
 */
export const registerUser = (user, cb) => async dispatch => {
  // set user as loading
  dispatch({ type: SET_USER_LOADING });

  // request headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // request body
  const body = JSON.stringify(user);

  // making request to register
  try {
    const { data } = await axios.post('/api/users/register', body, config);
    dispatch({ type: REGISTER, payload: data });
    // after login call the callback
    cb();
  } catch (error) {
    const errorInfo = {
      id: 'REGISTER_ERROR',
      status: error.response.status,
      msg: error.response.data.msg
    };
    dispatch({ type: SET_AUTH_ERROR, payload: errorInfo });
  }
};

/*
 * Login user
 */
export const loginUser = (user, cb) => async dispatch => {
  // set user as loading
  dispatch({ type: SET_USER_LOADING });

  // request headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // request body
  const body = JSON.stringify(user);

  // making request to register
  try {
    const { data } = await axios.post('/api/users/login', body, config);
    dispatch({ type: LOGIN, payload: data });
    // after registration call the callback
    cb();
  } catch (error) {
    const errorInfo = {
      id: 'LOGIN_ERROR',
      status: error.response.status,
      msg: error.response.data.msg
    };
    dispatch({ type: SET_AUTH_ERROR, payload: errorInfo });
  }
};

/* Logout user */
export const logoutUser = cb => async dispatch => {
  dispatch({ type: LOGOUT });
  // after logout call the callback
  cb();
};

/* Clear Auth Error */
export const clearAuthError = () => async dispatch => {
  dispatch({ type: CLEAR_AUTH_ERROR });
};

/* Set login redirect route and message */
export const setLoginRedirect = (
  redirectRoute,
  redirectMsg
) => async dispatch => {
  const loginRedirect = {
    redirectRoute,
    redirectMsg
  };
  dispatch({ type: SET_LOGIN_REDIRECT, payload: loginRedirect });
};

/*
 * Helper Function
 * Setup config/headers and token
 */
export const tokenConfig = getState => {
  // Get token from localStorage
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };
  if (token) config.headers['x-auth-token'] = token;
  return config;
};
