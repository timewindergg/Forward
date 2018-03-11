export const LOAD_CURRENT_MATCH_SUCCESS = 'LOAD_CURRENT_MATCH_SUCCESS';
export const LOAD_CURRENT_MATCH_FAILED = 'LOAD_CURRENT_MATCH_FAILED';

export const LOAD_CURRENT_MATCH_DETAILS_SUCCESS = 'LOAD_CURRENT_MATCH_DETAILS_SUCCESS';
export const LOAD_CURRENT_MATCH_DETAILS_FAILED = 'LOAD_CURRENT_MATCH_DETAILS_FAILED';

export const LOAD_MATCH_TIMELINE_START = 'LOAD_MATCH_TIMELINE_START';
export const LOAD_MATCH_TIMELINE_SUCCESS = 'LOAD_MATCH_TIMELINE_SUCCESS';
export const LOAD_MATCH_TIMELINE_FAILED = 'LOAD_MATCH_TIMELINE_FAILED';

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

export const loadCurrentMatchDetailsSuccess = (summonerID, stats, build, leagues) => ({
  type: LOAD_CURRENT_MATCH_DETAILS_SUCCESS,
  payload: {
    id: summonerID,
    stats,
    build,
    leagues
  }
});

export const loadCurrentMatchDetailsFailed = (summonerID, error) => ({
  type: LOAD_CURRENT_MATCH_DETAILS_FAILED,
  payload: {
    id: summonerID,
    error
  }
});

export const loadMatchTimelineStart = () => ({
  type: LOAD_MATCH_TIMELINE_START,
  payload: {
  }
});


export const loadMatchTimelineSuccess = (matchTimeline) => ({
  type: LOAD_MATCH_TIMELINE_SUCCESS,
  payload: {
    matchTimeline
  }
});

export const loadMatchTimelineFailed = (error) => ({
  type: LOAD_MATCH_TIMELINE_FAILED,
  payload: {
    error
  }
});
