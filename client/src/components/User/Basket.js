import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getBasketRecipes,
  removeBasketRecipe
} from '../../actions/userActions';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { uppercaseFirst, adjustCost } from '../../Helpers';

import './Basket.css';

class Basket extends Component {
  componentDidMount() {
    this.props.getBasketRecipes();
  }

  removeRecipe(id) {
    this.props.removeBasketRecipe(id);
  }

  totalCostOfBasket() {
    const { basketRecipes } = this.props.userData;
    const sum = basketRecipes.reduce((a, b) => {
      const adjustedValue =
        b['totalCost']['unit'] === 'Cents'
          ? b['totalCost']['value'] / 100
          : b['totalCost']['value'];
      return a + adjustedValue;
    }, 0);
    return adjustCost(parseFloat(sum.toFixed(2)), { unit: '$' });
  }

  totalServingsOfBasket() {
    const { basketRecipes } = this.props.userData;
    const totalServings = basketRecipes.reduce((a, b) => a + b['servings'], 0);
    return parseInt(totalServings);
  }

  render() {
    const { isLoading, basketRecipes } = this.props.userData;
    if (isLoading) {
      return <Skeleton count={5} height={50} />;
    }
    const { user } = this.props;
    const totalCostOfBasket = this.totalCostOfBasket();
    return (
      <div className="Basket">
        <div className="container mt-5 mb-5">
          <div>
            <h2>{`Your Basket, ${uppercaseFirst(user.name)}`}</h2>
          </div>
          <hr />

          <div className="Basket-favorite-recipes">
            <h4>Manage your Basket Recipes</h4>
            <table className="table mt-4">
              <thead>
                <tr>
                  <th>Recipe</th>
                  <th>Servings</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {basketRecipes.map(recipe => (
                  <tr>
                    <td>
                      <Link
                        to={`/recipe/${recipe.recipe_id}${
                          recipe.adjusted === true
                            ? `?newServings=${recipe.servings}`
                            : ''
                        }`}
                        className="text-primary"
                      >
                        {recipe.title}
                      </Link>
                    </td>
                    <td>{recipe.servings}</td>
                    {recipe.totalCost.unit === '$' ? (
                      <td>{`${recipe.totalCost['unit']}${recipe.totalCost['value']}`}</td>
                    ) : (
                      <td>{`${recipe.totalCost['value']} ${recipe.totalCost['unit']}`}</td>
                    )}
                    <td>
                      <Link
                        to={`/recipe/${recipe.recipe_id}${
                          recipe.adjusted === true
                            ? `?newServings=${recipe.servings}`
                            : ''
                        }`}
                        className="text-primary"
                      >
                        <i
                          title={`Edit ${recipe.title}`}
                          className="fas fa-pencil-alt mr-3"
                        />
                      </Link>
                      <i
                        title={`Remove ${recipe.title}`}
                        className="fas fa-trash text-secondary"
                        onClick={this.removeRecipe.bind(this, recipe._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="Basket-totalFields mt-4 text-secondary">
              <p className="Basket-totalFields">
                Total Basket Servings: {this.totalServingsOfBasket()}
              </p>
              <p className="Basket-totalFields">
                Total Basket Cost:{' '}
                {totalCostOfBasket.unit === '$'
                  ? `${totalCostOfBasket.unit}${totalCostOfBasket.value}`
                  : `${totalCostOfBasket.value} ${totalCostOfBasket.unit}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Basket.propTypes = {
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  getBasketRecipes: PropTypes.func.isRequired,
  removeBasketRecipe: PropTypes.func.isRequired
};

export default connect(
  state => ({
    user: state.auth.user,
    userData: state.user
  }),
  { getBasketRecipes, removeBasketRecipe }
)(Basket);
