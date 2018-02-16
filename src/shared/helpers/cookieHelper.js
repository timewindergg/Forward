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

export const decodeRecentSearches = () => {
    let recentSearchCookie = getCookie(RECENT_SEARCHES_KEY);
    if (recentSearchCookie === '') {
        setCookie(RECENT_SEARCHES_KEY, encodeURIComponent('{}'));
    }

    recentSearchCookie = decodeURIComponent(getCookie(RECENT_SEARCHES_KEY));

    let recentSearches = {};

    try {
        recentSearches = JSON.parse(recentSearchCookie);
        console.log("retrieved recent matches");
    } catch (error) {
        console.error("unable to retrieve recent matches");
    }

    return recentSearches;
}

export const addRecentSearch = (summoner, region, icon) => {
    let recentSearches = decodeRecentSearches();

    recentSearches[summoner] = {
        name: summoner,
        region,
        icon
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
