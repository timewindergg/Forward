import React, { Component } from 'react';
import classNames from 'classnames';

import { getChampionIconUrl, getItemIconUrl, getPerkIconUrl, getSpellIconUrl, getPerkStyleIconUrl } from '../../shared/helpers/staticImageHelper.js';
import TRINKETS from '../../shared/trinketConstants.js';
import { getKeystone } from '../../shared/helpers/leagueUtilities';

class ScoreboardPlayer extends Component {
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
        <div className="iconContainer">
          <img className="championIcon big" src={getChampionIconUrl(p.championId, patchVersion)} />
          <div className="level">
            {p.level}
          </div>
        </div>
        <div>
          <a className="name" href={`/p/${this.props.region}/${p.summonerName}`}>
            <span>{p.summonerName}</span>
          </a>
          <div className="stats">
            <span className="stat cs">{p.cs}</span>
            <span className="stat score">{p.kills}/{p.deaths}/{p.assists}</span>
            <span className="stat gold">{p.currentGold}</span>
            <span className="stat ward">{p.totalWards}</span>
          </div>
        </div>
        <div className="itemSet">
          <img className={classNames({'itemIcon': true, 'icon': true, 'hidden': items[0] === 0})} src={getItemIconUrl(items[0], patchVersion)}/>
          <img className={classNames({'itemIcon': true, 'icon': true, 'hidden': items[1] === 0})} src={getItemIconUrl(items[1], patchVersion)}/>
          <img className={classNames({'itemIcon': true, 'icon': true, 'hidden': items[2] === 0})} src={getItemIconUrl(items[2], patchVersion)}/>
          <img className={classNames({'itemIcon': true, 'icon': true, 'hidden': items[3] === 0})} src={getItemIconUrl(items[3], patchVersion)}/>
          <img className={classNames({'itemIcon': true, 'icon': true, 'hidden': items[4] === 0})} src={getItemIconUrl(items[4], patchVersion)}/>
          <img className={classNames({'itemIcon': true, 'icon': true, 'hidden': items[5] === 0})} src={getItemIconUrl(items[5], patchVersion)}/>
          <img className={classNames({'itemIcon': true, 'icon': true, 'hidden': items[6] === 0})} src={getItemIconUrl(trinket, patchVersion)}/>
        </div>
      </div>
    );
  }
}

class Teamboard extends Component {
  renderParticipants() {
    return this.props.participants.map((participant) => (
      <ScoreboardPlayer region={this.props.region} key={participant[0]} participant={participant[1]} version={this.props.version}/>
    ));
  }

  render() {
    return (
      <div className="team">
        { this.renderParticipants() }
      </div>
    );
  }
}

class ScoreboardHeader extends Component{
  render(){
    return (
      <div className="scoreboardHeader">
        <div className="teamStats">
          <span className="stat"><span className="icon-dragon"/> {this.props.blueData.dragons}</span>
          <span className="stat"><span className="icon-baron"/> {this.props.blueData.barons}</span>
          <span className="stat"><span className="icon-rift-herald"/> {this.props.blueData.heralds}</span>
        </div>
        <div className="score">
          <span>{this.props.blueData.kills} - {this.props.redData.kills}</span>
        </div>
        <div className="teamStats">
          <span className="stat"><span className="icon-dragon"/> {this.props.redData.dragons}</span>
          <span className="stat"><span className="icon-baron"/> {this.props.redData.barons}</span>
          <span className="stat"><span className="icon-rift-herald"/> {this.props.redData.heralds}</span>
        </div>
      </div>
    );
  }
}

class IconHeader extends Component{
  render(){
    return(
      <div>
      </div>
    );
  }
}


class Scoreboard extends Component {
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
        <ScoreboardHeader blueData={this.props.teamFrameData['100']} redData={this.props.teamFrameData['200']}/>
        <IconHeader />
        <Teamboard team="100" participants={blueTeam} version={this.props.version} region={this.props.region}/>
        <Teamboard team="200" participants={redTeam} version={this.props.version} region={this.props.region}/>
      </div>
    );
  }
}

export default Scoreboard;