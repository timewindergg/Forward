import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {SUMMONER_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getSummonerInfo} from '../../apiutils/summonerAPIUtils';
import {getCurrentMatch} from '../../apiutils/matchAPIUtils';

import Pregame from '../../components/pregame/pre';

class PregameContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router
    summoner: PropTypes.object.isRequired,
    getSummonerInfo: PropTypes.func.isRequired
  }

  componentWillMount() {
    const {match, summoner, getSummonerInfo} = this.props;
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
    const {summoner} = this.props;

    return (
      <Pregame
        summoner={summoner}
      />
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({
  summoner: state.context.summoner
});

// we will probably need this later
const mapDispatchToProps = (dispatch) => ({
  getSummonerInfo: (summonerName, region, onSuccess) => dispatch(getSummonerInfo(summonerName, region)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PregameContainer);
