import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrl,
  getProfileIconUrl,
  getItemIconUrl,
  getPerkIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';
import { hasDataLoaded } from '../../shared/helpers/loaderHelper.js';

import ChampionMappings from '../../shared/championMappings';

import './styles/championstats.css';
import './styles/recentmatches.css';
import './styles/championprofile.css';
import './styles/championmatchups.css';
import './styles/summoners.css';
import './styles/perks.css';
import './styles/items.css';
import './styles/bargraphs.css';

import ChampionStatsBarGraphs from './bargraph';
import ChampionStatsRadarGraph from './radargraph';
import RecentMatches from './recentmatches';
import Summoners from './summoners';
import Perks from './perks';
import Items from './items';
import ChampionMatchups from './championmatchups';
import ChampionProfile from './championprofile';

import LoadingScreen from '../common/loadingscreen';

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

    if (!hasDataLoaded([summoner, userChampionStats, staticData])){
      return(<LoadingScreen/>);
    }

    let championStats = userChampionStats;
    
    const championId = championStats.championId;
    const version = staticData.version;

    let roleFrequencies = {
      "TOP_LANE": 0,
      "JUNGLE": 0,
      "MID_LANE": 0,
      "BOT_LANE": 0,
    };
    let defaultRole;
    let totalGames = 0;

    let max = 0;
    Object.entries(championStats.championStats).map((stat) => {
      roleFrequencies[stat[0]] = stat[1].total_games;
      totalGames += stat[1].total_games;
      if (roleFrequencies[stat[0]] > max){
        max = roleFrequencies[stat[0]];
        defaultRole = stat[0];
      }
    });

    let role;
    if (this.state.role === ''){
      role = defaultRole;
    }
    else {
      role = this.state.role;
    }

    const championStatsByLane = championStats.championStats[role];

    return (
      <div className='ChampionStats'>
        <div className='content'>
          <div className="summonerHeader">
          </div>
          <div className="champion-stats-container">
            <div className="left-container">
              <ChampionProfile
                role={role}
                championStats={championStats}
                championId={championId}
                onRoleSelection={this.onRoleSelection}
                championData={staticData.champions}
                totalGames={totalGames}
                version={version}/>
              <Summoners summoners={getSummonerSetByLane(championStats, role)} version={version}/>
              <Perks perks={getRuneSetByLane(championStats, role)} perkData={staticData.runes} version={version}/>
              <Items items={championStats.championItems[role]} staticData={staticData.items} version={version}/>
              <RecentMatches championId={championId} championStats={championStats} version={version}/>
            </div>
            <div className="right-container">
              <ChampionStatsRadarGraph championStats={championStatsByLane}/>
              <ChampionStatsBarGraphs championStats={championStatsByLane}/>
              <ChampionMatchups championMatchups={championStats.championMatchups} version={version}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapRoleToLane = (role) => {
  let lane = role.toLowerCase();

  if (lane !== 'jungle') {
    lane = lane.split('_')[0];
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

const getSummonerSetByLane = (championStats, lane) => {
  // Loop through the championRunes and return rune set matches the lane.
  for (let i = 0; i < championStats.championSummoners.length; i++) {
    if (championStats.championSummoners[i].lane === lane) {
      return JSON.parse(championStats.championSummoners[i].summoner_set);
    }
  }

  return [];
}

export default ChampionStats;
