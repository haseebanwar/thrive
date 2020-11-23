import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, clearAuthError } from '../../actions/authActions';
import { userValidator } from '../../Validation';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const initialState = {
  email: {
    value: '',
    error: ''
  },
  password: {
    value: '',
    error: ''
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // validate all fields
    const { email, password } = this.state;
    const emailError = userValidator.validateEmail(email.value);
    const passwordError = userValidator.validatePassword(password.value);
    if ([emailError, passwordError].every(e => e === false)) {
      // no errors submit the form
      const user = {
        email: email.value,
        password: password.value
      };
      this.props.loginUser(user, () => {
        // clear state
        this.setState(initialState);
        // clear auth error
        this.props.clearAuthError();
        // redirect user after successful login
        const { redirectRoute } = this.props.auth.loginRedirect;
        this.props.history.push(redirectRoute || '/dashboard');
      });
    } else {
      // update the state with errors
      this.setState(state => ({
        email: {
          ...state.email,
          error: emailError
        },
        password: {
          ...state.password,
          error: passwordError
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

  renderError() {
    const { error } = this.props.auth;
    if (error.id === 'LOGIN_ERROR') {
      return (
        <div className="alert alert-danger" role="alert">
          {error.msg}
        </div>
      );
    }
    return null;
  }

  render() {
    const { email, password } = this.state;
    const { isLoading, loginRedirect } = this.props.auth;
    return (
      <div className="container mt-5 mb-5">
        <div className="Login col-lg-6 offset-lg-3 col-md-8 offset-md-2 p-4 border shadow-sm">
          {loginRedirect.redirectMsg && (
            <div className="alert alert-info">{loginRedirect.redirectMsg}</div>
          )}
          <h2 className="mb-4">Login</h2>
          {this.renderError()}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-at"></i>
                  </div>
                </div>
                <input
                  type="text"
                  className={classnames('form-control', {
                    'is-invalid': email.error
                  })}
                  name="email"
                  value={email.value}
                  onChange={this.handleChange}
                  placeholder="Your email"
                />
                <div className="invalid-feedback">{email.error}</div>
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-lock"></i>
                  </div>
                </div>
                <input
                  type="password"
                  className={classnames('form-control', {
                    'is-invalid': password.error
                  })}
                  name="password"
                  value={password.value}
                  onChange={this.handleChange}
                  placeholder="And password"
                />
                <div className="invalid-feedback">{password.error}</div>
              </div>
            </div>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading && <i className="fas fa-circle-notch fa-spin mr-3" />}
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  clearAuthError: PropTypes.func.isRequired
};

export default connect(
  state => ({
    auth: state.auth
  }),
  { loginUser, clearAuthError }
)(Login);
