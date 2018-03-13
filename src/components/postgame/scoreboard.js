import React, { Component } from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import uuidv4 from 'uuid/v4';

import { getChampionIconUrlByImage, getItemIconUrl, getPerkIconUrl, getSpellIconUrl, getPerkStyleIconUrl } from '../../shared/helpers/staticImageHelper.js';
import TRINKETS from '../../shared/trinketConstants.js';
import QueueIdMappings from '../../shared/queueIdMappings.js';

import Tooltip from '../common/tooltip/Tooltip';
import TOOLTIP_TYPES from '../../constants/TooltipTypes';

class ScoreboardPlayer extends Component {
  render() {
    if (this.props.frameData === undefined){
      return (<div/>);
    }
    let patchVersion = this.props.version;
    
    let pData = this.props.participantData;
    let p = this.props.frameData;

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

    for (let key in pData.runes) {
      if (!!runeData[key] && runeData[key].isKeystone === true) {
        keystone = key;
      }
    }

    const itemSet = items.map((item) => {
      if (item){
        return (
          <Tooltip
            key={uuidv4()}
            containerClassName={classNames({'itemIcon': true, 'icon': true})}
            type={TOOLTIP_TYPES.ITEM}
            data={this.props.staticData.items[item.toString()]}
            img={getItemIconUrl(item, patchVersion)}
            version={patchVersion}
          >
            <img className={classNames({'itemIcon': true, 'icon': true})} src={getItemIconUrl(item, patchVersion)} alt=""/>
          </Tooltip>
        );
      }
      else {
        return (
          <div key={uuidv4()} className='itemIcon filler icon'></div>
        );
      }
    });

    return (
      <div className="summonerInfo">
        <div className={classNames({'teamIndicator blueTeamP': this.props.team === "100"})}>
        </div>
        <div className="runeSummIcons">
          <div className="summonerSpells">
            <img className="summonerIcon icon" src={getSpellIconUrl(pData.summonerSpellDId, patchVersion)} alt=""/>
            <img className="summonerIcon icon" src={getSpellIconUrl(pData.summonerSpellFId, patchVersion)} alt=""/>
          </div>
          <div className="runes">
            <Tooltip
              type={TOOLTIP_TYPES.RUNE}
              data={this.props.staticData.runes[keystone.toString()]}
              img={getPerkIconUrl(keystone, patchVersion)}
              version={patchVersion}
            >
              <img className="runeIcon icon" src={getPerkIconUrl(keystone, patchVersion)} alt=""/>
            </Tooltip>
            <img className="runeIcon icon" src={getPerkStyleIconUrl(pData.stats.perkSubStyle, patchVersion)} alt=""/>
          </div>
        </div>
        <div className="iconContainer">
          <img className="championIcon big" src={getChampionIconUrlByImage(championData[pData.championId].img.split('.')[0], patchVersion)} alt=""/>
          <div className="level">
            {p.level}
          </div>
        </div>
        <div>
          <a className="name" href={`/p/${this.props.region}/${pData.summonerName}`}>
            <span>{pData.summonerName}</span>
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
            <img className={classNames({'itemIcon': true, 'icon': true, 'hidden': items[6] === 0})} src={getItemIconUrl(trinket, patchVersion)} alt=""/>
          </Tooltip>
        </div>
        <div className={classNames({'teamIndicator redTeamP': this.props.team === "200"})}>
        </div>
      </div>
    );
  }
}

class Teamboard extends Component {
  renderParticipants() {
    return this.props.participants.map((participant) => (
      <ScoreboardPlayer 
        team={this.props.team}
        region={this.props.region}
        key={participant.key} 
        frameData={participant.frameData}
        participantData={participant.participantData}
        version={this.props.version} 
        runeData={this.props.staticData.runes} 
        championData={this.props.staticData.champions} 
        staticData={this.props.staticData}/>
    ));
  }

  render() {
    return (
      <div className={classNames({'team': true, 'blueTeam': this.props.team === "100", 'redTeam': this.props.team === "200"})}>
        { this.renderParticipants() }
      </div>
    );
  }
}

class ScoreboardHeader extends Component{
  render(){
    let blueResult = 'Victory';
    let redResult = 'Defeat';
    if (!this.props.isBlueWinner){
      blueResult = 'Defeat';
      redResult = 'Victory';
    }

    return (
      <div className="scoreboardHeader">
        <div className="overview">
          <span className="blueResult">{blueResult}</span>
          <div className="teamStats">
            <span className="stat"><span className="icon-dragon"/> {this.props.blueData.dragons}</span>
            <span className="stat"><span className="icon-baron"/> {this.props.blueData.barons}</span>
            <span className="stat"><span className="icon-rift-herald"/> {this.props.blueData.heralds}</span>
          </div>
          <div className="score">
            <span className='blueTeamTxt'>{this.props.blueData.kills} </span>
             - 
            <span className='redTeamTxt'> {this.props.redData.kills}</span>
          </div>
          <div className="teamStats">
            <span className="stat"><span className="icon-dragon"/> {this.props.redData.dragons}</span>
            <span className="stat"><span className="icon-baron"/> {this.props.redData.barons}</span>
            <span className="stat"><span className="icon-rift-herald"/> {this.props.redData.heralds}</span>
          </div>
          <span className="redResult">{redResult}</span>
        </div>
        <div className="legend">
          <div className="blueLegend">
            <img className='legendIcon minion' src='/api/static/scoreboard/minion_icon.png' alt=""/>
            <img className='legendIcon kill' src='/api/static/scoreboard/kill_icon.png' alt=""/>
            <img className='legendIcon gold' src='/api/static/scoreboard/gold_icon.png' alt=""/>
            <img className='legendIcon ward' src='/api/static/scoreboard/ward_icon.png' alt=""/>
          </div>
          <Moment className="duration" format="mm:ss">{this.props.match.duration*1000}</Moment>
          <div className="redLegend">
            <img className='legendIcon minion' src='/api/static/scoreboard/minion_icon.png' alt=""/>
            <img className='legendIcon kill' src='/api/static/scoreboard/kill_icon.png' alt=""/>
            <img className='legendIcon gold' src='/api/static/scoreboard/gold_icon.png' alt=""/>
            <img className='legendIcon ward' src='/api/static/scoreboard/ward_icon.png' alt=""/>
          </div>
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
      // let matchParticipant = this.props.matchParticipants[participant[0] - 1];

      // participant[1].championId = matchParticipant.championId;
      // participant[1].summonerName = matchParticipant.summonerName;
      // participant[1].summonerSpellDId = matchParticipant.summonerSpellDId;
      // participant[1].summonerSpellFId = matchParticipant.summonerSpellFId;
      // participant[1].runes = matchParticipant.runes;
      // participant[1].stats = matchParticipant.stats;

      if (participant[1].side === 100){
        blueTeam.push({
          key: participant[0],
          frameData: participant[1],
          participantData: this.props.matchParticipants[participant[0] - 1]
        });
      }
      else if (participant[1].side === 200){
        redTeam.push({
          key: participant[0],
          frameData: participant[1],
          participantData: this.props.matchParticipants[participant[0] - 1]
        });
      }
    });

    // return (<div />);

    return (
      <div>
        <div className="queue">
          <span className="queueName">{QueueIdMappings[this.props.queue].name}</span>
        </div>
        <div className="scoreboardContainer recentGames row">
          <ScoreboardHeader match={this.props.match} queue={this.props.queue} isBlueWinner={this.props.isBlueWinner} blueData={this.props.teamFrameData['100']} redData={this.props.teamFrameData['200']}/>
          <IconHeader />
          <div className="teamsContainer">
            <Teamboard team="100"
              participants={blueTeam}
              version={this.props.version}
              region={this.props.region}
              staticData={staticData}
            />
            <Teamboard
              team="200"
              participants={redTeam}
              version={this.props.version}
              region={this.props.region}
              staticData={staticData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Scoreboard;