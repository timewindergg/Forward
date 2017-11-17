import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './common/timewinder.css';

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
