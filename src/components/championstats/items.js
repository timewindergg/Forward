import React, { Component } from 'react';

import { getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrl,
  getProfileIconUrl,
  getItemIconUrl,
  getPerkIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';

class Items extends Component {
  render() {
    const { items, itemData, version } = this.props;

    return (
      <div className="champion-stats-champion-items">
        <h3>Purchased items</h3>
        <div className="boots">
          <h4>Boots</h4>
          {this.renderItems(items.boots, version)}
        </div>
        
        <div className="core">
          <h4>Core Items</h4>
          {this.renderItems(items.items, version)}
        </div>
      </div>
    );
  }

  renderItems(items, version) {
    return items.map((i) => {
      return (
        <div className="item" key={i}>
          <img className="icon" src={getItemIconUrl(i, version)}/>
        </div>
      );
    });
  }
}

export default Items;