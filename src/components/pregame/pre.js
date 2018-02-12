import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CurrentMatchOverview from './overview/CurrentMatchOverview';
import CurrentMatchCompare from './compare/CurrentMatchCompare';
import PregameHeader from './PregameHeader';

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

    selectedRed: PropTypes.number.isRequired,
    selectedBlue: PropTypes.number.isRequired
  }

  render() {
    /*
    container has max-width of ~1200px and is centered
    and content flows downwards and user can scroll, obviously
    */
    const {
      summoner,
      currentMatch,
      currentMatchDetails,
      selectedRed,
      selectedBlue
    } = this.props;

    const queueID = !!currentMatch && !!currentMatch.queue ? currentMatch.queue.id : 0;
    const queueName = !!currentMatch && !!currentMatch.queue ? currentMatch.queue.value : '';

    return (
      <div className='rc-pregame'>
        <div className='pregame-container'>
          <PregameHeader
            redBans={currentMatch.red_bans}
            blueBans={currentMatch.blue_bans}
            matchCreationTime={currentMatch.creation}
            queueID={queueID}
          />
          <CurrentMatchOverview
            redTeam={currentMatch.red_team}
            blueTeam={currentMatch.blue_team}
            matchDetails={currentMatchDetails}
            queueName={queueName}
          />
          <div className='pregame-divider'></div>
          <CurrentMatchCompare
            currentMatch={currentMatch}
            currentMatchDetails={currentMatchDetails}
            selectedRed={selectedRed}
            selectedBlue={selectedBlue}
          />
        </div>

      </div>
    );
  }
}

export default Pregame;
