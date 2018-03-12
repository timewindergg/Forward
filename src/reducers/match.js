import {
  LOAD_CURRENT_MATCH_START,
  LOAD_CURRENT_MATCH_SUCCESS,
  LOAD_CURRENT_MATCH_FAILED,
  LOAD_CURRENT_MATCH_DETAILS_SUCCESS,
  LOAD_CURRENT_MATCH_DETAILS_FAILED,
  LOAD_MATCH_TIMELINE_START,
  LOAD_MATCH_TIMELINE_SUCCESS,
  LOAD_MATCH_TIMELINE_FAILED
} from '../actions/matchActions';
import _ from 'lodash';

import LoadingState from '../shared/LoadingState';

const initialState = {  
  currentMatch: {},
  currentMatchDetails: {},
  timeline: {},

  tlLoadingState: LoadingState.IDLE,
  tlError: 200
};

const loadCurrentMatch = (state, payload) => {
  return Object.assign({}, state, {
    currentMatch: payload.currentMatch
  });
};

const clearCurrentMatch = (state, payload) => {
  return Object.assign({}, state, {
    currentMatch: {},
    currentMatchDetails: {}
  });
};

const loadCurrentMatchDetails = (state, payload) => {
  const {id, stats, build, leagues} = payload;
  const matchDetailsForSummoner = {
    stats, build, leagues
  };

  const newState = _.set(
    _.cloneDeep(state), ['currentMatchDetails', id], matchDetailsForSummoner
  );
  return newState;
};

const clearCurrentMatchDetails = (state, payload) => {
  const {id} = payload;

  const newState = _.set(
    _.cloneDeep(state), ['currentMatchDetails', id], {}
  );
  return newState;
};

const startMatchTimeline = (state, payload) => {
  return Object.assign({}, state, {
    timeline: {},
    tlLoadingState: LoadingState.LOADING
  });
};

const loadMatchTimeline = (state, payload) => {
  return Object.assign({}, state, {
    timeline: payload.matchTimeline,
    tlLoadingState: LoadingState.FINISHED,
    tlError: 200
  });
};

const clearMatchTimeline = (state, payload) => {
  return Object.assign({}, state, {
    timeline: {},
    tlLoadingState: LoadingState.FAILED,
    tlError: payload.error.response.status
  });
};

// setting up the reducer
// here we have a switch statement to direct the right type of action
// to the right handler
const match = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CURRENT_MATCH_START:
      return clearCurrentMatch(state, action.payload);
    case LOAD_CURRENT_MATCH_SUCCESS:
      return loadCurrentMatch(state, action.payload);
    case LOAD_CURRENT_MATCH_FAILED:
      return clearCurrentMatch(state, action.payload);
    case LOAD_CURRENT_MATCH_DETAILS_SUCCESS:
      return loadCurrentMatchDetails(state, action.payload);
    case LOAD_MATCH_TIMELINE_START:
      return startMatchTimeline(state, {});
    case LOAD_MATCH_TIMELINE_SUCCESS:
      return loadMatchTimeline(state, action.payload);
    case LOAD_MATCH_TIMELINE_FAILED:
      return clearMatchTimeline(state, action.payload);
    default:
      return state;
  };
};

export default match;
