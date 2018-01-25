import {LOAD_SUMMONER_SUCCESS, LOAD_SUMMONER_FAILED} from '../actions/summonerActions';
import {LOAD_VERSION_SUCCESS} from '../actions/contextActions';

// TODO: maybe move this to a different reducer
const initialState = {  
  summoner: {},
  version: '7.24.2'
};

const loadVersion = (state, payload) => {
  return Object.assign({}, state, {
    version: payload.version
  });
};

// action handler to search for a summoner
const searchSummoner = (state, payload) => {
  return Object.assign({}, state, {
    summoner: payload.summoner,
  });
};

// setting up the reducer
// here we have a switch statement to direct the right type of action
// to the right handler
const context = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_VERSION_SUCCESS:
      return loadVersion(state, action.payload);
    case LOAD_SUMMONER_SUCCESS:
      return searchSummoner(state, action.payload);
    default:
      return state;
  };
};

export default context;
