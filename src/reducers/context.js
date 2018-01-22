import {LOAD_SUMMONER_SUCCESS, LOAD_SUMMONER_FAILED} from '../actions/summonerActions';

// TODO: maybe move this to a different reducer
const initialState = {  
  summoner: {},
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
    case LOAD_SUMMONER_SUCCESS:
      return searchSummoner(state, action.payload);
    default:
      return state;
  };
};

export default context;
