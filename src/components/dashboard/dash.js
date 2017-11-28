import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './dash.css';

class Dashboard extends Component {
  static propTypes = {
    summoner: PropTypes.string.isRequired,
  }

  render() {
    const {summoner} = this.props;

    return (
      <div className='Dashboard'>
        <h1>Timewinder</h1>
        <p> Welcome, {summoner}</p>
      </div>
    );
  }
}

export default Dashboard;
