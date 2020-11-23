import React, { Component } from 'react';

import './Newsletter.css';

class Newsletter extends Component {
  render() {
    return (
      <div className="Newsletter">
        <div className="container">
          <div className="col-lg-10 offset-lg-1 col-md-12">
            <div className="row">
              <div className="col-md-7">
                <h3>Sign Up for Our Newsletter</h3>
                <p>
                  Keeping you in the know on all the latest and greatest food
                  and travel news, and other special offers
                </p>
              </div>
              <div className="Newsletter-inputbox col-md-5">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your e-mail here"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    style={{ background: 'transparent', borderStyle: 'dotted' }}
                  />
                  <div
                    className="input-group-append"
                    style={{ background: 'none' }}
                  >
                    <span className="input-group-text" id="basic-addon2">
                      <i className="fas fa-paper-plane"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsletter;
