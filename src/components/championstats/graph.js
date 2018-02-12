import React, { Component } from 'react';

import { HorizontalBar, Radar } from 'react-chartjs-2';

class ChampionStatsRadarGraph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.championStats === undefined) {
      return (<div/>);
    }

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
          data: [38, 25, 28, 21, 28]
        }
      ]
    };

    return (
      <Radar data={data}
        width={200}
        height={200}
        options={{
          maintainAspectRatio: false
      }}/>
    )
  }
}

class ChampionStatsBarGraph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.championStats === undefined) {
      return (<div/>);
    }

    const data = {
      labels: ['XP Diff at 10', 'XP Diff at 20', 'XP Diff at 30'],
      datasets: [{
        data: [-10.15, 38.75, -169.7]
      }]
    };

    return (
      <HorizontalBar data={data}
        height={200}
        width={1000}
        options={{
          maintainAspectRatio: false
      }}/>
    );
  }
}

export { ChampionStatsBarGraph, ChampionStatsRadarGraph };