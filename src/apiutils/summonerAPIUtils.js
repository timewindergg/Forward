import axios from 'axios';
import FormData from 'form-data';

import {loadSummonerSuccess, loadSummonerFailed} from '../actions/summonerActions';

// // this is the structure we should follow
// export const getSummonerInfo = (summonerName, region) => {
//   const uri = `/get_summoner/`;
//   return (dispatch) => {
//     console.log('getting summoner info');

//     // axios stuff here
//     return axios.get(uri, {
//       params: {
//         summoner_name: summonerName,
//         region: region
//       }
//     }).then((response) => {
//       console.log('loaded summoner', response.data);
//     }).catch((error) => {
//       console.log('whoops');
//     });
//   }
// }

const mapSummonerToAPIData = (summoner) => {
  // not sure if we need this yet
}

// maps API representation to something the app could use
// so we only update here when API changes
const mapAPIDataToSummoner = (apiData) => {
  return {
    userID:             apiData.user_id,
    region:             apiData.region,
    summonerName:       apiData.name,
    lastUpdated:        apiData.last_updated,
    lastMatchUpdated:   apiData.last_match_updated,
    rankS8:             apiData.rank_s8,
    rankS7:             apiData.rank_s7,
    wins:               apiData.wins,
    losses:             apiData.losses,
    level:              apiData.level,
    icon:               apiData.icon,
    timePlayed:         apiData.time_played,
    championMasteries:  apiData.championMasteries,
    leagues:            apiData.leagues
  };
}

export const getSummonerInfo = (summonerName, region) => {
  const getURI = `/get_summoner/`;
  const params = {
    summoner_name: summonerName,
    region: region
  };

  const formData = new FormData();
  formData.append('summoner_name', summonerName);
  formData.append('region', region);

  // workaround until Peter abstracts this logic away
  return (dispatch) => {
    // console.log('getting summoner info');
    return axios.get(getURI, {params}).then((response) => {
      console.log('loaded summoner', response.data);
      dispatch(loadSummonerSuccess(response.data));
      // TODO: dispatch action here
    }).catch((error) => {
      console.log('whoops', error);
      dispatch(loadSummonerFailed(error));
    });
  }
}
