import React, { Component } from 'react';
import { getRoleIconUrl } from '../../shared/helpers/staticImageHelper.js';
import { roundWithPrecision } from '../../shared/helpers/numberHelper.js';

class LaneStats extends Component {
  render() {
    const laneOrder = ['TOP_LANE', 'JUNGLE', 'MID_LANE', 'BOT_LANE'];
    const {championStats} = this.props;

    const laneData = getLaneStats(championStats);

    const lanes = laneOrder.map((lane) => {
      if (laneData[lane] === undefined){
        return;
      }
      const winRate = laneData[lane] !== undefined ? roundWithPrecision(laneData[lane].wins * 100 /laneData[lane].totalGames, 0) : '-.-';
      const percentagePlayed = laneData[lane] !== undefined ? roundWithPrecision(laneData[lane].totalGames * 100 /laneData.totalGames, 0) : '-.-';
      return (
        <div className="lanestat" key={lane}>
          <img src={getRoleIconUrl(lane)} alt=""/>
          <div className="stat">
            <span className="win-rate">{`${winRate}% WR `}</span>
            <span>/</span>
            <span className="percentage-played">{` ${percentagePlayed}% played`}</span>
          </div>
        </div>
      );
    });

    return (
      <div className="lanestats">
        {lanes}
      </div>
    );
  }
}

const getLaneStats = (championStats) => {
   const lanes = {};
  lanes['totalGames'] = 0;

   championStats.forEach((champion) => {
    const lane = champion.lane;
    if (lane !== 'NONE') {
      if (lanes[lane] === undefined) {
        lanes[lane] = {
          wins: 0,
          losses: 0,
          totalGames: 0
        }
      }

      lanes[lane].wins += champion.wins;
      lanes[lane].losses += champion.losses;
      lanes[lane].totalGames += champion.total_games;
      lanes['totalGames'] += champion.total_games;
    }
   });

   return lanes;
};

export default LaneStats;
