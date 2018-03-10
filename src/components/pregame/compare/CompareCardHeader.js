import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './styles/CompareCardHeader.css';

import {
  getTierIconUrl,
  getChampionIconUrlByImage,
} from '../../../shared/helpers/staticImageHelper.js';

import {roundWithPrecision, isNumeric} from '../../../shared/helpers/numberHelper.js';
import {IMG_VER} from '../../../constants/Settings';

class CompareCard extends Component {
  static propTypes = {
    isRed: PropTypes.bool.isRequired,
    compareData: PropTypes.object.isRequired,
    otherChamp: PropTypes.number.isRequired,

    cWinRate: PropTypes.any.isRequired,
    winsSelf: PropTypes.number.isRequired,
    totalGames: PropTypes.number.isRequired,

    teamWinRate: PropTypes.number.isRequired,

    rankedDetails: PropTypes.object.isRequired,

    compareMetadata: PropTypes.object.isRequired,

    staticData: PropTypes.object.isRequired
  }

  static defaultProps = {
    otherChamp: -1,

    cWinRate: '--',
    winsSelf: 0,
    totalGames: 0,
    teamWinRate: 0,
    rankedDetails: {
      tier: '',
      division: '',
      points: 0
    },
    compareMetadata: {

    }
  }

  renderChampionWinRate = (winsSelf, totalGames, otherChamp, championData) => {
    const otherChampName = otherChamp === -1 ? '' : championData[otherChamp].name;


    let winRate = isNumeric(this.props.cWinRate) ? roundWithPrecision(100 * this.props.cWinRate, 1) : this.props.cWinRate;
    // if (totalGames > 0) {
    //   winRate = roundWithPrecision(100*winsSelf/totalGames, 1);
    // }

    return (
      <div className={classNames({
        'cch-wr-wrapper': true,
        'cch-wr-wrapper-blue': !this.props.isRed
      })}>
        <div className='cch-wr'>
          <span className='cch-wr-head'>Win Rate</span>
          <span className='cch-wr-subhead'>{`(vs. ${otherChampName})`}</span>
          <CircularProgressbar
            className={classNames({
              'cch-progress-bar': true,
              'cch-progress-bar-blue': !this.props.isRed && winRate !== '--',
              'cch-progress-bar-empty': winRate === '--'
            })}
            percentage={winRate}
          />
        </div>
      </div>
    );
  }

  renderTeamWinRate = (teamWinRate) => {
    return (
      <div className={classNames({
        'cch-wr-wrapper': true,
        'cch-wr-wrapper-blue': !this.props.isRed
      })}>
        <div className='cch-wr'>
          <span className='cch-wr-head'>Team Win Rate</span>
          <CircularProgressbar
            className={classNames({
              'cch-progress-bar': true,
              'cch-progress-bar-blue': !this.props.isRed
            })}
            percentage={teamWinRate}
          />
        </div>
      </div>
    );
  }

  renderEmptyCard = (cardClass) => {
    const {isRed} = this.props;

    const teamName = isRed ? 'red' : 'blue';
    return (
      <div className={cardClass}>
        {`click a unit portrait to select a champion from the ${teamName} team`}
      </div>
    );
  }

  render() {
    const {
      isRed,
      compareData,
      rankedDetails,
      teamWinRate,
      staticData,
      winsSelf,
      totalGames,
      otherChamp
    } = this.props;

    // const colorClass = isRed ? 'compare-card-red' : 'compare-card-blue';
    // const cardClass = classNames(
    //   'rc-compare-card',
    //   colorClass
    // );
    const cardClass = classNames('rc-compare-card-header', {
      'rc-compare-card-header-right': !isRed
    });

    if (Object.keys(compareData).length === 0) {
      return this.renderEmptyCard(cardClass);
    }

    const championData = staticData.champions;
    const version = staticData.version;

    const imageUrl = getChampionIconUrlByImage(championData[compareData.champion_id].img.split('.')[0], version);

    const championName = !!championData[compareData.champion_id] ?
      championData[compareData.champion_id].name : '';

    const tierText = `${rankedDetails.tier} ${rankedDetails.division}`;
    const tierIcon = getTierIconUrl(rankedDetails.tier);

    const nameClass = classNames('h-primary-text' ,'h-text');

    // TODO: use this later?
    const championWinRate = this.renderChampionWinRate(winsSelf, totalGames, otherChamp, championData);
    // const teamWinRateSection = this.renderTeamWinRate(teamWinRate);

    return (
      <div className={cardClass}>
        <div className='champion-img-container'>
          <img src={imageUrl} className='champion-img' />
        </div>
        <div className={classNames('c-header-col', {'c-header-col-blue': !isRed})}>
          <span className={nameClass}>{compareData.name}</span>
          <span className='h-text'>{championName}</span>
          <span className={classNames('h-text', 'cph-tier', {'cph-tier-blue': !isRed})}>
            <img src={tierIcon} className='tier-img' />
            {tierText}
          </span>
          <span className='h-text'>{`${rankedDetails.points} LP`}</span>
        </div>
        {championWinRate}
      </div>
    );
  }
}

export default CompareCard;
