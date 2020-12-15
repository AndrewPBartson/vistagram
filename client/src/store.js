import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
// import rootReducer from './reducers';

const middleware = [thunk];

const store = createStore(
  rootReducer,
  {},
  // compose() - compose a function with two enhancements
  // window.etc is to see Store in browser devtools,
  // remove for production
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)







export default store;
