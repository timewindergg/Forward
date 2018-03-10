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
        <span className="kda">{`${roundWithPrecision(userStats[0], 2)} KDA`}</span>
        <span className="kp">{`${roundWithPrecision(userStats[1], 2)}% KP`}</span>
        <span className="obj-dmg">{`${userStats[2]} Damage dealt to objectives`}</span>
        <span className="gold">{`${userStats[3]} Gold`}</span>
        <span className="vision-score">{`${userStats[4]} Vision Score`}</span>
        <span className="cs">{`${userStats[5]} CS`}</span>
      </div>
    );
  }
}

export default UserStats;
