const express = require('express');
const {
  addRecipe,
  getRecipes,
  deleteRecipe
} = require('../../controllers/recipes');
const {
  addBasketRecipe,
  getBasketRecipes,
  deleteBasketRecipe,
  updateBasketRecipe
} = require('../../controllers/basketRecipes');
const auth = require('../../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(auth, getRecipes)
  .post(auth, addRecipe);
router.route('/:id').delete(auth, deleteRecipe);

router
  .route('/basket')
  .post(auth, addBasketRecipe)
  .get(auth, getBasketRecipes);
router
  .route('/basket/:id')
  .delete(auth, deleteBasketRecipe)
  .put(auth, updateBasketRecipe);

module.exports = router;
