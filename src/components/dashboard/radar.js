import React, { Component } from 'react';

import {generateUserStats} from '../../shared/helpers/leagueUtilities';
import { roundWithPrecision } from '../../shared/helpers/numberHelper.js';

import { Radar } from 'react-chartjs-2';

class MatchStatsRadar extends Component {
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
          'label': "",
          "data": [roundWithPrecision(userStats[0]/2, 1),
                  roundWithPrecision(userStats[1]/50, 1),
                  roundWithPrecision(userStats[2]/8000, 1),
                  roundWithPrecision(userStats[3]/10000, 1),
                  roundWithPrecision(userStats[4]/10, 1),
                  roundWithPrecision(userStats[5]/180, 1)],
          "fill":true,
          "backgroundColor":"rgba(255, 99, 132, 0.2)",
          "borderColor":"rgb(255, 99, 132)",
          "pointBackgroundColor":"rgb(255, 99, 132)",
          "pointBorderColor":"#fff",
          "pointHoverBackgroundColor":"#fff",
          "pointHoverBorderColor":"rgb(255, 99, 132)"
        },
        {
          'label': "Avg",
          "data": [1, 1, 1, 1, 1, 1]
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
              enabled: true
            },
            scale: {
              ticks: {
                display: false,
                beginAtZero: true,
                min: 0,
                max: 3,
              },
            }
          }}
        />
      </div>
    );
  }
}


export default MatchStatsRadar;
