import {LOAD_CURRENT_MATCH_SUCCESS, LOAD_CURRENT_MATCH_FAILED} from '../actions/matchActions';

const initialState = {  
  currentMatch: {}
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

// setting up the reducer
// here we have a switch statement to direct the right type of action
// to the right handler
const match = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CURRENT_MATCH_SUCCESS:
      return loadCurrentMatch(state, action.payload);
    case LOAD_CURRENT_MATCH_FAILED:
      return clearCurrentMatch(state, action.payload);
    default:
      return state;
  };
};

export default match;
