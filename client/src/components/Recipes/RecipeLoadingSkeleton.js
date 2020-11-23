import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';

class RecipeLoadingSkeleton extends Component {
  render() {
    return (
      <div className="Recipe">
        <div className="container mt-5 mb-5">
          <div className="Recipe-intro-box row">
            <div className="Recipe-intro-img col-md-5">
              <Skeleton height="100%" />
            </div>
            <div className="Recipe-intro-content col-md-7 p-3">
              <div className="Recipe-intro-content-header">
                <h1>
                  <Skeleton />
                </h1>
              </div>
              <div className="Recipe-intro-content-body text-primary">
                <div className="mt-2 mb-3">
                  <Skeleton height={30} />
                </div>
                <p>
                  <Skeleton count={4} />
                </p>
              </div>
              <hr />
              <div className="Recipe-intro-content-footer row text-primary">
                <div className="Recipe-intro-content-footer-icons col-sm-6">
                  <Skeleton count={3} />
                </div>
                <div className="Recipe-intro-content-footer-btns col-sm-6">
                  <Skeleton width={120} height={50} />
                </div>
              </div>
            </div>
          </div>
          <div className="my-5">
            <Skeleton height={50} />
            <div className="my-5">
              <Skeleton count={3} height={20} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeLoadingSkeleton;
