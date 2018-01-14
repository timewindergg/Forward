import {LOAD_SUMMONER_SUCCESS, LOAD_SUMMONER_FAILED} from '../actions/summonerActions';

// summoner info
// loaded when a page is loaded
/*
return {
  userID:           apiData.user_id,
  region:           apiData.region,
  summonerName:     apiData.name,
  lastUpdated:      apiData.last_updated,
  lastMatchUpdated: apiData.last_match_updated,
  rankS8:           apiData.rank_s8,
  rankS7:           apiData.rank_s7,
  wins:             apiData.wins,
  losses:           apiData.losses,
  level:            apiData.level,
  icon:             apiData.icon,
  timePlayed:       apiData.time_played
};
*/

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
