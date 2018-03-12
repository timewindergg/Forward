
import LoadingState from '../shared/LoadingState';

import {SET_SUMMONER_CONTEXT} from '../actions/contextActions';

const initialState = {
  loadingState: LoadingState.IDLE,
  mhError: 200,
  matches: [],
  summoner: '',
  region: ''
}

const setContext = (state, payload) => {
  return Object.assign({}, state, {
    summoner: payload.name,
    region: payload.region,
    matches: []
  });
};

const startMatchHistory = (state) => {
  return Object.assign({}, state, {
    loadingState: LoadingState.LOADING
  });
};

const receiveMatchHistoryResults = (state, action) => {
  // reject if coming from a bad context
  const {name, region} = action;
  if (name !== state.summoner || region !== state.region) {
    return state;
  }

  return Object.assign({}, state, {
    action,
    loadingState: LoadingState.FINISHED,
    matches: action.result
  });
};

const matchHistoryError = (state, action) => {
  // reject if coming from a bad context
  const {error} = action;
  return Object.assign({}, state, {
    loadingState: LoadingState.FAILED,
    mhError: error.response.status,
    matches: []
  });
};

const matchHistory = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MATCH_HISTORY_START':
      return startMatchHistory(state);
    case 'FETCH_MATCH_HISTORY_SUCCESS':
      return receiveMatchHistoryResults(state, action);
    case 'FETCH_MATCH_HISTORY_ERROR':
      return matchHistoryError(state, action);
    case SET_SUMMONER_CONTEXT:
      return setContext(state, action.payload);

    default:
      return state;
  };
};

export default matchHistory;