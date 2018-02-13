import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Radar, Line } from 'react-chartjs-2';
import Moment from 'react-moment';
// Import the calendarheatmap
import CalendarHeatmap from 'react-calendar-heatmap';

import Avatar from 'material-ui/Avatar';

import './dash.css';

import { getMasteryIconUrl, getTierIconUrl, getChampionIconUrl, getProfileIconUrl} from '../../shared/helpers/staticImageHelper.js';
import { numberFormatter } from '../../shared/helpers/numberHelper.js';

import EnhancedTable from './table';

class Dashboard extends Component {
  static defaultProps = {
    gotoPregame: () => {console.log('TODO')}
  }

  static propTypes = {
    summoner: PropTypes.object.isRequired,
    matches: PropTypes.array.isRequired,
    currentMatch: PropTypes.object.isRequired
  }

  render() {
    const {summoner, matches, currentMatch} = this.props;
    const isSummonerInMatch = Object.keys(currentMatch).length > 0;
    return (
      <div className='Dashboard'>
        <Link to={`/l/${summoner.name}/${summoner.region}`}>
          <button disabled={!isSummonerInMatch}>
            Go to pregame
          </button>
        </Link>
        <EnhancedTable championStats={summoner.championStats}/>
        {this.renderHeader(summoner)}
        <div className="match-lawn">
          {this.renderMatchHeatMap(summoner.lawn)}
        </div>
        <div className="info-radar">
          {this.renderRadarChart()}
        </div>
        <div>
        </div>
        <div className='game-item-list'>
          {this.renderMatchList(matches)}
        </div>
      </div>
    );
  }

  renderHeader(summonerInfo) {
    const profileIconUrl = getProfileIconUrl(summonerInfo.icon, '7.24.2');
    return (
        <div className="header">
          <div className="profile-icon" style={{backgroundImage: `url(${profileIconUrl})`}}>
          </div>
          <div className="profile">
            <span className="name">{summonerInfo.name}</span>
            <span className="summoner-name">{summonerInfo.level}</span>
          </div>
          <div className="ranked-info">
            {this.renderRankedTiers(summonerInfo)}
          </div>
          <div className="top-champion-masteries">
            {this.renderTopUserChampionMasteries(summonerInfo.championMasteries)}
          </div>
        </div>
    );
  }

  renderMatchHeatMap(data) {
    // Calculate the beginning of 3 months ago.
    const d = new Date();
    d.setDate(1); // sets it to the beginning of the month.
    d.setMonth(d.getMonth() - 3);

    const beginningDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDay() + 1;
    if (!!data) {
      return (
        <CalendarHeatmap
          endDate={new Date()}
          startDate={beginningDate}
          values={data}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }

            let scale = (value.losses > value.wins ? (Math.floor(value.losses / 3) + 1) : Math.floor(value.wins / 3) + 1);

            if (scale > 3) {
              scale = 3;
            }

            let matchOutcome = 'win';

            if (value.losses === value.wins) {
              matchOutcome = 'tie';
            } else if (value.losses > value.wins) {
              matchOutcome = 'loss';
            }

            return `color-scale-${matchOutcome}-${scale}`;
          }}
        />
      )
    }
  }

  renderTopUserChampionMasteries(championMasteries) {
    if (championMasteries !== undefined) {
      // Sort the champion by points.
      championMasteries.sort((mastery1, mastery2) => {
        return mastery1.total_points - mastery2.total_points;
      });

      const champions = championMasteries.map((c) => {
        const masteryIcon = getMasteryIconUrl(c.level);
        return (
          <div className="champion-mastery-wrapper" key={c.champ_id}>
            <Avatar src={getChampionIconUrl(c.champ_id, '7.24.2')} alt=""/>
            <div className="mastery-wrapper">
              <span className="mastery-points">{numberFormatter(c.total_points)}</span>
            </div>
            <div className="mastery-icon-wrapper">
              <img src={masteryIcon} alt="" className="mastery-icon"/>
            </div>
          </div>
        );
      });

      return champions;
    }
  }

  renderRankedTiers(summoner) {
    if (summoner !== undefined && summoner.leagues !== undefined) {
      const leagues = summoner.leagues;
      // Only show the solo q info.
      // Sort the objects by their id.
      let rankedInfo = {};
      leagues.forEach((league) => {
        if (league.queue === 'RANKED_SOLO_5x5') {
          Object.assign(rankedInfo, league);
        }
      });

      return (
        <div className="summoner-ranked">
          <img src={getTierIconUrl(Object.keys(rankedInfo).length === 0 && rankedInfo.constructor === Object ? 'Unranked' : rankedInfo.tier)}/>
          <span className="ranked-wins">{summoner.wins}</span>
          <span className="ranked-losses">{summoner.losses}</span>
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
      <Radar
        data={data}
        width={150}
        height={100}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: false
          }
        }}
      />
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
                  <Avatar src={m.championUrl} alt=""/>
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
              <div className="post-game">
                <Link to={`/m/${m.match_id}/${m.region}`}>
                  <button>
                  </button>
                </Link>
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