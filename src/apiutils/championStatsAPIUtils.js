import axios from 'axios';

import {
  loadChampionStatsSuccess,
  loadChampionStatsFailed
} from '../actions/summonerActions';

export const getUserChampionStats = (summonerName, region, championName, id = undefined) => {
  const uri = '/api/get_user_champion_stats_by_name/';
  const params = {
    summoner_name: summonerName,
    region: region,
    champion_name: championName
  };

  if (id !== undefined) {
    params.id = id;
  }

  return (dispatch) => {
    return axios.get(uri, {params}).then((response) => {
      dispatch(loadChampionStatsSuccess(
        response.data
      ));
    }).catch((error) => {
      console.log(error);
      dispatch(loadChampionStatsFailed(summonerName, error));
    });
  }
}
