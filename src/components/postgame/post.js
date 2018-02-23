import React, { Component } from 'react';
import _ from 'lodash';
import './styles/post.css';
import './styles/map.css';
import './styles/scoreboard.css';
import './styles/skillprogression.css';
import './styles/itemprogression.css';
import './styles/control.css';
import './styles/champselect.css';
import './styles/champcompare.css';
import './styles/gamegraphs.css';
import './styles/runestats.css';
//import './styles/datatable.css';

import LoadingScreen from '../common/loadingscreen';

import { Team, Player } from './objects.js';
import Scoreboard from './scoreboard.js';
import ControlHeader from './control.js';
import Minimap from './map.js';
import ChampionSelector from './champselect.js';
import ChampionCompare from './champcompare.js';
import GoldDiffGraph from './gdgraph.js';
import EffectiveGoldDiffGraph from './egdgraph.js';
import DataTable from './datatable.js';

import Sticky from 'react-stickynode';

import { getChampionIconUrl, 
         getItemIconUrl, 
         getPerkIconUrl, 
         getSpellIconUrl, 
         getPerkStyleIconUrl, 
         getMapUrl } from '../../shared/helpers/staticImageHelper.js';
import { hasDataLoaded } from '../../shared/helpers/loaderHelper.js';
import TRINKETS from '../../shared/trinketConstants.js';

class Postgame extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentFrame: 0,
      frameData: [],
    }
  }

  aggregateData(matchDetails, staticData){
    // must keep stack of player inventories. upon undo pop stack.
    // TODO: consumables? magical boots and [broken]stopwatch

    // poachers dirk, manamune, seraphs get destroyed on upgrade
    // Poacher's dirk (3252) -> Serrated Dirk (3134)
    // manamune (3004) -> muramana (3042)
    // manamune quick (3008) -> muramana (3042/3043?)
    // archangels (3003) -> seraphs (3040)
    // archangels quick (3007) -> seraphs (3040/3048?)
    let transforms = {
      3252: 3134,
      3004: 3042,
      3008: 3042,
      3003: 3040,
      3007: 3040,
    }

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

      if (i > 0){
        for (var j = 0; j < tl.frames[i].events.length; j++){
          var evnt = tl.frames[i].events[j];
          var player, curItems;

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
                aggregateData.teams['100'].kills++;
              }
              else if (evnt.killerId > matchDetails.match.participants.length / 2){
                eventLineData['200']['kills'].push(evnt);
                aggregateData.teams['200'].kills++;
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
              player = aggregateData.players[evnt.participantId];
              curItems = player.itemStack[player.itemStack.length - 1];
              curItems[evnt.itemId]--;

              if (transforms[evnt.itemId] !== undefined){
                if (curItems[evnt.itemId] > 0){
                  curItems[evnt.itemId]++;
                } 
                else {
                  curItems[evnt.itemId] = 1;
                }
              }
              break;
            case "ITEM_PURCHASED":
              aggregateData.players[evnt.participantId].purchaseOrder.push({'id':evnt.itemId, 'ts':evnt.timestamp});
              player = aggregateData.players[evnt.participantId];
              curItems = Object.assign({}, player.itemStack[player.itemStack.length - 1]);          
              if (evnt.itemId in curItems){
                curItems[evnt.itemId]++;
              }
              else {
                curItems[evnt.itemId] = 1;
              }
              player.itemStack.push(curItems);
              break;
            case "ITEM_SOLD":
              aggregateData.players[evnt.participantId].purchaseOrder.push({'id':-evnt.itemId, 'ts':evnt.timestamp});
              player = aggregateData.players[evnt.participantId];
              curItems = Object.assign({}, player.itemStack[player.itemStack.length - 1]);
              curItems[evnt.itemId]--;
              player.itemStack.push(curItems);
              break;
            case "ITEM_UNDO":
              aggregateData.players[evnt.participantId].purchaseOrder.pop();
              aggregateData.players[evnt.participantId].itemStack.pop();
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

      aggregateData.teams['100'].effectiveGold = 0;
      aggregateData.teams['200'].effectiveGold = 0;
      Object.keys(pFrames).map((key) => {
        aggregateData.players[key].items = aggregateData.players[key].itemStack[aggregateData.players[key].itemStack.length - 1];
        aggregateData.players[key].totalGold = pFrames[key].goldEarned;
        aggregateData.players[key].currentGold = pFrames[key].currentGold;
        aggregateData.players[key].cs = pFrames[key].creepScore;
        aggregateData.players[key].junglecs = pFrames[key].NeutralMinionsKilled;
        aggregateData.players[key].level = pFrames[key].level;
        aggregateData.players[key].xp = pFrames[key].experience;
        if (pFrames[key].position){
          aggregateData.players[key].x = pFrames[key].position.x;
          aggregateData.players[key].y = pFrames[key].position.y;
        }

        let effectiveGold = 0;
        Object.entries(aggregateData.players[key].items).map((item) => {
          if (item[1] > 0){
            let value = staticData.items[item[0]].totalGold * item[1];
            effectiveGold += value;
          }
        });
        aggregateData.players[key].effectiveGold = effectiveGold;

        if (key <= matchDetails.match.participants.length / 2){
          aggregateData.players[key].side = 100;
          aggregateData.teams['100'].gold += pFrames[key].goldEarned;
          aggregateData.teams['100'].effectiveGold += aggregateData.players[key].effectiveGold;
        } else {
          aggregateData.players[key].side = 200;
          aggregateData.teams['200'].gold += pFrames[key].goldEarned;
          aggregateData.teams['200'].effectiveGold += aggregateData.players[key].effectiveGold;
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
    this.setState({
      currentFrame: value,
    });
  }

  onChampionSelect = (teamId, playerId) => {
    if (teamId === 100){
      this.setState({
        'blueSelection': playerId,
      });  
    }
    else if (teamId === 200){
      this.setState({
        'redSelection': playerId,
      });  
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.matchDetails.timeline === undefined && nextProps.matchDetails.timeline !== undefined
      && Object.keys(this.props.staticData).length > 0){
      this.setState({
        currentFrame: nextProps.matchDetails.timeline.frames.length - 1,
        redSelection: 1,
        blueSelection: nextProps.matchDetails.match.participants.length / 2 + 1,
      });
      this.aggregateData(nextProps.matchDetails, this.props.staticData);
    } 
    else if (Object.keys(this.props.staticData).length === 0 && Object.keys(nextProps.staticData).length > 0
      && this.props.matchDetails.timeline !== undefined){
      this.setState({
        currentFrame: nextProps.matchDetails.timeline.frames.length - 1,
        redSelection: 1,
        blueSelection: nextProps.matchDetails.match.participants.length / 2 + 1,
      });
      this.aggregateData(this.props.matchDetails, nextProps.staticData);
    }
  }

  render() {
    const { matchDetails, staticData, region} = this.props;
    const { frameData, eventLineFrameData, currentFrame } = this.state;

    if (!hasDataLoaded([matchDetails, frameData, eventLineFrameData, staticData])){
      return(<LoadingScreen/>);
    }

    return (
      <div className="Postgame">
        <Sticky innerZ='1'>
          <ControlHeader onSliderChange={this.onSliderChange} 
                         match={matchDetails.match} 
                         timeline={matchDetails.timeline}
                         events={eventLineFrameData} />
        </Sticky>
        <div className="content">
          <Scoreboard playerFrameData={frameData[currentFrame].players}
                      teamFrameData={frameData[currentFrame].teams}
                      matchParticipants={matchDetails.match.participants}
                      version={staticData.version}
                      region={region}/>
          <div className="graphsmap">
            <GoldDiffGraph frameData={frameData}/>
            <EffectiveGoldDiffGraph frameData={frameData}/>
            <Minimap mapId={matchDetails.match.mapId} 
                     version={staticData.version}
                     playerFrameData={frameData[currentFrame].players}/>
          </div>
          <ChampionSelector onChampionSelect={this.onChampionSelect}
                            matchParticipants={matchDetails.match.participants}
                            version={staticData.version}/>
          <ChampionCompare frameData={frameData[currentFrame]}
                           staticData={staticData}
                           matchParticipants={matchDetails.match.participants}
                           redSelection={this.state.redSelection}
                           blueSelection={this.state.blueSelection}/>
          <DataTable matchParticipants={matchDetails.match.participants}/>
        </div>
      </div>
    );
  }
}

export default Postgame;
