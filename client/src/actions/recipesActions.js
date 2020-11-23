import {
  SET_RECIPES_LOADING,
  GET_POPULAR_RECIPES,
  SEARCH_RECIPES,
  CLEAR_SEARCHED_RECIPES,
  SORT_SEARCHED_RECIPES,
  GET_RECIPE_INFORMATION,
  ADJUST_RECIPE,
} from './types';
import axios from 'axios';
import { USToCAD, adjustRecipe as adjustRecipeHelper } from '../Helpers';

/* Fetch popular recipes from the API */
export const getPopularRecipes = (recipesToGet) => async (dispatch) => {
  // set recipes as loading
  dispatch(setRecipesLoading());

  // fetch recipes
  try {
    const { data } = await axios.get(`/api/spoonacular/random`, {
      params: {
        number: recipesToGet,
        instructionsRequired: true,
      },
    });
    const { recipes } = data.spoonacularResponse;
    const cleanedRecipes = recipes.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      image: recipe.image,
      instructions: recipe.instructions,
    }));
    dispatch({ type: GET_POPULAR_RECIPES, payload: cleanedRecipes });
  } catch (error) {
    console.log('An error occurred while getting popular recipes');
  }
};

/* Search recipes based on user's query */
export const searchRecipes = (recipesToGet, filters) => async (dispatch) => {
  // set recipes as loading
  dispatch(setRecipesLoading());

  // fetch recipes
  try {
    const { data } = await axios.get(`/api/spoonacular/searchComplex`, {
      params: {
        number: recipesToGet,
        addRecipeInformation: true,
        instructionsRequired: true,
        ...filters,
      },
    });
    const { results } = data.spoonacularResponse;
    const cleanedRecipes = await Promise.all(
      results.map(async (recipe) => ({
        id: recipe.id,
        title: recipe.title,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        image: recipe.image,
        cost: await getRecipeIngredientsOrCost(recipe.id, 'COST'),
        instructions: recipe.analyzedInstructions[0]['steps'].map(
          (step) => step['step']
        ),
      }))
    );

    // set them to state
    dispatch({ type: SEARCH_RECIPES, payload: cleanedRecipes });
  } catch (error) {
    console.log('An error occurred while searching recipes');
  }
};

/* Clear searched recipes from the state */
export const clearSearchedRecipes = () => (dispatch) => {
  dispatch({ type: CLEAR_SEARCHED_RECIPES });
};

/* Sort recipes in ascending order by given key */
export const sortSearchedRecipes = (sortKey) => (dispatch) => {
  dispatch(setRecipesLoading());
  dispatch({ type: SORT_SEARCHED_RECIPES, payload: sortKey });
};

/* Get Recipe Information */
export const getRecipeInformation = (id, cb) => async (dispatch) => {
  // set recipes as loading
  dispatch(setRecipesLoading());

  // fetch recipe
  try {
    const { data } = await axios.get(`/api/spoonacular/${id}/information`, {
      params: {
        includeNutrition: true,
      },
    });
    const { spoonacularResponse } = data;
    const cleanedRecipe = {
      id: spoonacularResponse.id,
      title: spoonacularResponse.title,
      readyInMinutes: spoonacularResponse.readyInMinutes,
      servings: spoonacularResponse.servings,
      image: spoonacularResponse.image,
      cost: await getRecipeIngredientsOrCost(spoonacularResponse.id, 'COST'),
      analyzedInstructions:
        spoonacularResponse.analyzedInstructions[0]['steps'],
      equipmentIntro: await getRecipeEquipmentIntro(spoonacularResponse.id),
      ingredients: await getRecipeIngredientsOrCost(
        spoonacularResponse.id,
        'INGREDIENTS'
      ),
      nutrition: spoonacularResponse.nutrition,
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
export const adjustRecipe = (newServings, recipe) => (dispatch) => {
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
      `/api/spoonacular/${id}/priceBreakdownWidget.json`
    );
    const { spoonacularResponse } = data;
    switch (type) {
      case 'COST':
        const cost = {
          costPerServing: USToCAD(spoonacularResponse.totalCostPerServing),
          totalCost: USToCAD(spoonacularResponse.totalCost),
        };
        return cost;
      case 'INGREDIENTS':
        const ingredients = spoonacularResponse.ingredients.map(
          (ingredient) => ({
            name: ingredient.name,
            image: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`,
            amount: ingredient.amount,
            cost: USToCAD(ingredient.price),
          })
        );
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
const getRecipeEquipmentIntro = async (id) => {
  try {
    const { data } = await axios.get(
      `/api/spoonacular/${id}/equipmentWidget.json`
    );
    const { spoonacularResponse } = data;
    const equipmentNames = spoonacularResponse.equipment.map((eq) => eq.name);
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
