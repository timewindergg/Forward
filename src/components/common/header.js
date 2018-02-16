import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './header.css';
import REGION from '../../shared/constants';

import {
  decodeRecentSearches,
} from '../../shared/helpers/cookieHelper';


class Header extends Component {
  state = {
    summoner: '',
    server: REGION.NA,
    recentSearches: decodeRecentSearches()
  }

  static propTypes = {}

  renderSearchBar = () => {
    const {summoner, server, recentSearches} = this.state;

    return (
      <div className='header-search-bar'>
        <select
          className='header-region'
          onChange={event => this.setState({server: event.target.value})}
          value={server}
        >
          <option value={REGION.NA}>NA</option>
          <option value={REGION.EUW}>EUW</option>
          <option value={REGION.EUNE}>EUNE</option>
          <option value={REGION.KR}>KR</option>
          <option value={REGION.BR}>BR</option>
          <option value={REGION.LAN}>LAN</option>
          <option value={REGION.LAS}>LAS</option>
          <option value={REGION.OCE}>OCE</option>
          <option value={REGION.RU}>RU</option>
          <option value={REGION.TR}>TR</option>
        </select>
        <input className='header-text-input' type='text' placeholder='Summoner:'
          value={summoner}
          onChange={(event) => this.setState({summoner: event.target.value})}
        />

        <Link to={`/p/${server}/${summoner}`}>
          <input className='header-btn' type='submit' name='commit' value='Search' />
        </Link>
        <Link to={`/l/${server}/${summoner}`}>
          <input className={classNames('header-btn', 'header-live-btn')} type='submit' name='commit' value='Live' />
        </Link>
      </div>
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
            {this.renderSearchBar()}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
