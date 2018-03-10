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
  getTierIconUrl,
  getPerkIconUrl
} from '../../../shared/helpers/staticImageHelper.js';

import { roundWithPrecision, isNumeric } from '../../../shared/helpers/numberHelper.js';

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
      <div className={classNames('overview-icon-list', 'oil-fixed')}>
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

    // const r1 = runes.slice(0, 4);
    // const r2 = runes.slice(4, runes.length);

    return (
      <div className={classNames('overview-icon-list')}>
        {runes}
      </div>
    );
  }

  getRankedDetails = (details, queueName) => {
    if (!details || !details.leagues || !details.leagues[queueName]) {
      return {
        tier: '',
        division: '',
        points: 0,
        promos: [],
      };
    }

    const rankedDetails = details.leagues[queueName];
    let promos = [];

    if (!!rankedDetails.promos) {
      promos = rankedDetails.promos.forEach(p => {return p ? 'W' : 'L';});

      const np = isNumeric(rankedDetails.not_played) ? rankedDetails.not_played : 0;
      for (let i = 0; i < np; i++) {
        promos = promos.concat('');
      }
    }

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

    // TODO: think of a different product flow for selecting champions to compare head to head
    const {tier, division, points, promos} = this.getRankedDetails(details, queueName);

    const headerComp = (
      <OverviewCardHeader
        name={summoner.name}
        champion={staticData.champions[summoner.champion_id]}
        staticData={staticData}

        detailsLoaded={Object.keys(details).length > 0}

        tier={tier}
        division={division}
        promos={promos}
        LP={points}
        isRed={isRed}
        isSelected={isSelected}
      />
    );

    if (!details || Object.keys(details).length === 0) {
      return (
        <div className={cardClass}>
          {headerComp}
          <div className='overview-body'>
            <div className='oc-loader'>
              <ClipLoader
                size={80}
                color={isRed ? '#ff6666' : '#4C7FCC'} 
                loading={true} 
              />
              <h4>{`Loading...`}</h4>
            </div>
          </div>
        </div>
      );
    }

    const winsLoss = (
      <div className='overview-row'>
        <span className='overview-greentext'>{details.stats.wins}W </span>
        <span className='overview-redtext'>{details.stats.losses}L</span>
      </div>
    );



    let kdaColor = '';
    let kdaStat = roundWithPrecision((details.stats.kills + details.stats.assists) / details.stats.deaths, 1);
    if (kdaStat < 3){

    }
    else if (kdaStat < 4){
      kdaColor = 'green-txt';
    }
    else if (kdaStat < 5){
      kdaColor = 'blue-dk-txt';
    }
    else {
      kdaColor = 'gold-dk-txt';
    }


    const kda = (
      <div className='overview-row'>
        <span className={`overview-heading ${kdaColor}`}>{kdaStat} KDA</span>
        <br />
        <span className={`${kdaColor}`}>{`${details.stats.kills} / `}</span>
        <span className={`${kdaColor}`}>{`${details.stats.deaths} / `}</span>
        <span className={`${kdaColor}`}>{`${details.stats.assists}`}</span>
      </div>
    );

    const cs = (
      <div className='overview-row'>
        <span className='overview-heading violet-txt'>CS@10 / 20</span>
        <br/>
        <span className='overview-text violet-txt'>{roundWithPrecision(details.stats.cs10, 0)} / </span>
        <span className='overview-text violet-txt'>{roundWithPrecision(details.stats.cs20, 0)} </span>
        
      </div>
    );

    const gold = (
      <div className='overview-row'>
        <span className='overview-heading gold-dk-txt'>Gold@10 / 20</span>
        <br/>
        <span className='overview-text gold-dk-txt'>{roundWithPrecision(details.stats.gold10, 0)} / </span>
        <span className='overview-text gold-dk-txt'>{roundWithPrecision(details.stats.gold20, 0)} </span>
        
      </div>
    );

    const leagues = this.renderLeagues(details.leagues);

    const summonerSpells = this.renderSummonerSpells();
    const runes = this.renderRunes();

    return (
      <div className={cardClass} onClick={this.selectSummoner}>
        {headerComp}

        <div className='overview-body'>
          <div className='overview-col'>
            {winsLoss}
            {kda}
            {cs}
            {gold}
            <div className='oc-leagues'>
              {leagues}
            </div>
          </div>

          <div className='overview-col'>
            <div className='overview-icon-div'>
              {summonerSpells}
              {runes}
            </div>
          </div>


        </div>
      </div>
    );
  }

  renderLeagues = (leagues) => {
    // TODO: SORT THIS

    const mapping = {
      'RANKED_FLEX_SR': 'Flex 5s',
      'RANKED_SOLO_5x5': 'Solo',
      'RANKED_FLEX_TT': 'Flex 3s'
    }

    const leagueComps = Object.keys(leagues).map(leagueName => {
      const tier = leagues[leagueName].tier;
      const tierIcon = getTierIconUrl(tier);

      return (
        <div className='oc-league'>
          <img src={tierIcon} className='tier-img' />
          <span className='overview-text tier-text'>{mapping[leagueName]}</span>
        </div>
      )
    });

    // console.log(leagues);
    return leagueComps;
    // RANKED_SOLO_5x5 RANKED_FLEX_SR 
  }
}

export default OverviewCard;
