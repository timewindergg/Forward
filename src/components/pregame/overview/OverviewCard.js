import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import OverviewCardHeader from './OverviewCardHeader';

import './styles/OverviewCard.css';

import {
  getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrl,
  getSpellIconUrl,
  getPerkIconUrl,
  getPerkStyleIconUrl
} from '../../../shared/helpers/staticImageHelper.js';

import runeMappings from '../../../shared/runeMappings.js';
import {IMG_VER} from '../../../constants/Settings';

class OverviewCard extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    summoner: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired,
    isRed: PropTypes.bool.isRequired,
    queueName: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  selectSummoner = () => {
    this.props.onSelect(this.props.summoner.id, this.props.isRed);
  }

  renderSummonerSpells = (isSummonerLoaded) => {
    const {summoner} = this.props;

    // TODO: have a placeholder gif
    const spell0 = isSummonerLoaded ? (
      <img className='overview-spell' src={getSpellIconUrl(summoner.summoner_spell0, IMG_VER)} alt=''/>
    ) : <img className='overview-spell' src='' alt=''/>;

    const spell1 = isSummonerLoaded ? (
      <img className='overview-spell' src={getSpellIconUrl(summoner.summoner_spell1, IMG_VER)} alt=''/>
    ) : <img className='overview-spell' src='' alt=''/>;

    return (
      <div className={classNames('overview-icon-list')}>
        {spell0}
        {spell1}
      </div>
    );
  }

  renderRunes = (isSummonerLoaded) => {
    const {summoner} = this.props;


    const runes = isSummonerLoaded ? summoner.runes.map((rune) => {
      const isKeystone = runeMappings[rune].keyStone;
      const runeClass = classNames({'overview-rune': true, 'overview-keystone-rune': isKeystone});

      return (
        <img className={runeClass} src={getPerkIconUrl(rune, IMG_VER)} key={rune} alt=''/>
      );
    }) : <img className='overview-rune' src='' alt=''/>;

    return (
      <div className={classNames('overview-icon-list')}>
        {runes}
      </div>
    );
  }

  getRankedDetails = (isDetailsLoaded, details, queueName) => {
    if (!isDetailsLoaded || !details.leagues || !details.leagues[queueName]) {
      return {
        tier: '',
        division: '',
        points: 0
      };
    }

    const rankedDetails = details.leagues[queueName];
    return {
      tier: rankedDetails.tier,
      division: rankedDetails.division,
      points: rankedDetails.points
    };
  }

  render() {
    const {summoner, details, isRed, isSelected, queueName} = this.props;
    
    const isSummonerLoaded = Object.keys(summoner).length > 0;
    const isDetailsLoaded = Object.keys(details).length > 0;

    const winsLoss = (
      <div className='overview-row'>
        <span className='overview-heading'>Wins/Losses:</span>
        {isDetailsLoaded && <span className='overview-greentext'>{`${details.stats.wins}/`}</span>}
        {isDetailsLoaded && <span className='overview-redtext'>{details.stats.losses}</span>}
      </div>
    );

    const kda = (
      <div className='overview-row'>
        <span className='overview-heading'>K/D/A:</span>
        {isDetailsLoaded && <span className='overview-greentext'>{`${details.stats.kills}/`}</span>}
        {isDetailsLoaded && <span className='overview-redtext'>{`${details.stats.deaths}/`}</span>}
        {isDetailsLoaded && <span className='overview-greentext'>{`${details.stats.assists}`}</span>}
      </div>
    );

    const cs = (
      <div className='overview-row'>
        <span className='overview-heading'>CS 10/20/30/Total:</span>
        <br />
        {!isDetailsLoaded && <br />}
        {isDetailsLoaded && <span className='overview-text'>{`${details.stats.cs10}/`}</span>}
        {isDetailsLoaded && <span className='overview-text'>{details.stats.cs20}/</span>}
        {isDetailsLoaded && <span className='overview-text'>{details.stats.cs30}</span>}
        {isDetailsLoaded && <span className='overview-heading'>{`\t${details.stats.totalCs}`} </span>}
      </div>
    );

    const gold = (
      <div className='overview-row'>
        <span className='overview-heading'>Gold 10/20/30:</span>
        <br />
        {!isDetailsLoaded && <br />}
        {isDetailsLoaded && <span className='overview-text'>{`${details.stats.gold10}/`}</span>}
        {isDetailsLoaded && <span className='overview-text'>{`${details.stats.gold20}/`}</span>}
        {isDetailsLoaded && <span className='overview-text'>{`${details.stats.gold30}`}</span>}
      </div>
    );

    const summonerSpells = this.renderSummonerSpells(isSummonerLoaded);
    const runes = this.renderRunes(isSummonerLoaded);

    const colorClass = isRed ? 'overview-card-red' : 'overview-card-blue';
    
    const cardClass = classNames(
      'rc-overview-card',
      colorClass, {
        overviewsred: isRed && isSelected,
        overviewsblue: !isRed && isSelected
      }
    );    

    // TODO: think of a different product flow for selecting champions to compare head to head
    const {tier, division, points} = this.getRankedDetails(isDetailsLoaded, details, queueName);

    return (
      <div className={cardClass} onClick={this.selectSummoner}>
        <OverviewCardHeader
          name={summoner.name}
          championID={summoner.champion_id}

          tier={tier}
          division={division}
          LP={points}
          isRed={isRed}
          isSelected={isSelected}          
        />

        <div className='overview-body'>
          <div className='overview-icon-div'>
            {summonerSpells}
            {runes}
          </div>
          {winsLoss}
          {kda}
          {cs}
          {gold}
        </div>
      </div>
    );
  }
}

export default OverviewCard;
