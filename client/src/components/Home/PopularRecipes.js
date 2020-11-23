import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPopularRecipes } from '../../actions/recipesActions';
import { RecipeCard, RecipeCardLoading } from '../layouts';
import PropTypes from 'prop-types';

import './PopularRecipes.css';

const recipesToLoad = 4;

class PopularRecipes extends Component {
  componentDidMount() {
    const { popularRecipes, getPopularRecipes } = this.props;
    // get popular recipes
    if (popularRecipes.length === 0) getPopularRecipes(recipesToLoad);
  }

  renderRecipes() {
    const { isLoading, popularRecipes } = this.props;
    let recipes = [];
    if (isLoading) {
      for (let i = 0; i < recipesToLoad; i++) {
        recipes.push(
          <div key={i} className="col-lg-3 col-md-6">
            <RecipeCardLoading />
          </div>
        );
      }
      return recipes;
    } else {
      return popularRecipes.map(recipe => (
        <div key={recipe.id} className="col-lg-3 col-md-6">
          <RecipeCard
            id={recipe.id}
            title={recipe.title}
            instructions={recipe.instructions}
            image={recipe.image}
            readyInMinutes={recipe.readyInMinutes}
            servings={recipe.servings}
          />
        </div>
      ));
    }
  }

  render() {
    return (
      <div className="PopularRecipes">
        <div className="container mt-5 mb-5">
          <div className="PopularRecipes-intro text-center mb-3">
            <h2 className="text-center">Popular Recipes</h2>
            <p className="col-lg-6 col-md-12 text-primary mt-3">
              Here are some popular recipes and examples of what you can search for!
            </p>
          </div>
          <div className="row">{this.renderRecipes()}</div>
        </div>
      </div>
    );
  }
}

PopularRecipes.propTypes = {
  popularRecipes: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getPopularRecipes: PropTypes.func.isRequired
};

export default connect(
  state => ({
    popularRecipes: state.recipes.popularRecipes,
    isLoading: state.recipes.isLoading
  }),
  { getPopularRecipes }
)(PopularRecipes);
