import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './components/common/styles/timewinder.css';
import './components/common/styles/icons.css';

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
