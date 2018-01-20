import axios from 'axios';
import FormData from 'form-data';

import {loadSummonerSuccess, loadSummonerFailed} from '../actions/summonerActions';

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
