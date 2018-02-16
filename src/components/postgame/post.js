import React, { Component } from 'react';
import _ from 'lodash';
import './styles/post.css';
import './styles/map.css';
import './styles/scoreboard.css';
import './styles/skillprogression.css';
import './styles/itemprogression.css';
import './styles/control.css';

import { Team, Player } from './objects.js';
import Scoreboard from './scoreboard.js';
import ControlHeader from './control.js';
import Minimap from './map.js';
import SkillTable from './skilltable.js';
import ItemProgression from './itemprogression.js';

import Sticky from 'react-stickynode';

import { getChampionIconUrl, getItemIconUrl, getPerkIconUrl, getSpellIconUrl, getPerkStyleIconUrl, getMapUrl } from '../../shared/helpers/staticImageHelper.js';

class Postgame extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentFrame: 0,
      frameData: [],
      playerMetadata: {},
    }

  }

  updateGameState(){
  }    

  aggregateData(matchDetails){
    let tl = matchDetails.timeline;
    let maxFrames = matchDetails.timeline.frames.length;

    var frameData = [];
    var eventLineFrameData = [];

    let players = {};
    for (var i = 1; i <= matchDetails.match.participants.length; i++){
      players[i] = new Player();
    }

    let aggregateData = {
      teams: {
        '100': new Team(),
        '200': new Team(),
      },
      players: players,
    };


    // must keep stack of player inventories. upon undo pop stack.
    // poachers dirk, manamune, seraphs get destroyed on upgrade
    // Poacher's dirk (3252) -> Serrated Dirk (3134)
    // manamune (3004) -> muramana (3042)
    // manamune quick (3008) -> muramana (3042)

    for (var i = 0; i < maxFrames; i++){
      aggregateData.teams['100'].gold = 0;
      aggregateData.teams['200'].gold = 0;

      let eventLineData = {
        '100': {
          'objs':[],
          'kills':[] 
        },
        '200': {
          'objs':[],
          'kills':[]
        }
      };

      let invStack = [];

      if (i > 0){
        for (var j = 0; j < tl.frames[i].events.length; j++){
          var evnt = tl.frames[i].events[j];
          switch(evnt.type){
            case "BUILDING_KILL":
              if (evnt.side === 100){
                eventLineData['200']['objs'].push(evnt);
              }
              else if (evnt.side === 200){
                eventLineData['100']['objs'].push(evnt);
              }
              if (evnt.buildingType === "INHIBITOR_BUILDING"){
                aggregateData.teams[evnt.side].inhibitors++;
              }
              else if (evnt.buildingType === "TOWER_BUILDING"){
                aggregateData.teams[evnt.side].towers++;
              }
              break;
            case "CHAMPION_KILL":
              if (evnt.killerId > 0 && evnt.killerId <= matchDetails.match.participants.length / 2){
                eventLineData['100']['kills'].push(evnt);
              }
              else if (evnt.killerId > matchDetails.match.participants.length / 2){
                eventLineData['200']['kills'].push(evnt);
              }

              if (evnt.killerId > 0){
                aggregateData.players[evnt.killerId].kills++;
              }
              aggregateData.players[evnt.victimId].deaths++;
              if (evnt.assistingParticipants){
                evnt.assistingParticipants.forEach((id) => {
                  aggregateData.players[id].assists++;
                });
              }
              break;
            case "ELITE_MONSTER_KILL":
              var teamId;
              if (evnt.killerId > 0 && evnt.killerId <= matchDetails.match.participants.length / 2){
                teamId = 100;
                eventLineData['100']['objs'].push(evnt);
              }
              else if (evnt.killerId > matchDetails.match.participants.length / 2){
                teamId = 200;
                eventLineData['200']['objs'].push(evnt);
              }
              if (evnt.monsterType === "BARON_NASHOR" || evnt.monsterType === "VILEMAW"){
                aggregateData.teams[teamId].barons++;
              }
              else if (evnt.monsterType === "DRAGON") {
                aggregateData.teams[teamId].dragons++;
              }
              else if (evnt.monsterType === "RIFTHERALD"){
                aggregateData.teams[teamId].heralds++;
              }
              break;
            case "ITEM_DESTROYED":
              if (evnt.participantId > 0){
                aggregateData.players[evnt.participantId].items[evnt.itemId]--;
              }
              break;
            case "ITEM_PURCHASED":
              aggregateData.players[evnt.participantId].purchaseOrder.push({'id':evnt.itemId, 'ts':evnt.timestamp});
              if(evnt.itemId in aggregateData.players[evnt.participantId].items){
                aggregateData.players[evnt.participantId].items[evnt.itemId]++;
              } else {
                aggregateData.players[evnt.participantId].items[evnt.itemId] = 1;
              }
              break;
            case "ITEM_SOLD":
              aggregateData.players[evnt.participantId].purchaseOrder.push({'id':-evnt.itemId, 'ts':evnt.timestamp});
              aggregateData.players[evnt.participantId].items[evnt.itemId]--;
              break;
            case "ITEM_UNDO":
              aggregateData.players[evnt.participantId].purchaseOrder.pop();
              aggregateData.players[evnt.participantId].items[evnt.itemId]--;
              break;
            case "SKILL_LEVEL_UP":
              aggregateData.players[evnt.participantId].skillOrder.push(evnt.skill);
              break;
            case "WARD_KILL":
              if (evnt.participantId > 0){
                aggregateData.players[evnt.participantId].wardsKilled++;
              }
              break;
            case "WARD_PLACED":
              if (evnt.creatorId > 0){
                aggregateData.players[evnt.creatorId].totalWards++;
              }
              break;
            default:
              break;
          }
        }
      }
      var pFrames = tl.frames[i].participantFrames;

      Object.keys(pFrames).map((key) => {
        aggregateData.players[key].totalgold = pFrames[key].goldEarned;
        aggregateData.players[key].currentgold = pFrames[key].currentGold;
        aggregateData.players[key].cs = pFrames[key].creepScore;
        aggregateData.players[key].junglecs = pFrames[key].NeutralMinionsKilled;
        aggregateData.players[key].level = pFrames[key].level;
        aggregateData.players[key].xp = pFrames[key].experience;
        if (pFrames[key].position){
          aggregateData.players[key].x = pFrames[key].position.x;
          aggregateData.players[key].y = pFrames[key].position.y;
        }

        if (key <= matchDetails.match.participants.length / 2){
          aggregateData.players[key].side = 100;
          aggregateData.teams['100'].gold += pFrames[key].totalGold;
        } else {
          aggregateData.players[key].side = 200;
          aggregateData.teams['200'].gold += pFrames[key].totalGold;
        }
      });

      frameData.push(JSON.parse(JSON.stringify(aggregateData)));
      eventLineFrameData.push(eventLineData);
    }

    this.setState({
      frameData: frameData,
      eventLineFrameData: eventLineFrameData,
    }, () => {console.log(this.state.frameData); console.log(this.state.eventLineFrameData)});
  }

  onSliderChange = (value) => {
    console.log(value);
    this.setState({
      currentFrame: value,
    });
  }

  componentWillUpdate(nextProps) {
    if (this.props.matchDetails.timeline === undefined && nextProps.matchDetails.timeline !== undefined){
      this.aggregateData(nextProps.matchDetails);
    }
  }

  render() {
    if (this.props.matchDetails.match !== undefined && this.state.frameData.length > 0 && this.state.eventLineFrameData.length > 0 && Object.keys(this.props.staticData).length > 0){
      return (
        <div className="Postgame">
          <Sticky innerZ='1'>
            <ControlHeader onSliderChange={this.onSliderChange} 
                           match={this.props.matchDetails.match} 
                           timeline={this.props.matchDetails.timeline}
                           events={this.state.eventLineFrameData} />
          </Sticky>
          <div className="content">
            <Scoreboard currentFrame={this.state.currentFrame} 
                        frameData={this.state.frameData}
                        matchParticipants={this.props.matchDetails.match.participants}/>
            <Minimap mapId={this.props.matchDetails.match.mapId} 
                     staticData={this.props.staticData}
                     currentFrame={this.state.currentFrame} 
                     frameData={this.state.frameData}/>
            <SkillTable skillOrder={this.state.frameData[this.state.currentFrame].players[1].skillOrder}
                        skillData={this.props.staticData.championSkills[this.props.matchDetails.match.participants[0].championId]}
                        version={this.props.staticData.version}/>
            <div className='clear'></div>
            <ItemProgression itemOrder={this.state.frameData[this.state.currentFrame].players[1].purchaseOrder}
                             itemData={this.props.staticData.items}
                             version={this.props.staticData.version}/>
          </div>
        </div>
      );
    }

    return (
      <div/>
    );
  }
}

export default Postgame;
