import axios from 'axios';

import { fetchMatchHistorySuccess } from '../actions/matchHistoryActions';

// Import required mappings.
import ChampionMappings from '../championMappings.js';
import summonerSpellMappings from '../summonerSpellMappings.js';

export const getSummonerMatchHistory = (dispatch, summonerId, region, offset, size) => {
  const uri = `/get_match_history/?summoner_id=${summonerId}&region=${region}&offset=${offset}&size=${size}`;

  axios.get(uri)
    .then((response) => {
      const result = response.data;
      result.forEach(function(match) {
        match.championUrl = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/champion/${ChampionMappings[match.champion_id].image}`;
        match.spell1Url = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/${summonerSpellMappings[match.spell0].image}`;
        match.spell2Url = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/spell/${summonerSpellMappings[match.spell1].image}`;
        match.item0Url = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/${match.item0}.png`;
        match.item1Url = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/${match.item1}.png`;
        match.item2Url = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/${match.item2}.png`;
        match.item3Url = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/${match.item3}.png`;
        match.item4Url = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/${match.item4}.png`;
        match.item5Url = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/${match.item5}.png`;
        match.item6Url = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/item/${match.item6}.png`;
        match.championName = ChampionMappings[match.champion_id].name;
      });

      dispatch(fetchMatchHistorySuccess(result));
    });
};