import { sortNumeric } from '../Helpers';
import {
  SET_RECIPES_LOADING,
  GET_POPULAR_RECIPES,
  SEARCH_RECIPES,
  CLEAR_SEARCHED_RECIPES,
  SORT_SEARCHED_RECIPES,
  GET_RECIPE_INFORMATION,
  ADJUST_RECIPE
} from '../actions/types';

import recipe from '../data/recipe.json';

const initialState = {
  popularRecipes: [],
  searchedRecipes: [],
  isLoading: false,
  sortKey: 'readyInMinutes',
  recipe: recipe
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RECIPES_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_POPULAR_RECIPES:
      return {
        ...state,
        popularRecipes: action.payload,
        isLoading: false
      };
    case SEARCH_RECIPES:
      return {
        ...state,
        searchedRecipes: sortNumeric(action.payload, state.sortKey, 'ASC'),
        isLoading: false
      };
    case CLEAR_SEARCHED_RECIPES:
      return {
        ...state,
        searchedRecipes: [],
        isLoading: false
      };
    case SORT_SEARCHED_RECIPES:
      return {
        ...state,
        searchedRecipes: sortNumeric(
          state.searchedRecipes,
          action.payload,
          'ASC'
        ),
        sortKey: action.payload,
        isLoading: false
      };
    case GET_RECIPE_INFORMATION:
      return {
        ...state,
        recipe: action.payload,
        isLoading: false
      };
    case ADJUST_RECIPE:
      return {
        ...state,
        isLoading: false,
        recipe: action.payload
      };
    default:
      return state;
  }
};
