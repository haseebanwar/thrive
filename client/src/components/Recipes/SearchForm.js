import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchRecipes } from '../../actions/recipesActions';
import { cuisines, diets, mealTypes } from '../../data/recipeFilters';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const recipesToLoad = 4;

const initialState = {
  query: {
    value: '',
    error: ''
  },
  cuisine: {
    value: '',
    error: ''
  },
  diet: {
    value: '',
    error: ''
  },
  mealType: {
    value: '',
    error: ''
  }
};

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      query: {
        ...initialState.query,
        value: props.query
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const field = evt.target.name;
    const fieldVal = evt.target.value;
    this.setState(state => ({
      [field]: {
        ...state[field],
        value: fieldVal
      }
    }));
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { query, cuisine, diet, mealType } = this.state;
    const filters = {
      query: query.value,
      cuisine: cuisine.value,
      diet: diet.value,
      type: mealType.value
    };

    this.props.changeSearchQuery();
    // search recipes
    this.props.searchRecipes(recipesToLoad, filters);
  }

  render() {
    const { query, cuisine, diet, mealType } = this.state;
    const { collapsed } = this.props;
    return (
      <div className="SearchForm border shadow-sm p-3 py-4">
        <h4>Search Recipes</h4>
        <form onSubmit={this.handleSubmit}>
          <div
            className={classnames('form-group mb-3 mt-4', {
              'form-group-sm': collapsed
            })}
          >
            <label>Search Keyword</label>
            <input
              type="text"
              name="query"
              className={classnames('form-control', {
                'form-control-sm': collapsed,
                'is-invalid': query.error
              })}
              placeholder="Search Keyword"
              value={query.value}
              onChange={this.handleChange}
            />
            <div className="invalid-feedback">{query.error}</div>
          </div>
          <div className="form-group">
            <label>Diet</label>
            <select
              className={classnames('custom-select', {
                'custom-select-sm': collapsed
              })}
              name="diet"
              value={diet.value}
              onChange={this.handleChange}
            >
              <option value="">Any</option>
              {diets.map(diet => (
                <option key={diet} value={diet}>
                  {diet}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Meal Type</label>
            <select
              className={classnames('custom-select', {
                'custom-select-sm': collapsed
              })}
              name="mealType"
              value={mealType.value}
              onChange={this.handleChange}
            >
              <option value="">Any</option>
              {mealTypes.map(mealType => (
                <option key={mealType} value={mealType}>
                  {mealType}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Cuisine</label>
            <select
              className={classnames('custom-select', {
                'custom-select-sm': collapsed
              })}
              name="cuisine"
              value={cuisine.value}
              onChange={this.handleChange}
            >
              <option value="">Any</option>
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-4 ml-auto">
            <button
              type="submit"
              className={classnames('btn btn-block btn-primary', {
                'btn-sm': collapsed
              })}
            >
              Search Recipes
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  changeSearchQuery: PropTypes.func.isRequired,
  query: PropTypes.string,
  searchRecipes: PropTypes.func.isRequired
};

export default connect(null, { searchRecipes })(SearchForm);
