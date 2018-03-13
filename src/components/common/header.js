import React, { Component } from 'react';

import './styles/header.css';
import './styles/search.css';

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
            <a className='logo' href="/" style={{'textDecoration': 'none'}}>
              <img className="header-icon" src="/api/static/icon.png" alt=""/>
              <span className='header-appname'>Timewinder.gg</span>
            </a>
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
