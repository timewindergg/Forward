import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radar, Line } from 'react-chartjs-2';
import Moment from 'react-moment';

import './dash.css';

import ChampionMappings from '../../shared/championMappings.js';

import { getMasteryIconUrl, getTierIconUrl} from '../../shared/helpers/staticImageHelper.js';
import { numberFormatter } from '../../shared/helpers/numberHelper.js';

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
    const profileIconUrl = `http://ddragon.leagueoflegends.com/cdn/7.24.2/img/profileicon/${summoner.icon}.png`;
    return (
      <div className='Dashboard'>
        <div className="header">
          <div className="profile-icon col-sm-3">
            <img src={profileIconUrl} alt=""/>
          </div>
          <div className="profile col-sm-2">
            <span className="Name">{summoner.summonerName}</span>
          </div>
          <div className="ranked-info col-sm-2">
            {this.renderRankedTiers(summoner.leagues)}
          </div>
        <div className="top-champion-masteries col-sm-5">
          {this.renderTopUserChampionMasteries(summoner.championMasteries)}
        </div>
        </div>
        <div>
          {this.renderRadarChart()}
        </div>
        <div>
          {this.renderLineChart()}
        </div>
        <div className='game-item-list'>
          {this.renderMatchList(matches)}
        </div>
      </div>
    );
  }

  renderTopUserChampionMasteries(championMasteries) {
    if (championMasteries !== undefined) {
      // The champions should be sorted by their points.
      championMasteries.sort((mastery1, mastery2) => {
        return mastery1.total_points - mastery2.total_points;
      });

      const champions = championMasteries.map((c) => {
        const masteryIcon = getMasteryIconUrl(c.level);
        return (
          <div key={c.champ_id}>
            <img src={`http://ddragon.leagueoflegends.com/cdn/7.24.2/img/champion/${ChampionMappings[c.champ_id].image}`} alt=""/>
            <img src={masteryIcon} alt=""/>
            <span>{numberFormatter(c.total_points)}</span>
          </div>
        );
      });

      return champions;
    }
  }

  renderRankedTiers(leagues) {
    if (leagues !== undefined) {
      // Only show the solo q info.
      // Sort the objects by their id.
      let rankedInfo = {};
      leagues.forEach((league) => {
        if (league.queue === 'RANKED_SOLO_5x5') {
          Object.assign(rankedInfo, league);
        }
      });

      return (
        <div>
          <img src={getTierIconUrl(Object.keys(rankedInfo).length === 0 && rankedInfo.constructor === Object ? 'Unranked' : rankedInfo.tier)}/>
        </div>
      );
    }
  }

  renderRadarChart() {
    const data = {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    };

    return (
      <Radar data={data} />
    )
  }

  renderLineChart() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    return (
      <Line data={data} />
    )
  }

  renderParticipants(participants) {
    const participantList = participants.map((p) => {
      return (
        <div key={p.summonerId} className="participant">
          <div className="participant-champion-image">
            <img src={p.championUrl} alt="" className="Image"/>
          </div>
          <div className="participant-name">
            <span>{p.summonerName}</span>
          </div>
        </div>
      );
    });

    return participantList;
  }

  renderMatchList(matches) {
    const matchItems = matches.map((m) => {
      console.log(m);
      return (
        <div className="game-item-wrapper" key={m.match_id}>
          <div className="game-item">
            <div className="game-content" >
              <div className="game-stats">
                <div className="game-type">
                  {m.game_type}
                </div>
                <div className="time-stamp">
                  <Moment fromNow>{m.timestamp}</Moment>
                </div>
                <div className="bar"></div>
                <div className="game-result">
                  {m.won ? 'Victory' : 'Defeat'}
                </div>
                <div className="game-length">
                  <span>{m.duration}</span>
                </div>
              </div>
              <div className="game-setting-info">
                <div className="champion-image">
                  <a href="" target="_blank"><img src={m.championUrl} alt="" className="Image"/></a>
                </div>
                <div className="summoner-spell">
                  <div className="spell">
                    <img src={m.spell1Url} alt="" className="Image"/>
                  </div>
                  <div className="spell">
                    <img src={m.spell2Url} alt="" className="Image"/>
                  </div>
                </div>
                <div className="runes">
                  <div className="rune">
                    <img src={m.rune1} alt="" className="Image"/>
                  </div>
                  <div className="rune">
                    <img src= {m.rune2} alt="" className="Image"/>
                  </div>
                </div>
                <div className="champion-name">
                  <a href= "" target="_blank">{m.championName}</a>
                </div>
              </div>
              <div className="kda">
                <div className="kda-info">
                  <span className="kill">{m.kills}</span> /
                  <span className="death">{m.deaths}</span> /
                  <span className="assist">{m.assists}</span>
                </div>
                <div className="kda-ratio">
                  <span className="kda-ratio ">{m.kda}</span>
                </div>
                <div className="multi-kill">
                  <span className="kill">Triple Kill</span>
                </div>
              </div>
              <div className="stats">
                <div className="level">
                  {m.level}
                </div>
                <div className="cs">
                  <span title="">{m.cs}</span>CS</div>
                  <div className="" title="">
                    {m.killParticipation}
                  </div>
              </div>
              <div className="items">
                <div className="item">
                  <img src={m.item0Url} alt="" className="Image"/>
                </div>
                <div className="item">
                  <img src={m.item1Url} alt="" className="Image"/>
                </div>
                <div className="item">
                  <img src={m.item2Url} alt="" className="Image"/>
                </div>
                <div className="item">
                  <img src={m.item3Url} alt="" className="Image"/>
                </div>
                <div className="item">
                  <img src={m.item4Url} alt="" className="Image"/>
                </div>
                <div className="item">
                  <img src={m.item5Url} alt="" className="Image"/>
                </div>
              </div>
              <div className="trinkets">
                <div className="item">
                  <img src={m.item6Url} alt="" className="Image"/>
                </div>
              </div>
              <div className="fellow-players">
                <div className="team">
                  {this.renderParticipants(m.participants[0])}
                </div>
                <div className="team">
                  {this.renderParticipants(m.participants[1])}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    });

    return matchItems;
  }
}

export default Dashboard;