import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';

class RecipeCardLoading extends Component {
  render() {
    return (
      <div className="RecipeCard card">
        <Skeleton height="12rem" />
        <div className="card-body">
          <h6 className="card-title">
            <Skeleton />
          </h6>
          <div className="mt-2 mb-3">
            <Skeleton height={30} />
          </div>
          <p className="card-text text-primary">
            <Skeleton count={3} />
          </p>
          <Skeleton width={100} height={30} />
        </div>
      </div>
    );
  }
}

export default RecipeCardLoading;
