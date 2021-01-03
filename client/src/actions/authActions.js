import { SET_ERROR, SET_USER } from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    // user data is only saved to store when user 
    // successfully logs in. After user successfully
    // registers, redirect user to login component -

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
      // save token to localStorage
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
  // remove user from store
  dispatch({
    type: SET_USER,
    payload: {}
  })
}
