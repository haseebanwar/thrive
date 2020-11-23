const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    recipe_id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.ObjectId,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    recipe_for: {
      type: String,
      required: true,
      enum: ['fav', 'basket']
    },
    servings: Number,
    adjusted: Boolean,
    totalCost: {
      unit: String,
      value: Number
    }
  },
  {
    versionKey: false
  }
);

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);
