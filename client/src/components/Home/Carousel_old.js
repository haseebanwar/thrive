import React, { Component } from 'react';
import { recipeValidator } from '../../Validation';
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

    // validating query
    const queryError = recipeValidator.validateQuery(query.value);
    if (queryError === false) {
      // no errors, proceed
      // clear previous errors
      this.setState(state => ({
        query: {
          ...state.query,
          error: ''
        }
      }));
      this.props.history.push(`/search/recipes/${query.value}`);
    } else {
      // set state with error
      this.setState(state => ({
        query: {
          ...state.query,
          error: queryError
        }
      }));
    }
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
              <h1 className="display-2">Meal Prep</h1>
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
                    placeholder="Search Recipes"
                    value={query.value}
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-primary">
                      Search
                    </button>
                  </div>
                  <div className="invalid-feedback">{query.error}</div>
                </div>
              </form>
              <p className="mt-4">
                Quick Start! Search for recipes by using a certain keyword.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
