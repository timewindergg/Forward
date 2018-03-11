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


// will be [kda, kp, damage to objective, gold, vision, cs]
export const generateUserStats = (matches) => {
  let totalMinutes = 0;
  const stats = [0, 0, 0, 0, 0, 0];

  for (let i = 0; i < matches.length; i++) {
    const kda = getKDA(matches[i].kills, matches[i].deaths, matches[i].assists);

    const team = matches[i].team === 100 ? matches[i].blue_team : matches[i].red_team;

    const teamKills = getTotalTeamKills(team);

    const kp = getKillParticipation(matches[i].kills, matches[i].assists, teamKills);

    const summonerStats = getSummonerStats(team, matches[i].user_id);

    stats[0] += kda;
    stats[1] += kp;
    stats[2] += summonerStats[0];
    stats[3] += matches[i].gold;
    stats[4] += summonerStats[1];
    stats[5] += matches[i].cs;
  }

  if (matches.length === 0) {
    // avoid NaNs or something
    return stats;
  }

  for (let i = 0; i < stats.length; i++) {
    stats[i] = stats[i]/matches.length;
  }

  return stats;
}

const getTotalTeamKills = (team) => {
  let kills = 0;
  team.participants.forEach((player) => {
    kills += player.stats.kills;
  });

  return kills;
}

// returns [damage to objective and vision score]
const getSummonerStats = (team, summonerId) => {
  for (let i = 0; i < team.participants.length; i++) {
    if (team.participants[i].summonerId === summonerId) {
      return [team.participants[i].stats.damageDealtToObjectives, team.participants[i].stats.visionScore];
    }
  }
};