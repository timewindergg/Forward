import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './dash.css';

class Dashboard extends Component {
  static defaultProps = {
    gotoPregame: () => {console.log('TODO')}
  }

  static propTypes = {
    summoner: PropTypes.object.isRequired,
    currentMatch: PropTypes.object.isRequired,
    gotoPregame: PropTypes.func.isRequired,
  }

  render() {
    const {summoner, currentMatch, gotoPregame} = this.props;
    console.log('components/dashboard/dash.js summoner shown:', summoner);

    const isSummonerInMatch = Object.keys(currentMatch).length > 0;

    return (
      <div className='Dashboard'>
        <h1>Timewinder</h1>
        <p> Welcome, {summoner.name}</p>

        <Link to={`/l/${summoner.name}/${summoner.region}`}>
          <button disabled={!isSummonerInMatch}>
            Go to pregame
          </button>
        </Link>
      </div>
    );
  }
}

export default Dashboard;
