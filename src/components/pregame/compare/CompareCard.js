import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Avatar from 'material-ui/Avatar';

import './CompareCard.css';

import {
  getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrl,
  getSpellIconUrl,
  getPerkIconUrl,
  getPerkStyleIconUrl,
  getItemIconUrl
} from '../../../shared/helpers/staticImageHelper.js';

const IMG_VER = '7.24.2';

class CompareCard extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    isRed: PropTypes.bool.isRequired,
    compareData: PropTypes.object.isRequired
  }

  renderSummonerSpells = () => {
    const {compareData} = this.props;
    const spell0 = (
      <img className='compare-spell' src={getSpellIconUrl(compareData.summoner_spell0, IMG_VER)} />
    );

    const spell1 = (
      <img className='compare-spell' src={getSpellIconUrl(compareData.summoner_spell1, IMG_VER)} />
    );

    return (
      <div>
        <span className='compare-heading'>Summoner Spells</span>
        <div className={classNames('compare-row', 'compare-icon-list')}>
          {spell0}
          {spell1}
        </div>
      </div>
    );
  }

  renderRunes = () => {
    const {compareData} = this.props;

    // TODO: have a placeholder gif
    const runes = compareData.runes.map((rune) => {
      return (
        <img className='compare-rune' src={getPerkIconUrl(rune, IMG_VER)} key={rune} />
      );
    });

    return (
      <div>
        <span className='compare-heading'>Runes</span>
        <div className={classNames('compare-row', 'compare-icon-list')}>
          {runes}
        </div>
      </div>
    );
  }

  renderItems = (itemType) => {
    const {compareData} = this.props;
    const isDetailsLoaded = !!compareData.build;

    const items = isDetailsLoaded ? compareData.build[itemType].map((item) => {
      return (
        <img className='compare-item' src={getItemIconUrl(item, IMG_VER)} key={item} />
      );
    }) : <img className='overview-spell' src='' />;

    return (
      <div>
        <span className='compare-heading'>{`${itemType} items:`}</span>
        <div className={classNames('compare-row', 'compare-icon-list')}>
          {items}
        </div>
      </div>
    );
  }

  renderEmptyCard = (cardClass) => {
    const {isRed, compareData} = this.props;

    return (
      <div className={cardClass}>
        TODO
      </div>
    );
  }

  render() {
    const {isRed, compareData} = this.props;

    const colorClass = isRed ? 'compare-card-red' : 'compare-card-blue';
    const cardClass = classNames(
      'rc-compare-card',
      colorClass
    );    

    if (Object.keys(compareData).length === 0) {
      return this.renderEmptyCard(cardClass);
    }

    const imageUrl = getChampionIconUrl(compareData.champion_id, IMG_VER);

    const isDetailsLoaded = !!compareData.stats;

    const winsLoss = (
      <div className='overview-row'>
        <span className='overview-heading'>Wins/Losses:</span>
        {isDetailsLoaded && <span className='overview-greentext'>{`${compareData.stats.wins}/`}</span>}
        {isDetailsLoaded && <span className='overview-redtext'>{compareData.stats.losses}</span>}
      </div>
    );

    const kda = (
      <div className='overview-row'>
        <span className='overview-heading'>K/D/A:</span>
        {isDetailsLoaded && <span className='overview-greentext'>{`${compareData.stats.kills}/`}</span>}
        {isDetailsLoaded && <span className='overview-redtext'>{`${compareData.stats.deaths}/`}</span>}
        {isDetailsLoaded && <span className='overview-greentext'>{`${compareData.stats.assists}`}</span>}
      </div>
    );

    const summonerSpells = this.renderSummonerSpells();
    const runes = this.renderRunes();

    const bootItems = this.renderItems('boots');
    const coreItems = this.renderItems('core');
    const situationalItems = this.renderItems('situational');

    return (
      <div className={cardClass}>
        <div className='compare-row'>
          <Avatar src={imageUrl} className='champion-img' />
          <div className='compare-col'>
            <span>{compareData.name}</span>
          </div>
        </div>

        {winsLoss}
        {kda}
        {summonerSpells}
        {runes}
        {bootItems}
        {coreItems}
        {situationalItems}
      </div>
    );
  }
}

export default CompareCard;
