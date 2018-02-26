import React, { Component } from 'react';
import classNames from 'classnames';

import { getChampionIconUrlByImage, getRoleIconUrl } from '../../shared/helpers/staticImageHelper.js';
import { roundWithPrecision } from '../../shared/helpers/numberHelper.js';

class ChampionProfile extends Component {
  renderChampionRoles(championStats, onRoleSelection, roleFrequencies){
    const roleOrder = ['TOP_LANE', 'JUNGLE', 'MID_LANE', 'BOT_LANE'];

    return roleOrder.map((role) => {
      if (role in championStats){
        return (
          <div className={classNames({'role-button': true, 'selected': this.props.role === role})} onClick={() => {onRoleSelection(role)}} key={role}>
            <img className="roleIcon" src={getRoleIconUrl(role)} />
            <div className="winloss">
              {championStats[role].wins} - {championStats[role].losses}
            </div>
            <div className="totalgames">
              {championStats[role].total_games} games
            </div>
          </div>
        );
      }
    });
  }

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
          <div className="champion-stats-champion-icon">
            <img className="championIcon" src={getChampionIconUrlByImage(championData[this.props.championId].img.split('.')[0], this.props.version)}/>
          </div>
          <div className="championDescriptor">
            <span className="champion-name">{this.props.championData[this.props.championId].name}</span>
            <span className="champion-title">{this.props.championData[this.props.championId].title}</span>
          </div>
        </div>
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
        <div className="role-container">
          <div className='champion-roles'>
            {this.renderChampionRoles(this.props.championStats.championStats, this.props.onRoleSelection, this.props.roleFrequencies)}
          </div>
        </div>
      </div>
    );
  }
}

export default ChampionProfile;