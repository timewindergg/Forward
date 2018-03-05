import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles/CompareCardBottom.css';

import Tooltip from '../../common/tooltip/Tooltip';
import TOOLTIP_TYPES from '../../../constants/TooltipTypes';

import {
  getItemIconUrl
} from '../../../shared/helpers/staticImageHelper.js';

class CompareCardBottom extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    isRed: PropTypes.bool.isRequired,
    compareData: PropTypes.object.isRequired,
    staticData: PropTypes.object.isRequired
  }

  // staticData[string(item.id)]
  renderItems = (itemType, isRed) => {
    const {compareData, staticData} = this.props;
    const isDetailsLoaded = !!compareData.build;

    const items = isDetailsLoaded ? compareData.build[itemType].map((item) => {
      // return (
      //   <img className='compare-item' src={getItemIconUrl(item, staticData.version)} key={item} alt=''/>
      // );
      const itemData = staticData.items[item.toString()];
      return (
        <Tooltip
          containerClassName={'overview-rune'}
          type={TOOLTIP_TYPES.ITEM}
          id={item}
          data={itemData}
        >
          <img className='compare-item' src={getItemIconUrl(item, staticData.version)} key={item} alt=''/>
        </Tooltip>
      );
    }) : <img className='compare-item' src='' alt=''/>;

    return (
      <div className={classNames('compare-items', {
        'compare-items-right': !isRed
      })}>
        <span className='compare-heading'>{`${itemType} items`}</span>
        <div className={classNames('ccb-row', 'ccb-icon-list')}>
          {items}
        </div>
      </div>
    );
  }

  renderEmptyCard = (cardClass) => {
    const {isRed, compareData} = this.props;

    return (
      <div className={cardClass}>
      </div>
    );
  }

  render() {
    const {isRed, compareData} = this.props;

    const cardClass = classNames(
      'rc-compare-card-bottom',
      {'rc-compare-card-bottom-blue': !isRed}
    );

    if (Object.keys(compareData).length === 0) {
      return this.renderEmptyCard(cardClass);
    }

    const bootItems = this.renderItems('boots', isRed);
    const coreItems = this.renderItems('core', isRed);
    const situationalItems = this.renderItems('situational', isRed);

    return (
      <div className={cardClass}>
        {bootItems}
        {coreItems}
        {situationalItems}
      </div>
    );
  }
}

export default CompareCardBottom;
