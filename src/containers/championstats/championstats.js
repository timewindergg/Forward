import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {CHAMPION_PARAM, SUMMONER_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getSummonerInfo} from '../../apiutils/summonerAPIUtils';
import {getUserChampionStats} from '../../apiutils/championStatsAPIUtils';

import ChampionStats from '../../components/championstats/championstats';
import {getStaticData} from '../../apiutils/contextAPIUtils';

import Header from '../../components/common/header';
import Footer from '../../components/common/footer';

class ChampionStatsContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router ONLY
    summoner: PropTypes.object.isRequired,
    userChampionStats: PropTypes.object.isRequired,
    staticData: PropTypes.object.isRequired,

    getSummonerInfo: PropTypes.func.isRequired,
    getUserChampionStats: PropTypes.func.isRequired,
    getStaticData: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const {match, summoner, getSummonerInfo, getUserChampionStats, getStaticData, staticData} = this.props;
    const summonerName = match.params[SUMMONER_PARAM];
    const region = match.params[REGION_PARAM];
    const championName = match.params[CHAMPION_PARAM];

    // on page load, fetch info about the summoner if it does not exist
    // or if it is different somehow than what we have in the reducer
    if (Object.keys(staticData).length === 0) {
      getStaticData(region);
    }
    if (Object.keys(summoner).length === 0 || summoner.summonerName !== summonerName) {
      getSummonerInfo(summonerName, region);
    }
    getUserChampionStats(summonerName, region, championName);
  }

  componentWillUpdate(nextProps, nextState) {
    const curSummoner = this.props.match.params[SUMMONER_PARAM];
    const newSummoner = nextProps.match.params[SUMMONER_PARAM];
    const curRegion = this.props.match.params[REGION_PARAM];
    const newRegion = nextProps.match.params[REGION_PARAM];
    const curChampion = this.props.match.params[CHAMPION_PARAM];
    const newChampion = nextProps.match.params[CHAMPION_PARAM];

    if (curSummoner !== newSummoner) {
      this.props.getSummonerInfo(newSummoner, newRegion);
    }

    if (newRegion !== curRegion) {
      this.props.getStaticData(newRegion);
    }

    if (curChampion !== newChampion) {
      this.props.getUserChampionStats(newSummoner, newRegion, newChampion);
    }
  }

  render() {
    const {summoner, userChampionStats, staticData} = this.props;
    return (
      <div>
        <Header />
        <ChampionStats
          summoner={summoner}
          userChampionStats={userChampionStats}
          staticData={staticData}/>
        <Footer />
      </div>
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({
  summoner: state.context.summoner,
  userChampionStats: state.championStats.championStats,
  staticData: state.context.staticData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSummonerInfo: (summonerName, region) => dispatch(getSummonerInfo(summonerName, region)),
    getUserChampionStats: (summonerName, region, championName) => dispatch(getUserChampionStats(summonerName, region, championName)),
    getStaticData: (region) => dispatch(getStaticData(region))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChampionStatsContainer);
