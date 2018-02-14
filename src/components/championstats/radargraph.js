import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radar } from 'react-chartjs-2';

class ChampionStatsRadarGraph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.championStats === undefined) {
      return (<div/>);
    }

    const {championStats} = this.props;

    const data = {
      labels: ['Gold', 'Kill', 'Death', 'Assists', 'CS'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: normalizeRadarStats(championStats)
        }
      ]
    };

    return (
      <div className='compare-graph'>
        <Radar
          data={data}
          legend={{display: false}}
        />
      </div>
    )
  }
}

const normalizeRadarStats = (championStats) => {
   // The different areas will be Gold, Kill, Death, Assists, CS
   return [championStats.gold/20000, championStats.kills/20, championStats.deaths/20, championStats.assists/20, (championStats.total_cs/championStats.total_games)/400]
}

export default ChampionStatsRadarGraph;