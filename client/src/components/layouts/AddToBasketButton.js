import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  saveBasketRecipe,
  getBasketRecipes,
  updateBasketRecipe
} from '../../actions/userActions';
import { setLoginRedirect } from '../../actions/authActions';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

class AddToBasketButton extends Component {
  constructor(props) {
    super(props);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
  }

  componentDidMount() {
    // get basket recipes
    this.props.getBasketRecipes();
  }

  saveRecipe() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      const { recipe } = this.props;
      this.props.saveBasketRecipe(recipe);
    } else {
      // set redirect route after successful login
      this.props.setLoginRedirect(
        this.props.location.pathname,
        'Please login to add recipes to your basket'
      );
      // redirect to login page because user is not authenticted to add recipe to basket
      this.props.history.push('/login');
    }
  }

  updateRecipe() {
    const { basketRecipes } = this.props;
    const { id, adjusted, servings, totalCost } = this.props.recipe;
    const [dbIdOfBasketRecipe] = basketRecipes.filter(
      recipe => recipe.recipe_id === id
    );
    const reqBody = { servings, adjusted, totalCost };
    this.props.updateBasketRecipe(dbIdOfBasketRecipe._id, reqBody);
  }

  render() {
    const { loadingRecipes, classNames, type } = this.props;
    if (loadingRecipes) {
      return <Fragment />;
    }
    const { basketRecipes } = this.props;
    const { id, servings } = this.props.recipe;
    const recipeStatusForSave = basketRecipes.map(
      recipe => id === parseInt(recipe.recipe_id)
    );
    const recipeStatusForUpdate = basketRecipes.map(
      recipe =>
        id === parseInt(recipe.recipe_id) && recipe.servings === servings
    );
    if (recipeStatusForSave.every(e => e === false)) {
      // recipe not in basket, show add to basket button
      return (
        <button
          className={classnames('btn', classNames, type)}
          onClick={this.saveRecipe}
        >
          <i className="fas fa-shopping-basket mr-2" />
          Add to Basket
        </button>
      );
    } else if (recipeStatusForUpdate.every(e => e === false)) {
      return (
        <button
          className={classnames('btn', classNames, type)}
          onClick={this.updateRecipe}
        >
          <i className="fas fa-shopping-basket mr-2" />
          Update in Basket
        </button>
      );
    } else {
      // recipe is in basket show saved button
      return (
        <button className={classnames('btn', classNames, type)}>
          <i className="far fa-check-circle mr-2" />
          In basket
        </button>
      );
    }
  }
}

AddToBasketButton.propTypes = {
  recipe: PropTypes.object.isRequired,
  classNames: PropTypes.string,
  type: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadingRecipes: PropTypes.bool.isRequired,
  basketRecipes: PropTypes.array.isRequired,
  saveBasketRecipe: PropTypes.func.isRequired,
  getBasketRecipes: PropTypes.func.isRequired,
  updateBasketRecipe: PropTypes.func.isRequired
};

export default connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loadingRecipes: state.recipes.isLoading,
    basketRecipes: state.user.basketRecipes
  }),
  { saveBasketRecipe, getBasketRecipes, updateBasketRecipe, setLoginRedirect }
)(withRouter(AddToBasketButton));
