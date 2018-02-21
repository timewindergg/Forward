import React, { Component } from 'react';
import Moment from 'react-moment';

import {
  getChampionIconUrl,
  getItemIconUrl,
  getPerkIconUrl,
  getPerkStyleIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';

import { getKeystone } from '../../shared/helpers/leagueUtilities.js';

import ChampionMappings from '../../shared/championMappings';

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

    let p = this.getStats(m);
    let keystone = getKeystone(Object.keys(p.runes));

    return(
      <div className="RecentMatch" key={m.match_id}>
        <div className="matchInfo">
          <div className="champion-stats-match-type">
            {m.game_type}
          </div>
          <div className="time-stamp">
            <Moment fromNow>{new Date(0).setUTCSeconds(m.timestamp)}</Moment>
          </div>
          <div className="champion-stats-match-result">
            {m.won ? 'Victory' : 'Defeat'}
          </div>
          <div className="champion-stats-match-length">
            <Moment format="mm:ss">{m.duration * 1000}</Moment>
          </div>
        </div>
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
            <img className="championIcon big" src={getChampionIconUrl(m.champ_id, version)} />
            <div className="level">
              {m.level}
            </div>
          </div>
          <div>
            <div className="stats">
              <span className="stat cs">{m.cs}</span>
              <span className="stat score">{m.kills}/{m.deaths}/{m.assists}</span>
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
}

class RecentMatches extends Component {
  render() {
    const { championStats, version } = this.props;

    return (
      <div className="champion-stats-recent-matches">
        <h3>Recent Matches on {ChampionMappings[this.props.championId].name}</h3>
        {this.renderMatches(championStats, version)}
      </div>
    );
  }

  renderMatches(championStats, version) {
    return championStats.recentMatches.map((m) => {
      return (
        <RecentMatch match={m} version={version} key={m.match_id}/>
      );
    })
  }
}

export default RecentMatches;