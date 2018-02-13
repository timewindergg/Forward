import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {CHAMPION_PARAM, SUMMONER_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getSummonerInfo} from '../../apiutils/summonerAPIUtils';
import {getUserChampionStats} from '../../apiutils/championStatsAPIUtils';

import ChampionStats from '../../components/championstats/championstats';

class ChampionStatsContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router ONLY
    summoner: PropTypes.object.isRequired,
    userChampionStats: PropTypes.object.isRequired,

    getSummonerInfo: PropTypes.func.isRequired,
    getUserChampionStats: PropTypes.func.isRequired
  }

  componentWillMount() {
    const {match, summoner, getSummonerInfo, getUserChampionStats} = this.props;
    const summonerName = match.params[SUMMONER_PARAM];
    const region = match.params[REGION_PARAM];
    const championName = match.params[CHAMPION_PARAM];

    // on page load, fetch info about the summoner if it does not exist
    // or if it is different somehow than what we have in the reducer
    if (Object.keys(summoner).length === 0 || summoner.summonerName !== summonerName) {
      getSummonerInfo(summonerName, region);
      getUserChampionStats(summonerName, region, championName);
    } else {
      getUserChampionStats(summonerName, region, championName);
    }
  }

  render() {
    const {summoner, userChampionStats} = this.props;
    return (
      <ChampionStats
        summoner={summoner}
        userChampionStats={userChampionStats}
      />
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({
  summoner: state.context.summoner,
  userChampionStats: state.championStats.championStats
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSummonerInfo: (summonerName, region) => dispatch(getSummonerInfo(summonerName, region)),
    getUserChampionStats: (summonerName, region, championName) => dispatch(getUserChampionStats(summonerName, region, championName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChampionStatsContainer);
