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
    if (this.props === undefined) {
      return (<div/>);
    }

    const { championStats } = this.props;

    return (
      <div className="champion-stats-recent-matches">
        {this.renderMatches(championStats)}
      </div>
    )
  }


  renderMatches(championStats) {
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
              <Avatar src={getChampionIconUrl(m.champ_id, '7.24.2')}/>
              <div className="champion-stats-match-level">
                Level: {m.level}
              </div>
            </div>
            <div className="champion-stats-match-summoner-spells">
              <div className="champion-stats-match-spell">
                <img src={getSpellIconUrl(m.spell0, '7.24.2')} alt=""/>
              </div>
              <div className="champion-stats-match-spell">
                <img src={getSpellIconUrl(m.spell1, '7.24.2')} alt=""/>
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
                <img src={getItemIconUrl(m.item0, '7.24.2')} alt=""/>
              </div>
              <div className="champion-stats-match-item">
                <img src={getItemIconUrl(m.item1, '7.24.2')} alt=""/>
              </div>
              <div className="champion-stats-match-item">
                <img src={getItemIconUrl(m.item2, '7.24.2')} alt=""/>
              </div>
              <div className="champion-stats-match-item">
                <img src={getItemIconUrl(m.item3, '7.24.2')} alt=""/>
              </div>
              <div className="champion-stats-match-item">
                <img src={getItemIconUrl(m.item4, '7.24.2')} alt=""/>
              </div>
              <div className="champion-stats-match-item">
                <img src={getItemIconUrl(m.item5, '7.24.2')} alt=""/>
              </div>
            </div>
            <div className="champion-stats-match-trinkets">
              <div className="champion-stats-match-item">
                <img src={getItemIconUrl(m.item6, '7.24.2')} alt=""/>
              </div>
            </div>
          </div>
        </div>
      );
    })
  }
}

export default RecentMatches;