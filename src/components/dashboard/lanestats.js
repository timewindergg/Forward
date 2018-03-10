import React, { Component } from 'react';
import { getRoleIconUrl } from '../../shared/helpers/staticImageHelper.js';
import { roundWithPrecision } from '../../shared/helpers/numberHelper.js';

class LaneStats extends Component {
  render() {
    const laneOrder = ['TOP_LANE', 'JUNGLE', 'MID_LANE', 'BOT_LANE'];
    const {championStats} = this.props;

    const laneData = getLaneStats(championStats);

    const lanes = laneOrder.map((lane) => {
      const winRate = laneData[lane] !== undefined ? roundWithPrecision(laneData[lane].wins * 100 /laneData[lane].totalGames, 2) : '-.-';
      const percentagePlayed = laneData[lane] !== undefined ? roundWithPrecision(laneData[lane].totalGames * 100 /laneData.totalGames, 2) : '-.-';
      return (
        <div className="lanestat" key={lane}>
          <img src={getRoleIconUrl(lane)}/>
          <span>{`${winRate}% WR / ${percentagePlayed}% played`}</span>
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
      if (lanes[lane] == undefined) {
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
