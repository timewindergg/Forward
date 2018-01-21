import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {SUMMONER_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getSummonerInfo} from '../../apiutils/summonerAPIUtils';
import {getCurrentMatch, getCurrentMatchDetails} from '../../apiutils/matchAPIUtils';

import Pregame from '../../components/pregame/pre';

class PregameContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router

    summoner: PropTypes.object.isRequired,
    currentMatch: PropTypes.object.isRequired,
    currentMatchDetails: PropTypes.object.isRequired,

    getSummonerInfo: PropTypes.func.isRequired,
    getCurrentMatch: PropTypes.func.isRequired,
    getCurrentMatchDetails: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const {
      match,
      summoner,
      currentMatch,
      getSummonerInfo,
      getCurrentMatch,
      getCurrentMatchDetails
    } = this.props;

    const summonerName = match.params[SUMMONER_PARAM];
    const region = match.params[REGION_PARAM];
    
    // on page load, fetch info about the summoner if it does not exist
    // or if it is different somehow than what we have in the reducer
    if (Object.keys(summoner).length === 0 || summoner.summonerName !== summonerName) {
      getSummonerInfo(summonerName, region);
      getCurrentMatch(summonerName, region);
    }

    if (Object.keys(currentMatch).length > 0) {
      this.getDetails(currentMatch, region, getCurrentMatchDetails);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const region = nextProps.match.params[REGION_PARAM];
    // HACK! used to fetch match details right after we LOAD the match (if still needed)
    const wasMatchDetailsEmpty = Object.keys(this.props.currentMatch).length === 0;

    if (wasMatchDetailsEmpty && Object.keys(nextProps.currentMatch).length > 0) {
      this.getDetails(nextProps.currentMatch, region, nextProps.getCurrentMatchDetails);
    }
  }

  // fetch match details
  getDetails = (currentMatch, region, getCurrentMatchDetails) => {
    const {red_team, blue_team} = currentMatch;

    [...red_team, ...blue_team].forEach((summoner) => {
      getCurrentMatchDetails(
        summoner.id,
        summoner.name,
        region,
        summoner.champion_id
      );
    });
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
  getCurrentMatch: (summonerName, region) => dispatch(getCurrentMatch(summonerName, region)),
  getCurrentMatchDetails: (summonerID, summonerName, region, championId) => {
    dispatch(getCurrentMatchDetails(summonerID, summonerName, region, championId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PregameContainer);
