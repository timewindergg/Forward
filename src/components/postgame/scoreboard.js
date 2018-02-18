import React, { Component } from 'react';

import { getChampionIconUrl, getItemIconUrl, getPerkIconUrl, getSpellIconUrl, getPerkStyleIconUr } from '../../shared/helpers/staticImageHelper.js';
import TRINKETS from '../../shared/trinketConstants.js';

class ScoreboardPlayer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    if (this.props.participant === undefined){
      return (<div/>);
    }
    let patchVersion = this.props.version;
    let p = this.props.participant;
    let items = [];
    let trinket = 3340;

    Object.entries(p.items).map((item) => {
      if (item[0] in TRINKETS){
        trinket = item[0];
      }
      else if (item[1] > 0){
        items.push(item[0]);
      }
    });

    if (items.length > 6){
      console.log("too many items on scoreboard")
    }

    for (var i = items.length; i < 6; i++){
      items.push(0);
    }

    return (
      <div>
        <div className="summonerInfo">
          <div className="iconContainer" title={p.summonerName}>
            <img className="championIcon big" src={getChampionIconUrl(p.championId, patchVersion)} />
          </div>
          <div className="summonerSpells">
            <img className="summonerIcon icon spell0 small" src={getSpellIconUrl(p.summonerSpellDId, patchVersion)}/>
            <img className="summonerIcon icon spell1 small" src={getSpellIconUrl(p.summonerSpellFId, patchVersion)}/>
          </div>
          <div className="runes">
            
          </div>
          <div className="itemSet">
            <div className="core">
              <img className="itemIcon icon small" src={getItemIconUrl(items[0], patchVersion)}/>
              <img className="itemIcon icon small" src={getItemIconUrl(items[1], patchVersion)}/>
              <img className="itemIcon icon small" src={getItemIconUrl(items[2], patchVersion)}/>
              <img className="itemIcon icon small" src={getItemIconUrl(items[3], patchVersion)}/>
              <img className="itemIcon icon small" src={getItemIconUrl(items[4], patchVersion)}/>
              <img className="itemIcon icon small" src={getItemIconUrl(items[5], patchVersion)}/>
            </div>
            <div className="trinket">
              <img className="itemIcon icon small" src={getItemIconUrl(trinket, patchVersion)}/>
            </div>
          </div>
        </div>
        <div className="level">
          {p.level}
        </div>
        <div className="score">
          {p.kills}/{p.deaths}/{p.assists}
        </div>
        <div className="cs">
          {p.cs}
        </div>
        <div className="gold">
          {p.currentGold}
        </div>
      </div>
    );
  }
}

class Teamboard extends Component {
  constructor(props){
    super(props);
  }

  renderParticipants() {
    return this.props.participants.map((participant) => (
      <ScoreboardPlayer key={participant[0]} participant={participant[1]} version={this.props.version}/>
    ));
  }

  render() {
    return (
      <div className="team">
        { this.renderParticipants() }
          Dragons: {this.props.teamData.dragons}
          Barons: {this.props.teamData.barons}
          Rift Heralds: {this.props.teamData.heralds}
      </div>
    );
  }
}

class Scoreboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let blueTeam = [];
    let redTeam = [];

    Object.entries(this.props.playerFrameData).map((participant) => {
      let matchParticipant = this.props.matchParticipants[participant[0] - 1];

      participant[1].championId = matchParticipant.championId;
      participant[1].summonerName = matchParticipant.summonerName;
      participant[1].summonerSpellDId = matchParticipant.summonerSpellDId;
      participant[1].summonerSpellFId = matchParticipant.summonerSpellFId;

      if (participant[1].side === 100){
        blueTeam.push(participant);
      }
      else if (participant[1].side === 200){
        redTeam.push(participant);
      }
    });

    return (
      <div className="scoreboard recentGames row">
        <Teamboard team="100" teamData={this.props.teamFrameData['100']} participants={blueTeam} version={this.props.version}/>
        <Teamboard team="200" teamData={this.props.teamFrameData['200']} participants={redTeam} version={this.props.version}/>
      </div>
    );
  }
}

export default Scoreboard;