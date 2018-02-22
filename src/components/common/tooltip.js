import React, { Component } from 'react';

import ChampionMappings from '../shared/championMappings.js';
import summonerSpellMappings from '../shared/summonerSpellMappings.js';
import QueueIdMappings from '../shared/queueIdMappings.js';
import RuneMappings from '../shared/runeMappings.js';

import './styles/tooltip.css';

class Tooltip extends Component{  
  render(){
    return(
      <div className='rc-tooltip'>
      </div>
    );
  }
}

export default Tooltip;
