import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ItemProgression from './itemprogression.js';
import SkillTable from '../common/skilltable.js';

class ChampionCompare extends Component {
  static propTypes = {
    frameData: PropTypes.object.isRequired,
    matchParticipants: PropTypes.array.isRequired,
    redSelection: PropTypes.number.isRequired,
    blueSelection: PropTypes.number.isRequired,
    staticData: PropTypes.object.isRequired
  }


  renderSelection(teamId, playerId){
    let player = this.props.frameData.players[playerId];

    // TODO: work on this part (make it look pretty)
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