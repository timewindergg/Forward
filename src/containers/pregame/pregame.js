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

import Pregame from '../../components/pregame/pre';

class PregameContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router

    summoner: PropTypes.object.isRequired,
    currentMatch: PropTypes.object.isRequired,
    currentMatchDetails: PropTypes.object.isRequired,
    selectedRed: PropTypes.number.isRequired,
    selectedBlue: PropTypes.number.isRequired,

    getSummonerInfo: PropTypes.func.isRequired,
    getCurrentMatch: PropTypes.func.isRequired,
    getStaticData: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const {
      match,
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
    
    // on page load, fetch info about the summoner if it does not exist
    // or if it is different somehow than what we have in the reducer
    if (Object.keys(summoner).length === 0 || summoner.summonerName !== summonerName) {
      getSummonerInfo(summonerName, region);
      getCurrentMatch(summonerName, region);
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

    if (curSummoner !== newSummoner) {
      this.props.getSummonerInfo(newSummoner, newRegion);
      this.props.getCurrentMatch(newSummoner, newRegion);
    }

    if (newRegion !== curRegion) {
      this.props.getStaticData(newRegion);
    }
  }

  render() {
    const {summoner, currentMatch, currentMatchDetails, selectedRed, selectedBlue, staticData} = this.props;

    return (
      <Pregame
        summoner={summoner}
        currentMatch={currentMatch}
        currentMatchDetails={currentMatchDetails}
        selectedRed={selectedRed}
        selectedBlue={selectedBlue}
        staticData={staticData}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  summoner: state.context.summoner,
  currentMatch: state.match.currentMatch,
  currentMatchDetails: state.match.currentMatchDetails,
  selectedRed: state.pregame.selectedRed,
  selectedBlue: state.pregame.selectedBlue,

  staticData: state.context.staticData
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
  },
  getStaticData: (region) => dispatch(getStaticData(region))
});

export default connect(mapStateToProps, mapDispatchToProps)(PregameContainer);
