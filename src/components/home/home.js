import React, { Component } from 'react';

import { REGION } from '../../shared/constants';
import Search from '../../components/common/search.js';
import splash from'./splash.png';

import {
  decodeRecentSearches,
  // RECENT_SEARCHES_KEY
} from '../../shared/helpers/cookieHelper';

import './styles/home.css';
import '../../components/common/styles/search.css';
import '../../components/common/styles/recentsearches.css';

class Home extends Component {
  state = {
    summoner: '',
    server: REGION.NA,
    recentSearches: decodeRecentSearches()
  }
  static propTypes = {}

  componentDidMount() {
    // console.log("retrieved recent searches: ", this.state.recentSearches);
  }

  render() {
    return (
      <div className="Home">
        <div className="content">
          <div className="splashContainer">
            <a href="https://mrpedosloth.deviantart.com/" target="_blank" rel="">
              <img className="splash" src={splash} alt=""/>
            </a>
          </div>
          <h1>Timewinder.gg</h1>
          <h3>Master yourself. Master the enemy.</h3>
          <Search />
          {/*<RecentSearches recentSearches={this.state.recentSearches}/>*/}
        </div>
      </div>
    );
  }
}

export default Home;
