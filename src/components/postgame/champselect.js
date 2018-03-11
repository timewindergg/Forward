import React, { Component } from 'react';
import classNames from 'classnames';

import { getChampionIconUrlByImage } from '../../shared/helpers/staticImageHelper.js';

class ChampionSelector extends Component {
  constructor(props){
    super(props);

    this.state = {
      redSelector: this.props.redSelector,
      blueSelector: this.props.blueSelector,
    }
  }

  renderParticipants(teamId, team, championData){
    return team.map((participant) => {
      return (
        <div key={participant.id} className="selectionParticipant" onClick={() => {
          this.props.onChampionSelect(teamId, participant.id);
          if (teamId === 100){
            this.setState({
              blueSelector: participant.id
            });
          }
          else if (teamId === 200){
            this.setState({
              redSelector: participant.id
            });
          }
        }}>
          <img className={classNames({"championIcon": true, "selected": this.state.redSelector === participant.id || this.state.blueSelector === participant.id})} 
               src={getChampionIconUrlByImage(championData[participant.championId].img.split('.')[0], this.props.version)}/>
          <div className='championName'>
            {championData[participant.championId].name}
          </div>
        </div>
      );
    });
  }

  renderTeam(teamId, team, championData){
    return(
      <div className="selectorTeam">
        {this.renderParticipants(teamId, team, championData)}
      </div>
    );
  }

  render(){
    let len = this.props.matchParticipants.length;
    let blueTeam = this.props.matchParticipants.slice(0, len / 2);
    let redTeam = this.props.matchParticipants.slice(len / 2, len);
    let championData = this.props.championData;

    return (
      <div className="selectorContainer">
        {this.renderTeam(100, blueTeam, championData)}
        vs
        {this.renderTeam(200, redTeam, championData)}
      </div>
    );
  }
}

export default ChampionSelector;