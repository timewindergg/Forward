import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { roundWithPrecision } from '../../shared/helpers/numberHelper.js';

import ItemProgression from './itemprogression.js';
import SkillTable from '../common/skilltable.js';
import HorizontalBarGraph from '../common/graph/HorizontalBarGraph';

class ChampionCompare extends Component {
  static propTypes = {
    frameData: PropTypes.object.isRequired,
    matchParticipants: PropTypes.array.isRequired,
    redSelection: PropTypes.number.isRequired,
    blueSelection: PropTypes.number.isRequired,
    staticData: PropTypes.object.isRequired
  }


  renderSelectionTop(teamId, playerId){
    let player = this.props.frameData.players[playerId];

    return(
      <div className={classNames({"selectionDetails": true, 'redSelection': teamId === 200})}>
        <div className="metaStats">
          <div className="level">
            Lv {player.level}
          </div>
          <div className="kda">
            {roundWithPrecision(player.kills + player.assists / player.deaths, 2)} KDA
          </div>
          <div className='kda'>
            {player.kills}/{player.deaths}/{player.assists}
          </div>
        </div>
        <div className="stats">
          <div className="totalGold">
            Gold: {player.totalGold} 
          </div>
          <div className="effectiveGold">
            Effective Gold: {player.effectiveGold}
          </div>
          <div className="cs">
            CS: {player.cs}
          </div>
        </div>
      </div>
    );
  }

  renderGraph = (blueSelection, redSelection) => {
    let bp = this.props.frameData.players[blueSelection];
    let rp = this.props.frameData.players[redSelection];

    const goldData = [{
      key: 'totalGold',
      value: rp.totalGold - bp.totalGold,
      label: `${Math.abs(rp.totalGold - bp.totalGold)} (Total Gold)`
    }, {
      key: 'effectiveGold',
      value: rp.effectiveGold - bp.effectiveGold,
      label: `${Math.abs(rp.effectiveGold - bp.effectiveGold)} (Effective Gold)`
    }];

    const csData = [{
      key: 'CS',
      value: rp.cs - bp.cs,
      label: `${Math.abs(rp.cs - bp.cs)} (CS)`
    }];

    return (
      <div className='graphs'>
      <HorizontalBarGraph
        graphID='ccm-gold'
        label='Gold Advantage'
        isCentered={true}

        height={40}
        width={500}

        data={goldData}
        fillInfo={{
          pos: '#ff9793',
          neg: '#8CAFFF'
        }}
      />
      <HorizontalBarGraph
        graphID='ccm-cs'
        label='CS Advantage'
        isCentered={true}

        height={20}
        width={500}

        data={csData}
        fillInfo={{
          pos: '#ff9793',
          neg: '#8CAFFF'
        }}
      />
      </div>
    );

  }

  renderSelectionBottom(teamId, playerId){
    let player = this.props.frameData.players[playerId];

    // TODO: work on this part (make it look pretty)
    return(
      <div className="selectionDetails">
        <h3>Skill Progression</h3>
        <SkillTable skillOrder={player.skillOrder}
                    skillData={this.props.staticData.championSkills[this.props.matchParticipants[playerId - 1].championId]}
                    version={this.props.staticData.version}/>
        <div className='clear'/>
        <h3>Item Progression</h3>
        <ItemProgression itemOrder={player.purchaseOrder}
                         itemData={this.props.staticData.items}
                         version={this.props.staticData.version}/>
      </div>
    );
  }

  render(){
    const {blueSelection, redSelection} = this.props;
    return(
      <div className='rc-champ-compare'>
        <div className="compareContainer compareStatsContainer">
          {this.renderSelectionTop(100, blueSelection)}
          {this.renderGraph(blueSelection, redSelection)}
          {this.renderSelectionTop(200, redSelection)}
        </div>
        <div className="compareContainer">
          {this.renderSelectionBottom(100, blueSelection)}
          {this.renderSelectionBottom(200, redSelection)}
        </div>
      </div>
    );
  }
}

export default ChampionCompare;