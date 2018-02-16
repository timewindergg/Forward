import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './header.css';

// import { selectSummoner } from '../../actions/pregameActions';
import {
  decodeRecentSearches,
} from '../../shared/helpers/cookieHelper';


class Header extends Component {
  static propTypes = {}

  renderSearchBar = () => {
    return (
      <div></div>
    );
  }

  // TODO: fetch recent searches from cookies
// <div className='header-gro'
  // so over-engineered
  render() {
    return (
      <div className='rc-header'>
        <div className='header-inner'>
          <div className='header-group'>
            <span className='header-appname'>Timewindr</span>
          </div>
          <div className='header-group'>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
