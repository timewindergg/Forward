import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Moment from 'react-moment';

import {getItemIconUrl} from '../../shared/helpers/staticImageHelper.js';



const groupItems = (items) => {
  const THRESHOLD = 10000;
  let prev = -THRESHOLD - 1;

  let groups = [];
  let curGroup = [];

  items.forEach((item) => {
    if ( (item.ts - prev > THRESHOLD) && curGroup.length > 0 ) {
      groups = groups.concat([curGroup]);
      curGroup = [];
    }

    curGroup = curGroup.concat(item);
    prev = item.ts;
  });

  return groups;
}

class Item extends Component {
  render() {
    let id = this.props.id;
    let showTS = this.props.showTS;
    let type = 'icon item';
    const isSold = this.props.id < 0;

    if (isSold){
      type += ' sold';
    }

    return(
      <div className='itemContainer'>
        <div className='item-inner'>
          <img className={type} src={getItemIconUrl(Math.abs(id), this.props.version)}></img>
          {isSold && <i className='fas fa-times sell-dash' />}
        </div>
        <span>
          <Moment
            className={classNames('itemTs', 'clear', {'ts-hidden': !showTS})}
            format='mm:ss'
          >{this.props.ts}</Moment>
        </span>
      </div>
    );
  }
}

class ItemProgression extends Component {
  static propTypes = {
    itemOrder: PropTypes.array.isRequired,
    itemData: PropTypes.object.isRequired,
    version: PropTypes.any.isRequired
  }

  renderItems(){
    let items = this.props.itemOrder;
    const groups = groupItems(items);

    return groups.map((group, idx) => {
      let itemsInGroup = group.map((item, itemIDX) => (
        <Item id={item.id} ts={item.ts} version={this.props.version} key={item.ts} showTS={itemIDX === group.length - 1}></Item>
      ));

      if (idx < groups.length - 1) {
        itemsInGroup = itemsInGroup.concat(
          <i className='fas fa-angle-right item-group-separator'></i>
        );
      }

      return (
        <div className='item-group'>
          {itemsInGroup}
        </div>
      );
    });
  }

  render() {
    return(
      <div className="itemProgressContainer">
        {this.renderItems()}
      </div>
    );
  }
}

export default ItemProgression;
