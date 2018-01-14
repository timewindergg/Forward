import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {SUMMONER_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getSummonerInfo} from '../../apiutils/summonerAPIUtils';

import Dashboard from '../../components/dashboard/dash';

// Import api utilities.
import { getSummonerMatchHistory } from '../../apiutils/matchHistoryAPIUtils';

class DashboardContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router
    summoner: PropTypes.object.isRequired,
    getSummonerInfo: PropTypes.func.isRequired,
    matches: PropTypes.array.isRequired,
    getSummonerMatchHistory: PropTypes.func.isRequired
  }

  componentWillMount() {
    const {match, summoner, getSummonerInfo} = this.props;
    const summonerName = match.params[SUMMONER_PARAM];
    const region = match.params[REGION_PARAM];

    // on page load, fetch info about the summoner if it does not exist
    // or if it is different somehow than what we have in the reducer
    if (Object.keys(summoner).length === 0 || summoner.summonerName !== summonerName) {
      getSummonerInfo(summonerName, region);
    }
  }


  render() {
    const {summoner, matches, getSummonerMatchHistory} = this.props;
    return (
      <Dashboard
        summoner={summoner}
        matches={matches}
        getSummonerMatchHistory={getSummonerMatchHistory}
      />
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({
  summoner: state.context.summoner,
  matches: state.matchHistory.matches
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSummonerInfo: (summonerName, region) => dispatch(getSummonerInfo(summonerName, region)),
    getSummonerMatchHistory: (summonerId, region, offset, size) => {
      getSummonerMatchHistory(dispatch, summonerId, region, offset, size);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
