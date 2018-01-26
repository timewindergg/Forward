import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {SUMMONER_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getSummonerInfo} from '../../apiutils/summonerAPIUtils';
import {
  getCurrentMatch,
  getCurrentMatchDetails
} from '../../apiutils/matchAPIUtils';

import Pregame from '../../components/pregame/pre';

class PregameContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router

    summoner: PropTypes.object.isRequired,
    currentMatch: PropTypes.object.isRequired,
    currentMatchDetails: PropTypes.object.isRequired,

    getSummonerInfo: PropTypes.func.isRequired,
    getCurrentMatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const {
      match,
      summoner,
      currentMatch,
      getSummonerInfo,
      getCurrentMatch
    } = this.props;

    const summonerName = match.params[SUMMONER_PARAM];
    const region = match.params[REGION_PARAM];
    
    // on page load, fetch info about the summoner if it does not exist
    // or if it is different somehow than what we have in the reducer
    if (Object.keys(summoner).length === 0 || summoner.summonerName !== summonerName) {
      getSummonerInfo(summonerName, region);
      getCurrentMatch(summonerName, region);
    }
  }

  render() {
    const {summoner, currentMatch, currentMatchDetails} = this.props;

    return (
      <Pregame
        summoner={summoner}
        currentMatch={currentMatch}
        currentMatchDetails={currentMatchDetails}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  summoner: state.context.summoner,
  currentMatch: state.match.currentMatch,
  currentMatchDetails: state.match.currentMatchDetails
});

const mapDispatchToProps = (dispatch) => ({
  getSummonerInfo: (summonerName, region) => dispatch(getSummonerInfo(summonerName, region)),
  getCurrentMatch: (summonerName, region) => {
    dispatch(getCurrentMatch(summonerName, region, (data) => {
      const summoners = [...data.red_team, ...data.blue_team];
      summoners.forEach((s) => {
        dispatch(getCurrentMatchDetails(s.id, s.name, region, s.champion_id));
      });
    }))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PregameContainer);
