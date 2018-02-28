import React, { Component } from 'react';

import { numberFormatter} from '../../shared/helpers/numberHelper.js';

import { getMasteryIconUrl, getTierIconUrl, getChampionIconUrlByImage, getProfileIconUrl} from '../../shared/helpers/staticImageHelper.js';

class DashboardHeader extends Component {
  render() {
    if (this.props.summonerInfo === undefined || !Object.keys(this.props.summonerInfo).length > 0 ||
        this.props.version === undefined) {
      return (<div/>);
    }

    const { summonerInfo, version, staticData } = this.props;

    const profileIconUrl = getProfileIconUrl(summonerInfo.icon, version);
    return (
        <div className="dashboard-header">
          <div className="profile-icon">
            <img src={profileIconUrl}/>
          </div>
          <div className="summoner-profile">
            <span className="summoner-name">{summonerInfo.name}</span>
            <span className="summoner-level">{`Lv ${summonerInfo.level}`}</span>
          </div>
          {this.renderRankedTiers(summonerInfo)}
          <div className="top-champion-masteries">
            {this.renderTopUserChampionMasteries(summonerInfo.championMasteries, version, staticData.champions)}
          </div>
        </div>
    );
  }

  renderRankedTiers(summoner) {
    if (summoner !== undefined && summoner.leagues !== undefined) {
      const leagues = summoner.leagues;
      // Only show the solo q info.
      let rankedInfo = {};
      leagues.forEach((league) => {
        if (league.queue === 'RANKED_SOLO_5x5') {
          Object.assign(rankedInfo, league);
        }
      });

      let tier = Object.keys(rankedInfo).length === 0 && rankedInfo.constructor === Object ? 'Unranked' : rankedInfo.tier;
      tier = tier.toLowerCase();
      tier = tier.charAt(0).toUpperCase() + tier.slice(1);

      let winRate = '--';

      if (summoner.losses === 0 && summoner.wins !== 0) {
        winRate = '100%';
      } else {
        winRate = Math.round((summoner.wins/(summoner.wins + summoner.losses)*100)) + '%';
      }


      return (
        <div className="ranked-info">
          <div className="ranked-tier">
            <img src={getTierIconUrl(tier)}/>
          </div>
          <div className="ranked-stats">
            <span> {tier} </span>
            <span>{`${summoner.wins}W ${summoner.losses}L`}</span>
            <span>{winRate}</span>
          </div>

        </div>
      );
    }
  }

  renderTopUserChampionMasteries(championMasteries, version, championData) {
    if (championMasteries !== undefined) {
      // Sort the champion by points.
      championMasteries.sort((mastery1, mastery2) => {
        return mastery1.total_points - mastery2.total_points;
      });

      const champions = championMasteries.map((c) => {
        const masteryIcon = getMasteryIconUrl(c.level);
        return (
          <div className="champion-mastery-wrapper" key={c.champ_id}>
            <div className="mastery-wrapper">
              <span>{numberFormatter(c.total_points)}</span>
            </div>
            <img className="champion-mastery-icon" src={getChampionIconUrlByImage(championData[c.champ_id].img.split('.')[0], version)} alt=""/>
            <div className="mastery-icon">
              <img src={masteryIcon} alt=""/>
            </div>
            <div className="champion-name">
              <span>{championData[c.champ_id].name}</span>
            </div>
          </div>
        );
      });

      return champions;
    }
  }
}

export default DashboardHeader;
