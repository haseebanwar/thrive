import {
  SET_RECIPES_LOADING,
  GET_POPULAR_RECIPES,
  SEARCH_RECIPES,
  CLEAR_SEARCHED_RECIPES,
  SORT_SEARCHED_RECIPES,
  GET_RECIPE_INFORMATION,
  ADJUST_RECIPE
} from './types';
import axios from 'axios';
import { USToCAD, adjustRecipe as adjustRecipeHelper } from '../Helpers';

const API_KEY =
  process.env.REACT_APP_SPOONACULAR_API_KEY ||
  process.env.REACT_APP_SPOONACULAR_API_KEY_RAPID_API;
const API_URL = process.env.REACT_APP_SPOONACULAR_API_KEY
  ? 'https://api.spoonacular.com/recipes'
  : 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes';

export const setHeadersForSpoonacularAPI = () => {
  if (process.env.REACT_APP_SPOONACULAR_API_KEY_RAPID_API) {
    return {
      headers: {
        'x-rapidapi-host':
          'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        'x-rapidapi-key': API_KEY
      }
    };
  }
};

/* Fetch popular recipes from the API */
export const getPopularRecipes = recipesToGet => async dispatch => {
  // set recipes as loading
  dispatch(setRecipesLoading());

  // fetch recipes
  try {
    const { data } = await axios.get(`${API_URL}/random`, {
      ...setHeadersForSpoonacularAPI(),
      params: {
        number: recipesToGet,
        instructionsRequired: true,
        apiKey: API_KEY
      }
    });
    const { recipes } = data;
    const cleanedRecipes = recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      image: recipe.image,
      instructions: recipe.instructions
    }));
    dispatch({ type: GET_POPULAR_RECIPES, payload: cleanedRecipes });
  } catch (error) {
    console.log('An error occurred while getting popular recipes');
  }
};

/* Search recipes based on user's query */
export const searchRecipes = (recipesToGet, filters) => async dispatch => {
  // set recipes as loading
  dispatch(setRecipesLoading());

  // fetch recipes
  try {
    const { data } = await axios.get(`${API_URL}/searchComplex`, {
      ...setHeadersForSpoonacularAPI(),
      params: {
        number: recipesToGet,
        addRecipeInformation: true,
        instructionsRequired: true,
        apiKey: API_KEY,
        ...filters
      }
    });
    const { results } = data;
    const cleanedRecipes = await Promise.all(
      results.map(async recipe => ({
        id: recipe.id,
        title: recipe.title,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        image: recipe.image,
        cost: await getRecipeIngredientsOrCost(recipe.id, 'COST'),
        instructions: recipe.analyzedInstructions[0]['steps'].map(
          step => step['step']
        )
      }))
    );

    // set them to state
    dispatch({ type: SEARCH_RECIPES, payload: cleanedRecipes });
  } catch (error) {
    console.log('An error occurred while searching recipes');
  }
};

/* Clear searched recipes from the state */
export const clearSearchedRecipes = () => dispatch => {
  dispatch({ type: CLEAR_SEARCHED_RECIPES });
};

/* Sort recipes in ascending order by given key */
export const sortSearchedRecipes = sortKey => dispatch => {
  dispatch(setRecipesLoading());
  dispatch({ type: SORT_SEARCHED_RECIPES, payload: sortKey });
};

/* Get Recipe Information */
export const getRecipeInformation = (id, cb) => async dispatch => {
  // set recipes as loading
  dispatch(setRecipesLoading());

  // fetch recipe
  try {
    const { data } = await axios.get(`${API_URL}/${id}/information`, {
      ...setHeadersForSpoonacularAPI(),
      params: {
        includeNutrition: true,
        apiKey: API_KEY
      }
    });
    const cleanedRecipe = {
      id: data.id,
      title: data.title,
      readyInMinutes: data.readyInMinutes,
      servings: data.servings,
      image: data.image,
      cost: await getRecipeIngredientsOrCost(data.id, 'COST'),
      analyzedInstructions: data.analyzedInstructions[0]['steps'],
      equipmentIntro: await getRecipeEquipmentIntro(data.id),
      ingredients: await getRecipeIngredientsOrCost(data.id, 'INGREDIENTS'),
      nutrition: data.nutrition
    };

    // set recipe to state
    dispatch({ type: GET_RECIPE_INFORMATION, payload: cleanedRecipe });
    // call the callback passed
    cb();
  } catch (error) {
    console.log('An error occurred while getting recipe information');
  }
};

/* Adjust recipe according to servings */
export const adjustRecipe = (newServings, recipe) => dispatch => {
  dispatch(setRecipesLoading());
  const adjustedRecipe = adjustRecipeHelper(parseInt(newServings), recipe);
  dispatch({ type: ADJUST_RECIPE, payload: adjustedRecipe });
};

/*
 * Helper Function
 * Set recipes as loading
 */
const setRecipesLoading = () => ({ type: SET_RECIPES_LOADING });

/*
 * Helper Function
 * Get Recipe Ingredients or Cost
 * Returns the ingredients OR cost of the recipe
 */
const getRecipeIngredientsOrCost = async (id, type) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/${id}/priceBreakdownWidget.json`,
      {
        ...setHeadersForSpoonacularAPI(),
        params: {
          apiKey: API_KEY
        }
      }
    );
    switch (type) {
      case 'COST':
        const cost = {
          costPerServing: USToCAD(data.totalCostPerServing),
          totalCost: USToCAD(data.totalCost)
        };
        return cost;
      case 'INGREDIENTS':
        const ingredients = data.ingredients.map(ingredient => ({
          name: ingredient.name,
          image: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`,
          amount: ingredient.amount,
          cost: USToCAD(ingredient.price)
        }));
        return ingredients;
      default:
        return null;
    }
  } catch (error) {
    console.log('An error occurred while getting recipe ingredient or cost');
  }
};

/*
 * Helper Function
 * Get Recipe Summary
 * Returns summary of the recipe
 */
const getRecipeEquipmentIntro = async id => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}/equipmentWidget.json`, {
      ...setHeadersForSpoonacularAPI(),
      params: {
        apiKey: API_KEY
      }
    });
    const equipmentNames = data.equipment.map(eq => eq.name);
    let recipeIntro = 'For making this recipe you will need ';
    equipmentNames.forEach((eq, i) => {
      recipeIntro +=
        i === equipmentNames.length - 1 ? ` and ${eq}.` : `${eq}, `;
    });
    return recipeIntro;
  } catch (error) {
    console.log('An error occurred while getting recipe summary');
  }
};
