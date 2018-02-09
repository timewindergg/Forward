import React, { Component } from 'react';
import { getChampionIconUrl, getItemIconUrl, getPerkIconUrl, getSpellIconUrl, getPerkStyleIconUrl, getMapUrl } from '../../shared/helpers/staticImageHelper.js';

var patchVersion = '8.2.1';

class ScoreboardPlayer extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentGold: 0,
      totalGold: 0,
      item0: 0,
      item1: 0,
      item2: 0,
      item3: 0,
      item4: 0,
      item5: 0,
      item6: 0,
      cs: 0,
      junglecs: 0,
      level: 1,
      kills: 0,
      deaths: 0,
      assists: 0,
      wardsKilled: 0,
      wardsPlaced: 0,
    };
  }

  render() {
    if (this.props.participant === undefined){
      return (<div/>);
    }
    let p = this.props.participant;
    let items = Object.entries(p.items);

    for (var i = items.length; i < 7; i++){
      items.push([0, 0]);
    }

    return (
      <tr className="player" pid="">
        <td>
          <div className="summonerInfo">
            <div className="iconContainer" title={p.summonerName}>
              <img className="championIcon big" src={getChampionIconUrl(p.championId, patchVersion)} />
            </div>
            <div className="summonerSpells">
              <img className="summonerIcon spell0 small" src={getSpellIconUrl(p.summonerSpellDId, patchVersion)}/>
              <img className="summonerIcon spell1 small" src={getSpellIconUrl(p.summonerSpellFId, patchVersion)}/>
            </div>

            <div className="itemSet">
              <div className="core">
                <img className="itemIcon small" src={getItemIconUrl(items[0][0], patchVersion)}/>
                <img className="itemIcon small" src={getItemIconUrl(items[1][0], patchVersion)}/>
                <img className="itemIcon small" src={getItemIconUrl(items[2][0], patchVersion)}/>
                <img className="itemIcon small" src={getItemIconUrl(items[3][0], patchVersion)}/>
                <img className="itemIcon small" src={getItemIconUrl(items[4][0], patchVersion)}/>
                <img className="itemIcon small" src={getItemIconUrl(items[5][0], patchVersion)}/>
              </div>
              <div className="trinket">
                <img className="itemIcon small" src={getItemIconUrl(items[6][0], patchVersion)}/>
              </div>
            </div>
          </div>
        </td>
        <td className="level">
          {this.state.level}
        </td>
        <td className="score" k={this.state.kills} d={this.state.deaths} a={this.state.assists}>
        </td>
        <td className="cs" mk={this.state.cs} >
        </td>
        <td className="gold">
          {this.state.currentGold}
        </td>
      </tr>
    );
  }
}

class Teamboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      gold: 0,
      barons: 0,
      dragons: 0,
      heralds: 0
    };
  }

  renderParticipants() {
    if (this.props.participants !== undefined){
      return this.props.participants.map((participant) => (
        <ScoreboardPlayer key={participant[0]} participant={participant[1]} team="100" />
      ));
    }
  }

  render() {


    return (
      <div className="team100 col-md-6">
        <table className="table">
          <colgroup>
            <col span="1" style={{width: '30%'}} />
            <col span="1" style={{width: '15%'}} />
            <col span="1" style={{width: '15%'}} />
            <col span="1" style={{width: '15%'}} />
            <col span="1" style={{width: '15%'}} />
          </colgroup>
          <tbody>
            <tr>
              <th className="thResult" winner=""></th>
              <th className="thLevel">Lvl</th>
              <th>Score</th>
              <th className="thCS">CS</th>
              <th className="thGold">Gold</th>
            </tr>
              { this.renderParticipants() }
            <tr>
              <td colSpan="4" className="teamStats">
                Dragons: {this.state.dragons} -
                Barons: {this.state.barons} -
                Rift Heralds: {this.state.heralds}
              </td>
              <td className="teamGold">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blueTeam: [],
      redTeam: [],
    };
  }

  render() {
    let blueTeam = [];
    let redTeam = [];
    let currentFrameData = this.props.frameData[this.props.currentFrame];

    Object.entries(currentFrameData.players).map((participant) => {
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
        <Teamboard team="100" teamData={currentFrameData.teams['100']} participants={blueTeam}/>
        <Teamboard team="200" teamData={currentFrameData.teams['200']} participants={redTeam}/>
      </div>
    );
  }
}

export default Scoreboard;