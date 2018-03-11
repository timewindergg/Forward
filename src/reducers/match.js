import {
  LOAD_CURRENT_MATCH_SUCCESS,
  LOAD_CURRENT_MATCH_FAILED,
  LOAD_CURRENT_MATCH_DETAILS_SUCCESS,
  LOAD_CURRENT_MATCH_DETAILS_FAILED,
  LOAD_MATCH_TIMELINE_START,
  LOAD_MATCH_TIMELINE_SUCCESS,
  LOAD_MATCH_TIMELINE_FAILED
} from '../actions/matchActions';
import _ from 'lodash';

const initialState = {  
  currentMatch: {},
  currentMatchDetails: {},
  timeline: {}
};

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

// const loadCurrentMatchDetailsBatch = (state, payload) => {
//   const {matchDetails} = payload;
//   const newState = _.cloneDeep(state);

//   // clear the currentMatchDetails and clobber with new details
//   _.set(newState, ['currentMatchDetails'], {});
//   Object.keys(matchDetails).forEach((championID) => {
//     _.set(newState, ['currentMatchDetails', championID], matchDetails[championID]);
//   });

//   return newState;
// };

const clearCurrentMatchDetails = (state, payload) => {
  const {id} = payload;

  const newState = _.set(
    _.cloneDeep(state), ['currentMatchDetails', id], {}
  );
  return newState;
};

const loadMatchTimeline = (state, payload) => {
  return Object.assign({}, state, {
    timeline: payload.matchTimeline
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
    case LOAD_CURRENT_MATCH_DETAILS_SUCCESS:
      return loadCurrentMatchDetails(state, action.payload);
    case LOAD_MATCH_TIMELINE_START:
      return clearMatchTimeline(state, {});
    case LOAD_MATCH_TIMELINE_SUCCESS:
      return loadMatchTimeline(state, action.payload);
    case LOAD_MATCH_TIMELINE_FAILED:
      return clearMatchTimeline(state, action.payload);
    default:
      return state;
  };
};

export default match;
