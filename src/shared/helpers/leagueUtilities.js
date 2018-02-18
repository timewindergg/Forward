import { roundWithPrecision } from './numberHelper';
import RuneMappings from '../runeMappings';

export const getKDA = (kills, deaths, assists) => {
  const killsAndAssists = kills + assists;
  const kda = deaths === 0 ? killsAndAssists : killsAndAssists/deaths;

  return kda;
}

export const getKillParticipation = (userKills, userAssists, totalTeamKills) => {
  if (totalTeamKills === 0) {
    return 0;
  }

  return roundWithPrecision(((userKills + userAssists)*100/totalTeamKills), 2);
}

export const getKeystone = (runes) => {
  for (var i = 0; i < runes.length; i++){
    if (RuneMappings[runes[i]].keyStone){
      return runes[i];
    }
  }

  return 0;
}