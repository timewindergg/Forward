
export const startFetchMatchHistory = () => {
  return {
    type: 'FETCH_MATCH_HISTORY_START'
  }
};

export const fetchMatchHistorySuccess = (result) => {
  return {
    type: 'FETCH_MATCH_HISTORY_SUCCESS',
    result: result
  };
};