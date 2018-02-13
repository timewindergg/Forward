import React, { Component } from 'react';

import { getMasteryIconUrl,
  getTierIconUrl,
  getChampionIconUrl,
  getProfileIconUrl,
  getItemIconUrl,
  getPerkIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';

import Avatar from 'material-ui/Avatar';

class ChampionMatchups extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.championMatchups === undefined) {
      return (<div/>);
    }

    const { championMatchups } = this.props;

    return (
      <div className="champion-stats-match-ups">
        {this.renderMatchups(championMatchups)}
      </div>
    );
  }

  renderMatchups(championMatchups) {
    return championMatchups.map((c) => {
      return (
        <div className="champion-stats-match-up-item" key={c.enemy_champ_id}>
          <Avatar src={getChampionIconUrl(c.enemy_champ_id, '7.24.2')}/>
          <div className="champion-stats-match-up-item-win-percentage">
            <span>{(c.wins/c.total_games)*100 + '%'}</span>
          </div>
        </div>
      )
    });
  }

}

export default ChampionMatchups;
