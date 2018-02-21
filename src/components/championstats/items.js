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
        <span>Boots:</span>
        <div className="champion-stats-champion-items-boots">
            {this.renderItems(items.boots, version)}
        </div>
        <span>Core Items:</span>
        <div className="champion-stats-champion-items-core-items">
            {this.renderItems(items.items, version)}
        </div>
      </div>
    );
  }

  renderItems(items, version) {
    return items.map((i) => {
      return (
        <div className="champion-stats-champion-item" key={i}>
          <img src={getItemIconUrl(i, version)}/>
        </div>
      );
    });
  }
}

export default Items;