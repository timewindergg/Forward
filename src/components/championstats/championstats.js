import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getMasteryIconUrl,
  getTierIconUrl,
  getProfileIconUrl,
  getItemIconUrl,
  getPerkIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';
import { hasDataLoaded } from '../../shared/helpers/loaderHelper.js';
import { roundWithPrecision } from '../../shared/helpers/numberHelper.js';

import './styles/championstats.css';
import './styles/recentmatches.css';
import './styles/championprofile.css';
import './styles/championmatchups.css';
import './styles/summoners.css';
import './styles/perks.css';
import './styles/items.css';
import './styles/bargraphs.css';
import './styles/championroles.css'
import '../common/styles/summonerheader.css';
import '../common/styles/championfilter.css';

import ChampionStatsBarGraphs from './bargraph';
import ChampionStatsRadarGraph from './radargraph';
import RecentMatches from './recentmatches';
import Summoners from './summoners';
import Perks from './perks';
import Items from './items';
import ChampionMatchups from './championmatchups';
import ChampionProfile from './championprofile';
import ChampionRoles from './championroles';
import SummonerHeader from '../common/summonerheader';

import LoadingScreen from '../common/loadingscreen';
import ChampionFilter from '../common/championfilter';

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

  _handleKeyPress = (value) => {
    const lastIndex = window.location.href.lastIndexOf('/');
    window.location.href = window.location.href.substring(0, lastIndex+1) + value;
  }

  render() {
    const {summoner, userChampionStats, staticData} = this.props;

    if (!hasDataLoaded([summoner, userChampionStats, staticData])){
      return(<LoadingScreen/>);
    }

    let championStats = userChampionStats;

    const rawChampions = summoner.championStats.map((champion) => {
      return {
        'name': staticData.champions[champion.champ_id].name,
        'img': staticData.champions[champion.champ_id].img
      }
    });

    // remove duplicates
    const championHash = {};
    rawChampions.forEach((champion) => {
      championHash[champion.name] = champion;
    });

    const champions = Object.keys(championHash).map((champion) => {
      return championHash[champion];
    });

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
        <div className='cs-header-container'>
          <SummonerHeader summonerInfo={summoner}
              staticData={staticData}/>
        </div>
        <div className='content'>
          <div className="champion-stats-container">
            <div className="left-container">
              <div className="a-container">
                <div className="left-left-container">
                  <ChampionProfile
                    championId={championId}
                    championStats={championStats}
                    championData={staticData.champions}
                    totalGames={totalGames}
                    version={version}/>
                  <div className="champion-filter-container">
                    <ChampionFilter champions={champions} version={version} onKeyPress={this._handleKeyPress}/>
                  </div>
                </div>
                <div className='left-right-container'>
                  <div className="role-container">
                    <h3>Select role:</h3>
                    <ChampionRoles championStats={championStats}
                                    onRoleSelection={this.onRoleSelection} 
                                    role={role}
                                    championStats={championStats}/>
                  </div>
                </div>
              </div>
              
              <Summoners summoners={getSummonerSetByLane(championStats, role)} version={version}/>
              <Items items={championStats.championItems[role]} staticData={staticData.items} version={version}/>
              <Perks perks={getRuneSetByLane(championStats, role)} perkData={staticData.runes} version={version}/>
              {/*<ChampionMatchups championMatchups={championStats.championMatchups} version={version} staticData={staticData}/>*/}
            </div>
            <div className="right-container">
              <div className='radarContainer'>
                <ChampionStatsRadarGraph championStats={championStatsByLane}/>
                <div className='radarStats'>
                  <div className="statValues">
                    <span className="cs">{`${roundWithPrecision(championStatsByLane.total_cs / championStatsByLane.total_games, 0)}`}</span>
                    <span className="gold">{`${roundWithPrecision(championStatsByLane.gold / championStatsByLane.total_games, 0)}`}</span>
                    <span className="k">{`${roundWithPrecision(championStatsByLane.kills / championStatsByLane.total_games, 1)}`}</span>
                    <span className="d">{`${roundWithPrecision(championStatsByLane.deaths / championStatsByLane.total_games, 1)}`}</span>
                    <span className="a">{`${roundWithPrecision(championStatsByLane.assists / championStatsByLane.total_games, 1)}`}</span>
                  </div>
                  <div className="statLabels">
                    <span className="cs">{` CS`}</span>
                    <span className="gold">{` Gold`}</span>
                    <span className="k">{` Kills`}</span>
                    <span className="d">{` Deaths`}</span>
                    <span className="a">{` Assists`}</span>
                  </div>
                </div>
              </div>
              <ChampionStatsBarGraphs championStats={championStatsByLane}/>
              <RecentMatches championId={championId} championStats={championStats} version={version} staticData={staticData}/>
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
  return championStats.championSummoners.filter((summoner) => {
    return summoner.lane === lane;
  });
}

export default ChampionStats;
