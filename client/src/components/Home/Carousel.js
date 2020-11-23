import React, { Component } from 'react';
import { Overlay } from '../layouts';
import classnames from 'classnames';

import './Carousel.css';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        value: '',
        error: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { query } = this.state;
    this.props.history.push(`/search/recipes/${query.value}`);
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

  render() {
    const { query } = this.state;
    return (
      <div className="Carousel">
        <Overlay opacity={0.4} />
        <div className="container">
          <div className="row">
            <div className="Carousel-content col-lg-6 col-md-12">
              <h1 className="display-3">Meal Prep</h1>
              <h1>Web App</h1>
              <span className="border-line"></span>
              <form onSubmit={this.handleSubmit}>
                <div className="Carousel-search input-group mb-3 mt-4">
                  <input
                    type="text"
                    name="query"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': query.error
                    })}
                    placeholder="Search Keyword"
                    value={query.value}
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-primary">
                      Search
                    </button>
                  </div>
                </div>
              </form>
              <p className="mt-4">Quick Start!</p>
              <div className="mt-4">
                <ol>
                  <li>
                    <p>Search for recipes by using a certain keyword.</p>
                  </li>
                  <li>
                    <p>
                      Or simply just click search to use our preference engine
                      in order to be suggested recipes based on your
                      preferences!
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
