import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { SET_USER } from './actions/types';
import { logoutUser } from './actions/authActions';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Footer from './components/layout/Footer'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';

// this is 'constantly' triggered in background (so Kal tells me)
if (localStorage.jwtToken) {

  // decode
  const decoded = jwt_decode(localStorage.jwtToken)
  const currentTime = Date.now() / 1000;
  // if token expired -
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser())
    // redirect to login
    window.location.href = '/login';
  }
  // if token not expired
  // re-extract user data from localStorage.jwtToken, save to store
  // and add token to auth header
  // (needed because user data can get deleted accidentally)
  setAuthToken(localStorage.jwtToken);
  // write user data to store
  store.dispatch({
    type: SET_USER,
    payload: decoded
  })
  // when SET_USER action is saved to store, Login component is 
  // listening for changes to auth, so it is notified and fires
  // componentWillReceiveProps() which sends authenticated user
  // to /dashboard
  // However if login page is not currently displayed, 
  // componentWillReceiveProps() doesn't exist and so the redirect 
  // to /dashboard doesn't work. 
  // so put redirect in alternative lifecycle method 
  // componentDidMount() which
  // is fired right after component is initialized
}

class App extends Component {
  constructor() {
    super();
    console.log('App constructor()');
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route path="/" exact component={Landing} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
