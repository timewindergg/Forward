import {PREGAME_SELECT_SUMMONER} from '../actions/pregameActions';

import {
  LOAD_CURRENT_MATCH_SUCCESS,
  LOAD_CURRENT_MATCH_FAILED,
  // LOAD_CURRENT_MATCH_DETAILS_SUCCESS,
  LOAD_CURRENT_MATCH_DETAILS_FAILED
} from '../actions/matchActions';
import LoadingState from '../shared/LoadingState';

// reducer to store pregame data
// so we assume people don't have id of -1
// TODO: this is really bad in terms of managing loading state but oh well
const initialState = {
  loadingState: LoadingState.IDLE, // idle or failed for match
  selectedRed: -1,
  selectedBlue: -1
};

const loadSummonerDetailsSuccess = (state, payload) => {
  return Object.assign({}, state, {
    loadingState: LoadingState.FINISHED
  });
};

const loadSummonerDetailsFailed = (state, payload) => {
  return Object.assign({}, state, {
    loadingState: LoadingState.FAILED
  });
};

const selectSummoner = (state, payload) => {
  const {summonerID, isRed} = payload;

  return (isRed) ?
    Object.assign({}, state, {selectedRed: summonerID}) : Object.assign({}, state, {selectedBlue: summonerID});
}

// setting up the reducer
// here we have a switch statement to direct the right type of action
// to the right handler
const pregame = (state = initialState, action) => {
  switch (action.type) {
    case PREGAME_SELECT_SUMMONER:
      return selectSummoner(state, action.payload);
    case LOAD_CURRENT_MATCH_SUCCESS:
      return loadSummonerDetailsSuccess(state, action.payload);
    case LOAD_CURRENT_MATCH_FAILED:
      return loadSummonerDetailsFailed(state, action.payload);
    // case LOAD_CURRENT_MATCH_DETAILS_FAILED:
      // return loadSummonerDetailsFailed(state, action.payload);
    default:
      return state;
  };
};

export default pregame;
