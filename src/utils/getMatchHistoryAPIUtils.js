import axios from 'axios';

import { fetchMatchHistorySuccess } from '../actions/matchHistoryActions';

// Import required mappings.
import ChampionMappings from '../shared/championMappings.js';
import summonerSpellMappings from '../shared/summonerSpellMappings.js';
import QueueIdMappings from '../shared/queueIdMappings.js';

export const getSummonerMatchHistory = (dispatch, summonerId, region, offset, size) => {
  const uri = `/get_match_history/?summoner_id=${summonerId}&region=${region}&offset=${offset}&size=${size}`;

  axios.get(uri)
    .then((response) => {
      const result = response.data;
      result.forEach(function(match) {
        match.championUrl = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/champion/${ChampionMappings[match.champion_id].image}`;
        match.spell1Url = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/${summonerSpellMappings[match.spell0].image}`;
        match.spell2Url = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/${summonerSpellMappings[match.spell1].image}`;
        match.item0Url = match.item0 === 0 ? "" : `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/${match.item0}.png`;
        match.item1Url = match.item1 === 0 ? "" : `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/${match.item1}.png`;
        match.item2Url = match.item2 === 0 ? "" : `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/${match.item2}.png`;
        match.item3Url = match.item3 === 0 ? "" : `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/${match.item3}.png`;
        match.item4Url = match.item4 === 0 ? "" : `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/${match.item4}.png`;
        match.item5Url = match.item5 === 0 ? "" : `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/${match.item5}.png`;
        match.item6Url = match.item6 === 0 ? "" : `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/${match.item6}.png`;
        match.championName = ChampionMappings[match.champion_id].name;
        match.game_type = QueueIdMappings[match.queue_id].name;
        match.roleIcon = fetchRoleIconName(match.lane, match.role);

        // Calculate KDA.
        match.kda = getKDA(match.kills, match.deaths, match.assists);

        // Set up to get relative time.
        const gameDate = new Date(0);
        gameDate.setUTCSeconds(match.timestamp);
        match.timestamp = gameDate;

        const duration = match.duration;
        // Format the game duration.
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        match.duration = strPadLeft(minutes, '0', 2) +  ':' + strPadLeft(seconds, '0', 2);

        // parse the blue and red team data.
        match.red_team = JSON.parse(match.red_team);
        match.blue_team = JSON.parse(match.blue_team);
        for (let i = 0; i < match.red_team.length; i++) {
          match.red_team[i] = JSON.parse(match.red_team[i]);
          match.blue_team[i] = JSON.parse(match.blue_team[i]);
        }

        // Calculate kill participation.
        match.killParticipation = getKillParticipation(match.kills, match.assists, getTotalTeamKills(match.team === 100 ? match.blue_team: match.red_team));
        console.log(match.killParticipation);
      });

      dispatch(fetchMatchHistorySuccess(result));
    });
};


function strPadLeft(string, pad, length) {
  return (new Array(length+1).join(pad)+string).slice(-length);
}

function fetchRoleIconName(lane, role) {
  switch (lane) {
    case 'MID_LANE':
      return 'Mid';
    case 'BOT_LANE':
      return role === 'Role.support' ? 'Support' : 'Bot';
    case 'TOP_LANE':
      return 'Top';
    case 'JUNGLE':
      return 'Jungler';

    default:
      return 'Mid';
  }
}


function getTotalTeamKills(team) {
  let kills = 0;
  team.forEach(function(player) {
    kills += player.stats.kills;
  });

  return kills;
}

function getLargestKillingSpree(team, summonerName) {

}

function getKDA(kills, deaths, assists) {
  if (deaths === 0) {
    return 'Perfect';
  }

  return ((kills + assists)/deaths).toFixed(2);
}

function getKillParticipation(userKills, userAssists, totalTeamKills) {
  if (totalTeamKills === 0) {
    return '0%';
  }

  return ((userKills + userAssists)*100/totalTeamKills).toFixed(2) + '%';
}


