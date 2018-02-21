import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrl,
  getProfileIconUrl,
  getItemIconUrl,
  getPerkIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';

import ChampionMappings from '../../shared/championMappings';

import './styles/championstats.css';
import './styles/recentmatches.css';
import './styles/championprofile.css';
import './styles/championmatchups.css';

import ChampionStatsBarGraph from './bargraph';
import ChampionStatsRadarGraph from './radargraph';
import RecentMatches from './recentmatches';
import Perks from './perks';
import Items from './items';
import ChampionMatchups from './championmatchups';
import ChampionProfile from './championprofile';

class ChampionStats extends Component {
  state = {
    role: ''
  }

  static propTypes = {
    summoner: PropTypes.object.isRequired,
    userChampionStats: PropTypes.object.isRequired
  }

  onRoleSelection = (role) => {
    this.setState({
      role: role
    });
  }

  render() {
    const {summoner, userChampionStats, staticData} = this.props;

    if (userChampionStats !== undefined && Object.keys(userChampionStats).length !== 0) {
      let championStats = userChampionStats;
      const profileIconUrl = getProfileIconUrl(summoner.icon, staticData.version);
      const championId = championStats.championId;
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
        <div className='ChampionStats'>
          <div className='content'>
            <div className="champion-stats-container">
              <div className="left-container">
                <ChampionProfile 
                  championStats={championStats} 
                  championId={championId} 
                  onRoleSelection={this.onRoleSelection} 
                  championData={staticData.champions}
                  version={version}/>
                <Perks perks={runes} perkData={staticData.runes} version={version}/>
                <Items items={items} staticData={staticData.items} version={version}/>
                <RecentMatches championId={championId} championStats={championStats} version={version}/>
              </div>
              <div className="right-container">
                <ChampionStatsRadarGraph championStats={championStatsByLane}/>
                <ChampionStatsBarGraph championStats={championStatsByLane}/>
                <ChampionMatchups championMatchups={championStats.championMatchups} version={version}/>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return(<div/>);
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

  renderChampionSpells(championStats, version) {
    const { role } = this.state;
    const lane = mapRoleToLane(role);

    return championStats.championSummoners.map((l) => {
        if (l.lane === lane) {
          return JSON.parse(l.summoner_set).map((s) => {
            return (
              <div className="champion-stats-champion-summoners-spell" key={s}>
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
