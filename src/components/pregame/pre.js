import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CurrentMatchOverview from './overview/CurrentMatchOverview';
import CurrentMatchCompare from './compare/CurrentMatchCompare';
import PregameHeader from './PregameHeader';

import Header from '../common/header';
import Footer from '../common/footer';
import LoadingScreen from '../common/loadingscreen';

import { assertDataLoaded } from '../../shared/helpers/loaderHelper.js';

import './styles/pre.css';

class Pregame extends Component {
  static propTypes = {
    summoner: PropTypes.object.isRequired,
    currentMatch: PropTypes.object.isRequired,
    currentMatchDetails: PropTypes.object.isRequired,
    staticData: PropTypes.object.isRequired,

    selectedRed: PropTypes.number.isRequired,
    selectedBlue: PropTypes.number.isRequired
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
      selectedBlue
    } = this.props;

    if (!assertDataLoaded([
      [currentMatch],
      [currentMatchDetails, details => Object.keys(details).length >= 10],
      [summoner],
      [staticData]
    ])){
      return(<LoadingScreen/>);
    }

    const queueID = !!currentMatch && !!currentMatch.queue ? currentMatch.queue.id : 0;
    const queueName = !!currentMatch && !!currentMatch.queue ? currentMatch.queue.value : '';

    return (
      <div className='rc-pregame'>
        <Header />
        <div className={classNames('pregame-container', 'content')}>
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

        <Footer />
      </div>
    );
  }
}

export default Pregame;
