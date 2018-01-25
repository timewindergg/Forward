import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {MATCH_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getMatchTimeline} from '../../apiutils/matchAPIUtils';

import Postgame from '../../components/postgame/post';

class PostgameContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router
    timeline: PropTypes.object.isRequired,
    getMatchTimeline: PropTypes.func.isRequired
  }

  componentWillMount() {
    const {match, timeline, getMatchTimeline} = this.props;
    const matchId = match.params[MATCH_PARAM];
    const region = match.params[REGION_PARAM];
    
    // on page load, fetch info about the summoner if it does not exist
    // or if it is different somehow than what we have in the reducer
    if (Object.keys(timeline).length === 0 ) {
      getMatchTimeline(matchId, region);
    }
  }


  render() {
    const {timeline} = this.props;

    return (
      <Postgame
        timeline={timeline}
      />
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({
  timeline: state.match.timeline
});

// we will probably need this later
const mapDispatchToProps = (dispatch) => ({
  getMatchTimeline: (matchId, region, onSuccess) => {
    dispatch(getMatchTimeline(matchId, region))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostgameContainer);
