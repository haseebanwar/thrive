// Recipe Model
const Recipe = require('../models/Recipe');

// @desc Add a Basket Recipe
// @route POST /api/recipes/basket
// @access PRIVATE
exports.addBasketRecipe = async (req, res) => {
  const { id, title, servings, adjusted, totalCost } = req.body;

  // validation
  if (
    !id ||
    !title ||
    !servings ||
    typeof adjusted !== 'boolean' ||
    !totalCost
  ) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const newRecipe = new Recipe({
    recipe_id: id,
    title,
    user: req.user.id,
    servings,
    adjusted,
    totalCost,
    recipe_for: 'basket'
  });
  return res.json(await newRecipe.save());
};

// @desc Return Basket Recipes of a User
// @route GET /api/recipes/basket
// @access PRIVATE
exports.getBasketRecipes = async (req, res) => {
  const recipes = await Recipe.find({
    $and: [{ user: req.user.id }, { recipe_for: 'basket' }]
  }).sort('-created_at');
  return res.json(recipes);
};

// @desc Update a Basket Recipe
// @route PUT /api/recipes/basket
// @access PRIVATE
exports.updateBasketRecipe = async (req, res) => {
  const { servings, adjusted, totalCost } = req.body;

  // validation
  if (!servings || typeof adjusted !== 'boolean' || !totalCost) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // check if the recipe to be updated actuallay belongs to that user
  const recipe = await Recipe.findById({ _id: req.params.id });
  if (recipe.user == req.user.id) {
    await Recipe.updateOne(
      { _id: req.params.id },
      { servings, adjusted, totalCost }
    );
    const updatedRecipe = await Recipe.findById({ _id: req.params.id });
    return res.json(updatedRecipe);
  }
  return res.status(401).json({ msg: 'Unauthorized access' });
};

// @desc Delete a Basket Recipe
// @route DELETE /api/recipes/basket/:id
// @access PRIVATE
exports.deleteBasketRecipe = async (req, res) => {
  // check if the recipe to be deleted actuallay belongs to that user
  const recipe = await Recipe.findById({ _id: req.params.id });
  if (recipe.user == req.user.id) {
    const deletedRecipe = await Recipe.findOneAndDelete({ _id: req.params.id });
    return res.json(deletedRecipe);
  }
  return res.status(401).json({ msg: 'Unauthorized access' });
};
