import React, { Component } from 'react';

import { getChampionIconUrl, getRoleIconUrl } from '../../shared/helpers/staticImageHelper.js';
import ChampionMappings from '../../shared/championMappings';

class ChampionProfile extends Component {

  renderChampionRoles(){
    const roleOrder = ['TOP_LANE', 'JUNGLE', 'MID_LANE', 'BOT_LANE'];

    return roleOrder.map((role) => {
      if (role in this.props.championStats){
        return (
          <div id="role-button" onClick={() => {this.onRoleSelection(role)}}>
            <img className="roleIcon" src={getRoleIconUrl(role)} />
          </div>
        );
      }
    });
  }

  render(){
    return(
      <div className="profileContainer">
        <div className="champion-stats-champion-profile">
          <div className="champion-stats-champion-icon">
            <img className="championIcon" src={getChampionIconUrl(this.props.championId, this.props.version)}/>
          </div>
          <div className="championDescriptor">
            <span className="champion-name">{this.props.championData[this.props.championId].name}</span>
            <span className="champion-title">{this.props.championData[this.props.championId].title}</span>
          </div>
        </div>
        <div className="champion-stats-role-container">
          <div className='champion-roles'>
            {this.renderChampionRoles()}
          </div>
        </div>
      </div>
    );
  }
}

export default ChampionProfile;