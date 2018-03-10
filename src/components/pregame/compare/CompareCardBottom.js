import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles/CompareCardBottom.css';

import Tooltip from '../../common/tooltip/Tooltip';
import TOOLTIP_TYPES from '../../../constants/TooltipTypes';

import {roundWithPrecision} from '../../../shared/helpers/numberHelper';
import {getPercentClass} from '../../../shared/helpers/cssHelper';

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

  sortItems = (items, isRed) => {
    let total = 0;

    let sItems = Object.keys(items).map(item => {
      total += items[item];
      return {key: item, value: items[item]}
    });

    if (isRed) {
      sItems.sort((a, b) => {
        if (a.value < b.value){ return 1; }
        else if (a.value > b.value) { return -1; }
        return 0;
      });
    } else {
      // ascending order because CSS HACK!
      sItems.sort((a, b) => {
        if (a.value < b.value){ return -1; }
        else if (a.value > b.value) { return 1; }
        return 0;
      });
    }

    return [sItems, total];
  }

  // staticData[string(item.id)]
  renderItems = (heading, itemType, isRed) => {
    const {compareData, staticData} = this.props;
    const isDetailsLoaded = !!compareData.build;

    let items = (<img className='compare-item-empty' src='' alt=''/>);

    if (isDetailsLoaded && Object.keys(compareData.build[itemType].length > 0)) {
      const si = this.sortItems(compareData.build[itemType], isRed);
      const sortedItems = si[0];
      const total = si[1];
      items = sortedItems.map((item) => {
        const ik = item.key;
        const iCnt = item.value;

        const itemData = staticData.items[ik.toString()];
        const pcnt = roundWithPrecision(100*iCnt/total, 1);
        return (
          <Tooltip
            containerClassName={'overview-rune'}
            type={TOOLTIP_TYPES.ITEM}
            id={ik}
            data={itemData}
          >
            <div className='item-container'>
              <img className={classNames('compare-item', 'icon')} src={getItemIconUrl(ik, staticData.version)} key={ik} alt=''/>
              <span className={classNames('compare-item-cnt', getPercentClass(pcnt))}>
                {`${pcnt}%`}
              </span>
            </div>
          </Tooltip>
        );
      });
    }


    return (
      <div className={classNames('compare-items', {
        'compare-items-right': !isRed
      })}>
        <h3>{heading}</h3>
        <div className={classNames('ccb-row', 'ccb-icon-list', {'ccb-row-right': !isRed})}>
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

    // console.log(compareData,)
    const bootItems = this.renderItems('Boots', 'boots', isRed);
    const coreItems = this.renderItems('Core', 'core', isRed);
    const situationalItems = this.renderItems('Situational', 'situational', isRed);

    return (
      <div className={cardClass}>
        <span className={classNames('compare-heading')}>{`Recommended Items`}</span>
        {bootItems}
        {coreItems}
        {situationalItems}
      </div>
    );
  }
}

export default CompareCardBottom;
