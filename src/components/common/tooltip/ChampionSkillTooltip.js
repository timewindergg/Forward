import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles/ChampionSkillTooltip.css';

import {getChampionSpellIconUrl} from '../../../shared/helpers/staticImageHelper';

// tooltip content
class ChampionSkillTooltip extends Component{
  static defaultProps = {
    data: {
      name: '',
      img: '',
      description: '',
    }
  }

  static propTypes = {
    data: PropTypes.object,      // staticData for specific object
    version: PropTypes.any.isRequired
  }

  render() {
    const {data, version} = this.props;
    const {name, img, description} = data;
    return(
      <div className='rc-championskill-tooltip'>
        <div className='skill-header'>
          <img className='icon skill-img' src={getChampionSpellIconUrl(img, version)} alt={img}/>
          <div className='skill-name'>
            {name}
          </div>
        </div>
        <div className='skill-desc'>
          {description}
        </div>
      </div>
    );
  }
}

export default ChampionSkillTooltip;

// "name":"Faerie Charm",
// "totalGold":125,
// "sellGold":88,
// "description":"<stats><mana>+25% Base Mana Regen </mana></stats>",
// "plaintext":"Slightly increases Mana Regen",
