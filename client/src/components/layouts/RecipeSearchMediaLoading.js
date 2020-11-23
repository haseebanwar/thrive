import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';

class RecipeSearchMediaLoading extends Component {
  render() {
    return (
      <div className="RecipeSearchMedia border shadow-sm mb-5">
        <div className="container">
          <div className="row">
            <div className="RecipeSearchMedia-img col-md-4">
              <Skeleton height="100%" width="100%" />
            </div>
            <div className="RecipeSearchMedia-content col-md-8 p-3 pl-4">
              <h3 className="RecipeSearchMedia-title">{<Skeleton />}</h3>
              <div className="mt-2 mb-3">
                <Skeleton height={30} />
              </div>
              <p className="RecipeSearchMedia-text text-primary">
                <Skeleton count={3} />
              </p>
              <div className="RecipeSearchMedia-btns">
                <Skeleton width={200} height={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeSearchMediaLoading;
