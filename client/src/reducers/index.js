import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

export default combineReducers({
  recipes: recipesReducer,
  auth: authReducer,
  user: userReducer
});
