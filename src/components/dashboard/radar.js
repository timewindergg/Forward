import React, { Component } from 'react';

import { getKDA, getKillParticipation} from '../../shared/helpers/leagueUtilities';

import { Radar } from 'react-chartjs-2';

class MatchStatsRadar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.matches === undefined) {
      return (<div/>);
    }

    const {matches} = this.props;

    const userStats = generateRadarData(matches);

    const data = {
      labels: ['KDA', 'KP', 'Dmg to Objective', 'Gold', 'Vision', 'CS'],
      datasets: [
        {
          data: [userStats[0]/4, userStats[1]/60, userStats[2]/7000, userStats[3]/20000, userStats[4]/8, userStats[5]/70]
        }
      ]
    };

    return (
      <div className="dashboard-summoner-radar-stats">
        <Radar
          data={data}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: false
            }
          }}
        />
      </div>
    );
  }
}

// will be [kda, kp, damage to objective, gold, vision, cs]
const generateRadarData = (matches) => {
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

export default MatchStatsRadar;
