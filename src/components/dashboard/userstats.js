import React, { Component } from 'react';
import {generateUserStats} from '../../shared/helpers/leagueUtilities';
import { roundWithPrecision } from '../../shared/helpers/numberHelper.js';

class UserStats extends Component {

  render() {
    const { matches } = this.props;

    const userStats = generateUserStats(matches);
    // will be [kda, kp, damage to objective, gold, vision, cs]

    return (
      <div className="userstats">
        <div className="statValues">
          <span className="kda">{`${roundWithPrecision(userStats[0], 2)}`}</span>
          <span className="kp">{`${roundWithPrecision(userStats[1], 0)}`}</span>
          <span className="cs">{`${roundWithPrecision(userStats[5], 0)}`}</span>
          <span className="gold">{`${roundWithPrecision(userStats[3], 0)}`}</span>
          <span className="obj-dmg">{`${roundWithPrecision(userStats[2], 0)}`}</span>
          <span className="vision-score">{`${roundWithPrecision(userStats[4], 0)}`}</span>
        </div>
        <div className="statLabels">
          <span className="kda">{` KDA`}</span>
          <span className="kp">{` % KP`}</span>
          <span className="cs">{` CS`}</span>
          <span className="gold">{` Gold`}</span>
          <span className="obj-dmg">{` Obj Dmg`}</span>
          <span className="vision-score">{` Vision Score`}</span>
        </div>
      </div>
    );
  }
}

export default UserStats;
