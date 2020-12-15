import { SET_ERROR, SET_USER } from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    // Example of saving data to store (commented out) in
    // which auth data makes complete trip - 
    // event, action, reducer, store and back to 
    // mapStateToProps.

    // .then(res => dispatch({
    //   type: SET_USER,
    //   payload: res.data
    // }))

    // However user data should only
    // be saved for logged in user. So for better
    // performance, redirect user to login component -

    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data
      })
    );
}

export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      // save the token to localStorage
      localStorage.setItem('jwtToken', token)
      // add token to auth header for all requests
      setAuthToken(token);
      // decode token
      const decoded = jwt_decode(token)
      // write user to store
      dispatch({
        type: SET_USER,
        payload: decoded
      })
    })
    .catch(err =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data
      })
    );
}

export const logoutUser = () => dispatch => {
  // remove token from localStorage
  localStorage.removeItem('jwtToken');
  // remove token from axios header
  setAuthToken(false);
  // reset user in redux store
  dispatch({
    type: SET_USER,
    payload: {}
  })
}
