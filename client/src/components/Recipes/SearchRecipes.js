import React, { Component } from 'react';
import classnames from 'classnames';
import SearchForm from './SearchForm';
import SearchedRecipes from './SearchedRecipes';

import './SearchRecipes.css';

class SearchRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: false
    };
    this.changeSearchQuery = this.changeSearchQuery.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.query) {
      this.setState({ searched: true });
    }
  }

  changeSearchQuery() {
    this.setState({ searched: true });
  }

  render() {
    const { searched } = this.state;
    const { query } = this.props.match.params;
    return (
      <div className="SearchRecipes">
        <div className="container mt-4 mb-5">
          <div className="row">
            <div
              className={classnames('SearchRecipes-animate mt-4', {
                'col-lg-3 col-md-4': searched,
                'col-lg-6 offset-lg-3 col-md-8 offset-md-2': !searched
              })}
            >
              <SearchForm
                collapsed={searched}
                changeSearchQuery={this.changeSearchQuery}
                query={query}
              />
            </div>
            {searched && <SearchedRecipes />}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchRecipes;
