export const LOAD_SUMMONER_SUCCESS = 'LOAD_SUMMONER_SUCCESS';
export const LOAD_SUMMONER_FAILED = 'LOAD_SUMMONER_FAILED';
export const LOAD_CHAMPION_STATS_START = 'LOAD_CHAMPION_STATS_START';
export const LOAD_CHAMPION_STATS_SUCCESS = 'LOAD_CHAMPION_STATS_SUCCESS';
export const LOAD_CHAMPION_STATS_FAILED = 'LOAD_CHAMPION_STATS_FAILED';

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

export const loadChampionStatsStart = () => ({
  type: LOAD_CHAMPION_STATS_START,
  payload: {}
});

export const loadChampionStatsSuccess = (championStats) => ({
  type: LOAD_CHAMPION_STATS_SUCCESS,
  payload: {
    championStats
  }
});

export const loadChampionStatsFailed = (summonerName, error) => ({
  type: LOAD_CHAMPION_STATS_FAILED,
  payload: {
    error
  }
});
