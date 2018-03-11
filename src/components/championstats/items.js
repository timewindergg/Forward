import React, { Component } from 'react';
import classNames from 'classnames';

import Tooltip from '../common/tooltip/Tooltip';
import TOOLTIP_TYPES from '../../constants/TooltipTypes';

import {roundWithPrecision} from '../../shared/helpers/numberHelper';
import {getPercentClass} from '../../shared/helpers/cssHelper';
import { getItemIconUrl } from '../../shared/helpers/staticImageHelper.js';
import { sortItems } from '../../shared/helpers/itemHelper';

class Items extends Component {
  render() {
    const { items, staticData, version } = this.props;


    return (
      <div className="champion-stats-champion-items">
        <h3>Purchased items</h3>
        <div className="cc-items boots">
          <h3>Boots</h3>
          {this.renderItems(items.boots, staticData, version)}
        </div>

        <div className="cc-items core">
          <h3>Core Items</h3>
          {this.renderItems(items.core, staticData, version)}
        </div>
        <div className="cc-items situational">
          <h3>Situational Items</h3>
          {this.renderItems(items.situational, staticData, version)}
        </div>
      </div>
    );
  }

  renderItems(items, itemData, version) {
    const si = sortItems(items);
    const sortedItems = si[0];
    const total = si[1];
    
    return sortedItems.map((item) => {
      const iCnt = item.value;
      const ik = item.key;
      const pcnt = roundWithPrecision(100*iCnt/total, 1);

      return (
        <Tooltip
          containerClassName={'item'}
          type={TOOLTIP_TYPES.ITEM}
          data={itemData[ik.toString()]}
          img={getItemIconUrl(ik, version)}
          version={version}
        >
          <div className="item item-container" key={ik}>
            <img className="cs-item icon" src={getItemIconUrl(ik, version)}/>
            <span className={classNames('cs-item-cnt', getPercentClass(pcnt))}>
              {`${pcnt}%`}
            </span>
          </div>
        </Tooltip>
      );
    });
  }
}

export default Items;