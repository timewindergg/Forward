import React, { Component } from 'react';
import classNames from 'classnames';

import { getChampionIconUrlByImage, getItemIconUrl, getPerkIconUrl, getSpellIconUrl, getPerkStyleIconUrl } from '../../shared/helpers/staticImageHelper.js';
import TRINKETS from '../../shared/trinketConstants.js';

import Tooltip from '../common/tooltip/Tooltip';
import TOOLTIP_TYPES from '../../constants/TooltipTypes';

class ScoreboardPlayer extends Component {
  render() {
    if (this.props.participant === undefined){
      return (<div/>);
    }
    let patchVersion = this.props.version;
    let p = this.props.participant;
    let runeData = this.props.runeData;
    let championData = this.props.championData;

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
      // console.log("too many items on scoreboard")
    }

    for (var i = items.length; i < 6; i++){
      items.push(0);
    }

    let keystone = 0;

    for (let key in p.runes) {
      if (!!runeData[key] && runeData[key].isKeystone === true) {
        keystone = key;
      }
    }

    const itemSet = items.map((item) => {
      if (item){
        return (
          <Tooltip
            containerClassName={classNames({'itemIcon': true, 'icon': true})}
            type={TOOLTIP_TYPES.ITEM}
            data={this.props.staticData.items[item.toString()]}
            img={getItemIconUrl(item, patchVersion)}
            version={patchVersion}
          >
            <img className={classNames({'itemIcon': true, 'icon': true})} src={getItemIconUrl(item, patchVersion)}/>
          </Tooltip>
        );
      }
      else {
        return (
          <div className='itemIcon filler icon'></div>
        );
      }
    });

    return (
      <div className="summonerInfo">
        <div className="runeSummIcons">
          <div className="summonerSpells">
            <img className="summonerIcon icon" src={getSpellIconUrl(p.summonerSpellDId, patchVersion)}/>
            <img className="summonerIcon icon" src={getSpellIconUrl(p.summonerSpellFId, patchVersion)}/>
          </div>
          <div className="runes">
            <Tooltip
              type={TOOLTIP_TYPES.RUNE}
              data={this.props.staticData.runes[keystone.toString()]}
              img={getPerkIconUrl(keystone, patchVersion)}
              version={patchVersion}
            >
              <img className="runeIcon icon" src={getPerkIconUrl(keystone, patchVersion)}/>
            </Tooltip>
            <img className="runeIcon icon" src={getPerkStyleIconUrl(p.stats.perkSubStyle, patchVersion)}/>
          </div>
        </div>
        <div className="iconContainer">
          <img className="championIcon big" src={getChampionIconUrlByImage(championData[p.championId].img.split('.')[0], patchVersion)} />
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
          {itemSet}

          <Tooltip
            containerClassName={classNames({'itemIcon': true, 'icon': true, 'hidden': items[6] === 0})}
            type={TOOLTIP_TYPES.ITEM}
            data={this.props.staticData.items[trinket.toString()]}
            img={getItemIconUrl(trinket, patchVersion)}
            version={patchVersion}
          >
            <img className={classNames({'itemIcon': true, 'icon': true, 'hidden': items[6] === 0})} src={getItemIconUrl(trinket, patchVersion)}/>
          </Tooltip>
        </div>
      </div>
    );
  }
}

class Teamboard extends Component {
  renderParticipants() {
    return this.props.participants.map((participant) => (
      <ScoreboardPlayer region={this.props.region} key={participant[0]} participant={participant[1]} version={this.props.version} runeData={this.props.staticData.runes} championData={this.props.staticData.champions} staticData={this.props.staticData}/>
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

    const {staticData} = this.props;

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
        <Teamboard team="100" participants={blueTeam} version={this.props.version} region={this.props.region} staticData={staticData}/>
        <Teamboard team="200" participants={redTeam} version={this.props.version} region={this.props.region} staticData={staticData}/>
      </div>
    );
  }
}

export default Scoreboard;