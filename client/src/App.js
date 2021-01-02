import React, { Component } from 'react';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import { logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import { SET_USER } from './actions/types';

import PrivateRoute from "./components/common/PrivateRoute";

import { clearCurrentProfile } from "./actions/profileActions";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/not-found/NotFound";

if (localStorage.jwtToken) {
  // decode
  const decoded = jwt_decode(localStorage.jwtToken);
  // check expiry of token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // if expired, logout user
    store.dispatch(logoutUser());
    // and redirect to login
    window.location.href = "/login";
  }

  // set auth header
  setAuthToken(localStorage.jwtToken);
  // dispatch
  store.dispatch({
    type: SET_USER,
    payload: decoded,
  });
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/feed" component={Posts} />
              <Route exact path="/post/:id" component={Post} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profiles" component={Profiles} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profile/:handle" component={Profile} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
