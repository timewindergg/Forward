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
    promos: PropTypes.array.isRequired,
    staticData: PropTypes.object.isRequired,

    detailsLoaded: PropTypes.bool.isRequired,
    isRed: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired
  }

  static defaultProps = {
    name: '--',
    tier: '',
    division: '',
    LP: 0,
    promos: [],
  }

/*
turn  o-header-col text into 2 lines
lp and rank in same line, take away champion name text

badge icon ne
*/
  render() {
    const {name, champion, detailsLoaded, tier, division, LP, promos, isRed, isSelected, staticData} = this.props;
    const imageUrl = getChampionIcon(champion, staticData.version);

    const colorClass = isRed ? 'hred' : 'hblue';

    const cardClass = classNames(
      'rc-overview-card-header',
      colorClass, {
        hsred: isRed && isSelected,
        hsblue: !isRed && isSelected
      }
    );

    let tierText = detailsLoaded ? `${tier} ${division} ${LP} LP` : '';
    if (detailsLoaded && tier === ''){
      tierText = 'UNRANKED';
    }
    const tierIcon = getTierIconUrl(tier);

    const nameClass = classNames({
      'h-primary-text': true,
      'h-text': name.length < 15,
      'h-s-text': name.length >= 15
    });

    const tierClass = classNames({
      // 'h-text': tierText.length < 15,
      'h-ss-text': tierText.length >= 0
    })

    const promoList = promos.map((promo) => {
      let p = (<i className="far fa-window-minimize promo-i promo-up"></i>);

      if (promo === 'W') {
        p = (<i className="fas fa-check promo-i promo-win"></i>);
      } else if (promo === 'L') {
        p = (<i className="fas fa-times promo-i promo-lose"></i>);
      }

      return p;
    });

    return (
      <div className={cardClass}>
        <div className='champion-img-container'>
          <img src={imageUrl} className='champion-img' />
        </div>
        <div className='o-header-col'>
          <span className={nameClass}>{name}</span>
          <div className='och-row3'>
            <span className={tierClass}>{tierText}</span>
            {detailsLoaded}
          </div>
          {promos.length > 0 &&
            <div className='promos'>
              {`Promos: `}{promoList}
            </div>
          }
        </div>
      </div>
    );
  }
}

export default OverviewCardHeader;
