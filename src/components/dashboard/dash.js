import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import Header from '../common/header';
import Footer from '../common/footer';

// Import the calendarheatmap
import CalendarHeatmap from 'react-calendar-heatmap';

import Avatar from 'material-ui/Avatar';

import './dash.css';

import { getMasteryIconUrl, getTierIconUrl, getChampionIconUrl, getProfileIconUrl} from '../../shared/helpers/staticImageHelper.js';
import { numberFormatter } from '../../shared/helpers/numberHelper.js';

import EnhancedTable from './table';
import Matches from './matches';
import MatchStatsRadar from './radar';

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
    const {summoner, matches, currentMatch, staticData} = this.props;
    const isSummonerInMatch = Object.keys(currentMatch).length > 0;
    return (
      <div className='Dashboard'>
        <Header/>
        <Link to={`/l/${summoner.region}/${summoner.name}`}>
          <button disabled={!isSummonerInMatch}>
            Go to pregame
          </button>
        </Link>
        {this.renderHeader(summoner, staticData.version)}
        <div className="match-lawn">
          {this.renderMatchHeatMap(summoner.lawn)}
        </div>
        <div>
          <MatchStatsRadar
            matches={matches}/>
        </div>
        <div className='game-item-list'>
          <Matches matches={matches}
            version={staticData.version}/>
        </div>
        <EnhancedTable championStats={summoner.championStats}
          summonerName={summoner.name}
          summonerRegion={summoner.region}
          version={staticData.version}/>
        <Footer/>
      </div>
    );
  }

  renderHeader(summonerInfo, version) {
    const profileIconUrl = getProfileIconUrl(summonerInfo.icon, version);
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
            {this.renderTopUserChampionMasteries(summonerInfo.championMasteries, version)}
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

  renderTopUserChampionMasteries(championMasteries, version) {
    if (championMasteries !== undefined) {
      // Sort the champion by points.
      championMasteries.sort((mastery1, mastery2) => {
        return mastery1.total_points - mastery2.total_points;
      });

      const champions = championMasteries.map((c) => {
        const masteryIcon = getMasteryIconUrl(c.level);
        return (
          <div className="champion-mastery-wrapper" key={c.champ_id}>
            <Avatar src={getChampionIconUrl(c.champ_id, version)} alt=""/>
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
}

export default Dashboard;