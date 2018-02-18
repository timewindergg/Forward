import React, { Component } from 'react';

import {getChampionSpellIconUrl} from '../../shared/helpers/staticImageHelper.js';

class SkillCell extends Component{
  constructor(props){
    super(props);
  }

  render(){
    var skillType;
    if (this.props.type == "skillup")
      skillType = "skillupCell";
    else
      skillType = "skillCell";

    return (
      <div className={skillType}></div>
    );
  }
}

class SkillTable extends Component {
  constructor(props){
    super(props);
  }

  renderRow(skillId, skillImage){
    let skills = this.props.skillOrder;
    let buffer = [];

    buffer.push(
      <div key={skillImage}>
        <img className="skillImage" src={getChampionSpellIconUrl(skillImage, this.props.version)}></img>
      </div>
    );

    for (var i = 0; i < 18; i++){
      if (i < skills.length && skills[i] === skillId){
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
    return (
      <div className="skillContainer">
        <div className="skillTable">
          {this.renderRow(1, this.props.skillData.q.img)}
          {this.renderRow(2, this.props.skillData.w.img)}
          {this.renderRow(3, this.props.skillData.e.img)}
          {this.renderRow(4, this.props.skillData.r.img)}
        </div>
      </div>
    );
  }
}

export default SkillTable;