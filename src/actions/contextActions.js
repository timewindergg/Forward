export const LOAD_STATIC_SUCCESS = 'LOAD_STATIC_SUCCESS';
export const LOAD_STATIC_FAILED = 'LOAD_STATIC_FAILED';
export const CACHE_SUMMONER = 'CACHE_SUMMONER';

export const SET_SUMMONER_CONTEXT = 'SET_SUMMONER_CONTEXT';

export const loadStaticDataSuccess = (staticData) => ({
  type: LOAD_STATIC_SUCCESS,
  payload: {
    staticData
  }
});

export const loadStaticDataFailed = (error) => ({
  type: LOAD_STATIC_FAILED,
  payload: {
    error
  }
});

export const cacheSummoner = (name, region, id) => ({
  type: CACHE_SUMMONER,
  payload: {
    name,
    region,
    id
  }
});


export const setSummonerContext = (name, region) => ({
  type: SET_SUMMONER_CONTEXT,
  payload: {
    name,
    region
  }
});
