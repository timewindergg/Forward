import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radar } from 'react-chartjs-2';

class ChampionStatsRadarGraph extends Component {
  render() {
    if (this.props.championStats === undefined) {
      return (<div/>);
    }

    const {championStats} = this.props;

    const data = {
      labels: ['Gold', 'Kills', 'Deaths', 'Assists', 'CS'],
      datasets: [
        {
          label: '',
          "fill":true,
          "backgroundColor":"rgba(255, 99, 132, 0.2)",
          "borderColor":"rgb(255, 99, 132)",
          "pointBackgroundColor":"rgb(255, 99, 132)",
          "pointBorderColor":"#fff",
          "pointHoverBackgroundColor":"#fff",
          "pointHoverBorderColor":"rgb(255, 99, 132)",
          data: normalizeRadarStats(championStats)
        },
        {
          label:'avg',
          data: [1, 1, 1, 1, 1]
        }
      ]
    };

    return (
      <div className='radar-graph'>
        <Radar
          data={data}
          legend={{display: false}}
          options={{
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
    )
  }
}

const normalizeRadarStats = (championStats) => {
   // The different areas will be Gold, Kill, Death, Assists, CS
   return [championStats.gold/championStats.total_games/10000,
           championStats.kills/championStats.total_games/6,
           championStats.deaths/championStats.total_games/6,
           championStats.assists/championStats.total_games/6,
           championStats.total_cs/championStats.total_games/180]
}

export default ChampionStatsRadarGraph;
