import axios from 'axios';

import {
  loadCurrentMatchSuccess,
  loadCurrentMatchFailed, 
  loadCurrentMatchDetailsSuccess,
  loadCurrentMatchDetailsFailed,
  loadMatchTimelineSuccess,
  loadMatchTimelineFailed
} from '../actions/matchActions';

import {
  selectSummoner
} from '../actions/pregameActions';

// provides an overview of the current match
// i.e. the summoners in the match on each team and limited info on their champions/stats
export const getCurrentMatch = (summonerName, region, onSuccess) => {
  const uri = '/api/get_current_match/';
  // console.log('attempting to get current match', summonerName, region);
  const params = {
    summoner_name: summonerName,
    region: region
  };

  return (dispatch) => {
    // console.log(dispatch);
    return axios.get(uri, {params}).then((response) => {
      // console.log('loaded current match', response.data);
      dispatch(loadCurrentMatchSuccess(response.data));

      const isRed = response.data.red_team.some(red => red.name.toLowerCase() === summonerName.toLowerCase());
      const ownID = isRed ?
        response.data.red_team.find(red => red.name.toLowerCase() === summonerName.toLowerCase()).id :
        response.data.blue_team.find(blue => blue.name.toLowerCase() === summonerName.toLowerCase()).id;

      // pick first player of OTHER TEAM
      const otherID = isRed ? response.data.blue_team[0].id : response.data.red_team[0].id;

      dispatch(selectSummoner(ownID, isRed));
      dispatch(selectSummoner(otherID, !isRed));
      if (!!onSuccess) {
        onSuccess(response.data);
      }
    }).catch((error) => {
      console.log('user is not currently in a match', error);
      dispatch(loadCurrentMatchFailed(error));
    });
  }
}

// provides detailed info on ONE summoner/champion within a current match
export const getCurrentMatchDetails = (summonerID, summonerName, region, championId) => {
  const uri = '/api/get_current_match_details_by_id/';
  const params = {
    summoner_name: summonerName,
    region: region,
    champion_id: championId
  };

  return (dispatch) => {
    return axios.get(uri, {params}).then((response) => {
      // console.log('loaded current match details', response.data);
      const {stats, build, leagues} = response.data;

      dispatch(loadCurrentMatchDetailsSuccess(
        summonerID,
        stats,
        build,
        leagues
      ));
    }).catch((error) => {
      console.log('/getCurrentMatchDetails/ user is not currently in a match', error);
      dispatch(loadCurrentMatchDetailsFailed(summonerID, error));
    });
  }
}

export const getMatchTimeline = (matchId, region, onSuccess) => {
  const uri = '/api/get_match_timeline/';
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
