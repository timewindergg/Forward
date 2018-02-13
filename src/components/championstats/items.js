import React, { Component } from 'react';

import { getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrl,
  getProfileIconUrl,
  getItemIconUrl,
  getPerkIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';

class Items extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items } = this.props;

    console.log(items);

    return (
      <div className="champion-stats-champion-items">
        <span>Boots:</span>
        <div className="champion-stats-champion-items-boots">
            {this.renderItems(items.boots)}
        </div>
        <span>Core Items:</span>
        <div className="champion-stats-champion-items-core-items">
            {this.renderItems(items.items)}
        </div>
      </div>
    );
  }

  renderItems(items) {
    return items.map((i) => {
      return (
        <div className="champion-stats-champion-item" key={i}>
          <img src={getItemIconUrl(i, '7.24.2')}/>
        </div>
      );
    });
  }
}

export default Items;