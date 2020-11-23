import React, { Component } from 'react';

import Human from '../../images/human.jpg';

import './Quote.css';

class Quote extends Component {
  render() {
    return (
      <div className="Quote container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="Quote-content">
              <div className="Quote-img">
                <img src={Human} alt="" />
              </div>
              <div className="Quote-text ml-4">
                <h6 className="text-secondary">What Our Community Said</h6>
                <em className="text-primary">
                  Food is the necessity of life. It provides nutrition,
                  sustenance and growth to human body. Food is what people and
                  animals eat to survive.
                </em>
                <p className="Quote-author m-0 mt-2">Haseeb Anwar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Quote;
