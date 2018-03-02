import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CurrentMatchOverview from './overview/CurrentMatchOverview';
import CurrentMatchCompare from './compare/CurrentMatchCompare';
import PregameHeader from './PregameHeader';

import LoadingScreen from '../common/loadingscreen';
import NotFound from '../common/notfound';

import LoadingState from '../../shared/LoadingState';
import { assertDataLoaded } from '../../shared/helpers/loaderHelper.js';

import './styles/pre.css';

class Pregame extends Component {
  static propTypes = {
    summoner: PropTypes.object.isRequired,
    currentMatch: PropTypes.object.isRequired,
    currentMatchDetails: PropTypes.object.isRequired,
    staticData: PropTypes.object.isRequired,

    selectedRed: PropTypes.number.isRequired,
    selectedBlue: PropTypes.number.isRequired,
    loadingState: PropTypes.string.isRequired
  }

  render() {
    /*
    container has max-width of ~1300px and is centered
    content flows downwards and user can scroll, obviously
    */
    const {
      summoner,
      currentMatch,
      currentMatchDetails,
      staticData,
      selectedRed,
      selectedBlue,
      loadingState
    } = this.props;

    if (loadingState === LoadingState.FAILED) {
      return(<NotFound />);
    }


    if (!assertDataLoaded([
      [currentMatch],
      [currentMatchDetails, details => Object.keys(details).length >= 10],
      [summoner],
      [staticData]
    ])){
      const loadingText = `Crunching live game stats, summoners loaded: ${Object.keys(currentMatchDetails).length}/10`

      return(
        <LoadingScreen
          loadingText={loadingText}
        />
      );
    }

    const queueID = !!currentMatch && !!currentMatch.queue ? currentMatch.queue.id : 0;
    const queueName = !!currentMatch && !!currentMatch.queue ? currentMatch.queue.value : '';

    return (
      <div className='rc-pregame'>
        <div className='content'>
          <div className={classNames('pregame-container')}>
            <PregameHeader
              redBans={currentMatch.red_bans}
              blueBans={currentMatch.blue_bans}
              matchCreationTime={currentMatch.creation}
              queueID={queueID}
              staticData={staticData}
            />
            <CurrentMatchOverview
              redTeam={currentMatch.red_team}
              blueTeam={currentMatch.blue_team}
              matchDetails={currentMatchDetails}
              queueName={queueName}
              staticData={staticData}
            />
            <div className='pregame-divider'></div>
            <CurrentMatchCompare
              currentMatch={currentMatch}
              currentMatchDetails={currentMatchDetails}
              selectedRed={selectedRed}
              selectedBlue={selectedBlue}
              queueName={queueName}
              staticData={staticData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Pregame;
