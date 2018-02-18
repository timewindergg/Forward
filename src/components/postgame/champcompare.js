import React, { Component } from 'react';

import ItemProgression from './itemprogression.js';
import SkillTable from './skilltable.js';

class ChampionCompare extends Component {
  renderSelection(teamId, player){
    return(
      <div className="selectionDetails">
        <SkillTable skillOrder={this.props.frameData.players[player].skillOrder}
                    skillData={this.props.staticData.championSkills[this.props.matchParticipants[player - 1].championId]}
                    version={this.props.staticData.version}/>
        <div className='clear'/>
        <ItemProgression itemOrder={this.props.frameData.players[player].purchaseOrder}
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