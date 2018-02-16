import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './header.css';

// import { selectSummoner } from '../../actions/pregameActions';
import {
  decodeRecentSearches,
} from '../../shared/helpers/cookieHelper';

class Header extends Component {
  static propTypes = {}

  // TODO: fetch recent searches from cookies

  render() {
    return (
      <div className='rc-header'>
        <div className='header-inner'>
          Header content
        </div>
      </div>
    );
  }
}

export default Header;
