import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import REGION from '../../shared/constants';

import {
  decodeRecentSearches,
  // RECENT_SEARCHES_KEY
} from '../../shared/helpers/cookieHelper';

import './home.css';

const quotes = [
  "Some things do get better with time.",
  "Time flies like an arrow; fruit flies like banana.",
  "Here's the thing about time; if you can't make the most out of any given moment, then you don't deserve a single extra second.",
  "Things aren't gonna' improve themselves.",
  "Time to start some trouble.",
  "One mistake, means I start over. From the very beginning...and over...and over again. Until I get it right.",
  "It's not how much time you have, it's how you use it.",
  "One step closer to greater understanding!",
  "Indeed, a wise choice."
];

class Home extends Component {
  state = {
    summoner: '',
    server: REGION.NA,
    recentSearches: decodeRecentSearches()
  }

  componentDidMount() {

    console.log("retrieved recent searches: ", this.state.recentSearches);
  }

  searchSummoner = () => {
    console.log("getting the cookie: ", document.cookie);
    // console.log('searching summoner');
    // TODO: save recent search to cookie
    // document.cookie = ;
  }


  static propTypes = {}

  render() {
    const {summoner, server} = this.state;

    return (
      <div className="Home">
        <div className="content">
          <h1>Timewinder</h1>
          <h3>League match timeline statistics</h3>

          <div id="quote"></div>

          <div id="lookup">
            <select
              id='searchServer' className='form-control'
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
            <input id="searchField" className="textfield form-control" type="text"
              placeholder="Enter Summoner Name"
              value={summoner}
              onChange={(event) => this.setState({summoner: event.target.value})}
            />

            <Link to={`/p/${server}/${summoner}`}>
              <input id="searchButton" className="button" type="submit" name="commit" value="Search"
                onClick={() => this.searchSummoner()}
              />
            </Link>
          </div>

          <div id="searchLoader" className="loader"></div>

          <div className="clear"></div>

          <div id="error">
          </div>

          <div id="history"></div>
          </div>
      </div>
    );
  }
}

export default Home;
