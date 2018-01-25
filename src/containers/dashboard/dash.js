import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {SUMMONER_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getSummonerInfo} from '../../apiutils/summonerAPIUtils';
import {getCurrentMatch} from '../../apiutils/matchAPIUtils';

import Dashboard from '../../components/dashboard/dash';

// Import api utilities.
import { getSummonerMatchHistory } from '../../apiutils/matchHistoryAPIUtils';

class DashboardContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router ONLY
    summoner: PropTypes.object.isRequired,
    matches: PropTypes.array.isRequired,
    currentMatch: PropTypes.object.isRequired,

    getSummonerInfo: PropTypes.func.isRequired,
    getCurrentMatch: PropTypes.func.isRequired,
    getSummonerMatchHistory: PropTypes.func.isRequired
  }

  componentWillMount() {
    const {match, summoner, getSummonerInfo, getCurrentMatch} = this.props;
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
    const {summoner, matches, currentMatch, getSummonerMatchHistory} = this.props;
    return (
      <Dashboard
        summoner={summoner}
        currentMatch={currentMatch}
        matches={matches}
        getSummonerMatchHistory={getSummonerMatchHistory}
      />
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({
  summoner: state.context.summoner,
  matches: state.matchHistory.matches,
  currentMatch: state.match.currentMatch
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSummonerInfo: (summonerName, region) => dispatch(getSummonerInfo(summonerName, region)),
    getCurrentMatch: (summonerName, region) => dispatch(getCurrentMatch(summonerName, region)),
    getSummonerMatchHistory: (summonerId, region, offset, size) => {
      getSummonerMatchHistory(dispatch, summonerId, region, offset, size);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
