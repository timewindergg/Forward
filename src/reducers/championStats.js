import {
  LOAD_CHAMPION_STATS_START,
  LOAD_CHAMPION_STATS_SUCCESS,
  LOAD_CHAMPION_STATS_FAILED
} from '../actions/summonerActions';

import LoadingState from '../shared/LoadingState';

const initialState = {
  championStats: {},
  csLoadingState: LoadingState.IDLE,
  csError: 200,
};

const loadUserChampionStatsStart = (state, payload) => {
  return Object.assign({}, state, {
    championStats: {},
    csLoadingState: LoadingState.LOADING
  });
};

const loadUserChampionStats = (state, payload) => {
  return Object.assign({}, state, {
    championStats: payload.championStats,
    csLoadingState: LoadingState.FINISHED,
    csError: 200
  });
};

const clearUserChampionStats = (state, payload) => {
  return Object.assign({}, state, {
    championStats: {},
    csLoadingState: LoadingState.FAILED,
    csError: payload.error.response.status
  });
};


// setting up the reducer
// here we have a switch statement to direct the right type of action
// to the right handler
const championStats = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CHAMPION_STATS_START:
      return loadUserChampionStatsStart(state, action.payload);
    case LOAD_CHAMPION_STATS_SUCCESS:
      // console.log("loaded champion stats: ", action.payload);
      return loadUserChampionStats(state, action.payload);
    case LOAD_CHAMPION_STATS_FAILED:
      return clearUserChampionStats(state, action.payload);
    default:
      return state;
  };
};

export default championStats;
