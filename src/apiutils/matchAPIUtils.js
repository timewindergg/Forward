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

import {cacheSummoner} from '../actions/contextActions';

import {
  normalizeName
} from '../shared/helpers/stringHelper';

// provides an overview of the current match
// i.e. the summoners in the match on each team and limited info on their champions/stats
export const getCurrentMatch = (summonerName, region, id, onSuccess) => {
  const uri = '/api/get_current_match/';
  // console.log('attempting to get current match', summonerName, region);
  const params = {
    summoner_name: summonerName,
    region: region
  };

  if (id !== undefined) {
    params.summoner_id = id;
  }

  return (dispatch) => {
    return axios.get(uri, {params}).then((response) => {
      // console.log('loaded current match', response.data);
      dispatch(loadCurrentMatchSuccess(response.data));

      const nSummonerName = normalizeName(summonerName);
      const {red_team, blue_team} = response.data;

      const isRed = red_team.some(red => normalizeName(red.name) === nSummonerName);
      const ownID = isRed ?
        red_team.find(red => normalizeName(red.name) === nSummonerName).id :
        blue_team.find(blue => normalizeName(blue.name) === nSummonerName).id;

      // pick first player of OTHER TEAM
      const otherID = isRed ? blue_team[0].id : red_team[0].id;

      dispatch(selectSummoner(ownID, isRed));
      dispatch(selectSummoner(otherID, !isRed));

      // cache both the red team and the blue team
      const bothTeams = [...red_team, ...blue_team];
      bothTeams.forEach((s, idx) => {
        // only save cache to cookies on the LAST summoner loaded
        dispatch(cacheSummoner(s.name, region, s.id, idx === bothTeams.length - 1));
      });

      if (!!onSuccess) {
        onSuccess(response.data);
      }
    }).catch((error) => {
      console.warn('/get_current_match/ user is not currently in a match', error);
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
    champion_id: championId,
    summoner_id: summonerID
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
      console.warn('/getCurrentMatchDetails/ user is not currently in a match', error);
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
