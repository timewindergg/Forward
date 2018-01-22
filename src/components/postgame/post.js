import React, { Component } from 'react';
import './post.css';

import { getMasteryIconUrl, getTierIconUrl} from '../../shared/helpers/staticImageHelper.js';

class Postgame extends Component {
  render() {
    return (
      <div className="Postgame">
        <div className="content">
          <h1>Timewinder</h1>
          <p> Welcome,</p>

          <Scoreboard />
        </div>
      </div>
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
      gold: 0,
      kills: 0,
      deaths: 0,
      assists: 0
    };
  }

  componentWillMount(){
    this.setState({
      currentGold: this.state.currentGold
    });
  }
  

  render() {
    if (this.props.team == 100){
      return (
        <tr className="player" pid="{{$i}}">
          <td>
            <div className="summonerInfo">
              <div className="iconContainer" title="{this.props.timeline.playerName}">
                <img className="championIcon big" src="/img/{{$self.AssetVersion}}/champion/{{$player.ChampionId}}.png" />
              </div>
              <div className="summonerSpells">
                <img className="summonerIcon spell0 small" src="/img/{{$self.AssetVersion}}/spell/{{$player.Spell0}}.png"/>
                <img className="summonerIcon spell1 small" src="/img/{{$self.AssetVersion}}/spell/{{$player.Spell1}}.png"/>
              </div>

              <div className="itemSet">
                <div className="core">
                  <img className="itemIcon small" src="/img/{{$self.AssetVersion}}/item/{{$player.Stats.Item0}}.png"/>
                  <img className="itemIcon small" src="/img/{{$self.AssetVersion}}/item/{{$player.Stats.Item1}}.png"/>
                  <img className="itemIcon small" src="/img/{{$self.AssetVersion}}/item/{{$player.Stats.Item2}}.png"/>
                  <img className="itemIcon small" src="/img/{{$self.AssetVersion}}/item/{{$player.Stats.Item3}}.png"/>
                  <img className="itemIcon small" src="/img/{{$self.AssetVersion}}/item/{{$player.Stats.Item4}}.png"/>
                  <img className="itemIcon small" src="/img/{{$self.AssetVersion}}/item/{{$player.Stats.Item5}}.png"/>
                </div>
                <div className="trinket">
                  <img className="itemIcon small" src="/img/{{$self.AssetVersion}}/item/{{$player.Stats.Item6}}.png"/>
                </div>
              </div>
            </div>
          </td>
          <td className="level">
            {this.state.level}
          </td>
          <td className="score" k="{this.state.kills}" d="{this.state.deaths}" a="{this.state.assists}">
          </td>
          <td className="cs" mk="{{$player.Stats.MinionsKilled}}" tnk="{{$player.Stats.NeutralMinionsKilledTeamJungle}}" enk="{{$player.Stats.NeutralMinionsKilledEnemyJungle}}">
          </td>
          <td className="gold">
            {this.state.gold}
            
          </td>
        </tr>
      );
    }
    else if (this.props.team == 200){
      return (
        <tr className="player" pidtwo="{{$i}}">
          <td className="gold">
            {this.state.currentGold}
          </td>
          <td className="cs" mk="{{$player.Stats.MinionsKilled}}" tnk="{{$player.Stats.NeutralMinionsKilledTeamJungle}}" enk="{{$player.Stats.NeutralMinionsKilledEnemyJungle}}">
          </td>
          <td className="score" k="{{$player.Stats.Kills}}" d="{{$player.Stats.Deaths}}" a="{{$player.Stats.Assists}}">
          </td>
          <td className="level">
            {this.state.level}
          </td>
          <td>
            <div className="summonerInfo">
              <div className="itemSet">
                <div className="trinket">
                  <img className="itemIcon small" src="/img/{{$self.AssetVersion}}/item/{{$player.Stats.Item6}}.png"/>
                </div>
                <div className="core">
                  <img className="itemIcon small" src="/img/{{$self.AssetVersion}}/item/{{$player.Stats.Item0}}.png"/>
                  <img className="itemIcon small" src="/img/{{$self.AssetVersion}}/item/{{$player.Stats.Item1}}.png"/>
                  <img className="itemIcon small" src="/img/{{$self.AssetVersion}}/item/{{$player.Stats.Item2}}.png"/>
                  <img className="itemIcon small" src="/img/{{$self.AssetVersion}}/item/{{$player.Stats.Item3}}.png"/>
                  <img className="itemIcon small" src="/img/{{$self.AssetVersion}}/item/{{$player.Stats.Item4}}.png"/>
                  <img className="itemIcon small" src="/img/{{$self.AssetVersion}}/item/{{$player.Stats.Item5}}.png"/>
                </div>
              </div>
              <div className="summonerSpells">
                <img className="summonerIcon spell0 small" src="/img/{{$self.AssetVersion}}/spell/{{$player.Spell0}}.png"/>
                <img className="summonerIcon spell1 small" src="/img/{{$self.AssetVersion}}/spell/{{$player.Spell1}}.png"/>
              </div>
              <div className="iconContainer" title="{{$player.Name}}">
                <img className="championIcon big" src="/img/{{$self.AssetVersion}}/champion/{{$player.ChampionId}}.png" />
              </div>
            </div>
          </td>
        </tr>
      );
    }
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
  
  render() {
    if (this.props.team == 100){
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
            <tr>
              <th className="thResult" winner=""></th>
              <th className="thLevel">Lvl</th>
              <th>Score</th>
              <th className="thCS">CS</th>
              <th className="thGold">Gold</th>
            </tr>
            
              <ScoreboardPlayer team="100" />

            
            <tr>
              <td colspan="4" className="teamStats">
                Dragons: {this.state.dragons} -
                Barons: {this.state.barons} -
                Rift Heralds: {this.state.heralds}
              </td>
              <td className="teamGold">
              </td>
            </tr>
          </table>
        </div>
      );
    }
    else if (this.props.team == 200){
      return (
        <div className="team200 col-md-6">
          <table className="table">
            <colgroup>
             <col span="1" style={{width: 15}} />
             <col span="1" style={{width: 15}} />
             <col span="1" style={{width: 15}} />
             <col span="1" style={{width: 15}} />
             <col span="1" style={{width: 30}} />
            </colgroup>
            <tr>
              <th className="thGold">Gold</th>
              <th className="thCS">CS</th>
              <th>Score</th>
              <th className="thLevel">Lvl</th>
              <th className="thResult" winner=""></th>
            </tr>
            
              <ScoreboardPlayer team="200" />
            
            <tr>
              <td className="teamGold">
              </td>
              <td colspan="4" className="teamStats">
                Dragons: {this.state.dragons} -
                Barons: {this.state.barons} -
                Rift Heralds: {this.state.heralds}
              </td>
            </tr>
          </table>
        </div>
      );
    }
  }
}

class Scoreboard extends Component {
  render() {
    return (
      <div className="scoreboard recentGames row">
        <Teamboard team="100" />
        <Teamboard team="200" />
      </div>
    );
  }
}

class ControlHeader extends Component {

}

class Minimap extends Component {

}

class EventLog extends Component {

}



export default Postgame;
