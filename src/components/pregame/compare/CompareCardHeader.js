import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Avatar from 'material-ui/Avatar';

import './styles/CompareCardHeader.css';

import {
  getTierIconUrl, // TODO: use later
  getChampionIconUrl,
} from '../../../shared/helpers/staticImageHelper.js';

import championMappings from '../../../shared/championMappings.js';
import {roundWithPrecision} from '../../../shared/helpers/numberHelper.js';
import {IMG_VER} from '../../../constants/Settings';

class CompareCard extends Component {
  static propTypes = {
    isRed: PropTypes.bool.isRequired,
    compareData: PropTypes.object.isRequired,
    otherChamp: PropTypes.number.isRequired,

    winsSelf: PropTypes.number.isRequired,
    totalGames: PropTypes.number.isRequired,

    teamWinRate: PropTypes.number.isRequired,
    
    rankedDetails: PropTypes.object.isRequired,

    compareMetadata: PropTypes.object.isRequired
  }

  static defaultProps = {
    otherChamp: -1,
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

  renderChampionWinRate = (winsSelf, totalGames, otherChamp) => {
    const otherChampName = otherChamp === -1 ? '' : championMappings[otherChamp].name;

    let winRate = '--';
    if (totalGames > 0) {
      winRate = roundWithPrecision(100*winsSelf/totalGames, 2);
    }

    return (
      <div className={classNames({
        'cch-wr-wrapper': true,
        'cch-wr-wrapper-blue': !this.props.isRed
      })}>
        <div className='cch-wr'>
          <span className='cch-wr-head'>Win Rate</span>
          <span className='cch-wr-subhead'>{`(vs. ${otherChampName})`}</span>
          <span className='cch-wr-rate'>{`${winRate}%`}</span>
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
          <span className='cch-wr-rate'>{`${teamWinRate}%`}</span>
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
    const {isRed, compareData,rankedDetails, teamWinRate} = this.props;

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

    const imageUrl = getChampionIconUrl(compareData.champion_id, IMG_VER);

    const championName = !!championMappings[compareData.champion_id] ?
      championMappings[compareData.champion_id].name : '';

    const tierText = `${rankedDetails.tier} ${rankedDetails.division}`;

    const nameClass = classNames('h-primary-text' ,'h-text');

    // TODO: use this later?
    // const championWinRate = this.renderChampionWinRate(winsSelf, totalGames, otherChamp);
    const teamWinRateSection = this.renderTeamWinRate(teamWinRate);

    return (
      <div className={cardClass}>
        <Avatar src={imageUrl} className='champion-img' />
        <div className={classNames('c-header-col', {'c-header-col-blue': !isRed})}>
          <span className={nameClass}>{compareData.name}</span>
          <span className='h-text'>{championName}</span>
          <span className='h-text'>{tierText}</span>
          <span className='h-text'>{`${rankedDetails.points} LP`}</span>
        </div>
        {teamWinRateSection}
      </div>
    );
  }
}

export default CompareCard;
