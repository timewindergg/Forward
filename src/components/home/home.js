import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { REGION } from '../../shared/constants';
import Search from '../../components/common/search.js';
import splash from'./splash.png';

import {
  decodeRecentSearches,
  // RECENT_SEARCHES_KEY
} from '../../shared/helpers/cookieHelper';

import './styles/home.css';
import '../../components/common/styles/search.css';

class Home extends Component {
  state = {
    summoner: '',
    server: REGION.NA,
    recentSearches: decodeRecentSearches()
  }
  static propTypes = {}

  componentDidMount() {
    console.log("retrieved recent searches: ", this.state.recentSearches);
  }

  render() {
    const {summoner, server} = this.state;

    return (
      <div className="Home">
        <div className="content">
          <div className="splashContainer">
            <img className="splash" src={splash} alt=""/>
          </div>
          <h1>Timewinder.gg</h1>
          <h3>Master yourself. Master the enemy.</h3>
          <Search />
        </div>
      </div>
    );
  }
}

export default Home;
