import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  saveFavoriteRecipe,
  getFavoriteRecipes
} from '../../actions/userActions';
import { setLoginRedirect } from '../../actions/authActions';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

class RecipeSaveButton extends Component {
  constructor(props) {
    super(props);
    this.saveRecipe = this.saveRecipe.bind(this);
  }

  componentDidMount() {
    // get favorite recipes
    this.props.getFavoriteRecipes();
  }

  saveRecipe() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      const { id, title } = this.props.recipe;
      this.props.saveFavoriteRecipe({ id, title });
    } else {
      // set redirect route after successful login
      this.props.setLoginRedirect(
        this.props.location.pathname,
        'Please login to save this recipe'
      );
      // redirect to login page because user is not authenticted to save the recipe
      this.props.history.push('/login');
    }
  }

  render() {
    const { loadingRecipes, classNames, type } = this.props;
    if (loadingRecipes) {
      return <Fragment />;
    }
    const { favoriteRecipes } = this.props;
    const { id } = this.props.recipe;
    const recipeStatus = favoriteRecipes.map(
      recipe => id === parseInt(recipe.recipe_id)
    );
    if (recipeStatus.every(e => e === false)) {
      // recipe not saved show save button
      return (
        <button
          className={classnames('btn', classNames, type)}
          onClick={this.saveRecipe}
        >
          <i className="fas fa-heart mr-2" />
          Save Recipe
        </button>
      );
    } else {
      // recipe is saved show saved button
      return (
        <button className={classnames('btn', classNames, type)}>
          <i className="far fa-check-circle mr-2" />
          Saved
        </button>
      );
    }
  }
}

RecipeSaveButton.propTypes = {
  recipe: PropTypes.object.isRequired,
  classNames: PropTypes.string,
  type: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadingRecipes: PropTypes.bool.isRequired,
  favoriteRecipes: PropTypes.array.isRequired,
  saveFavoriteRecipe: PropTypes.func.isRequired,
  getFavoriteRecipes: PropTypes.func.isRequired
};

export default connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loadingRecipes: state.recipes.isLoading,
    favoriteRecipes: state.user.favoriteRecipes
  }),
  { saveFavoriteRecipe, getFavoriteRecipes, setLoginRedirect }
)(withRouter(RecipeSaveButton));
