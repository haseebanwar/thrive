import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser, clearAuthError } from '../../actions/authActions';
import { userValidator } from '../../Validation';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const initialState = {
  name: {
    value: '',
    error: ''
  },
  email: {
    value: '',
    error: ''
  },
  password: {
    value: '',
    error: ''
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // validate all fields
    const { name, email, password } = this.state;
    const nameError = userValidator.validateName(name.value);
    const emailError = userValidator.validateEmail(email.value);
    const passwordError = userValidator.validatePassword(password.value);
    if ([nameError, emailError, passwordError].every(e => e === false)) {
      // no errors submit the form
      const user = {
        name: name.value,
        email: email.value,
        password: password.value
      };
      this.props.registerUser(user, () => {
        // clear state
        this.setState(initialState);
        // clear auth error
        this.props.clearAuthError();
        // redirect user after successful registration
        this.props.history.push('/dashboard');
      });
    } else {
      // update the state with errors
      this.setState(state => ({
        name: {
          ...state.name,
          error: nameError
        },
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
    if (error.id === 'REGISTER_ERROR') {
      return (
        <div className="alert alert-danger" role="alert">
          {error.msg}
        </div>
      );
    }
    return null;
  }

  render() {
    const { name, email, password } = this.state;
    const { isLoading } = this.props.auth;
    return (
      <div className="container mt-5 mb-5">
        <div className="Register col-lg-6 offset-lg-3 col-md-8 offset-md-2 p-4 border shadow-sm">
          <h2 className="mb-4">Register</h2>
          {this.renderError()}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <input
                  type="text"
                  className={classnames('form-control', {
                    'is-invalid': name.error
                  })}
                  name="name"
                  value={name.value}
                  onChange={this.handleChange}
                  placeholder="Enter your name"
                />
                <div className="invalid-feedback">{name.error}</div>
              </div>
            </div>

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
              Already have an account? <Link to="/login">Login</Link>
            </p>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading && <i className="fas fa-circle-notch fa-spin mr-3" />}
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  clearAuthError: PropTypes.func.isRequired
};

export default connect(
  state => ({
    auth: state.auth
  }),
  { registerUser, clearAuthError }
)(Register);
