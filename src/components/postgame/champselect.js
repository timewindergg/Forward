import React, { Component } from 'react';

import { getChampionIconUrl } from '../../shared/helpers/staticImageHelper.js';

class ChampionSelector extends Component {
  renderParticipants(teamId, team){
    return team.map((participant) => {
      return (
        <div key={participant.id} className="selectionParticipant" onClick={() => this.props.onChampionSelect(teamId, participant.id)}>
          <img className="championIcon" src={getChampionIconUrl(participant.championId, this.props.version)}/>
        </div>
      );
    });
  }

  renderTeam(teamId, team){
    return(
      <div className="selectorTeam">
        {this.renderParticipants(teamId, team)}
      </div>
    );
  }

  render(){
    let len = this.props.matchParticipants.length;
    let blueTeam = this.props.matchParticipants.slice(0, len / 2);
    let redTeam = this.props.matchParticipants.slice(len / 2, len);

    return (
      <div className="selectorContainer">
        {this.renderTeam(100, blueTeam)}
        {this.renderTeam(200, redTeam)}
      </div>
    );
  }
}

export default ChampionSelector;