import axios from 'axios';

import {loadCurrentMatchSuccess, loadCurrentMatchFailed, 
        loadMatchTimelineSuccess, loadMatchTimelineFailed} from '../actions/matchActions';
// import { fetchMoodDataSuccess } from '../actions/analyzeActions';

// get_current_match
// get_current_match_details

// summoner_name = request.GET['summoner_name']
// region = request.GET['region']

export const getCurrentMatch = (summonerName, region, onSuccess) => {
  // TODO: actually decide on what this is
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

export const getMatchTimeline = (matchId, region, onSuccess) => {
  const uri = '/get_match_timeline/';
  console.log('attempting to get match timeline');
  const params = {
    match_id: matchId,
    region: region
  };

  return (dispatch) => {
    return axios.get(uri, {params}).then((response) => {
      console.log('loaded match timeline', response.data);
      dispatch(loadMatchTimelineSuccess(response.data));
    }).catch((error) => {
      console.log('match timeline err', error);
      dispatch(loadMatchTimelineFailed(error));
    });
  }
}