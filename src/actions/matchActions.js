export const LOAD_CURRENT_MATCH_SUCCESS = 'LOAD_CURRENT_MATCH_SUCCESS';
export const LOAD_CURRENT_MATCH_FAILED = 'LOAD_CURRENT_MATCH_FAILED';

export const LOAD_CURRENT_MATCH_DETAILS_SUCCESS = 'LOAD_CURRENT_MATCH_DETAILS_SUCCESS';
export const LOAD_CURRENT_MATCH_DETAILS_FAILED = 'LOAD_CURRENT_MATCH_DETAILS_FAILED';

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

export const loadCurrentMatchDetailsSuccess = (summonerID, stats, build) => ({
  type: LOAD_CURRENT_MATCH_DETAILS_SUCCESS,
  payload: {
    id: summonerID,
    stats,
    build
  }
});

export const loadCurrentMatchDetailsFailed = (summonerID, error) => ({
  type: LOAD_CURRENT_MATCH_DETAILS_FAILED,
  payload: {
    id: summonerID,
    error
  }
});
