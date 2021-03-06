import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {MATCH_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getMatchTimeline} from '../../apiutils/matchAPIUtils';
import {getStaticData} from '../../apiutils/contextAPIUtils';

import Postgame from '../../components/postgame/post';
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';

import LoadingState from '../../shared/LoadingState';
import NotFound from '../../components/common/notfound';
import ServerError from '../../components/common/ServerError';

class PostgameContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router
    timeline: PropTypes.object.isRequired,
    staticData: PropTypes.object.isRequired,
    getMatchTimeline: PropTypes.func.isRequired,
    getStaticData: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const {match, timeline, staticData, getMatchTimeline, getStaticData} = this.props;
    const matchId = match.params[MATCH_PARAM];
    const region = match.params[REGION_PARAM];

    // on page load, fetch info about the summoner if it does not exist
    // or if it is different somehow than what we have in the reducer
    if (Object.keys(timeline).length === 0 || timeline.match.id !== matchId) {
      getMatchTimeline(matchId, region);
    }

    if (Object.keys(staticData).length === 0) {
      getStaticData(region);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const curMatch = this.props.match.params[MATCH_PARAM];
    const newMatch = nextProps.match.params[MATCH_PARAM];
    const curRegion = this.props.match.params[REGION_PARAM];
    const newRegion = nextProps.match.params[REGION_PARAM];

    if (newRegion !== curRegion) {
      this.props.getStaticData(newRegion);
    }

    if (curMatch !== newMatch) {
      this.props.getMatchTimeline(newMatch, newRegion);
    }
  }

  render() {
    const {timeline, staticData, tlLoadingState, tlError} = this.props;
    let postgame = (
      <Postgame
          matchDetails={timeline}
          staticData={staticData}
          region={this.props.match.params.region}
        />
    );

    // super hacky
    if ((!!timeline.match && !timeline.match.participants) || (!!timeline.timeline && !timeline.timeline.frames)) {
      postgame = (<NotFound />);
    }
    if (tlLoadingState === LoadingState.FAILED) {
      if (tlError === 404) {
        postgame = (<NotFound />);
      } else {
        postgame = (<ServerError />);
      }
    }

    return (
      <div>
        <Header/>
          {postgame}    
        <Footer/>
      </div>
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({
  timeline: state.match.timeline,
  staticData: state.context.staticData,
  tlLoadingState: state.match.tlLoadingState,
  tlError: state.match.tlError
});

// we will probably need this later
const mapDispatchToProps = (dispatch) => ({
  getMatchTimeline: (matchId, region, onSuccess) => {
    dispatch(getMatchTimeline(matchId, region))
  },
  getStaticData: (region) => {
    dispatch(getStaticData(region))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostgameContainer);
