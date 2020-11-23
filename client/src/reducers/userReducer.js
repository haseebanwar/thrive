import {
  SET_USER_DATA_LOADING,
  GET_FAVORITE_RECIPES,
  SAVE_FAVORITE_RECIPE,
  REMOVE_FAVORITE_RECIPE,
  CLEAR_USER_DATA,
  GET_BASKET_RECIPES,
  SAVE_BASKET_RECIPE,
  REMOVE_BASKET_RECIPE,
  UPDATE_BASKET_RECIPE
} from '../actions/types';

const initialState = {
  isLoading: false,
  favoriteRecipes: [],
  basketRecipes: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_FAVORITE_RECIPES:
      return {
        ...state,
        isLoading: false,
        favoriteRecipes: action.payload
      };
    case SAVE_FAVORITE_RECIPE:
      return {
        ...state,
        isLoading: false,
        favoriteRecipes: [action.payload, ...state.favoriteRecipes]
      };
    case REMOVE_FAVORITE_RECIPE:
      return {
        ...state,
        isLoading: false,
        favoriteRecipes: state.favoriteRecipes.filter(
          recipe => recipe._id !== action.payload._id
        )
      };
    case CLEAR_USER_DATA:
      return {
        ...initialState
      };
    case GET_BASKET_RECIPES:
      return {
        ...state,
        isLoading: false,
        basketRecipes: action.payload
      };
    case SAVE_BASKET_RECIPE:
      return {
        ...state,
        isLoading: false,
        basketRecipes: [action.payload, ...state.basketRecipes]
      };
    case UPDATE_BASKET_RECIPE:
      return {
        ...state,
        isLoading: false,
        basketRecipes: state.basketRecipes.map(recipe =>
          recipe._id === action.payload._id ? action.payload : recipe
        )
      };
    case REMOVE_BASKET_RECIPE:
      return {
        ...state,
        isLoading: false,
        basketRecipes: state.basketRecipes.filter(
          recipe => recipe._id !== action.payload._id
        )
      };
    default:
      return state;
  }
};
