import React, { Component } from 'react';

import { numberFormatter} from '../../shared/helpers/numberHelper.js';

import { getMasteryIconUrl, getTierIconUrl, getChampionIconUrl, getProfileIconUrl} from '../../shared/helpers/staticImageHelper.js';

class DashboardHeader extends Component {
  render() {
    if (this.props.summonerInfo === undefined || !Object.keys(this.props.summonerInfo).length > 0 ||
        this.props.version === undefined) {
      return (<div/>);
    }

    const { summonerInfo, version } = this.props;

    const profileIconUrl = getProfileIconUrl(summonerInfo.icon, version);
    return (
        <div className="dashboard-header">
          <div className="dashboard-header-profile-icon">
            <img src={profileIconUrl}/>
          </div>
          <div className="dashboard-header-summoner-profile">
            <span className="dashboard-header-summoner-name">{summonerInfo.name}</span>
            <span className="dashboard-header-summoner-level">{`Lv ${summonerInfo.level}`}</span>
          </div>
          {this.renderRankedTiers(summonerInfo)}
          <div className="dashboard-header-top-champion-masteries">
            {this.renderTopUserChampionMasteries(summonerInfo.championMasteries, version)}
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
        <div className="dashboard-header-ranked-info">
          <div className="dashboard-header-ranked-tier">
            <img src={getTierIconUrl(tier)}/>
          </div>
          <div className="dashboard-header-ranked-stats">
            <span> {tier} </span>
            <span>{`${summoner.wins}W ${summoner.losses}L`}</span>
            <span>{winRate}</span>
          </div>

        </div>
      );
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
          <div className="dashboard-header-champion-mastery-wrapper" key={c.champ_id}>
            <img className="championIcon icon" src={getChampionIconUrl(c.champ_id, version)} alt=""/>
            <div className="dashboard-header-mastery-icon">
              <img src={masteryIcon} alt=""/>
            </div>
            <div className="dashboard-header-mastery-wrapper">
              <span>{numberFormatter(c.total_points)}</span>
            </div>
          </div>
        );
      });

      return champions;
    }
  }
}

export default DashboardHeader;
