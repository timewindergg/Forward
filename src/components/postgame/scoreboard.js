import React, { Component } from 'react';

import { getChampionIconUrl, getItemIconUrl, getPerkIconUrl, getSpellIconUrl, getPerkStyleIconUrl } from '../../shared/helpers/staticImageHelper.js';
import TRINKETS from '../../shared/trinketConstants.js';
import { getKeystone } from '../../shared/helpers/leagueUtilities';

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

    let keystone = getKeystone(Object.keys(p.runes));

    return (
      <div>
        <div className="summonerInfo">
          <div className="runeSummIcons">
            <div className="summonerSpells">
              <img className="summonerIcon icon" src={getSpellIconUrl(p.summonerSpellDId, patchVersion)}/>
              <img className="summonerIcon icon" src={getSpellIconUrl(p.summonerSpellFId, patchVersion)}/>
            </div>
            <div className="runes">
              <img className="runeIcon icon" src={getPerkIconUrl(keystone, patchVersion)}/>
              <img className="runeIcon icon" src={getPerkStyleIconUrl(p.stats.perkSubStyle, patchVersion)}/>
            </div>
          </div>
          <div className="iconContainer" title={p.summonerName}>
            <img className="championIcon big" src={getChampionIconUrl(p.championId, patchVersion)} />
            <div className="level">
              {p.level}
            </div>
          </div>
          <div className="stats">
            <div className="cs">
              <span>{p.cs}</span>
            </div>
            <div className="score">
              <span>{p.kills}/{p.deaths}/{p.assists}</span>
            </div>
            <div className="gold">
              <span>{p.currentGold}</span>
            </div>
            <div className="ward">
              <span>{p.totalWards}</span>
            </div>
          </div>
          <div className="itemSet">
            <div className="core">
              <img className="itemIcon icon" src={getItemIconUrl(items[0], patchVersion)}/>
              <img className="itemIcon icon" src={getItemIconUrl(items[1], patchVersion)}/>
              <img className="itemIcon icon" src={getItemIconUrl(items[2], patchVersion)}/>
              <img className="itemIcon icon" src={getItemIconUrl(items[3], patchVersion)}/>
              <img className="itemIcon icon" src={getItemIconUrl(items[4], patchVersion)}/>
              <img className="itemIcon icon" src={getItemIconUrl(items[5], patchVersion)}/>
              <img className="itemIcon icon" src={getItemIconUrl(trinket, patchVersion)}/>
            </div>
          </div>
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
        <div className="teamStats">
          Dragons: {this.props.teamData.dragons}
          Barons: {this.props.teamData.barons}
          Rift Heralds: {this.props.teamData.heralds}
        </div>
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
      participant[1].runes = matchParticipant.runes;
      participant[1].stats = matchParticipant.stats;

      if (participant[1].side === 100){
        blueTeam.push(participant);
      }
      else if (participant[1].side === 200){
        redTeam.push(participant);
      }
    });

    return (
      <div className="scoreboardContainer recentGames row">
        <Teamboard team="100" teamData={this.props.teamFrameData['100']} participants={blueTeam} version={this.props.version}/>
        <Teamboard team="200" teamData={this.props.teamFrameData['200']} participants={redTeam} version={this.props.version}/>
      </div>
    );
  }
}

export default Scoreboard;