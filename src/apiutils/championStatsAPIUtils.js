import axios from 'axios';

import {
  loadChampionStatsSuccess,
  loadChampionStatsFailed
} from '../actions/summonerActions';

export const getUserChampionStats = (summonerName, region, id, championId) => {
  const uri = '/api/get_user_champion_stats_by_id/';
  const params = {
    summoner_name: summonerName,
    region: region,
    champion_id: championId
  };

  if (id !== undefined) {
    params.summoner_id = id;
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
