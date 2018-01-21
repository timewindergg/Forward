import axios from 'axios';

import {
  loadCurrentMatchSuccess,
  loadCurrentMatchFailed,
  loadCurrentMatchDetailsSuccess,
  loadCurrentMatchDetailsFailed
} from '../actions/matchActions';

// provides an overview of the current match
// i.e. the summoners in the match on each team and limited info on their champions/stats
export const getCurrentMatch = (summonerName, region) => {
  const uri = '/get_current_match/';
  console.log('attempting to get current match');
  const params = {
    summoner_name: summonerName,
    region: region
  };

  return (dispatch) => {
    return axios.get(uri, {params}).then((response) => {
      console.log('loaded current match', response.data);
      dispatch(loadCurrentMatchSuccess(response.data));
    }).catch((error) => {
      console.log('user is not currently in a match', error);
      dispatch(loadCurrentMatchFailed(error));
    });
  }
}

// provides detailed info on ONE summoner/champion within a current match
export const getCurrentMatchDetails = (summonerID, summonerName, region, championId) => {
  const uri = '/get_current_match_details/';
  const params = {
    summoner_name: summonerName,
    region: region,
    champion_id: championId
  };

  return (dispatch) => {
    return axios.get(uri, {params}).then((response) => {
      console.log('loaded current match details', response.data);
      const {stats, build} = response.data;

      dispatch(loadCurrentMatchDetailsSuccess(
        summonerID,
        stats,
        build
      ));
    }).catch((error) => {
      console.log('/getCurrentMatchDetails/ user is not currently in a match', error);
      dispatch(loadCurrentMatchDetailsFailed(summonerID, error));
    });
  }
}
