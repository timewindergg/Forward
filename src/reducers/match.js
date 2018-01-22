import {LOAD_CURRENT_MATCH_SUCCESS, LOAD_CURRENT_MATCH_FAILED,
        LOAD_MATCH_TIMELINE_SUCCESS, LOAD_MATCH_TIMELINE_FAILED} from '../actions/matchActions';

const initialState = {  
  currentMatch: {},
  timeline: {}
};

// action handler to change/set the name of the user
const loadCurrentMatch = (state, payload) => {
  return Object.assign({}, state, {
    currentMatch: payload.currentMatch
  });
};

const clearCurrentMatch = (state, payload) => {
  return Object.assign({}, state, {
    currentMatch: {}
  });
};

const loadMatchTimeline = (state, payload) => {
  return Object.assign({}, state, {
    timeline: payload
  });
};

const clearMatchTimeline = (state, payload) => {
  return Object.assign({}, state, {
    timeline: {}
  });
};

// setting up the reducer
// here we have a switch statement to direct the right type of action
// to the right handler
const match = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CURRENT_MATCH_SUCCESS:
      return loadCurrentMatch(state, action.payload);
    case LOAD_CURRENT_MATCH_FAILED:
      return clearCurrentMatch(state, action.payload);
    case LOAD_MATCH_TIMELINE_SUCCESS:
      return loadMatchTimeline(state, action.payload);
    case LOAD_MATCH_TIMELINE_FAILED:
      return clearMatchTimeline(state, action.payload);
    default:
      return state;
  };
};

export default match;
