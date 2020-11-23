import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  searchRecipes,
  clearSearchedRecipes,
  sortSearchedRecipes
} from '../../actions/recipesActions';
import PropTypes from 'prop-types';
import { RecipeSearchMedia, RecipeSearchMediaLoading } from '../layouts';
import { withRouter } from 'react-router-dom';

import './SearchedRecipes.css';

const recipesToLoad = 10;

class SearchedRecipes extends Component {
  componentDidMount() {
    const { query } = this.props.match.params;
    if (query) {
      this.props.searchRecipes(recipesToLoad, { query });
    }
  }

  componentWillUnmount() {
    // clear search results
    this.props.clearSearchedRecipes();
  }

  sortRecipes(sortKey) {
    this.props.sortSearchedRecipes(sortKey);
  }

  mapSortKeyToUI(sortKey) {
    switch (sortKey) {
      case 'readyInMinutes':
        return 'Time';
      case 'servings':
        return 'Servings';
      case 'totalCost':
        return 'Price';
      default:
        return sortKey;
    }
  }

  renderRecipes() {
    const { isLoading, searchedRecipes } = this.props;
    let recipes = [];
    if (isLoading) {
      for (let i = 0; i < recipesToLoad; i++) {
        recipes.push(<RecipeSearchMediaLoading key={i} />);
      }
      return recipes;
    } else {
      return searchedRecipes.map(recipe => (
        <RecipeSearchMedia
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          instructions={recipe.instructions[0]}
          image={recipe.image}
          readyInMinutes={recipe.readyInMinutes}
          servings={recipe.servings}
          cost={recipe.cost}
        />
      ));
    }
  }

  render() {
    const { sortKey } = this.props;
    return (
      <div className="SearchedRecipes col-lg-9 col-md-8">
        <div className="row my-3">
          <div className="SearchedRecipes-sort-btn-container col-md-12">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-lg btn-light dropdown-toggle"
                data-toggle="dropdown"
                style={{ color: 'initial' }}
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="text-primary mr-1">
                  <i className="fas fa-sort-amount-down text-secondary mr-2"></i>
                  <span>Sort By:</span>
                </span>
                {this.mapSortKeyToUI(sortKey)}
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={this.sortRecipes.bind(this, 'readyInMinutes')}
                >
                  Time
                </button>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={this.sortRecipes.bind(this, 'servings')}
                >
                  Servings
                </button>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={this.sortRecipes.bind(this, 'totalCost')}
                >
                  Price
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.renderRecipes()}
      </div>
    );
  }
}

SearchedRecipes.propTypes = {
  searchedRecipes: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  sortKey: PropTypes.string.isRequired,
  clearSearchedRecipes: PropTypes.func.isRequired,
  sortSearchedRecipes: PropTypes.func.isRequired,
  searchRecipes: PropTypes.func.isRequired
};

export default connect(
  state => ({
    searchedRecipes: state.recipes.searchedRecipes,
    isLoading: state.recipes.isLoading,
    sortKey: state.recipes.sortKey
  }),
  { clearSearchedRecipes, sortSearchedRecipes, searchRecipes }
)(withRouter(SearchedRecipes));
