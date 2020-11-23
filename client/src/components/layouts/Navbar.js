import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearUserData } from '../../actions/userActions';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Divider } from './';
import PropTypes from 'prop-types';
import { uppercaseFirst } from '../../Helpers';
import ApiCalendar from 'react-google-calendar-api';

import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logoutUser(() => {
      // redirect to home page after logout
      this.props.history.push('/');
      // clear user data such as favoriteRecipes
      this.props.clearUserData();
      // logout google account
      ApiCalendar.handleSignoutClick();
    });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <nav className="Navbar navbar navbar-expand-md navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand ">
            Thrive
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  to="/search/recipes"
                  className="nav-link"
                  activeClassName="active"
                >
                  Search Recipes
                </NavLink>
              </li>
              <Divider classNames="mx-2 d-sm-none d-md-block" />
              {!isAuthenticated ? (
                <Fragment>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      activeClassName="active"
                      exact
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link"
                      activeClassName="active"
                      exact
                    >
                      Register
                    </NavLink>
                  </li>
                </Fragment>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href={1}
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {uppercaseFirst(user.name)}
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to="/dashboard" className="dropdown-item">
                      Dashboard
                    </Link>
                    <Link to="/basket" className="dropdown-item">
                      Basket
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button
                      className="dropdown-item"
                      onClick={this.handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearUserData: PropTypes.func.isRequired
};

export default connect(
  state => ({
    auth: state.auth
  }),
  { logoutUser, clearUserData }
)(withRouter(Navbar));
