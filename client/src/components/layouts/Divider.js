import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './Divider.css';

class Divider extends Component {
  render() {
    const { classNames } = this.props;
    return <span className={classnames('Divider', classNames)}></span>;
  }
}

Divider.propTypes = {
  classNames: PropTypes.string
};

export default Divider;
