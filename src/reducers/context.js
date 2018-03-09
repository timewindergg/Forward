import {LOAD_SUMMONER_SUCCESS, LOAD_SUMMONER_FAILED} from '../actions/summonerActions';
import {LOAD_STATIC_SUCCESS, CACHE_SUMMONER, SET_SUMMONER_CONTEXT} from '../actions/contextActions';

import {normalizeName} from '../shared/helpers/stringHelper';
import {loadCache, saveCache} from '../shared/helpers/cacheHelper';

// TODO: maybe move this to a different reducer
const initialState = {
  summoner: {},
  staticData: {},

  // IDCache caches the IDs of summoners that we have looked up
  // to eliminate the API call in the backend where we look up the summoner ID from their name/region
  // mapping works as follows: (to reduce the number of keys)
  // region --> name --> ID
  IDCache: loadCache()
};

const loadStatic = (state, payload) => {
  return Object.assign({}, state, {
    staticData: payload.staticData
  });
};

// action handler to search for a summoner
const searchSummoner = (state, payload) => {
  return Object.assign({}, state, {
    summoner: payload.summoner,
  });
};

const resetSummoner = (state, payload) => {
  const {summoner} = state;
  // don't do anything if no summoner exists
  if (Object.keys(summoner).length === 0) { return state; }

  // summoner exists, now check if we're actually switching context or not
  if (
    normalizeName(payload.name) === normalizeName(summoner.name) && 
    normalizeName(payload.region) === normalizeName(summoner.region)
  ) { return state; }

  // context switch
  return Object.assign({}, state, {
    summoner: {},
  });
}

const clearSummoner = (state, payload) => {
  return Object.assign({}, state, {
    summoner: {},
  });
}

const cacheSummoner = (state, payload) => {
  let newState = Object.assign({}, state);

  const name = normalizeName(payload.name);
  const region = normalizeName(payload.region);
  const id = payload.id;

  if (!newState.IDCache[region]) {
    newState.IDCache[region] = {}
  }

  newState.IDCache[region][name] = id;

  // saveCache: saves cache to cookie
  if (payload.save) {
    // console.log('saving cache to cookie');
    saveCache(newState.IDCache);
  }

  return newState;
}

// setting up the reducer
// here we have a switch statement to direct the right type of action
// to the right handler
const context = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUMMONER_CONTEXT:
      return resetSummoner(state, action.payload);
    case LOAD_STATIC_SUCCESS:
      return loadStatic(state, action.payload);
    case LOAD_SUMMONER_SUCCESS:
      return searchSummoner(state, action.payload);
    case LOAD_SUMMONER_FAILED:
      return clearSummoner(state, action.payload);
    case CACHE_SUMMONER:
      return cacheSummoner(state, action.payload);
    default:
      return state;
  };
};

export default context;
