export const LOAD_SUMMONER_SUCCESS = 'LOAD_SUMMONER_SUCCESS';
export const LOAD_SUMMONER_FAILED = 'LOAD_SUMMONER_FAILED';

export const loadSummonerSuccess = (summoner) => ({
  type: LOAD_SUMMONER_SUCCESS,
  payload: {
    summoner
  }
});

export const loadSummonerFailed = (error) => ({
  type: LOAD_SUMMONER_FAILED,
  payload: {
    error
  }
});
