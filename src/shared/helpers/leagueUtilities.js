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

export const strPadLeft = (string, pad, length) => {
  return (new Array(length+1).join(pad)+string).slice(-length);
}

// Returns an array of the kills, deaths and assists.
export const getTeamKDAStat = (team) => {
  let kills = 0;
  let deaths = 0;
  let assists = 0;

  team.participants.forEach((player) => {
    kills += player.stats.kills;
    deaths += player.stats.deaths;
    assists += player.stats.assists;
  });

  return [kills, deaths, assists];
}