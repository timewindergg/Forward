import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Avatar from 'material-ui/Avatar';

import './OverviewCardHeader.css';

import {
  getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrl,
  getSpellIconUrl,
  getPerkIconUrl,
  getPerkStyleIconUrl
} from '../../../shared/helpers/staticImageHelper.js';

import championMappings from '../../../shared/championMappings.js';

import {IMG_VER} from '../../../constants/Settings';

class OverviewCardHeader extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    championID: PropTypes.number.isRequired,
    tier: PropTypes.string.isRequired,
    division: PropTypes.string.isRequired,
    LP: PropTypes.number.isRequired,
    promos: PropTypes.string.isRequired,

    isRed: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired
  }

  //     // "{"tier":"GOLD","division":"I","points":61}"
  static defaultProps = {
    name: '--',
    championID: 0,
    tier: '\n',
    division: '',
    LP: 0,
    promos: '', 
  }

  render() {
    const {name, championID, tier, division, LP, promos, isRed, isSelected} = this.props;
    
    const imageUrl = getChampionIconUrl(championID, IMG_VER);

    const colorClass = isRed ? 'hred' : 'hblue';
    
    const cardClass = classNames(
      'rc-overview-card-header',
      colorClass, {
        hsred: isRed && isSelected,
        hsblue: !isRed && isSelected
      }
    );    

    const championName = !!championMappings[championID] ? championMappings[championID].name : '';
    const tierText = `${tier} ${division}`;

    const nameClass = classNames({
      'h-primary-text': true,
      'h-text': name.length < 15,
      'h-s-text': name.length >= 15
    });

    return (
      <div className={cardClass}>
        <Avatar src={imageUrl} className='champion-img' />
        <div className='o-header-col'>
          <span className={nameClass}>{name}</span>
          <span className='h-text'>{championName}</span>
          <span className='h-text'>{tierText}</span>
          <span className='h-text'>{`${LP} LP`}</span>
        </div>
      </div>
    );
  }
}

export default OverviewCardHeader;
