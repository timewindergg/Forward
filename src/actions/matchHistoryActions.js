
export const startFetchMatchHistory = () => {
  return {
    type: 'FETCH_MATCH_HISTORY_START'
  }
};

export const fetchMatchHistorySuccess = (name, region, result) => {
  return {
    type: 'FETCH_MATCH_HISTORY_SUCCESS',
    name: name,
    region: region,
    result: result
  };
};