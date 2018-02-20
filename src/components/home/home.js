import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import REGION from '../../shared/constants';
import RegionSelector from './regionselector.js';

import {
  decodeRecentSearches,
  // RECENT_SEARCHES_KEY
} from '../../shared/helpers/cookieHelper';

import './styles/home.css';

const quotes = [
  "Some things do get better with time.",
  "Time flies like an arrow; fruit flies like banana.",
  "Here's the thing about time; if you can't make the most out of any given moment, then you don't deserve a single extra second.",
  "Things aren't gonna' improve themselves.",
  "Time to start some trouble.",
  "One mistake, means I start over. From the very beginning...and over...and over again. Until I get it right.",
  "It's not how much time you have, it's how you use it.",
  "One step closer to greater understanding!",
];

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

  onRegionSelect = (region) => {
    this.setState({
      server: region,
    });
  }

  render() {
    const {summoner, server} = this.state;

    let quote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
      <div className="Home">
        <div className="content">
          <h1>Timewinder.gg</h1>
          <h3>Master yourself. Master the enemy.</h3>

          <div id="lookup">
            <RegionSelector onRegionSelect={this.onRegionSelect}/>
            <input id="searchField" className="textfield" type="text"
              maxlength="25"
              placeholder="Search summoner name"
              value={summoner}
              onChange={(event) => this.setState({summoner: event.target.value})}
            />
            <Link className={classNames({'inactive': this.state.summoner.length === 0})} to={`/p/${server}/${summoner}`}>
              <div className="searchIcon">
                <i className="fas fa-search"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
