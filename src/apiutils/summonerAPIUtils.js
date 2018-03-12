import axios from 'axios';
import FormData from 'form-data';

import {loadSummonerSuccess, loadSummonerFailed} from '../actions/summonerActions';
import {cacheSummoner, setSummonerContext} from '../actions/contextActions';

import {
  LAST_SEARCHED_KEY,
  setCookie,
  addRecentSearch,
  decodeRecentSearches
  // RECENT_SEARCHES_KEY
} from '../shared/helpers/cookieHelper';

export const getSummonerInfo = (summonerName, region, id, onSuccess) => {
  const getURI = `/api/get_summoner/`;
  const params = {
    summoner_name: summonerName,
    region: region
  };

  if (id !== undefined) {
    // console.log('ID found?');
    params.summoner_id = id;
  }

  return (dispatch) => {
    setCookie(LAST_SEARCHED_KEY, region.toUpperCase());
    dispatch(setSummonerContext(summonerName, region));
    // console.log('getting summoner info');
    return axios.get(getURI, {params}).then((response) => {
      console.log('loaded summoner', response.data);
      // now add this to recent searches!
      addRecentSearch(response.data.name, region, response.data.icon);

      dispatch(loadSummonerSuccess(response.data));

      // only save cache tp cookie on initial cache miss
      dispatch(cacheSummoner(response.data.name, region, response.data.user_id, id === undefined));

      // onSuccess is an object like such
      // (args) => actionName(action params provided by the caller that defines onSuccess)
      // args would be from the API result
      if (!!onSuccess) {
        // console.log('chaining');
        onSuccess(response.data);
      }
    }).catch((error) => {
      console.log('whoops', error);
      dispatch(loadSummonerFailed(error));
    });
  }
}
