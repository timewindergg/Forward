import React, { Component } from 'react';

import ItemProgression from './itemprogression.js';
import SkillTable from './skilltable.js';
import RuneStats from './runestats.js';

class ChampionCompare extends Component {
  renderSelection(teamId, playerId){
    let player = this.props.frameData.players[playerId];

    return(
      <div className="selectionDetails">
        <div className="stats">
          <div className="totalGold">
            Gold: {player.totalGold} Effective: {player.effectiveGold}
          </div>
          <div className="cs">
            CS: {player.cs}
          </div>
          
          <div className="level">
            Level {player.level}
          </div>
          <div className="kda">
            {player.kills}/{player.deaths}/{player.assists}
          </div>
        </div>
        <SkillTable skillOrder={player.skillOrder}
                    skillData={this.props.staticData.championSkills[this.props.matchParticipants[playerId - 1].championId]}
                    version={this.props.staticData.version}/>
        <div className='clear'/>
        <ItemProgression itemOrder={player.purchaseOrder}
                         itemData={this.props.staticData.items}
                         version={this.props.staticData.version}/>
      </div>
    );
  }

  render(){
    return(
      <div className="compareContainer">
        {this.renderSelection(100, this.props.blueSelection)}
        {this.renderSelection(200, this.props.redSelection)}
      </div>
    );
  }
}

export default ChampionCompare;