import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles/header.css';
import './styles/search.css';

import REGION from '../../shared/constants';

import {
  decodeRecentSearches,
} from '../../shared/helpers/cookieHelper';

import Search from './search.js';

class Header extends Component {
  static propTypes = {}

  // TODO: fetch recent searches from cookies
  // <div className='header-gro'
  // so over-engineered
  render() {
    return (
      <div className='rc-header'>
        <div className='header-inner'>
          <div className='header-group'>
            <span className='header-appname'>Timewinder.gg</span>
          </div>
          <div className='header-group'>
            <Search />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
