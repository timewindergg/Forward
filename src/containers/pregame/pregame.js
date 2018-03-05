import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {SUMMONER_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getSummonerInfo} from '../../apiutils/summonerAPIUtils';
import {
  getCurrentMatch,
  getCurrentMatchDetails
} from '../../apiutils/matchAPIUtils';

import {getStaticData} from '../../apiutils/contextAPIUtils';

import {getIDFromCache} from '../../shared/helpers/cacheHelper';

// so why does this only work on a single player
// import {getUserChampionStats} from '../../apiutils/championStatsAPIUtils';

import Pregame from '../../components/pregame/pre';
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';

class PregameContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router

    cache: PropTypes.object.isRequired,
    summoner: PropTypes.object.isRequired,
    currentMatch: PropTypes.object.isRequired,
    currentMatchDetails: PropTypes.object.isRequired,
    selectedRed: PropTypes.number.isRequired,
    selectedBlue: PropTypes.number.isRequired,
    loadingState: PropTypes.string.isRequired,

    getSummonerInfo: PropTypes.func.isRequired,
    getCurrentMatch: PropTypes.func.isRequired,
    getStaticData: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const {
      match,
      cache,
      summoner,
      currentMatch,
      getSummonerInfo,
      getCurrentMatch,
      staticData,
      getStaticData
    } = this.props;

    // console.log('MATCH PARAMS', match.params);
    const summonerName = match.params[SUMMONER_PARAM];
    const region = match.params[REGION_PARAM];
    const id = getIDFromCache(cache, summonerName, region);
    
    // on page load, fetch info about the summoner if it does not exist
    // or if it is different somehow than what we have in the reducer
    if (Object.keys(summoner).length === 0 || summoner.summonerName !== summonerName) {
      // TODO: clear current match?
      getSummonerInfo(summonerName, region, id);
      getCurrentMatch(summonerName, region, id);
    }

    if (Object.keys(staticData).length === 0) {
      getStaticData(region);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const curSummoner = this.props.match.params[SUMMONER_PARAM];
    const newSummoner = nextProps.match.params[SUMMONER_PARAM];
    const curRegion = this.props.match.params[REGION_PARAM];
    const newRegion = nextProps.match.params[REGION_PARAM];

    const newID = getIDFromCache(nextProps.cache, newSummoner, newRegion);

    if (curSummoner !== newSummoner) {
      this.props.getSummonerInfo(newSummoner, newRegion, newID);
      this.props.getCurrentMatch(newSummoner, newRegion, newID);
    }

    if (newRegion !== curRegion) {
      this.props.getStaticData(newRegion);
    }
  }

  render() {
    const {summoner, currentMatch, currentMatchDetails, selectedRed, selectedBlue, staticData} = this.props;

    return (
      <div>
        <Header/>
        <Pregame
          summoner={summoner}
          currentMatch={currentMatch}
          currentMatchDetails={currentMatchDetails}
          selectedRed={selectedRed}
          selectedBlue={selectedBlue}
          loadingState={this.props.loadingState}

          staticData={staticData}
        />
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cache: state.context.IDCache,
  summoner: state.context.summoner,
  currentMatch: state.match.currentMatch,
  currentMatchDetails: state.match.currentMatchDetails,
  selectedRed: state.pregame.selectedRed,
  selectedBlue: state.pregame.selectedBlue,
  loadingState: state.pregame.loadingState,

  staticData: state.context.staticData
});


  // getSummonerInfo: (summonerName, region) => {
  //   dispatch(getSummonerInfo(summonerName, region, (data) => {
  //     dispatch(getUserChampionStats(summonerName, region, data.))
  //   }))
  // },

const mapDispatchToProps = (dispatch) => ({
  getSummonerInfo: (summonerName, region, id) => dispatch(getSummonerInfo(summonerName, region, id)),
  getCurrentMatch: (summonerName, region, id) => {
    dispatch(getCurrentMatch(summonerName, region, id, (data) => {
      const summoners = [...data.red_team, ...data.blue_team];
      summoners.forEach((s) => {
        dispatch(getCurrentMatchDetails(s.id, s.name, region, s.champion_id));
      });
    }))
  },
  getStaticData: (region) => dispatch(getStaticData(region))
});

export default connect(mapStateToProps, mapDispatchToProps)(PregameContainer);
