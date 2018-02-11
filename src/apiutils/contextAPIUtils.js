import axios from 'axios';

import {
  loadStaticDataSuccess,
  loadStaticDataFailed 
} from '../actions/contextActions';

export const getStaticData = (region, onSuccess) => {
  console.log('attempting to get static data');

  const uri = `/get_static_data/${region}/`;
  
  const params = {
    region: region
  };

  return (dispatch) => {
    return axios.get(uri, {params}).then((response) => {
      console.log('loaded static data', response.data);
      dispatch(loadStaticDataSuccess(response.data));
    }).catch((error) => {
      console.log('static data err', error);
      dispatch(loadStaticDataFailed(error));
    });
  }
}