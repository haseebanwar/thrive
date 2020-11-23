import React, { Component } from 'react';
import { Logo } from './';
import { Link } from 'react-router-dom';

import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="Footer text-center">
        <Logo />
        <p className="m-0 mt-3 mb-2">&copy; 2020 Haseeb Anwar</p>
        <p className="Footer-links">
          <Link to="/" className="mr-3">
            Home
          </Link>
          |
          <Link to="/search/recipes" className="mx-3">
            Search Recipes
          </Link>
          |
          <Link to="/login" className="mx-3">
            Login
          </Link>
          |
          <Link to="/register" className="ml-3">
            Register
          </Link>
        </p>
        <p>Follow our Social Media</p>
        <div className="Footer-social-icons">
          <i className="fab fa-facebook mr-3" />
          <i className="fab fa-twitter mr-3" />
          <i className="fab fa-instagram" />
        </div>
      </footer>
    );
  }
}

export default Footer;
