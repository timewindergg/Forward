import React, { Component } from 'react';
import Moment from 'react-moment';
import Avatar from 'material-ui/Avatar';

import { getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrl,
  getProfileIconUrl,
  getItemIconUrl,
  getPerkIconUrl,
  getPerkStyleIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';

class RecentMatches extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.championStats === undefined || this.props.version === undefined) {
      return (<div/>);
    }

    const { championStats, version } = this.props;

    return (
      <div className="champion-stats-recent-matches">
        {this.renderMatches(championStats, version)}
      </div>
    )
  }


  renderMatches(championStats, version) {
    return championStats.recentMatches.map((m) => {
      return (
        <div className="champion-stats-match-item-wrapper" key={m.match_id}>
          <div className="champion-stats-match-stats">
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
              <span>{m.duration}</span>
            </div>
          </div>
          <div className="champion-stats-match-setting-info">
            <div className="champion-stats-match-champion-image">
              <Avatar src={getChampionIconUrl(m.champ_id, version)}/>
              <div className="champion-stats-match-level">
                Level: {m.level}
              </div>
            </div>
            <div className="champion-stats-match-summoner-spells">
              <div className="champion-stats-match-spell">
                <img src={getSpellIconUrl(m.spell0, version)} alt=""/>
              </div>
              <div className="champion-stats-match-spell">
                <img src={getSpellIconUrl(m.spell1, version)} alt=""/>
              </div>
            </div>
            <div className="champion-stats-match-kda">
              <div className="champion-stats-match-kda-info">
                <span className="champion-stats-match-kill">{m.kills}</span> /
                <span className="champion-stats-match-death">{m.deaths}</span> /
                <span className="champion-stats-match-assist">{m.assists}</span>
              </div>
              <div className="champion-stats-match-kda-ratio">
                <span className="champion-stats-match-kda-ratio ">{m.deaths === 0 ? 'PERFECT' : ((m.kills + m.assists)/m.deaths).toFixed(2)}</span>
              </div>
              <div className="champion-stats-match-cs">
                <span>{m.cs}</span>CS</div>
            </div>
            <div className="champion-stats-match-items">
              <div className="champion-stats-match-item">
                <img src={getItemIconUrl(m.item0, version)} alt=""/>
              </div>
              <div className="champion-stats-match-item">
                <img src={getItemIconUrl(m.item1, version)} alt=""/>
              </div>
              <div className="champion-stats-match-item">
                <img src={getItemIconUrl(m.item2, version)} alt=""/>
              </div>
              <div className="champion-stats-match-item">
                <img src={getItemIconUrl(m.item3, version)} alt=""/>
              </div>
              <div className="champion-stats-match-item">
                <img src={getItemIconUrl(m.item4, version)} alt=""/>
              </div>
              <div className="champion-stats-match-item">
                <img src={getItemIconUrl(m.item5, version)} alt=""/>
              </div>
            </div>
            <div className="champion-stats-match-trinkets">
              <div className="champion-stats-match-item">
                <img src={getItemIconUrl(m.item6, version)} alt=""/>
              </div>
            </div>
          </div>
        </div>
      );
    })
  }
}

export default RecentMatches;