import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';

import forward from '../reducers/index';

// const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  return createStore(
    forward,
    preloadedState,
    applyMiddleware(
      thunkMiddleware
    )
  );
}