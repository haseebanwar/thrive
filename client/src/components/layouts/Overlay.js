import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Overlay.css';

class Overlay extends Component {
  render() {
    const { opacity } = this.props;
    return (
      <div
        className="overlay"
        style={{ background: `rgba(0, 0, 0, ${opacity})` }}
      ></div>
    );
  }
}

Overlay.prototypes = {
  opacity: PropTypes.number.isRequired
};

export default Overlay;
