import { SET_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  // at the outset, user is unknown and not authenticated
  isAuthenticated: false,
  user: {}
};

// when store initializes, there is no state. store tells
// reducer to wake up and get to work. this wake-up call
// has action.type @@INIT.
// when store calls authReducer,
// 1st arg is current state but doesn't exist yet, so use
// default value - initialState. 

// 2nd arg is action - gives the reducer the 
// action.type and action.payload. 
// switch is used to match action.type with
// some logic that is applied to the store. 
// it has default action to rewrite current state.

export default function (state = initialState, action) {

  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        // if payload is not empty, set true, else false
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state;
  }
}