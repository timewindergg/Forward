import axios from 'axios';

import {fetchMatchHistorySuccess, fetchMatchHistoryError} from '../actions/matchHistoryActions';

export const getSummonerMatchHistory = (summoner_name, region, id, offset, size) => {
  const uri = `/api/get_match_history/`;
  const params = {
    summoner_name,
    region,
    offset,
    size
  };

  if (id !== undefined) {
    params.summoner_id = id;
  }

  return (dispatch) => {
    axios.get(uri, {params})
      .then((response) => {
        const result = response.data;
        result.forEach(function(match) {
          // parse the blue and red team data.
          match.red_team = JSON.parse(match.red_team);
          match.blue_team = JSON.parse(match.blue_team);
        });

        dispatch(fetchMatchHistorySuccess(summoner_name, region, result));
      }).catch((error) => {
        dispatch(fetchMatchHistoryError(error));
      });
  }
};
