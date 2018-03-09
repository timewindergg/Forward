import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import {SUMMONER_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getSummonerInfo} from '../../apiutils/summonerAPIUtils';
import {getCurrentMatch} from '../../apiutils/matchAPIUtils';

import Dashboard from '../../components/dashboard/dash';
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';

// Import api utilities.
import { getSummonerMatchHistory } from '../../apiutils/matchHistoryAPIUtils';

import {getStaticData} from '../../apiutils/contextAPIUtils';

import {getIDFromCache} from '../../shared/helpers/cacheHelper';

const MH_OFFSET = 0;
const MH_SIZE = 100;

const MAX_ATTEMPTS = 2; // retries
const MATCH_PULL_INTERVAL = 5000; // retry every 3 seconds?

// really, this is just a function that compares 2 objects deeply for differences
// helps us a bit in telling us what ACTUALLY CHANGED
function difference(object, base) {
  function changes(object, base) {
    return _.transform(object, function(result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
}

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    
    // settimeout here

    this.state = {
      numAttempts: 0,
      fetchTaskID: 0
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired, // for react router ONLY

    cache: PropTypes.object.isRequired,
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
    console.log('SO MANY RERENDERS LOAD');

    const {match, cache, summoner, getSummonerInfo, getCurrentMatch, staticData, getStaticData} = this.props;
    const summonerName = match.params[SUMMONER_PARAM];
    const region = match.params[REGION_PARAM];
    const id = getIDFromCache(cache, summonerName, region);

    if (Object.keys(staticData).length === 0) {
      getStaticData(region);
    }

    // on page load, fetch info about the summoner if it does not exist
    // or if it is different somehow than what we have in the reducer
    if (Object.keys(summoner).length === 0 || summoner.summonerName !== summonerName) {
      getSummonerInfo(summonerName, region, id);
      // getSummonerMatchHistory(summonerName, region, id, MH_OFFSET, MH_SIZE);

      this.pullMatchHistory(summonerName, region, id);

      getCurrentMatch(summonerName, region, id);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log('SO MANY RERENDERS UPDATE', difference(this.props, nextProps), difference(this.state, nextState));

    const curSummoner = this.props.match.params[SUMMONER_PARAM];
    const newSummoner = nextProps.match.params[SUMMONER_PARAM];
    const curRegion = this.props.match.params[REGION_PARAM];
    const newRegion = nextProps.match.params[REGION_PARAM];

    const newID = getIDFromCache(nextProps.cache, newSummoner, newRegion);

    // context change
    if (newRegion !== curRegion) {
      this.props.getStaticData(newRegion);
    }

    if (newRegion !== curRegion || curSummoner !== newSummoner) {
      this.props.getSummonerInfo(newSummoner, newRegion, newID);
      // this.props.getSummonerMatchHistory(newSummoner, newRegion, newID, MH_OFFSET, MH_SIZE);
      this.props.getCurrentMatch(newSummoner, newRegion, newID);

      // clear current timeout for getSummonerMatchHistory and call the new one
      clearTimeout(this.state.fetchTaskID);
      this.pullMatchHistory(newSummoner, newRegion, newID);
    }
  }
  
  componentWillUnmount() {
    clearTimeout(this.state.fetchTaskID);
  }

  pullMatchHistory = (summonerName, region, id) => {
    // make an API request to get the recent matches
    this.props.getSummonerMatchHistory(summonerName, region, id, MH_OFFSET, MH_SIZE);
    // console.log("TIMEOUT FETCHING NOW!", this.state);

    // do not call any more and reset numAttempts
    if (this.state.numAttempts >= MAX_ATTEMPTS) {
      // console.log("TIMEOUT ENDING LOOP", this.state);
      this.setState({numAttempts: 0});
      return;
    }

    // console.log("TIMEOUT CONTINUING LOOP", this.state);
    // set state on calling this method again (based on timeout)
    const nextPullID = setTimeout(
      () => this.pullMatchHistory(summonerName, region, id),
      MATCH_PULL_INTERVAL
    );

    // setTimeout(console.log('asdf'), 15);

    this.setState({
      numAttempts: this.state.numAttempts + 1,
      fetchTaskID: nextPullID
    });
  }

  render() {
    const {summoner, matches, currentMatch, getSummonerMatchHistory, staticData} = this.props;
    return (
      <div>
        <Header/>
        <Dashboard
          summoner={summoner}
          currentMatch={currentMatch}
          matches={matches}
          staticData={staticData}
        />
        <Footer/>
      </div>
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({
  cache: state.context.IDCache,
  summoner: state.context.summoner,
  matches: state.matchHistory.matches,
  currentMatch: state.match.currentMatch,
  staticData: state.context.staticData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSummonerInfo: (summonerName, region, id) => dispatch(getSummonerInfo(summonerName, region, id)),
    getCurrentMatch: (summonerName, region, id) => dispatch(getCurrentMatch(summonerName, region, id)),
    getSummonerMatchHistory: (summonerName, region, id, offset, size) => {
      dispatch(getSummonerMatchHistory(summonerName, region, id, offset, size));
    },
    getStaticData: (region) => {
      dispatch(getStaticData(region))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
