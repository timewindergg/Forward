import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Avatar from 'material-ui/Avatar';

import './OverviewCard.css';

import {
  getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrl,
  getSpellIconUrl,
  getPerkIconUrl,
  getPerkStyleIconUrl
} from '../../../shared/helpers/staticImageHelper.js';

const IMG_VER = '7.24.2';

class OverviewCard extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    summoner: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired,
    isRed: PropTypes.bool.isRequired,
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
      <img className='overview-spell' src={getSpellIconUrl(summoner.summoner_spell0, IMG_VER)} />
    ) : <img className='overview-spell' src='' />;

    const spell1 = isSummonerLoaded ? (
      <img className='overview-spell' src={getSpellIconUrl(summoner.summoner_spell1, IMG_VER)} />
    ) : <img className='overview-spell' src='' />;

    return (
      <div>
        <span className='overview-heading'>Summoner Spells</span>
        <div className={classNames('overview-row', 'overview-icon-list')}>
          {spell0}
          {spell1}
        </div>
      </div>
    );
  }

  renderRunes = (isSummonerLoaded) => {
    const {summoner} = this.props;

    // TODO: have a placeholder gif
    const runes = isSummonerLoaded ? summoner.runes.map((rune) => {
      return (
        <img className='overview-rune' src={getPerkIconUrl(rune, IMG_VER)} key={rune} />
      );
    }) : <img className='overview-rune' src='' />;

    return (
      <div>
        <span className='overview-heading'>Runes</span>
        <div className={classNames('overview-row', 'overview-icon-list')}>
          {runes}
        </div>
      </div>
    );
  }

  render() {
    const {summoner, details, isRed, isSelected} = this.props;
    
    const isSummonerLoaded = Object.keys(summoner).length > 0;
    const isDetailsLoaded = Object.keys(details).length > 0;

    const imageUrl = getChampionIconUrl(summoner.champion_id, IMG_VER);

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
    return (
      <div className={cardClass} onClick={this.selectSummoner}>
        <div className='overview-row'>
          <Avatar src={imageUrl} className='champion-img' />
          <div className='overview-col'>
            <span>{summoner.name}</span>
          </div>
        </div>

        {winsLoss}
        {kda}
        {summonerSpells}
        {runes}
      </div>
    );
  }
}

export default OverviewCard;
