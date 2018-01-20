import axios from 'axios';

import { fetchMatchHistorySuccess } from '../actions/matchHistoryActions';

// Import required mappings.
import ChampionMappings from '../shared/championMappings.js';
import summonerSpellMappings from '../shared/summonerSpellMappings.js';
import QueueIdMappings from '../shared/queueIdMappings.js';
import RuneMappings from '../shared/runeMappings.js';

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

        // Get the list of participants and their champions.
        match.participants = getParticipants(match.blue_team, match.red_team);

        // Set user primary and secondary runes.
        const runes = getPlayerRunes(match.team === 100 ? match.blue_team: match.red_team, summonerId);
        if (runes.length === 2) {
          match.rune1 = `http://opgg-static.akamaized.net/images/lol/perk/${runes[0]}.png`;
          match.rune2 = `http://opgg-static.akamaized.net/images/lol/perkStyle/${runes[1]}.png`;
        }
      });

      dispatch(fetchMatchHistorySuccess(result));
    });
};

const strPadLeft = (string, pad, length) => {
  return (new Array(length+1).join(pad)+string).slice(-length);
}

const fetchRoleIconName = (lane, role) => {
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


const getTotalTeamKills = (team) => {
  let kills = 0;
  team.forEach((player) => {
    kills += player.stats.kills;
  });

  return kills;
}

const getKDA = (kills, deaths, assists) => {
  if (deaths === 0) {
    return 'Perfect';
  }

  return ((kills + assists)/deaths).toFixed(2);
}

const getKillParticipation = (userKills, userAssists, totalTeamKills) => {
  if (totalTeamKills === 0) {
    return '0%';
  }

  return ((userKills + userAssists)*100/totalTeamKills).toFixed(2) + '%';
}

// Takes in team data and return a list of the following structure where the first element is the blue team.
// Note that the players are sorted top -> jungle -> mid -> adc -> support.
/*
  [
    [{
      summonerName: 'doublelift',
      championUrl: 'path_to_image',
      summonerId: 12333
    }]
  ]
*/

const getParticipants = (blueTeam, redTeam) => {
  const teams = [];
  const _blueTeam = new Array(5);
  const _redTeam = new Array(5);

  teams.push(_blueTeam);
  teams.push(_redTeam);

  // Create arrays that will store players that have roles that are duplicated.
  const blueDups = [];
  const redDupes = [];

  for (let i = 0; i < blueTeam.length; i++) {
    const bluePlayerEntry = {};
    const redPlayerEntry = {};
    // Fill in the summoner name first.
    bluePlayerEntry['summonerName'] = blueTeam[i].summonerName;
    redPlayerEntry['summonerName'] = redTeam[i].summonerName;
    bluePlayerEntry['summonerId'] = blueTeam[i].summonerId;
    redPlayerEntry['summonerId'] = redTeam[i].summonerId;

    // Fill in the championIcons.
    bluePlayerEntry['championUrl'] = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/champion/${ChampionMappings[blueTeam[i].championId].image}`;
    redPlayerEntry['championUrl'] = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/champion/${ChampionMappings[redTeam[i].championId].image}`;

    // Set the appropriate element in the _blueTeam and _redTeam to the player entry if there's no entry already.
    const bluePlayerPosition = getPlayerPosition(blueTeam[i].timeline.role, blueTeam[i].timeline.lane);
    const redPlayerPosition = getPlayerPosition(redTeam[i].timeline.role, redTeam[i].timeline.lane);

    if (_blueTeam[bluePlayerPosition] === undefined) {
      _blueTeam[bluePlayerPosition] = bluePlayerEntry;
    } else {
      blueDups.push(bluePlayerEntry);
    }

    if (_redTeam[redPlayerPosition] === undefined) {
      _redTeam[redPlayerPosition] = redPlayerEntry;
    } else {
      redDupes.push(redPlayerEntry);
    }
  }

  for (let i = 0; i < blueDups.length; i++) {
    for (let j = 0; j < 5; j++) {
      if (_blueTeam[j] === undefined) {
        _blueTeam[j] = blueDups[i];
        break;
      }
    }
  }

  for (let i = 0; i < redDupes.length; i++) {
    for (let j = 0; j < 5; j++) {
      if (_redTeam[j] === undefined) {
        _redTeam[j] = redDupes[i];
        break;
      }
    }
  }

  return teams;
}

// Helper function for getParticipants which takes in a role and a lane and return the position of the player as [0, 4]
const getPlayerPosition = (role, lane) => {
  switch (lane) {
    case 'MIDDLE':
      return 2;
    case 'BOTTOM':
      return role === 'DUO_SUPPORT' ? 4 : 3;
    case 'TOP':
      return 0;
    case 'JUNGLE':
      return 1;

    default:
      return 2;
  }
}

// Return an array of two elements where the first one is the user's primary runes and the second is the secondary one.
const getPlayerRunes = (team, summonerId) => {
  const runes = [];
  team.forEach((player) => {
    if (player.summonerId === summonerId) {
      // Loop through user runes and find the keystone.
      for (let key in player.runes) {
        console.log(key);
        if (RuneMappings[key].keyStone === true) {
          runes.push(parseInt(key));
        }
      }

      runes.push(player.stats.perkSubStyle);
    }
  });

  return runes;
}

