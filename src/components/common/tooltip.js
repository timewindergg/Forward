import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ChampionMappings from '../../shared/championMappings.js';
import summonerSpellMappings from '../../shared/summonerSpellMappings.js';
import QueueIdMappings from '../../shared/queueIdMappings.js';
import RuneMappings from '../../shared/runeMappings.js';

import './styles/tooltip.css';

class Tooltip extends Component{ 
  static defaultProps = {
    title: '',
    text: ''
  }

  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string
  }

  onMouseMove = (e) => {
    if (!this.refs.tooltip || !this.refs.tooltipcontainer) { return; }

    const tooltip = this.refs.tooltip;
    const tooltipcontainer = this.refs.tooltipcontainer;

    const cRect = tooltipcontainer.getBoundingClientRect();
    const tRect = tooltip.getBoundingClientRect();

    tooltip.style.left = e.pageX - cRect.left + 10 + 'px';
    tooltip.style.top = e.pageY - cRect.top - tRect.height - 10 + 'px';
    // tooltip.style.left =
    //     e.pageX + tooltip.clientWidth + 10 <
    //     document.body.clientWidth ?
    //     cRect.left - e.pageX + 10 + 'px' :
    //     document.body.clientWidth + 5 - tooltip.clientWidth + 'px';
    // tooltip.style.top =
    //     e.pageY + tooltip.clientHeight + 10 <
    //     document.body.clientHeight ?
    //     e.pageY + 10 + 'px' : 
    //     document.body.clientHeight + 5 - tooltip.clientHeight + 'px';
  }

  render(){
    return(
      <div className='rc-tooltip' onMouseMove={this.onMouseMove} ref='tooltipcontainer'>
        <div className='tooltip-text' ref='tooltip' >
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