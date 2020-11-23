import React, { Component, Fragment } from 'react';

import './RecipeInfoBar.css';

class RecipeInfoBar extends Component {
  render() {
    return (
      <Fragment>
        <hr />
        <div className="RecipeInfoBar text-primary">{this.props.children}</div>
        <hr />
      </Fragment>
    );
  }
}

export default RecipeInfoBar;
