import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  RecipeInfoBar,
  Divider,
  RecipeSaveButton,
  AddToBasketButton
} from './';
import { Link } from 'react-router-dom';

import './RecipeSearchMedia.css';

class RecipeSearchMedia extends Component {
  render() {
    const {
      id,
      title,
      instructions,
      image,
      readyInMinutes,
      servings,
      cost
    } = this.props;
    return (
      <div className="RecipeSearchMedia row border shadow-sm m-0 mb-5">
        <div className="RecipeSearchMedia-img col-md-4">
          <img src={image} className="shadow" alt="Recipe" />
        </div>
        <div className="RecipeSearchMedia-content col-md-8 p-3 pl-4">
          <h3 className="RecipeSearchMedia-title">{title}</h3>
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
              <span>{cost.totalCost.value}</span>
            </div>
          </RecipeInfoBar>
          <p className="RecipeSearchMedia-text text-primary">
            {instructions.length > 120
              ? `${instructions.substr(0, 120)}..`
              : `${instructions}..`}
          </p>
          <div className="RecipeSearchMedia-btns">
            <RecipeSaveButton
              recipe={{ id, title }}
              type="btn-primary"
              classNames="btn-sm mr-3 my-2"
            />
            <AddToBasketButton
              recipe={{
                id,
                title,
                servings,
                adjusted: false,
                totalCost: cost.totalCost
              }}
              type="btn-primary"
              classNames="btn-sm mr-3 my-2"
            />
            <Link to={`/recipe/${id}`} className="btn btn-sm btn-light my-2">
              Read More
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

RecipeSearchMedia.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  readyInMinutes: PropTypes.number.isRequired,
  servings: PropTypes.number.isRequired,
  cost: PropTypes.object.isRequired
};

export default RecipeSearchMedia;
