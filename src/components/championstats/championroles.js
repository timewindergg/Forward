import React, { Component } from 'react';
import classNames from 'classnames';

import { getRoleIconUrl } from '../../shared/helpers/staticImageHelper.js';

class ChampionRoles extends Component{
  renderChampionRoles(championStats, onRoleSelection){
    const roleOrder = ['TOP_LANE', 'JUNGLE', 'MID_LANE', 'BOT_LANE'];

    return roleOrder.map((role) => {
      if (role in championStats){
        return (
          <div className={classNames({'role-button': true, 'selected': this.props.role === role})} onClick={() => {onRoleSelection(role)}} key={role}>
            <img className="roleIcon" src={getRoleIconUrl(role)} alt=""/>
            <div className="roleStat">
              <div className="winloss">
                <span className="wins">{`${championStats[role].wins}W `}</span>
                <span className="losses">{`${championStats[role].losses}L`}</span>
              </div>
              <div className="totalgames">
                {championStats[role].total_games} games
              </div>
            </div>
          </div>
        );
      }

      return '';
    });
  }


  render(){
    return(
      <div className='championRoles'>
        {this.renderChampionRoles(this.props.championStats.championStats, this.props.onRoleSelection)}
      </div>
    );
  }
}

export default ChampionRoles;