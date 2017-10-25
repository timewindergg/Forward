// main.js
const React = require('react');
const ReactDOM = require('react-dom');

// import { Provider } from 'react-redux';

// import configureStore from './stores/configureStore';

import App from './components/App';

// const store = configureStore();

const rootApp = (<App />);
ReactDOM.render(
  rootApp,
  document.getElementById('container')
);
// ReactDOM.render(

//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('container')
// );