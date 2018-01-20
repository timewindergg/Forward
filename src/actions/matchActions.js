export const LOAD_CURRENT_MATCH_SUCCESS = 'LOAD_CURRENT_MATCH_SUCCESS';
export const LOAD_CURRENT_MATCH_FAILED = 'LOAD_CURRENT_MATCH_FAILED';

export const loadCurrentMatchSuccess = (currentMatch) => ({
  type: LOAD_CURRENT_MATCH_SUCCESS,
  payload: {
    currentMatch
  }
});

export const loadCurrentMatchFailed = (error) => ({
  type: LOAD_CURRENT_MATCH_FAILED,
  payload: {
    error
  }
});
