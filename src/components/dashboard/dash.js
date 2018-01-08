import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import './dash.css';

// Import api utils.
import { getSummonerMatchHistory } from '../../utils/getMatchHistoryAPIUtils';

import { RadarChart } from '../../d3/radarChart';

class Dashboard extends Component {
  static propTypes = {
    summoner: PropTypes.object.isRequired,
    matches: PropTypes.array.isRequired,
    getSummonerMatchHistory: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.getSummonerMatchHistory(20297715, 'NA', 0, 10);
  }

  render() {
    const {summoner, matches} = this.props;
    console.log('components/dashboard/dash.js summoner shown:', summoner);
    return (
      <div className='Dashboard'>
        <h1>Timewinder</h1>
        <p> Welcome, {summoner.summonerName}</p>
        <div>
          {this.renderMatchList(matches)}
        </div>
      </div>
    );
  }

  renderMatchList(matches) {
    const matchItems = matches.map((m) => {
      return (
        <div className="content">
          <div className="game-stats">
            <div class="game-type">
              {m.game_type}
            </div>
            <div class="time-stamp">
              <span>{m.timestamp}</span>
            </div>
            <div class="Bar"></div>
            <div class="game-result">
              Victory
            </div>
            <div class="game-length">{m.duration}</div>
          </div>
          <div className="game-setting-info">
            <div class="champion-image">
              <a href="" target="_blank"><img src={m.championUrl}/></a>
            </div>
            <div class="summoner-spell">
              <div class="Spell">
                <img src={m.spell1Url}/>
              </div>
              <div class="Spell">
                <img src={m.spell2Url}/>
              </div>
            </div>
            <div class="runes">
              <div class="rune">
                <img src={m.rune1}/>
              </div>
              <div class="rune">
                <img src= {m.rune2}/>
              </div>
            </div>
            <div class="champion-name">
              <a href= "" target="_blank">{m.championName}</a>
            </div>
          </div>
          <div className="kda">
            <div class="kda">
              <span class="kill">{m.kills}</span> /
              <span class="death">{m.deaths}</span> /
              <span class="assist">{m.assists}}</span>
            </div>
            <div class="kda-ratio">
              <span class="kda-ratio ">{}</span>
                KDA
            </div>
            <div class="multi-kill">
              <span class="kill">{}</span>
            </div>
          </div>
          <div className="stats">
            <div className="level">
              {m.level}
            </div>
            <div className="cs">
              <span title="">{m.cs}</span>CS</div>
              <div className="" title="">
                P/Kill 85%
              </div>
          </div>
          <div class="items">
            <div class="item">
              <img src={m.item0Url}/>
            </div>
            <div class="item">
              <img src={m.item1Url}/>
            </div>
            <div class="item">
              <img src={m.item2Url}/>
            </div>
            <div class="item">
              <img src={m.item3Url}/>
            </div>
            <div class="item">
              <img src={m.item4Url}/>
            </div>
            <div class="item">
              <img src={m.item5Url}/>
            </div>
          </div>
          <div className="trinkets">
            <div className="trinket">
              <img src={m.item6Url}/>
            </div>
          </div>
          <div className="fellow-players">

          </div>
        </div>
      )
    });
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSummonerMatchHistory: (summonerId, region, offset, size) => {
      getSummonerMatchHistory(dispatch, summonerId, region, offset, size);
    }
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
