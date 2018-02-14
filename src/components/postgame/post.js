import React, { Component } from 'react';
import _ from 'lodash';
import './post.css';

import { Team, Player } from './objects.js';
import Scoreboard from './scoreboard.js';
import ControlHeader from './control.js';
import Minimap from './map.js';
import SkillTable from './skilltable.js';
import ItemProgression from './itemprogression.js';

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

    for (var i = 0; i < maxFrames; i++){
      aggregateData.teams['100'].gold = 0;
      aggregateData.teams['200'].gold = 0;

      if (i > 0){
        for (var j = 0; j < tl.frames[i].events.length; j++){
          var evnt = tl.frames[i].events[j];
          switch(evnt.type){
            case "ASCENDED_EVENT":
              break;
            case "CAPTURE_POINT":
              break;
            case "BUILDING_KILL":
              if (evnt.buildingType === "INHIBITOR_BUILDING"){
                aggregateData.teams[evnt.side].inhibitors++;
              }
              else if (evnt.buildingType === "TOWER_BUILDING"){
                aggregateData.teams[evnt.side].towers++;
              }
              break;
            case "CHAMPION_KILL":
              if (evnt.killerId > 0){
                aggregateData.players[evnt.killerId].kills++;
              }
              aggregateData.players[evnt.victimId].deaths++;
              if (evnt.assistingParticipants){
                evnt.assistingParticipants.forEach((id) => {
                  aggregateData.players[id].assists++;
                });
              }
              /*
              aggregateData.eventLocations.push({
                'x': evnt.position.x,
                'y': evnt.position.y,
                'killerId': evnt.killerId,
                'victimId': evnt.victimId,
                'assistingParticipants': evnt.assistingParticipantIds,
                'type': evnt.type,
                'frames' : i + 1,
                'timestamp' : evnt.timestamp
              });
              */
              break;
            case "ELITE_MONSTER_KILL":
              var teamId;
              if (evnt.killerId > 0 && evnt.killerId <= matchDetails.match.participants.length / 2){
                teamId = 100;
              }
              else if (evnt.killerId > matchDetails.match.participants.length / 2){
                teamId = 200;
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
            case "PORO_KING_SUMMON":
              console.log("Poro King!?!?");
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

      //team100Data.push(aggregateData.teams['100'].gold);
      //team200Data.push(aggregateData.teams['200'].gold);
      //teamDiffData.push(aggregateData.teams['100'].gold - aggregateData.teams['200'].gold);
      //glabels.push(i.toString());

      //AggregatedData[frameIndex] = aggregateData;

      frameData.push(JSON.parse(JSON.stringify(aggregateData)));
    }

    this.setState({
      frameData: frameData
    }, () => {console.log(this.state.frameData)});
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
    if (this.props.matchDetails.match !== undefined && this.state.frameData.length > 0 && Object.keys(this.props.staticData).length > 0){
      return (
        <div className="Postgame">
          <div className="content">
            <h1>Timewinder</h1>
            <ControlHeader onSliderChange={this.onSliderChange} 
                           match={this.props.matchDetails.match} 
                           timeline={this.props.matchDetails.timeline} />
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
            <div class='clear'></div>
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
