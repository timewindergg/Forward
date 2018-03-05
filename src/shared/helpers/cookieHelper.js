import {normalizeName} from './stringHelper';

export const setCookie = (name, value, days = 7, path = '/') => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
}

export const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}

export const deleteCookie = (name, path) => {
  setCookie(name, '', -1, path)
}

export const RECENT_SEARCHES_KEY = 'RECENT_SEARCHES';

const TOP_N = 20;

export const decodeRecentSearches = () => {
  let recentSearchCookie = getCookie(RECENT_SEARCHES_KEY);
  if (recentSearchCookie === '') {
    setCookie(RECENT_SEARCHES_KEY, encodeURIComponent('{}'));
  }

  recentSearchCookie = decodeURIComponent(getCookie(RECENT_SEARCHES_KEY));

  let recentSearches = {};

  try {
    recentSearches = JSON.parse(recentSearchCookie);
    let rsCopy = {};
    // sort and retain the top n summoners by search count
    // not really stable
    let newRS = Object.keys(recentSearches).map((rs) => {
      return {
        key: rs,
        count: recentSearches[rs].count
      };
    }).sort((a, b) => {
      if (a.count < b.count){ return 1; }
      else if (a.count > b.count) { return -1; }
      return 0;
    }).forEach((rs, idx) => {
      // I have no idea what to do here. Maybe a timestamp based approach?
      // if (idx < TOP_N) {
        rsCopy[rs.key] = recentSearches[rs.key];
      // }
    });

    recentSearches = rsCopy;
    console.log("retrieved recent searches", recentSearches);

  } catch (error) {
    console.error("unable to retrieve recent matches");
  }

  return recentSearches;
}

export const addRecentSearch = (summoner, region, icon) => {
  let recentSearches = decodeRecentSearches();
  const nSummoner = normalizeName(summoner);

  const searchCount = recentSearches[nSummoner] ? recentSearches[nSummoner].count + 1 : 1;

  recentSearches[nSummoner] = {
    name: summoner,
    region,
    icon,
    count: searchCount
  };

  // now store the cookie again
  // TODO: length limit this?

  // if (recentSearches.length > 20){
  //  // pop off first element
  //  recentSearches = recentSearches.slice(1);
  // }

  const recentStr = encodeURIComponent(JSON.stringify(recentSearches));
  setCookie(RECENT_SEARCHES_KEY, recentStr);
}
