import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {MATCH_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getMatchTimeline} from '../../apiutils/matchAPIUtils';
import {getStaticData} from '../../apiutils/contextAPIUtils';

import Postgame from '../../components/postgame/post';
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';

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
    if (Object.keys(timeline).length === 0 ) {
      getMatchTimeline(matchId, region);
    }

    if (Object.keys(staticData).length === 0) {
      getStaticData(region);
    }
  }

  render() {
    const {timeline, staticData} = this.props;

    return (
      <div>
        <Header/>
        <Postgame
          matchDetails={timeline}
          staticData={staticData}
        />
        <Footer/>
      </div>
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({
  timeline: state.match.timeline,
  staticData: state.context.staticData,
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
