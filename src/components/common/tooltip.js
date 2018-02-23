import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ChampionMappings from '../../shared/championMappings.js';
import summonerSpellMappings from '../../shared/summonerSpellMappings.js';
import QueueIdMappings from '../../shared/queueIdMappings.js';
import RuneMappings from '../../shared/runeMappings.js';

import './styles/tooltip.css';

class Tooltip extends Component{ 

  static propTypes = {
    text: PropTypes.string.isRequired
  }

  render(){
    return(
      <div className='rc-tooltip'>
        <div className='tooltip-text'>
          {this.props.text}
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Tooltip;


/*


*/