import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ClipLoader } from 'react-spinners';

import OverviewCardHeader from './OverviewCardHeader';
import Tooltip from '../../common/tooltip/Tooltip';
import TOOLTIP_TYPES from '../../../constants/TooltipTypes';

import './styles/OverviewCard.css';

import {
  getSpellIconUrl,
  getPerkIconUrl
} from '../../../shared/helpers/staticImageHelper.js';

import { roundWithPrecision } from '../../../shared/helpers/numberHelper.js';

import runeMappings from '../../../shared/runeMappings.js';




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
    onSelect: PropTypes.func.isRequired,
    staticData: PropTypes.object.isRequired
  }

  selectSummoner = () => {
    this.props.onSelect(this.props.summoner.id, this.props.isRed);
  }

  renderSummonerSpells = (isSummonerLoaded) => {
    const {summoner, staticData} = this.props;

    // TODO: have a placeholder gif
    const spell0 = (
      <img className='overview-spell icon' src={getSpellIconUrl(summoner.summoner_spell0, staticData.version)} alt=''/>
    );

    const spell1 = (
      <img className='overview-spell icon' src={getSpellIconUrl(summoner.summoner_spell1, staticData.version)} alt=''/>
    );

    return (
      <div className={classNames('overview-icon-list')}>
        {spell0}
        {spell1}
      </div>
    );
  }

  renderRunes = () => {
    const {summoner, staticData} = this.props;

    const runes = summoner.runes.map((rune) => {
      const runeData = staticData.runes[rune];
      const isKeystone = runeData.isKeyStone;
      const runeClass = classNames({'overview-rune': true, 'overview-keystone-rune': isKeystone});

      return (
        <Tooltip
          containerClassName={'overview-rune'}
          type={TOOLTIP_TYPES.RUNE}
          id={rune}
          data={runeData}
        >
          <img className={runeClass} src={getPerkIconUrl(rune, staticData.version)} key={rune} alt=''/>
        </Tooltip>
      );
    });

    return (
      <div className={classNames('overview-icon-list')}>
        {runes}
      </div>
    );
  }

  getRankedDetails = (details, queueName) => {
    if (!details.leagues || !details.leagues[queueName]) {
      return {
        tier: '',
        division: '',
        points: 0,
        promos: []
      };
    }

    const rankedDetails = details.leagues[queueName];
    const promos = rankedDetails.promos ? rankedDetails.promos : [];

    return {
      tier: rankedDetails.tier,
      division: rankedDetails.division,
      points: rankedDetails.points,
      promos: promos
    };
  }

  render() {
    const {summoner, details, isRed, isSelected, queueName, staticData} = this.props;

    // if details is empty then show a loading card
    const colorClass = isRed ? 'overview-card-red' : 'overview-card-blue';

    const cardClass = classNames(
      'rc-overview-card',
      colorClass, {
        overviewsred: isRed && isSelected,
        overviewsblue: !isRed && isSelected
      }
    );

    if (!details || Object.keys(details).length === 0) {
      return (
        <div className={cardClass}>
          <div className='oc-loader'>
            <ClipLoader
              size={80}
              color={isRed ? '#ff6666' : '#4488ff'} 
              loading={true} 
            />
            <h4>{`Loading:`}</h4>
          </div>
        </div>
      );
    }

    const winsLoss = (
      <div className='overview-row'>
        <span className='overview-greentext'>{details.stats.wins}W</span>
        <span className='overview-redtext'>{details.stats.losses}L</span>
      </div>
    );

    const kda = (
      <div className='overview-row'>
        <span className='overview-heading'>KDA</span>
        <span className='overview-greentext'>{`${details.stats.kills}/`}</span>
        <span className='overview-redtext'>{`${details.stats.deaths}/`}</span>
        <span className='overview-greentext'>{`${details.stats.assists}`}</span>
        <span className='overview-heading'>({roundWithPrecision((details.stats.kills + details.stats.assists) / details.stats.deaths, 1)})</span>
      </div>
    );

    const cs = (
      <div className='overview-row'>
        <span className='overview-heading'>CS@10/20/30</span>
        <br />
        <span className='overview-text'>{roundWithPrecision(details.stats.cs10, 0)}/</span>
        <span className='overview-text'>{roundWithPrecision(details.stats.cs20, 0)}/</span>
        <span className='overview-text'>{roundWithPrecision(details.stats.cs30, 0)}</span>
      </div>
    );

    const gold = (
      <div className='overview-row'>
        <span className='overview-heading'>Gold@10/20/30</span>
        <br />
        <span className='overview-text'>{roundWithPrecision(details.stats.gold10, 0)}/</span>
        <span className='overview-text'>{roundWithPrecision(details.stats.gold20, 0)}/</span>
        <span className='overview-text'>{roundWithPrecision(details.stats.gold30, 0)}</span>
      </div>
    );

    const summonerSpells = this.renderSummonerSpells();
    const runes = this.renderRunes();

    // TODO: think of a different product flow for selecting champions to compare head to head
    const {tier, division, points, promos} = this.getRankedDetails(details, queueName);

    return (
      <div className={cardClass} onClick={this.selectSummoner}>
        <OverviewCardHeader
          name={summoner.name}
          champion={staticData.champions[summoner.champion_id]}
          staticData={staticData}

          tier={tier}
          division={division}
          promos={promos}
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
