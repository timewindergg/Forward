import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';

import './components/common/styles/timewinder.css';
import './components/common/styles/icons.css';
import './components/common/styles/loadingscreen.css';

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
