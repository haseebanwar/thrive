import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RecipeInfoBar, Divider } from './';
import { Link } from 'react-router-dom';

import './RecipeCard.css';

class RecipeCard extends Component {
  render() {
    const {
      id,
      title,
      instructions,
      image,
      readyInMinutes,
      servings
    } = this.props;
    return (
      <div className="RecipeCard card">
        <img className="card-img-top" src={image} alt="Recipe" />
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <RecipeInfoBar>
            <div className="col-md-6">
              <i className="far fa-clock mr-2"></i>
              <span>{`${readyInMinutes} mins`}</span>
            </div>
            <Divider />
            <div className="col-md-6">
              <i className="fas fa-utensils mr-2"></i>
              <span>{servings}</span>
            </div>
          </RecipeInfoBar>
          <p className="card-text text-primary">{instructions}</p>
          <Link to={`/recipe/${id}`} className="btn btn-sm btn-primary">
            View Recipe
          </Link>
        </div>
      </div>
    );
  }
}

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  readyInMinutes: PropTypes.number.isRequired,
  servings: PropTypes.number.isRequired
};

export default RecipeCard;
