import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {SUMMONER_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getSummonerInfo} from '../../apiutils/summonerAPIUtils';
import {getCurrentMatch} from '../../apiutils/matchAPIUtils';

import Dashboard from '../../components/dashboard/dash';

// Import api utilities.
import { getSummonerMatchHistory } from '../../apiutils/matchHistoryAPIUtils';

import {getStaticData} from '../../apiutils/contextAPIUtils';

const MH_OFFSET = 0;
const MH_SIZE = 100;

class DashboardContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router ONLY
    summoner: PropTypes.object.isRequired,
    matches: PropTypes.array.isRequired,
    currentMatch: PropTypes.object.isRequired,
    staticData: PropTypes.object.isRequired,

    getSummonerInfo: PropTypes.func.isRequired,
    getCurrentMatch: PropTypes.func.isRequired,
    getSummonerMatchHistory: PropTypes.func.isRequired,
    getStaticData: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const {match, summoner, getSummonerInfo, getSummonerMatchHistory, getCurrentMatch, staticData, getStaticData} = this.props;
    const summonerName = match.params[SUMMONER_PARAM];
    const region = match.params[REGION_PARAM];

    if (Object.keys(staticData).length === 0) {
      getStaticData(region);
    }

    // on page load, fetch info about the summoner if it does not exist
    // or if it is different somehow than what we have in the reducer
    if (Object.keys(summoner).length === 0 || summoner.summonerName !== summonerName) {
      getSummonerInfo(summonerName, region);
      getSummonerMatchHistory(summonerName, region, MH_OFFSET, MH_SIZE);
      getCurrentMatch(summonerName, region);
    }
  }


  render() {
    const {summoner, matches, currentMatch, getSummonerMatchHistory, staticData} = this.props;
    return (
      <Dashboard
        summoner={summoner}
        currentMatch={currentMatch}
        matches={matches}
        staticData={staticData}
      />
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({
  summoner: state.context.summoner,
  matches: state.matchHistory.matches,
  currentMatch: state.match.currentMatch,
  staticData: state.context.staticData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSummonerInfo: (summonerName, region) => dispatch(getSummonerInfo(summonerName, region)),
    getCurrentMatch: (summonerName, region) => dispatch(getCurrentMatch(summonerName, region)),
    getSummonerMatchHistory: (summonerName, region, offset, size) => {
      dispatch(getSummonerMatchHistory(summonerName, region, offset, size));
    },
    getStaticData: (region) => {
      dispatch(getStaticData(region))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
