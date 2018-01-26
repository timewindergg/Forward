import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import createLogger from 'redux-logger';

import forward from '../reducers/index';

// const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  return createStore(
    forward,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware
      )
    )
  );
}