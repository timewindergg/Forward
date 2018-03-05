import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import {
  getChampionIconUrlByImage,
  getItemIconUrl,
  getPerkIconUrl,
  getPerkStyleIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';

  // Import required mappings.
import QueueIdMappings from '../../shared/queueIdMappings.js';
import { getKDA, getKillParticipation, strPadLeft, getTeamKDAStat } from '../../shared/helpers/leagueUtilities';
import { roundWithPrecision } from '../../shared/helpers/numberHelper';

class RecentMatch extends Component{

  getStats(m){
    if (m.team === 100){
      let bt = JSON.parse(m.blue_team);
      return bt.participants[m.participant_id - 1];
    }
    else if (m.team === 200){
      let rt = JSON.parse(m.red_team);
      return rt.participants[m.participant_id - rt.participants.length - 1];
    }
  }

  render(){
    let m = this.props.match;
    let version = this.props.version;
    let runeData = this.props.runeData;
    let championData = this.props.championData;

    let p = this.getStats(m);

    let keystone = 0;

    for (let key in p.runes) {
      if (runeData[key].isKeystone === true) {
        keystone = key;
        break;
      }
    }

    return(
      <div className="RecentMatch" key={m.match_id}>
        <div className={classNames({"result-indicator": true, 'victory': m.team === m.winner, 'defeat': m.team !== m.winner})}></div>
        {this.renderMatchHeader(m)}
        <div className="champion-stats-match-setting-info summonerInfo">
          <div className="runeSummIcons">
            <div className="summonerSpells">
              <img className="summonerIcon icon" src={getSpellIconUrl(m.spell0, version)}/>
              <img className="summonerIcon icon" src={getSpellIconUrl(m.spell1, version)}/>
            </div>
            <div className="runes">
              <img className="runeIcon icon" src={getPerkIconUrl(keystone, version)}/>
              <img className="runeIcon icon" src={getPerkStyleIconUrl(p.stats.perkSubStyle, version)}/>
            </div>
          </div>
          <div className="iconContainer">
            <img className="championIcon big" src={getChampionIconUrlByImage(championData[m.champ_id].img.split('.')[0], version)} />
            <div className="level">
              {m.level}
            </div>
          </div>
          <div className="stats">
            <span className="stat cs">{`${m.cs} CS`}</span>
            <div className="stat score">
              <span>{`${m.kills}/${m.deaths}/${m.assists}`}</span>
              <span>{`${roundWithPrecision(getKDA(m.kills, m.deaths, m.assists), 2)} KDA`}</span>
            </div>

          </div>
          <div className="itemSet">
            <img className="itemIcon icon" src={getItemIconUrl(m.item0, version)}/>
            <img className="itemIcon icon" src={getItemIconUrl(m.item1, version)}/>
            <img className="itemIcon icon" src={getItemIconUrl(m.item2, version)}/>
            <img className="itemIcon icon" src={getItemIconUrl(m.item3, version)}/>
            <img className="itemIcon icon" src={getItemIconUrl(m.item4, version)}/>
            <img className="itemIcon icon" src={getItemIconUrl(m.item5, version)}/>
            <img className="itemIcon icon" src={getItemIconUrl(m.item6, version)}/>
          </div>
        </div>
      </div>
    );
  }

  renderMatchHeader(match) {
    // Set up to get relative time.
    const gameDate = new Date(0);
    gameDate.setUTCSeconds(match.timestamp);

    let duration = match.duration;
    // Format the game duration.
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    duration = strPadLeft(minutes, '0', 2) +  ':' + strPadLeft(seconds, '0', 2);

    let team = match.team === 100 ? match.blue_team : match.red_team;

    team = JSON.parse(team);

    const teamKDA = getTeamKDAStat(team);

    return (
      <div className="item-header">
        <div className="match-info">
          <span className="queue">{QueueIdMappings[match.queue_id].name}</span>
          <Moment className="timestamp" fromNow>{gameDate}</Moment>
          <span className="duration">{duration}</span>
        </div>
        <div className="team-scores">
          <span>{`${teamKDA[0]}/${teamKDA[1]}/${teamKDA[2]}`}</span>
        </div>
        <div className="team-objectives">
          <div className="icon-baron">
          </div>
          <span>{team.baronKills}</span>
          <div className="icon-dragon">
          </div>
          <span>{team.dragonKills}</span>
          <div className="icon-tower">
          </div>
          <span>{team.towerKills}</span>
        </div>
        <div className="match-postgame">
          <Link to={`/m/${match.region}/${match.match_id}`}>
            <span>Analysis</span>
            <i className="fas fa-angle-right"></i>
          </Link>
        </div>
      </div>
    );
  }
}

class RecentMatches extends Component {
  render() {
    const { championStats, version, staticData} = this.props;

    return (
      <div className="champion-stats-recent-matches">
        <h3>Recent Matches on {staticData.champions[this.props.championId].name}</h3>
        {this.renderMatches(championStats, version, staticData)}
      </div>
    );
  }

  renderMatches(championStats, version, staticData) {
    return championStats.recentMatches.map((m) => {
      return (
        <RecentMatch match={m} version={version} key={m.match_id} runeData={staticData.runes} championData={staticData.champions}/>
      );
    })
  }
}



export default RecentMatches;