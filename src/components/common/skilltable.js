import React, { Component } from 'react';

import {getChampionSpellIconUrl} from '../../shared/helpers/staticImageHelper.js';

import './styles/skillprogression.css';

class SkillCell extends Component{
  render(){
    var skillType;
    if (this.props.type === "skillup")
      skillType = "skillupCell";
    else
      skillType = "skillCell";

    return (
      <div className={skillType}></div>
    );
  }
}

class SkillTable extends Component {
  renderRow(skillId, skillChar, skillImage){
    let skills = this.props.skillOrder;
    let buffer = [];

    buffer.push(
      <div key={skillImage}>
        <img className="icon skillImage" src={getChampionSpellIconUrl(skillImage, this.props.version)} alt={skillImage}></img>
      </div>
    );

    for (var i = 0; i < 18; i++){
      if (i < skills.length && (skills[i] === skillId || skills[i] === skillChar)){
        buffer.push(
          <div key={i} className="skillCell skillUp"></div>
        );
      }
      else {
        buffer.push(
          <div key={i} className="skillCell"></div>
        );
      }
    }

    return (
      <div key={skillId} className="skillRow clear">
        {buffer}
      </div>
    );
  }

  render(){
    // TODO: what about the "p" skill?
    return (
      <div className="skillContainer">
        <div className="skillTable">
          {this.renderRow(1, 'Q', this.props.skillData.q.img)}
          {this.renderRow(2, 'W', this.props.skillData.w.img)}
          {this.renderRow(3, 'E', this.props.skillData.e.img)}
          {this.renderRow(4, 'R', this.props.skillData.r.img)}
        </div>
      </div>
    );
  }
}

export default SkillTable;