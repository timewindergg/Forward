import React, { Component } from 'react';
import Moment from 'react-moment';

import { getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrl,
  getProfileIconUrl,
  getItemIconUrl,
  getPerkIconUrl,
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
          <div className="champion-stats-match-item">
            <div className="champion-stats-match-content" >
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
                </div>
                <div className="champion-stats-match-summoner-spell">
                  <div className="champion-stats-match-spell">
                    <img src={m.spell1Url} alt="" className="Image"/>
                  </div>
                  <div className="champion-stats-match-spell">
                    <img src={m.spell2Url} alt="" className="Image"/>
                  </div>
                </div>
                <div className="champion-stats-match-perks">
                  <div className="champion-stats-match-perk">
                    <img src={m.rune1} alt="" className="Image"/>
                  </div>
                  <div className="champion-stats-match-perk">
                    <img src= {m.rune2} alt="" className="Image"/>
                  </div>
                </div>
                <div className="champion-stats-match-champion-name">
                  <a href= "" target="_blank">{m.championName}</a>
                </div>
              </div>
              <div className="champion-stats-match-kda">
                <div className="champion-stats-match-kda-info">
                  <span className="champion-stats-match-kill">{m.kills}</span> /
                  <span className="champion-stats-match-death">{m.deaths}</span> /
                  <span className="champion-stats-match-assist">{m.assists}</span>
                </div>
                <div className="champion-stats-match-kda-ratio">
                  <span className="champion-stats-match-kda-ratio ">{m.kda}</span>
                </div>
                <div className="champion-stats-match-multi-kill">
                  <span className="kill">Triple Kill</span>
                </div>
              </div>
              <div className="champion-stats-match-stats">
                <div className="champion-stats-match-level">
                  {m.level}
                </div>
                <div className="champion-stats-match-cs">
                  <span title="">{m.cs}</span>CS</div>
                  <div className="" title="">
                    {m.killParticipation}
                  </div>
              </div>
              <div className="champion-stats-match-items">
                <div className="champion-stats-match-item">
                  <img src={m.item0Url} alt="" className="Image"/>
                </div>
                <div className="champion-stats-match-item">
                  <img src={m.item1Url} alt="" className="Image"/>
                </div>
                <div className="champion-stats-match-item">
                  <img src={m.item2Url} alt="" className="Image"/>
                </div>
                <div className="champion-stats-match-item">
                  <img src={m.item3Url} alt="" className="Image"/>
                </div>
                <div className="champion-stats-match-item">
                  <img src={m.item4Url} alt="" className="Image"/>
                </div>
                <div className="champion-stats-match-item">
                  <img src={m.item5Url} alt="" className="Image"/>
                </div>
              </div>
              <div className="champion-stats-match-trinkets">
                <div className="champion-stats-match-item">
                  <img src={m.item6Url} alt="" className="Image"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
    })
  }
}

export default RecentMatches;