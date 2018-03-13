import React, { Component } from 'react';

import { HorizontalBar } from 'react-chartjs-2';

class ChampionStatsBarGraphs extends Component {
  render() {
    const { championStats } = this.props;

    const csData = {
      labels: ['CS@10', 'CS@20', 'CS@30'],
      datasets: [{
		backgroundColor: "rgba(128,0,128,0.5)",
  	    borderColor: "rgba(128,0,128,0.5)",
        data: [Math.round(championStats.cs10 * 10),
               Math.round(championStats.cs10 * 10 + championStats.cs20 * 10),
               Math.round(championStats.cs10 * 10 + championStats.cs20 * 10 +championStats.cs30 * 10)]
      }]
    }
    const csdData = {
      labels: ['CSD@10', 'CSD@20', 'CSD@30'],

      datasets: [{
		backgroundColor: "rgba(128,0,128,0.5)",
	    borderColor: "rgba(128,0,128,0.5)",
        data: [Math.round(championStats.cs_diff10 * 10),
               Math.round(championStats.cs_diff20 * 10),
               Math.round(championStats.cs_diff30 * 10)]
      }]
    }

    const xpData = {
      labels: ['XP@10', 'XP@20', 'XP@30'],
      datasets: [{
		backgroundColor: "rgba(1,98,127,0.5)",
  	    borderColor: "rgba(1,98,127,0.5)",
        data: [Math.round(championStats.xp10 * 10),
               Math.round(championStats.xp10 * 10 + championStats.xp20 * 10),
               Math.round(championStats.xp10 * 10 + championStats.xp20 * 10 + championStats.xp30 * 10)]
      }]
    }
    const xpdData = {
      labels: ['XPD@10', 'XPD@20', 'XPD@30'],
      datasets: [{
		backgroundColor: "rgba(1,98,127,0.5)",
    	borderColor: "rgba(1,98,127,0.5)",
        data: [Math.round(championStats.xp_diff10 * 10),
               Math.round(championStats.xp_diff20 * 10),
               Math.round(championStats.xp_diff30 * 10)]
      }]
    }

    const goldData = {
      labels: ['G@10', 'G@20', 'G@30'],
      datasets: [{
		backgroundColor: "rgba(255,215,0,0.5)",
  	    borderColor: "rgba(255,215,0,0.5)",
        data: [Math.round(championStats.gold10 * 10),
               Math.round(championStats.gold10 * 10 + championStats.gold20 * 10),
               Math.round(championStats.gold10 * 10 + championStats.gold20 * 10 + championStats.gold30 * 10)]
      }]
    }

    return (
      <div className="graphs">
        <div className="csGraphs">
          <div className="graphItem">
            <h3>CS</h3>
            {this.renderBarGraph(csData)}
          </div>
          <div className="graphItem">
            <h3>CS Differential</h3>
            {this.renderBarGraph(csdData)}
          </div>
        </div>
        <div className="xpGraphs">
          <div className="graphItem">
            <h3>XP</h3>
            {this.renderBarGraph(xpData)}
          </div>
          <div className="graphItem">
            <h3>XP Differential</h3>
            {this.renderBarGraph(xpdData)}
          </div>
        </div>
        <div className="goldGraphs">
          <div className="graphItem">
            <h3>Total Gold</h3>
            {this.renderBarGraph(goldData)}
          </div>
        </div>
      </div>
    );
  }

  renderBarGraph(data) {
    return (
      <div className="graph">
        <HorizontalBar
          data={data}
          legend={{display: false}}
          ref={'GoldGraph'}
          options={{
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                gridLines: {
                  display:true
                },
                ticks: {
                  fontFamily: "Muli",
                  autoSkip: true,
                  maxTicksLimit: 10
                }
              }],
              yAxes: [{
                barThickness : 15,
                gridLines: {
                  display:false
                },
                ticks: {
                  fontFamily: "Muli",
                }
              }]
            }
          }}
        />
      </div>
    );
  }
}

export default ChampionStatsBarGraphs;
