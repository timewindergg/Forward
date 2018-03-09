import {normalizeName} from './stringHelper';
import {setCookie, getCookie} from './cookieHelper';

export const CACHE_KEY = 'CACHE_KEY';
export const MAX_ENTRIES = 100;

const getSize = (cache) => {
  let size = 0;
  Object.keys(cache).forEach(region => size += Object.keys(cache[region]).length);

  return size;
}

export const hasID = (cache, name, region) => {
  const nn = normalizeName(name);
  const nr = normalizeName(region);

  // cache: region --> name --> ID
  // check if there's a region mapping
  // and if within region mapping, there is the summoner name
  return !!cache[nr] && cache[nr][nn] !== undefined;
}

export const getIDFromCache = (cache, name, region) => {
  const nn = normalizeName(name);
  const nr = normalizeName(region);

  // console.log('CACHE INFO:', cache, nn, nr, !!cache[nr]);
  // if (!!cache[nr]) {
  //   console.log('DEEP CACHE', cache[nr], cache[nr][nn]);
  // }
  if (!hasID(cache, nn, nr)) {
    console.log('no mapping');
    return undefined;
  }

  return cache[nr][nn];
}

export const loadCache = () => {
  let cacheCookie = getCookie(CACHE_KEY);
  if (cacheCookie === '') {
    setCookie(CACHE_KEY, encodeURIComponent('{}'));
  }

  cacheCookie = decodeURIComponent(getCookie(CACHE_KEY));

  let cache = {};

  try {
    cache = JSON.parse(cacheCookie);

    // stupid way: store up to 100 entries in the cache
    // before flushing it entirely
    if (getSize(cache) > MAX_ENTRIES) {
      cache = {};
    }
  } catch (error) {
    console.error("unable to retrieve recent matches");
  }

  console.log("CACHE LOADED", cache);
  return cache;
}


export const saveCache = (cache) => {
  const cacheStr = encodeURIComponent(JSON.stringify(cache));
  setCookie(CACHE_KEY, cacheStr);
}
