import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { numberFormatter} from '../../shared/helpers/numberHelper.js';

import { getMasteryIconUrl, getTierIconUrl, getChampionIconUrlByImage, getProfileIconUrl} from '../../shared/helpers/staticImageHelper.js';

class SummonerHeader extends Component {
  render() {
    const { summonerInfo, staticData } = this.props;
    const version = staticData.version;

    const profileIconUrl = getProfileIconUrl(summonerInfo.icon, version);
    return (
        <div className="summoner-header">
          <div className="profile">
            <div className="profile-icon">
              <img src={profileIconUrl}/>
            </div>
            <div className="summoner-profile">
              <Link to={`/p/${summonerInfo.region.toLowerCase()}/${summonerInfo.name}`}>
                <span className="summoner-name">{summonerInfo.name}</span>
              </Link>
              <span className="summoner-level">{`Lv ${summonerInfo.level}`}</span>
              <div className="summoner-wr">
                <span className="summoner-wins">{summonerInfo.wins}W </span>
                <span className="summoner-losses">{summonerInfo.losses}L</span>
              </div>
              <Link to={`/l/${summonerInfo.region.toLowerCase()}/${summonerInfo.name}`}>
                <div className="live-btn">Live</div>
              </Link>
            </div>
          </div>
          {this.renderRankedTiers(summonerInfo)}
          {/*
          <div className="top-champion-masteries">
            {this.renderTopUserChampionMasteries(summonerInfo.championMasteries, version, staticData.champions)}
          </div>
          */}
        </div>
    );
  }

  renderRankedTiers(summoner) {
    let solo5v5 = <div className="ranked-info">
        <div className="ranked-tier">
          <img src={getTierIconUrl('Unranked')}/>
          <div>
            <span className='league-label'>Solo/Duo</span>
          </div>
        </div>
        <div className="ranked-stats">
          <span> Unranked </span>
        </div>
      </div>

    let flex5v5 = <div className="ranked-info">
        <div className="ranked-tier">
          <img src={getTierIconUrl('Unranked')}/>
          <div>
            <span className='league-label'>Flex 5v5</span>
          </div>
        </div>
        <div className="ranked-stats">
          <span> Unranked </span>
        </div>
      </div>

    let flex3v3 = <div className="ranked-info">
        <div className="ranked-tier">
          <img src={getTierIconUrl('Unranked')}/>
          <div>
            <span className='league-label'>Flex 3v3</span>
          </div>
        </div>
        <div className="ranked-stats">
          <span> Unranked </span>
        </div>
      </div>

    summoner.leagues.forEach((league) => {
      let tier = league.tier;
      tier = tier.toLowerCase();
      tier = tier.charAt(0).toUpperCase() + tier.slice(1);
      const points = league.points;
      const division = league.division;

      const rankedInfo = <div className="ranked-info">
          <div className="ranked-tier">
            <img src={getTierIconUrl(tier)}/>
            <div>
              <span className='league-label'>{convertQueue(league.queue)}</span>
            </div>
          </div>
          <div className="ranked-stats">
            <span className="tier"> {`${tier} ${division}`} </span>
            <span className="lp">{`${points} lp`}</span>
          </div>
        </div>

      switch (league.queue) {
        case 'RANKED_FLEX_SR':
          flex5v5 = rankedInfo;
          break;
        case 'RANKED_FLEX_TT':
          flex3v3 = rankedInfo;
          break;
        case 'RANKED_SOLO_5x5':
          solo5v5 = rankedInfo;
          break;
        default:
          break;
      }
    });

    return (
      <div className="summoner-ranks">
        {solo5v5}
        {flex5v5}
        {flex3v3}
      </div>
    );
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

const convertQueue = (queue) => {
  console.log(queue)
  if (queue === 'RANKED_SOLO_5x5') {
    return 'Solo/Duo';
  }

  if (queue === 'RANKED_FLEX_SR') {
    return 'Flex 5v5';
  }

  if (queue === 'RANKED_FLEX_TT') {
    return 'Flex 3v3';
  }
}

export default SummonerHeader;
