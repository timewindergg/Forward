import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import {getChampionSpellIconUrl} from '../../shared/helpers/staticImageHelper.js';
import TOOLTIP_TYPES from '../../constants/TooltipTypes';
import Tooltip from './tooltip/Tooltip';

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
        <Tooltip
          containerClassName={'icon skillImage'}
          type={TOOLTIP_TYPES.CHAMPIONSKILL}  
          data={this.props.skillData[skillChar.toLowerCase()]}
          version={this.props.version}
        >
          <img className='icon skillImage' src={getChampionSpellIconUrl(skillImage, this.props.version)} alt={skillImage}></img>
        </Tooltip>
      </div>
    );

    for (var i = 0; i < 18; i++){
      if (i < skills.length && (skills[i] === skillId || skills[i] === skillChar)){
        buffer.push(
          <div key={i} className="skillCell skillUp">
            <div className="skillId">{skillChar}</div>
            <div className="skillLevel">{i+1}</div>
          </div>
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