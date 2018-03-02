import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles/OverviewCardHeader.css';

import {
  getTierIconUrl,
  getChampionIcon
} from '../../../shared/helpers/staticImageHelper.js';


import {IMG_VER} from '../../../constants/Settings';

class OverviewCardHeader extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    champion: PropTypes.object.isRequired,
    tier: PropTypes.string.isRequired,
    division: PropTypes.string.isRequired,
    LP: PropTypes.number.isRequired,
    promos: PropTypes.string.isRequired,
    staticData: PropTypes.object.isRequired,

    isRed: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired
  }

  static defaultProps = {
    name: '--',
    tier: '',
    division: '',
    LP: 0,
    promos: '',
  }

/*
turn  o-header-col text into 2 lines
lp and rank in same line, take away champion name text

badge icon ne
*/
  render() {
    const {name, champion, tier, division, LP, promos, isRed, isSelected, staticData} = this.props;
    const imageUrl = getChampionIcon(champion, staticData.version);

    const colorClass = isRed ? 'hred' : 'hblue';

    const cardClass = classNames(
      'rc-overview-card-header',
      colorClass, {
        hsred: isRed && isSelected,
        hsblue: !isRed && isSelected
      }
    );

    const tierText = `${tier} ${division}`;

    const nameClass = classNames({
      'h-primary-text': true,
      'h-text': name.length < 15,
      'h-s-text': name.length >= 15
    });

    return (
      <div className={cardClass}>
        <div className='champion-img-container'>
          <img src={imageUrl} className='champion-img' />
        </div>
        <div className='o-header-col'>
          <span className={nameClass}>{name}</span>
          <span className='h-text'>{`${tierText} (${LP} LP)`}</span>
        </div>
      </div>
    );
  }
}

export default OverviewCardHeader;
