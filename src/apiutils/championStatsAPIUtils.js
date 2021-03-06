import axios from 'axios';

import {
  loadChampionStatsStart,
  loadChampionStatsSuccess,
  loadChampionStatsFailed
} from '../actions/summonerActions';

export const getUserChampionStats = (summonerName, region, id, championName) => {
  const uri = '/api/get_user_champion_stats_by_name/';
  const params = {
    summoner_name: summonerName,
    region: region,
    champion_name: championName
  };

  if (id !== undefined) {
    params.summoner_id = id;
  }

  return (dispatch) => {
    dispatch(loadChampionStatsStart());

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
