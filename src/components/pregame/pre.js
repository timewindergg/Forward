import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CurrentMatchOverview from './overview/CurrentMatchOverview';
import CurrentMatchCompare from './compare/CurrentMatchCompare';

import './pre.css';

class Pregame extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  static propTypes = {
    summoner: PropTypes.object.isRequired,
    currentMatch: PropTypes.object.isRequired,
    currentMatchDetails: PropTypes.object.isRequired,
  }

  render() {
    console.log(this.props);
    const {summoner, currentMatch, currentMatchDetails} = this.props;

    return (
      <div className='rc-pregame'>
        <h1>Timewinder</h1>
        <p> Welcome PREGAME, {this.props.summoner.name}</p>
        <div className='pregame-container'>
          <CurrentMatchOverview
            redTeam={currentMatch.red_team}
            blueTeam={currentMatch.blue_team}
          />
          <CurrentMatchCompare
            currentMatchDetails={currentMatchDetails}
          />
        </div>

      </div>
    );
  }
}

export default Pregame;
