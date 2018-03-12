import React, { Component } from 'react';
import classNames from 'classnames';

import { getChampionIconUrlByImage } from '../../shared/helpers/staticImageHelper.js';
import { roundWithPrecision } from '../../shared/helpers/numberHelper.js';

class ChampionProfile extends Component {
  render(){
    const { championStats, championData} = this.props;

    let totalWins = 0;
    let totalLosses = 0;
    Object.entries(championStats.championStats).map((stats) => {
      totalWins += stats[1].wins;
      totalLosses += stats[1].losses;
    });

    return(
      <div className="profileContainer">
        <div className="champion-stats-champion-profile">
          <img className="championIcon" src={getChampionIconUrlByImage(championData[this.props.championId].img.split('.')[0], this.props.version)}/>
          <div className="statOverview">
            <div className="winloss">
              {totalWins}W {totalLosses}L
            </div>
            <div className="winratio">
              {roundWithPrecision(totalWins / this.props.totalGames * 100, 2)}%
            </div>
            <div className="totalgames">
              {this.props.totalGames} games played
            </div>
          </div>
        </div>
        <div className="championDescriptor">
          <span className="champion-name">{this.props.championData[this.props.championId].name}</span>
          <span className="champion-title">{this.props.championData[this.props.championId].title}</span>
        </div>
      </div>
    );
  }
}

export default ChampionProfile;