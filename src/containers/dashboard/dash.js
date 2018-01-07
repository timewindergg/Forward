import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {SUMMONER_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getSummonerInfo} from '../../apiutils/summonerAPIUtils';

import Dashboard from '../../components/dashboard/dash';

class DashboardContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router
    summoner: PropTypes.object.isRequired,
    getSummonerInfo: PropTypes.func.isRequired,
    matches: PropTypes.array.isRequired
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
    const {summoner, matches} = this.props;
    console.log(matches);
    return (
      <Dashboard
        summoner={summoner}
        matches={matches}
      />
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({
  summoner: state.context.summoner,
  matches: state.matchHistory.matches
});

// we will probably need this later
const mapDispatchToProps = (dispatch) => ({
  getSummonerInfo: (summonerName, region) => dispatch(getSummonerInfo(summonerName, region)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
