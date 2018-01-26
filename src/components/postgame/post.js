import React, { Component } from 'react';
import './post.css';

import { Team, Player } from './objects.js';
import Scoreboard from './scoreboard.js';
import ControlHeader from './control.js';
import Minimap from './map.js';

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

  aggregateData(maxFrames){
    let tl = this.props.matchDetails.timeline;

    let frameData = [];

    let aggregateData = {
      teams:{
        '100': new Team(),
        '200': new Team()
      },
      players: {
        '1' : new Player(),
        '2' : new Player(),
        '3' : new Player(),
        '4' : new Player(),
        '5' : new Player(),
        '6' : new Player(),
        '7' : new Player(),
        '8' : new Player(),
        '9' : new Player(),
        '10' : new Player(),
        '11' : new Player(),
        '12' : new Player()
      },
    };

    for (var i = 0; i < maxFrames; i++){
      aggregateData.teams['100'].gold = 0;
      aggregateData.teams['200'].gold = 0;

      if (i > 0){
        for (var j = 0; j < tl.frames[i].events.length; j++){
          var evnt = tl.frames[i].events[j];
          switch(evnt.eventType){
            case "ASCENDED_EVENT":
              break;
            case "CAPTURE_POINT":
              break;
            case "BUILDING_KILL":
              if (evnt.buildingType == "INHIBITOR_BUILDING"){
                aggregateData.teams[evnt.teamId].inhibitors++;
              }
              else if (evnt.buildingType == "TOWER_BUILDING"){
                aggregateData.teams[evnt.teamId].towers++;
              }
              break;
            case "CHAMPION_KILL":
              if (evnt.killerId > 0){
                aggregateData.players[evnt.killerId].kills++;
              }
              aggregateData.players[evnt.victimId].deaths++;
              if (evnt.assistingParticipantIds){
                evnt.assistingParticipantIds.forEach(function(id){
                  aggregateData.players[id].assists++;
                });
              }
              aggregateData.eventLocations.push({
                'x': evnt.position.x,
                'y': evnt.position.y,
                'killerId': evnt.killerId,
                'victimId': evnt.victimId,
                'assistingParticipantIds': evnt.assistingParticipantIds,
                'type': evnt.eventType,
                'frames' : i + 1,
                'timestamp' : evnt.timestamp
              });
              break;
            case "ELITE_MONSTER_KILL":
              var teamId;
              if (evnt.killerId > 0 && evnt.killerId <= this.props.match.participants.length / 2){
                teamId = 100;
              }
              else if (evnt.killerId > this.props.match.participants.length / 2){
                teamId = 200;
              }
              if (evnt.monsterType == "BARON_NASHOR" || evnt.monsterType =="VILEMAW"){
                aggregateData.teams[teamId].barons++;
              }
              else if (evnt.monsterType == "DRAGON") {
                aggregateData.teams[teamId].dragons++;
              }
              else if (evnt.monsterType == "RIFTHERALD"){
                aggregateData.teams[teamId].heralds++;
              }
              break;
            case "ITEM_DESTROYED":
              if (evnt.participantId > 0){
                aggregateData.players[evnt.participantId].items[evnt.itemId]--;
              }
              break;
            case "ITEM_PURCHASED":
              if(evnt.itemId in aggregateData.players[evnt.participantId].items){
                aggregateData.players[evnt.participantId].items[evnt.itemId]++;
              } else {
                aggregateData.players[evnt.participantId].items[evnt.itemId] = 1;
              }
              break;
            case "ITEM_SOLD":
              aggregateData.players[evnt.participantId].items[evnt.itemId]--;
              break;
            case "ITEM_UNDO":
              aggregateData.players[evnt.participantId].items[evnt.itemId]--;
              break;
            case "PORO_KING_SUMMON":
              console.log("Poro King!?!?");
              break;
            case "SKILL_LEVEL_UP":
              aggregateData.players[evnt.participantId].skills[evnt.skillSlot-1]++;
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
          }
        }
      }
      var pFrames = tl.frames[i].participantFrames;

      Object.keys(pFrames).forEach(function(key) {
        aggregateData.players[key].totalgold = pFrames[key].totalGold;
        aggregateData.players[key].currentgold = pFrames[key].currentGold;
        aggregateData.players[key].cs = pFrames[key].minionsKilled;
        aggregateData.players[key].junglecs = pFrames[key].jungleMinionsKilled;
        aggregateData.players[key].level = pFrames[key].level;
        aggregateData.players[key].xp = pFrames[key].xp;
        aggregateData.players[key].x = pFrames[key].position.x;
        aggregateData.players[key].y = pFrames[key].position.y;

        if (key <= this.props.match.participants.length / 2){
          aggregateData.teams['100'].gold += pFrames[key].totalGold;
        } else {
          aggregateData.teams['200'].gold += pFrames[key].totalGold;
        }
      });

      //team100Data.push(aggregateData.teams['100'].gold);
      //team200Data.push(aggregateData.teams['200'].gold);
      //teamDiffData.push(aggregateData.teams['100'].gold - aggregateData.teams['200'].gold);
      //glabels.push(i.toString());

      //AggregatedData[frameIndex] = aggregateData;

      frameData.push(aggregateData);
      
    }

    this.setState({
      frameData: frameData
    });

    console.log(this.state.frameData);
  }

  onSliderChange = (value) => {
    console.log(value);

    this.setState({
      currentFrame: value,
    });
  }

  render() {
    if (this.props.matchDetails.timeline !== undefined && this.state.frameData == []){
      console.log("aggr");
      this.aggregateData(this.props.matchDetails.timeline.frames.length);
    }

    if (this.props.matchDetails.match !== undefined){
      return (
        <div className="Postgame">
          <div className="content">
            <h1>Timewinder</h1>
            <ControlHeader onSliderChange={this.onSliderChange} 
                           match={this.props.matchDetails.match} 
                           timeline={this.props.matchDetails.timeline} />
            <Scoreboard match={this.props.matchDetails.match} 
                        timeline={this.props.matchDetails.timeline}
                        currentFrame={this.state.currentFrame} />
            <Minimap mapId={this.props.matchDetails.match.mapId} 
                     staticData={this.props.staticData}
                     currentFrame={this.state.currentFrame} />
          </div>
        </div>
      );
    }

    return (
      <div/>
    );
  }
}


class EventLog extends Component {

}

export default Postgame;
