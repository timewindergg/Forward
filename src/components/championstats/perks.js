import React, { Component } from 'react';

import { getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrl,
  getProfileIconUrl,
  getItemIconUrl,
  getPerkIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';

class Perks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {perks} = this.props;

    if (perks === undefined) {
      return (<div/>);
    }

    return (
      <div className="champion-stats-champion-perks">
        {this.renderPerksList(perks)}
      </div>
    );
  }

  renderPerksList(perks) {
    return perks.map((r) => {
      return (
        <div className="champion-stats-champion-perk-wrapper">
          <div className="champion-stats-champion-perk-icon">
            <img src={getPerkIconUrl(r, '7.24.2')}/>
          </div>
          <div className="champion-stats-champion-perk-description">
            <h2></h2>
            <p></p>
            </div>
        </div>
      )
    });
  }
}

export default Perks;