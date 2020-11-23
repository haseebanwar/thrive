import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <h1 className="display-1">404</h1>
        <p>The page you're trying to access is not found</p>
        <Link to="/" className="btn btn-light btn-lg">
          Go to Home
        </Link>
      </div>
    );
  }
}

export default NotFound;
