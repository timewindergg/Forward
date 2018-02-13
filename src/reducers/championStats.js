import {
  LOAD_CHAMPION_STATS_SUCCESS,
  LOAD_CHAMPION_STATS_FAILED
} from '../actions/summonerActions';

const initialState = {
  championStats: {}
};

const loadUserChampionStats = (state, payload) => {
  return Object.assign({}, state, {
    championStats: payload.championStats
  });
};

const clearUserChampionStats = (state, payload) => {
  return Object.assign({}, state, {
    championStats: {}
  });
};


// setting up the reducer
// here we have a switch statement to direct the right type of action
// to the right handler
const championStats = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CHAMPION_STATS_SUCCESS:
      return loadUserChampionStats(state, action.payload);
    case LOAD_CHAMPION_STATS_FAILED:
      return clearUserChampionStats(state, action.payload);
    default:
      return state;
  };
};

export default championStats;
