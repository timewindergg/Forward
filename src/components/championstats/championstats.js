import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { HorizontalBar, Radar } from 'react-chartjs-2';

import './championstats.css';

import { getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrl,
  getProfileIconUrl,
  getItemIconUrl,
  getPerkIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';

import ChampionMappings from '../../shared/championMappings';

import { ChampionStatsBarGraph, ChampionStatsRadarGraph } from './graph';
import RecentMatches from './recentmatches';

class ChampionStats extends Component {

  state = {
    role: ''
  }

  static propTypes = {
    summoner: PropTypes.object.isRequired,
    userChampionStats: PropTypes.object.isRequired
  }

  render() {
    const {summoner, userChampionStats} = this.props;
    const profileIconUrl = getProfileIconUrl(summoner.icon, '7.24.2');
    return (
      <div className='ChampionStats'>
        <div className="header">
          {this.renderProfile(summoner)}
          {this.renderRankedTiers(summoner)}
          {this.renderUserChampionStats(userChampionStats)}
        </div>
      </div>
    );
  }

  renderProfile(summoner) {
    const profileIconUrl = getProfileIconUrl(summoner.icon, '7.24.2');
    return (
      <div className="summoner-profile">
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
        <div className="summoner-ranked">
          <img src={getTierIconUrl(Object.keys(rankedInfo).length === 0 && rankedInfo.constructor === Object ? 'Unranked' : rankedInfo.tier)}/>
        </div>
      );
    }
  }

  renderUserChampionStats(championStats) {
    if (championStats !== undefined && Object.keys(championStats).length !== 0) {
      const championId = championStats.championStats[0].champ_id;
      return (
        <div className="champion-stats-container">
          <div className="left-container">
            <div className="champion-profile">
              <Avatar src={getChampionIconUrl(championId, '7.24.2')}/>
              <div className="champion-name">
                <span>{ChampionMappings[championId].name}</span>
              </div>
            </div>
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
            <div className="champion-summoners">
              {this.renderChampionSpells(championStats)}
            </div>
              {this.renderChampionItems(championStats)}
            <div className="champion-perks">
              {this.renderChampionRunes(championStats)}
            </div>
            <RecentMatches
              championStats={championStats}/>
          </div>
          <div className="right-container">
            <div className="champion-against-list">
              {this.renderAgainstChampionList(championStats)}
            </div>
          </div>
        </div>
      );
    }
  }

  renderChampionSpells(championStats) {
    const { role } = this.state;
    const lane = mapRoleToLane(role);

    return (
      <div>
        {championStats.championSummoners.map((l) => {
          if (l.lane === lane) {
            return JSON.parse(l.summoner_set).map((s) => {
              return (
                <div>
                  <img src={getSpellIconUrl(s, "7.24.2")}/>
                </div>
              )
            })
          }
        })}
      </div>
    )
  }

  renderChampionItems(championStats) {
    const { role } = this.state;

    if (championStats.championItems[role] !== undefined) {
      return (
        <div className="champion-items">
          <div>
          <span>Boots:</span>
          {championStats.championItems[role].boots.map((b) => {
            return (
              <div className="champion-item">
                <img src={getItemIconUrl(b, '7.24.2')}/>
              </div>
            )
          })}
          </div>
          <div>
            <span>Items:</span>
            {
              championStats.championItems[role].items.map((i) => {
                return (
                  <div className="champion-item">
                    <img src={getItemIconUrl(i, '7.24.2')}/>
                  </div>
                )
              })
            }
          </div>
        </div>
      );
    }
  }

  renderChampionRunes(championStats) {
    const { role } = this.state;
    const lane = mapRoleToLane(role);

    return (
      <div>
        {
          championStats.championRunes.map((l) => {
            if (l.lane === lane) {
              return JSON.parse(l.rune_set).map((r) => {
                return (
                  <div>
                    <img src={getPerkIconUrl(r, '7.24.2')}/>
                  </div>
                )
              });
            }
          })
        }
      </div>
    );
  }

  renderAgainstChampionList(championStats) {
    return championStats.championMatchups.map((c) => {
      return (
        <div className="champion-against-item" key={c.enemy_champ_id}>
          <Avatar src={getChampionIconUrl(c.enemy_champ_id, '7.24.2')}/>
          <div className="champion-against-item-win-percentage">
            <span>{(c.wins/c.total_games)*100 + '%'}</span>
          </div>
        </div>
      )
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

export default ChampionStats;
