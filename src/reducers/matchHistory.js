
import LoadingState from '../shared/LoadingState';

const initialState = {
  loadingState: LoadingState.IDLE,
  matches: []
}

const startMatchHistory = (state) => {
  return Object.assign({}, state, {
    loadingState: LoadingState.LOADING
  });
};

const receiveMatchHistoryResults = (state, action) => {
  return Object.assign({}, state, {
    action,
    loadingState: LoadingState.FINISHED,
    matches: action.result
  });
};

const matchHistory = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MATCH_HISTORY_START':
      return startMatchHistory(state);
    case 'FETCH_MATCH_HISTORY_SUCCESS':
      return receiveMatchHistoryResults(state, action);

    default:
      return state;
  };
};

export default matchHistory;