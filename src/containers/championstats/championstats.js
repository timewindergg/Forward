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

import LoadingState from '../../shared/LoadingState';
import NotFound from '../../components/common/notfound';

import {getIDFromCache} from '../../shared/helpers/cacheHelper';

class ChampionStatsContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router ONLY
    cache: PropTypes.object.isRequired,

    summoner: PropTypes.object.isRequired,
    userChampionStats: PropTypes.object.isRequired,
    staticData: PropTypes.object.isRequired,

    getSummonerInfo: PropTypes.func.isRequired,
    getUserChampionStats: PropTypes.func.isRequired,
    getStaticData: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const {match, cache, summoner, getSummonerInfo, getUserChampionStats, getStaticData, staticData} = this.props;
    const summonerName = match.params[SUMMONER_PARAM];
    const region = match.params[REGION_PARAM];
    const championName = match.params[CHAMPION_PARAM];
    const id = getIDFromCache(cache, summonerName, region);

    // on page load, fetch info about the summoner if it does not exist
    // or if it is different somehow than what we have in the reducer
    if (Object.keys(staticData).length === 0) {
      getStaticData(region);
    }
    if (Object.keys(summoner).length === 0 || summoner.summonerName !== summonerName) {
      getSummonerInfo(summonerName, region, id);
    }
    getUserChampionStats(summonerName, region, id, championName);
  }

  componentWillUpdate(nextProps, nextState) {
    const curSummoner = this.props.match.params[SUMMONER_PARAM];
    const newSummoner = nextProps.match.params[SUMMONER_PARAM];
    const curRegion = this.props.match.params[REGION_PARAM];
    const newRegion = nextProps.match.params[REGION_PARAM];
    const curChampion = this.props.match.params[CHAMPION_PARAM];
    const newChampion = nextProps.match.params[CHAMPION_PARAM];

    const newID = getIDFromCache(nextProps.cache, newSummoner, newRegion);


    if (curSummoner !== newSummoner) {
      this.props.getSummonerInfo(newSummoner, newRegion, newID);
    }

    if (newRegion !== curRegion) {
      this.props.getStaticData(newRegion);
    }

    if (curChampion !== newChampion) {
      this.props.getUserChampionStats(newSummoner, newRegion, newID, newChampion);
    }
  }

  render() {
    const {
      summoner,
      summonerLoadingState,
      summonerError,
      userChampionStats,
      csLoadingState,
      csError,
      staticData
    } = this.props;

    let championStats = (
    <ChampionStats
      summoner={summoner}
      userChampionStats={userChampionStats}
      staticData={staticData}/>
    );

    if (summonerLoadingState === LoadingState.FAILED || csLoadingState === LoadingState.FAILED) {
      if (summonerError === 404 || csError === 404) {
        championStats = (
          <NotFound />
        );
      }
    }

    return (
      <div>
        <Header />
          {championStats}
        <Footer />
      </div>
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({
  cache: state.context.IDCache,
  summoner: state.context.summoner,
  summonerLoadingState: state.context.summonerLoadingState,
  summonerError: state.context.summonerError,
  userChampionStats: state.championStats.championStats,
  csLoadingState: state.championStats.csLoadingState,
  csError: state.championStats.csError,
  staticData: state.context.staticData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSummonerInfo: (summonerName, region, id) => dispatch(getSummonerInfo(summonerName, region, id)),
    getUserChampionStats: (summonerName, region, id, championName) => dispatch(getUserChampionStats(summonerName, region, id, championName)),
    getStaticData: (region) => dispatch(getStaticData(region))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChampionStatsContainer);
