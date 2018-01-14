import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './dash.css';

class Dashboard extends Component {
  static propTypes = {
    summoner: PropTypes.object.isRequired,
  }

  render() {
    const {summoner} = this.props;
    console.log('components/dashboard/dash.js summoner shown:', summoner);

    return (
      <div className='Dashboard'>
        <h1>Timewinder</h1>
        <p> Welcome, {summoner.summonerName}</p>
      </div>
    );
  }
}

export default Dashboard;
