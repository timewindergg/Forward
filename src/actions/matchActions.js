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


export const LOAD_MATCH_TIMELINE_SUCCESS = 'LOAD_MATCH_TIMELINE_SUCCESS';
export const LOAD_MATCH_TIMELINE_FAILED = 'LOAD_MATCH_TIMELINE_FAILED';

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
