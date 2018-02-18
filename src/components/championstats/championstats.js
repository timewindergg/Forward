import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';

import Header from '../common/header';
import Footer from '../common/footer';

import './championstats.css';

import { getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrl,
  getProfileIconUrl,
  getItemIconUrl,
  getPerkIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';

import ChampionMappings from '../../shared/championMappings';

import ChampionStatsBarGraph from './bargraph';
import ChampionStatsRadarGraph from './radargraph';
import RecentMatches from './recentmatches';
import Perks from './perks';
import Items from './items';
import ChampionMatchups from './championmatchups';

class ChampionStats extends Component {

  state = {
    role: ''
  }

  static propTypes = {
    summoner: PropTypes.object.isRequired,
    userChampionStats: PropTypes.object.isRequired
  }

  render() {
    const {summoner, userChampionStats, staticData} = this.props;
    const profileIconUrl = getProfileIconUrl(summoner.icon, staticData.version);
    return (
      <div className='ChampionStats'>
        <Header />
        <div className="champion-stats-header">
          {this.renderProfile(summoner, staticData.version)}
          {this.renderRankedTiers(summoner)}
        </div>
        {this.renderUserChampionStats(userChampionStats, staticData)}

        <Footer/>
      </div>
    );
  }

  renderProfile(summoner, version) {
    const profileIconUrl = getProfileIconUrl(summoner.icon, version);
    return (
      <div className="champion-stats-summoner-profile">
        <div className="summoner-icon">
          <img src={profileIconUrl} alt=""/>
        </div>
        <div className="summoner-name">
          <span>{summoner.name}</span>
        </div>
        <div className="summoner-level">
          <span>{summoner.level}</span>
        </div>
      </div>
    );
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
        <div className="champion-stats-summoner-ranked">
          <img src={getTierIconUrl(Object.keys(rankedInfo).length === 0 && rankedInfo.constructor === Object ? 'Unranked' : rankedInfo.tier)}/>
        </div>
      );
    }
  }

  renderUserChampionStats(championStats, staticData) {
    if (championStats !== undefined && Object.keys(championStats).length !== 0) {
      const championId = championStats.championStats[0].champ_id;
      const version = staticData.version;
      const { role } = this.state;
      const lane = mapRoleToLane(role);
      const runes = getRuneSetByLane(championStats, lane);
      let items = {
            "items": [],
            "boots": []
      };

      if (championStats.championItems[role] !== undefined) {
        items = championStats.championItems[role];

        // prune the items for duplicates.
        items.items = Array.from(new Set(items.items));
      }

      const championStatsByLane = getChampionStatsByLane(championStats, lane);

      return (
        <div className="champion-stats-container">
          <div className="champion-stats-left-container">
            <div className="champion-stats-left-container-top">
              <div className="champion-stats-champion-profile">
                <div className="champion-stats-champion-icon">
                  <img src={getChampionIconUrl(championId, version)}/>
                </div>
                <div className="champion-stats-champion-name">
                  <span>{ChampionMappings[championId].name}</span>
                </div>
                <div className="champion-stats-champion-summoners">
                  {this.renderChampionSpells(championStats, version)}
                </div>
              </div>
              <div className="champion-stats-role-container">
                <div className="champion-roles">
                    <div className="role-button">
                      <button id="top-role-button" value="top" onClick={event => this.setState({role: event.target.value})}>
                      </button>
                    </div>
                    <div className="role-button">
                      <button id="jungle-role-button" value="jungle" onClick={event => this.setState({role: event.target.value})}>
                      </button>
                    </div>
                    <div className="role-button">
                      <button id="mid-role-button" value="mid" onClick={event => this.setState({role: event.target.value})}>
                      </button>
                    </div>
                    <div className="role-button">
                      <button id="bot-role-button" value="bot" onClick={event => this.setState({role: event.target.value})}>
                      </button>
                    </div>
                </div>
              </div>
            </div>
            <Perks perks={runes} perkData={staticData.runes} version={version}/>
            <Items items={items} staticData={staticData.items} version={version}/>
            <RecentMatches
              championStats={championStats} version={version}/>
          </div>
          <div className="champion-stats-right-container">
            <ChampionStatsRadarGraph
              championStats={championStatsByLane}/>
            <ChampionStatsBarGraph
              championStats={championStatsByLane}/>
            <ChampionMatchups
              championMatchups={championStats.championMatchups}/>
          </div>
        </div>
      );
    }
  }

  renderChampionSpells(championStats, version) {
    const { role } = this.state;
    const lane = mapRoleToLane(role);

    return championStats.championSummoners.map((l) => {
        if (l.lane === lane) {
          return JSON.parse(l.summoner_set).map((s) => {
            return (
              <div className="champion-stats-champion-summoners-spell">
                <img src={getSpellIconUrl(s, version)}/>
              </div>
            )
          })
        }
    });
  }
}

const mapRoleToLane = (role) => {
  let lane = role.toUpperCase();

  if (lane !== 'JUNGLE') {
    lane = lane + '_LANE';
  }

  return lane;
};

const getRuneSetByLane = (championStats, lane) => {
  // Loop through the championRunes and return rune set matches the lane.
  for (let i = 0; i < championStats.championRunes.length; i++) {
    if (championStats.championRunes[i].lane === lane) {
      return JSON.parse(championStats.championRunes[i].rune_set);
    }
  }

  return [];
}

const getChampionStatsByLane = (championStats, lane) => {
  for (let i = 0; i < championStats.championStats.length; i++) {
    if (championStats.championStats[i].lane === lane) {
      return championStats.championStats[i];
    }
  }

  return {};
}

export default ChampionStats;
