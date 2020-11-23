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
} from './types';
import { tokenConfig } from './authActions';
import axios from 'axios';

/* Get Favorite Recipes */
export const getFavoriteRecipes = () => async (dispatch, getState) => {
  // set user data as loading
  dispatch({ type: SET_USER_DATA_LOADING });

  try {
    const { data: recipes } = await axios.get(
      '/api/recipes',
      tokenConfig(getState)
    );
    dispatch({ type: GET_FAVORITE_RECIPES, payload: recipes });
  } catch (error) {
    console.log(`An error occurred while getting favorite recipes`);
  }
};

/* Save Favorite Recipe */
export const saveFavoriteRecipe = recipe => async (dispatch, getState) => {
  // set user data as loading
  dispatch({ type: SET_USER_DATA_LOADING });

  // request body
  const body = JSON.stringify(recipe);

  try {
    const { data: savedRecipe } = await axios.post(
      '/api/recipes',
      body,
      tokenConfig(getState)
    );
    dispatch({ type: SAVE_FAVORITE_RECIPE, payload: savedRecipe });
  } catch (error) {
    console.log(`An error occurred while saving favorite recipe`);
  }
};

/* Remove Favorite Recipe */
export const removeFavoriteRecipe = id => async (dispatch, getState) => {
  // set user data as loading
  dispatch({ type: SET_USER_DATA_LOADING });

  try {
    const { data: removedRecipe } = await axios.delete(
      `/api/recipes/${id}`,
      tokenConfig(getState)
    );
    dispatch({ type: REMOVE_FAVORITE_RECIPE, payload: removedRecipe });
  } catch (error) {
    console.log(`An error occurred while removing recipe`);
  }
};

/*
 * Clear user data
 */
export const clearUserData = () => async dispatch => {
  dispatch({ type: CLEAR_USER_DATA });
};

/* Get Basket Recipes */
export const getBasketRecipes = () => async (dispatch, getState) => {
  // set user data as loading
  dispatch({ type: SET_USER_DATA_LOADING });

  try {
    const { data: recipes } = await axios.get(
      '/api/recipes/basket',
      tokenConfig(getState)
    );
    dispatch({ type: GET_BASKET_RECIPES, payload: recipes });
  } catch (error) {
    console.log(`An error occurred while getting basket recipes`);
  }
};

/* Save Basket Recipe */
export const saveBasketRecipe = recipe => async (dispatch, getState) => {
  // set user data as loading
  dispatch({ type: SET_USER_DATA_LOADING });

  // request body
  const body = JSON.stringify(recipe);

  try {
    const { data: savedRecipe } = await axios.post(
      '/api/recipes/basket',
      body,
      tokenConfig(getState)
    );
    dispatch({ type: SAVE_BASKET_RECIPE, payload: savedRecipe });
  } catch (error) {
    console.log(`An error occurred while saving basket recipe`);
  }
};

/* Update Basket Recipe */
export const updateBasketRecipe = (id, reqBody) => async (
  dispatch,
  getState
) => {
  // set user data as loading
  dispatch({ type: SET_USER_DATA_LOADING });

  // request body
  const body = JSON.stringify(reqBody);

  try {
    const { data: updatedRecipe } = await axios.put(
      `/api/recipes/basket/${id}`,
      body,
      tokenConfig(getState)
    );
    dispatch({ type: UPDATE_BASKET_RECIPE, payload: updatedRecipe });
  } catch (error) {
    console.log(`An error occurred while updating basket recipe`);
  }
};

/* Remove Basket Recipe */
export const removeBasketRecipe = id => async (dispatch, getState) => {
  // set user data as loading
  dispatch({ type: SET_USER_DATA_LOADING });

  try {
    const { data: removedRecipe } = await axios.delete(
      `/api/recipes/basket/${id}`,
      tokenConfig(getState)
    );
    dispatch({ type: REMOVE_BASKET_RECIPE, payload: removedRecipe });
  } catch (error) {
    console.log(`An error occurred while removing basket recipe`);
  }
};
