import React, { Component } from 'react';
import { Overlay } from '../layouts';

import './FeatureHeadline.css';

class Section extends Component {
  render() {
    return (
      <div className="mt-5">
        <div className="FeatureHeadline">
          <Overlay opacity={0.6} />

          <div className="FeatureHeadline-content col-lg-4 col-md-6 col-sm-12 text-center">
            <h1 className="display-4">App Features</h1>
            <p>
              Connect your calander schedule to be alerted when the best time to
              meal prep would be & have the ability to save your favourite
              recipes. Create an account today!
            </p>
            <button className="btn btn-light mr-3">
              <i className="fas fa-star mr-2"></i>
              Connect Calender
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-heart mr-2"></i>
              Save Recipes
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Section;
