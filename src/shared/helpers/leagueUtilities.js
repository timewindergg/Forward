import { roundWithPrecision } from './numberHelper';

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
