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
    const {perks, perkData, version} = this.props;

    if (perks === undefined || perkData === undefined || version === undefined) {
      return (<div/>);
    }

    return (
      <div className="champion-stats-champion-perks">
        {this.renderPerksList(perks, perkData, version)}
      </div>
    );
  }

  renderPerksList(perks, perkData, version) {
    return perks.map((r) => {
      return (
        <div className="champion-stats-champion-perk-wrapper" key={r}>
          <div className="champion-stats-champion-perk-icon">
            <img src={getPerkIconUrl(r, version)}/>
          </div>
          <div className="champion-stats-champion-perk-description">
            <h2>{perkData[r].name}</h2>
            <p>{perkData[r].shortDescription}</p>
            </div>
        </div>
      )
    });
  }
}

export default Perks;