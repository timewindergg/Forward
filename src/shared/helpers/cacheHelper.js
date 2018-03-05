import {normalizeName} from './stringHelper';

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

  console.log('CACHE INFO:', cache, nn, nr, !!cache[nr]);
  if (!!cache[nr]) {
    console.log('DEEP CACHE', cache[nr], cache[nr][nn]);
  }
  if (!hasID(cache, nn, nr)) {
    console.log('no mapping');
    return undefined;
  }

  return cache[nr][nn];
}
