import React, { Component } from 'react';

import {generateUserStats} from '../../shared/helpers/leagueUtilities';

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

    const userStats = generateUserStats(matches);

    const data = {
      labels: ['KDA', 'KP', 'Obj Dmg', 'Gold', 'Vision', 'CS'],
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
            },
            tooltips: {
              enabled: false
            },
            scale: {
              ticks: {
                display: false
              },
            }
          }}
        />
      </div>
    );
  }
}


export default MatchStatsRadar;
