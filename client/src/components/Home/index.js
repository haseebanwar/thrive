import React, { Component } from 'react';
import Carousel from './Carousel';
import PopularRecipes from './PopularRecipes';
import Newsletter from './Newsletter';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Carousel history={this.props.history} />
        <PopularRecipes />
        <Newsletter />
      </div>
    );
  }
}

export default Home;
