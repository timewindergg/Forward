import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radar, Line } from 'react-chartjs-2';
import Moment from 'react-moment';

import './dash.css';

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
    return (
      <div className='Dashboard'>
        <h1>Timewinder</h1>
        <p> Welcome, {summoner.summonerName}</p>
        <div>
          {this.renderRadarChart()}
        </div>
        <div>
          {this.renderLineChart()}
        </div>
        <div>
          {this.renderMatchList(matches)}
        </div>
      </div>
    );
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

  renderMatchList(matches) {
    const matchItems = matches.map((m) => {
      console.log(m);
      return (
        <div className="content" key={m.match_id}>
          <div className="game-stats">
            <div className="game-type">
              {m.game_type}
            </div>
            <div className="time-stamp">
              <Moment fromNow>{m.timestamp}</Moment>
            </div>
            <div className="Bar"></div>
            <div className="game-result">
              {m.won ? 'Victory' : 'Defeat'}
            </div>
            <div className="game-length">
              <span>{m.duration}</span>
            </div>
          </div>
          <div className="game-setting-info">
            <div className="champion-image">
              <a href="" target="_blank"><img src={m.championUrl} alt=""/></a>
            </div>
            <div className="summoner-spell">
              <div className="Spell">
                <img src={m.spell1Url} alt=""/>
              </div>
              <div className="Spell">
                <img src={m.spell2Url} alt=""/>
              </div>
            </div>
            <div className="runes">
              <div className="rune">
                <img src={m.rune1} alt=""/>
              </div>
              <div className="rune">
                <img src= {m.rune2} alt=""/>
              </div>
            </div>
            <div className="champion-name">
              <a href= "" target="_blank">{m.championName}</a>
            </div>
          </div>
          <div className="kda">
            <div className="kda">
              <span className="kill">{m.kills}</span> /
              <span className="death">{m.deaths}</span> /
              <span className="assist">{m.assists}</span>
            </div>
            <div className="kda-ratio">
              <span className="kda-ratio ">{m.kda}</span>
            </div>
            <div className="multi-kill">
              <span className="kill">{}</span>
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
              <img src={m.item0Url} alt=""/>
            </div>
            <div className="item">
              <img src={m.item1Url} alt=""/>
            </div>
            <div className="item">
              <img src={m.item2Url} alt=""/>
            </div>
            <div className="item">
              <img src={m.item3Url} alt=""/>
            </div>
            <div className="item">
              <img src={m.item4Url} alt=""/>
            </div>
            <div className="item">
              <img src={m.item5Url} alt=""/>
            </div>
          </div>
          <div className="trinkets">
            <div className="trinket">
              <img src={m.item6Url} alt=""/>
            </div>
          </div>
          <div className="fellow-players">
          </div>
        </div>
      )
    });

    return matchItems;
  }
}

export default Dashboard;