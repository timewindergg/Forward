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

  onRegionSelect = (option) => {
    this.setState({
      server: REGION[option.value],
    });
  }

  _handleKeyPress = (event) => {
    if (event.key === 'Enter'){
      if (this.state.summoner.length > 0){
        window.location.href = `/p/${this.state.server}/${this.state.summoner}`;
      }
      event.preventDefault();
    }
  }


  render() {
    const {summoner, server} = this.state;

    return (
      <div className="Home">
        <div className="content">
          <h1>Timewinder.gg</h1>
          <h3>Master yourself. Master the enemy.</h3>

          <div id="lookup">
            <RegionSelector onRegionSelect={this.onRegionSelect}/>
            <form onSubmit={this.searchSummoner}>
              <input id="searchField" className="textfield" type="text"
                maxLength="25"
                placeholder="Search summoner name"
                value={summoner}
                onChange={(event) => this.setState({summoner: event.target.value})}
                onKeyPress={this._handleKeyPress}
              />
            </form>
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
