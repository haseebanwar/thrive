import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class NonAuthenticatedRoute extends Component {
  render() {
    const {
      component: Component,
      isAuthenticated,
      initialLoading,
      ...rest
    } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (!initialLoading) {
            if (!isAuthenticated) {
              return <Component {...props} />;
            } else {
              return (
                <Redirect
                  to={{
                    pathname: '/',
                    state: {
                      from: this.props.location
                    }
                  }}
                />
              );
            }
          }
        }}
      ></Route>
    );
  }
}

export default connect(state => ({
  isAuthenticated: state.auth.isAuthenticated,
  initialLoading: state.auth.initialLoading
}))(NonAuthenticatedRoute);
