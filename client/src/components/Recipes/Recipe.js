import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getRecipeInformation,
  adjustRecipe
} from '../../actions/recipesActions';
import PropTypes from 'prop-types';
import {
  RecipeInfoBar,
  Divider,
  RecipeSaveButton,
  AddToBasketButton
} from '../layouts';
import RecipeLoadingSkeleton from './RecipeLoadingSkeleton';
import classnames from 'classnames';
import { recipeValidator } from '../../Validation';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import './Recipe.css';

const initialState = {
  showDropdown: false,
  newServings: {
    value: '',
    error: ''
  },
  adjusted: false
};

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.adjustRecipe = this.adjustRecipe.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearAdjustments = this.clearAdjustments.bind(this);
  }

  componentDidMount() {
    // get recipe id
    const { id } = this.props.match.params;
    // get recipe information
    this.props.getRecipeInformation(id, () => {
      // check if recipe is adjusted
      const { newServings } = queryString.parse(this.props.location.search);
      if (newServings) {
        this.props.adjustRecipe(newServings, this.props.recipe);
        this.setState(state => ({
          newServings: {
            ...state.newServings,
            value: newServings
          },
          adjusted: true
        }));
      }
    });
  }

  clearAdjustments() {
    // get recipe id
    const { id } = this.props.match.params;
    // get recipe information
    this.props.getRecipeInformation(id, () => {
      this.setState(initialState);
    });
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

  toggleDropdown() {
    this.setState(state => ({
      showDropdown: !state.showDropdown,
      newServings: {
        ...state.newServings,
        error: ''
      }
    }));
  }

  adjustRecipe(evt) {
    evt.preventDefault();
    const { newServings } = this.state;
    const newServingsError = recipeValidator.validateServings(
      newServings.value
    );
    if (newServingsError === false) {
      // no errors, adjust the recipe
      this.props.adjustRecipe(newServings.value, this.props.recipe);
      // clear newServings field and hide dropdown
      this.setState(state => ({
        newServings: {
          ...state.newServings,
          error: ''
        },
        showDropdown: false,
        adjusted: true
      }));
      // add newServings in the URI
      this.props.history.push(
        `/recipe/${this.props.match.params.id}?newServings=${newServings.value}`
      );
    } else {
      // set state with error
      this.setState(state => ({
        newServings: {
          ...state.newServings,
          error: newServingsError
        }
      }));
    }
  }

  render() {
    const { isLoading, recipe } = this.props;
    if (isLoading || Object.keys(recipe).length === 0) {
      return <RecipeLoadingSkeleton />;
    } else {
      const {
        id,
        title,
        image,
        equipmentIntro,
        servings,
        readyInMinutes,
        cost,
        nutrition,
        analyzedInstructions,
        ingredients
      } = recipe;
      const { nutrients, caloricBreakdown } = nutrition;
      const { showDropdown, newServings, adjusted } = this.state;
      return (
        <div className="Recipe">
          <div className="container mb-5">
            <div className="d-flex mt-4 mb-3">
              <div className="btn-group ml-auto">
                <button
                  type="button"
                  className="btn btn-light dropdown-toggle"
                  style={{ color: 'initial' }}
                  onClick={this.toggleDropdown}
                >
                  <span className="text-primary mr-1">
                    <i className="fas fa-sort-amount-down text-secondary mr-2"></i>
                  </span>
                  Adjust Recipe
                </button>
                <div
                  className={classnames(
                    'dropdown-menu dropdown-menu-right p-3',
                    { show: showDropdown }
                  )}
                >
                  <form onSubmit={this.adjustRecipe}>
                    <div className="input-group input-group-sm">
                      <input
                        type="text"
                        className={classnames('form-control', {
                          'is-invalid': newServings.error
                        })}
                        name="newServings"
                        value={newServings.value}
                        onChange={this.handleChange}
                        placeholder="Enter desired servings"
                        style={{ width: '250px' }}
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          Adjust
                        </button>
                      </div>
                      <div className="invalid-feedback">
                        {newServings.error}
                      </div>
                    </div>
                  </form>
                  {adjusted && (
                    <div className="mt-2" style={{ fontSize: '0.8rem' }}>
                      <Link
                        to={`/recipe/${id}`}
                        onClick={this.clearAdjustments}
                        className="mt-5"
                      >
                        Clear Adjustments
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="Recipe-intro-box row">
              <div className="Recipe-intro-img col-md-5">
                <img src={image} className="shadow" alt="Recipe" />
              </div>
              <div className="Recipe-intro-content col-md-7 p-3">
                <div className="Recipe-intro-content-header">
                  <h1>{title}</h1>
                </div>
                <div className="Recipe-intro-content-body text-primary">
                  <RecipeInfoBar>
                    <div className="col-lg-4 col-md-5">
                      <i className="far fa-clock mr-2"></i>
                      <span>{`${readyInMinutes} mins`}</span>
                    </div>
                    <Divider />
                    <div className="col-lg-4 col-md-3">
                      <i className="fas fa-utensils mr-2"></i>
                      <span>{servings}</span>
                    </div>
                    <Divider />
                    <div className="col-lg-4 col-md-4">
                      <i className="fas fa-dollar-sign mr-2"></i>
                      <span>{`${cost.totalCost.value}${
                        cost.totalCost.unit === 'Cents' ? ' Cents' : ''
                      }`}</span>
                    </div>
                  </RecipeInfoBar>
                  <div>{equipmentIntro}</div>
                </div>
                <hr />
                <div className="Recipe-intro-content-footer row text-primary">
                  <div className="Recipe-intro-content-footer-icons col-sm-6">
                    <div className="footer-icons-box">
                      <i className="far fa-check-circle text-secondary mr-3"></i>
                      <span>{`Protein ${caloricBreakdown.percentProtein}%`}</span>
                    </div>
                    <div className="footer-icons-box mt-2">
                      <i className="far fa-check-circle text-secondary mr-3"></i>
                      <span>{`Fat ${caloricBreakdown.percentFat}%`}</span>
                    </div>
                    <div className="footer-icons-box mt-2">
                      <i className="far fa-check-circle text-secondary mr-3"></i>
                      <span>{`Carbs ${caloricBreakdown.percentCarbs}%`}</span>
                    </div>
                  </div>
                  <div className="Recipe-intro-content-footer-btns col-sm-6">
                    <RecipeSaveButton
                      recipe={{ id, title }}
                      type="btn-primary"
                      classNames="btn-block mb-2"
                    />
                    <AddToBasketButton
                      recipe={{
                        id,
                        title,
                        servings,
                        adjusted,
                        totalCost: cost.totalCost
                      }}
                      type="btn-light"
                      classNames="btn-block"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="Recipe-tabs mt-5 mb-5">
              <ul className="nav nav-tabs" id="recipeTabs" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="ingredients-tab"
                    data-toggle="tab"
                    href="#ingredients"
                    role="tab"
                    aria-controls="ingredients"
                    aria-selected="true"
                  >
                    Ingredients
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="instructions-tab"
                    data-toggle="tab"
                    href="#instructions"
                    role="tab"
                    aria-controls="instructions"
                    aria-selected="false"
                  >
                    Instructions
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="nutritions-tab"
                    data-toggle="tab"
                    href="#nutrients"
                    role="tab"
                    aria-controls="nutrients"
                    aria-selected="false"
                  >
                    Nutrients
                  </a>
                </li>
              </ul>
              <div className="tab-content mt-4 mb-4" id="recipeTabsContent">
                <div
                  className="tab-pane fade show active"
                  id="ingredients"
                  role="tabpanel"
                  aria-labelledby="ingredients-tab"
                >
                  <div className="Recipe-ingredients mt-5">
                    <h2>Ingredients</h2>
                    <table className="table mt-4">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Ingredient</th>
                          <th>US</th>
                          <th>Metric</th>
                          <th>
                            Est. Cost <small>(CAD)</small>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ingredients.map((ingredient, i) => {
                          const { amount } = ingredient;
                          return (
                            <tr key={i}>
                              <th>
                                <img src={ingredient.image} alt="ingredient" />
                              </th>
                              <th>{ingredient.name}</th>
                              <td>{`${amount['us']['value']} ${amount['us']['unit']}`}</td>
                              <td>{`${amount['metric']['value']} ${amount['metric']['unit']}`}</td>
                              {ingredient.cost['unit'] === '$' ? (
                                <th>{`${ingredient.cost['unit']}${ingredient.cost['value']}`}</th>
                              ) : (
                                <th>{`${ingredient.cost['value']} ${ingredient.cost['unit']}`}</th>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="instructions"
                  role="tabpanel"
                  aria-labelledby="instructions-tab"
                >
                  <div className="Recipe-instructions mt-5">
                    <h2>Directions</h2>
                    <hr />
                    {analyzedInstructions.map(instruction => (
                      <div
                        key={instruction.number}
                        className="Recipe-instructions-step"
                      >
                        <p className="Recipe-instructions-step-number border">
                          {instruction.number}
                        </p>
                        <p>{instruction.step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="nutrients"
                  role="tabpanel"
                  aria-labelledby="nutritions-tab"
                >
                  <div className="Recipe-nutritions mt-5">
                    <h2>
                      Nutrition:{' '}
                      <small className="text-primary">(per serving)</small>
                    </h2>
                    <table className="table mt-4">
                      <tbody>
                        {nutrients.map((nutrient, i) => (
                          <tr key={i}>
                            <th>{nutrient.title}</th>
                            <td>{`${nutrient.amount}${nutrient.unit}`}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getRecipeInformation: PropTypes.func.isRequired,
  adjustRecipe: PropTypes.func.isRequired
};

export default connect(
  state => ({
    recipe: state.recipes.recipe,
    isLoading: state.recipes.isLoading
  }),
  { getRecipeInformation, adjustRecipe }
)(Recipe);
