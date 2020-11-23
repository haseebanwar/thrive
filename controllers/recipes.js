// Recipe Model
const Recipe = require('../models/Recipe');

// @desc Add a Recipe
// @route POST /api/recipes
// @access PRIVATE
exports.addRecipe = async (req, res) => {
  const { id, title } = req.body;

  // validation
  if (!id || !title) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const newRecipe = new Recipe({
    recipe_id: id,
    title,
    user: req.user.id,
    recipe_for: 'fav'
  });
  return res.json(await newRecipe.save());
};

// @desc Return Favorite Recipes of a User
// @route GET /api/recipes
// @access PRIVATE
exports.getRecipes = async (req, res) => {
  const recipes = await Recipe.find({
    $and: [{ user: req.user.id }, { recipe_for: 'fav' }]
  }).sort('-created_at');
  return res.json(recipes);
};

// @desc Delete a Recipe
// @route DELETE /api/recipes/:id
// @access PRIVATE
exports.deleteRecipe = async (req, res) => {
  // check if the recipe to be deleted actuallay belongs to that user
  const recipe = await Recipe.findById({ _id: req.params.id });
  if (recipe.user == req.user.id) {
    const deletedRecipe = await Recipe.findOneAndDelete({ _id: req.params.id });
    return res.json(deletedRecipe);
  }
  return res.status(401).json({ msg: 'Unauthorized access' });
};
