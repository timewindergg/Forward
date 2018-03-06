import React, { Component } from 'react';

import { getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrlByImage,
  getProfileIconUrl,
  getItemIconUrl,
  getPerkIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';

import { calculateGradient } from '../../shared/helpers/numberHelper.js';

import { Line } from 'rc-progress';

class ChampionMatchups extends Component {
  render() {
    if (this.props.championMatchups === undefined) {
      return (<div/>);
    }

    const { championMatchups, version, staticData} = this.props;

    return (
      <div>
        <h3>Win rates (champions encountered)</h3>
        <div className="champion-stats-match-ups">
          {this.renderMatchups(JSON.parse(championMatchups[0].versus_blob), staticData.champions)}
        </div>
      </div>
    );
  }

  renderMatchups(championMatchups, championData) {
    /*championMatchups.sort((a, b) => {
      return b.wins/b.total_games - a.wins/a.total_games;
    });*/

    return Object.entries(championMatchups).map((m) => {
      let enemy = m[0];
      let stats = m[1];
      let winrate = Math.round(stats.wins * 100 / (stats.wins + stats.losses));
      let color = calculateGradient('01627f', 'ff6666', winrate / 100);

      return (
        <div className="matchup" key={enemy}>
          <div className="championImage">
            <img className="championIcon" src={getChampionIconUrlByImage(championData[enemy].img.split('.')[0], this.props.version)}/>
          </div>
          <span className="winrate">{winrate + '%'}</span>
          <div className="progressBar">
            <Line percent={winrate} strokeWidth="4" strokeColor={"#"+color} />
          </div>
          <span className="winloss">{stats.wins} - {stats.losses}</span>
        </div>
      )
    });
  }

}

export default ChampionMatchups;
