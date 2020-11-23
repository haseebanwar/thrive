import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NonAuthenticatedRoute from './NonAuthenticatedRoute';
import ScrollToTop from 'react-router-scroll-top';
import { Provider } from 'react-redux';
import store from './store.js';
import { loadUser } from './actions/authActions';

import { Navbar, Footer } from './components/layouts';
import Home from './components/Home';
import SearchRecipes from './components/Recipes/SearchRecipes';
import Recipe from './components/Recipes/Recipe';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/User/Dashboard';
import NotFound from './components/Pages/NotFound';
import Basket from './components/User/Basket';

import 'bootstrap';
import './App.scss';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <div className="App">
              <Navbar />
              <Switch>
                {/* <Route exact path="/start" component={Start} />
                <Route exact path="/end" component={End} /> */}
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/search/recipes/:query?"
                  component={SearchRecipes}
                />
                <Route exact path="/recipe/:id" component={Recipe} />
                <NonAuthenticatedRoute
                  exact
                  path="/register"
                  component={Register}
                />
                <NonAuthenticatedRoute exact path="/login" component={Login} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <ProtectedRoute exact path="/basket" component={Basket} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
