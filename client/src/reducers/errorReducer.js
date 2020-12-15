import { SET_ERROR } from '../actions/types';

const initialState = {};


// export default function (state = initialState, action) {
export default function (state = initialState, action) {
  switch (action.type) {
    // in this case, not saving copy of original state (...state,)
    case SET_ERROR:
      return action.payload;
    default:
      return state;
  }
}