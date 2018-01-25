import React, { Component } from 'react';
import './post.css';

import { getChampionIconUrl, getItemIconUrl, getPerkIconUrl, getSpellIconUrl, getPerkStyleIconUrl, getMapUrl } from '../../shared/helpers/staticImageHelper.js';

import Slider, { Range } from 'rc-slider';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

var patchVersion = '7.24.2';

class Postgame extends Component {
  constructor(props){
    super(props);
  }

  render() {
    if (this.props.timeline.match !== undefined){
      return (
        <div className="Postgame">
          <div className="content">
            <h1>Timewinder</h1>
            <ControlHeader match={this.props.timeline.match} timeline={this.props.timeline.timeline}/>
            <Scoreboard match={this.props.timeline.match} timeline={this.props.timeline.timeline}/>
            <Minimap mapId={this.props.timeline.match.mapId}/>
          </div>
        </div>
      );
    }

    return (
      <div/>
    );
  }
}

class ScoreboardPlayer extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentGold: 0,
      item0: 0,
      item1: 0,
      item2: 0,
      item3: 0,
      item4: 0,
      item5: 0,
      item6: 0,
      cs: 0,
      level: 1,
      kills: 0,
      deaths: 0,
      assists: 0,
    };
  }

  componentWillMount(){
    if (this.props.participant !== undefined){
      let p = this.props.participant;
      this.setState({
        currentGold: p.stats.goldEarned,
        item0: p.stats.item0,
        item1: p.stats.item1,
        item2: p.stats.item2,
        item3: p.stats.item3, 
        item4: p.stats.item4,
        item5: p.stats.item5,
        item6: p.stats.item6,
        cs: p.stats.totalMinionsKilled + p.stats.neutralMinionsKilled,
        level: p.stats.champLevel,
        kills: p.stats.kills,
        deaths: p.stats.deaths,
        assists: p.stats.assists,
      });
    }
  }
  

  render() {
    if (this.props.participant == undefined){
      return (<div/>);
    }
    let p = this.props.participant;

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
                <img className="itemIcon small" src={getItemIconUrl(this.state.item0, patchVersion)}/>
                <img className="itemIcon small" src={getItemIconUrl(this.state.item1, patchVersion)}/>
                <img className="itemIcon small" src={getItemIconUrl(this.state.item2, patchVersion)}/>
                <img className="itemIcon small" src={getItemIconUrl(this.state.item3, patchVersion)}/>
                <img className="itemIcon small" src={getItemIconUrl(this.state.item4, patchVersion)}/>
                <img className="itemIcon small" src={getItemIconUrl(this.state.item5, patchVersion)}/>
              </div>
              <div className="trinket">
                <img className="itemIcon small" src={getItemIconUrl(this.state.item6, patchVersion)}/>
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

  componentWillMount(){
    this.setState({
      gold: this.state.gold
    });
  }
  
  renderParticipants() {
    if (this.props.participants !== undefined){
      return this.props.participants.map((participant) => (
        <ScoreboardPlayer key={participant.id} participant={participant} team="100" />
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
    if (this.props.match !== undefined){

      let blueTeam = [];
      let redTeam = [];

      this.props.match.participants.map((participant) => {
      if (participant.side == "blue"){
        blueTeam.push(participant);
      }
      else if (participant.side == "red"){
        redTeam.push(participant);
      }
    });

      return (
        <div className="scoreboard recentGames row">
          <Teamboard team="100" participants={blueTeam}/>
          <Teamboard team="200" participants={redTeam}/>
        </div>
      );
    }

    return(<div/>);
  }
}

class ControlHeader extends Component {
  render() {
    return(
      <div className="gameSlider">
        <Slider />
      </div>
    );
  }
}

class Minimap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participants: [],
    };
  }

  renderParticipants() {
    let p = this.props.participants;
  }

  render() {
    return(
      <div>
        <img className="minimap" src={getMapUrl(this.props.mapId, patchVersion)}></img>
        {this.renderParticipants()}
      </div>
    );
  }
}

class EventLog extends Component {

}



export default Postgame;
