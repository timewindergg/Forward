import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';

import TOOLTIP_TYPES from '../../../constants/TooltipTypes';

import RuneTooltip from './RuneTooltip';

import './styles/tooltip.css';

// TODO: classnames for the tooltip itself
class Tooltip extends Component{
  static defaultProps = {
    containerClassName: '',
    ttClassName: '',
    data: {},
    type: TOOLTIP_TYPES.CUSTOM,
    content: (<div></div>),
    id: ''
  }

  static propTypes = {
    containerClassName: PropTypes.any,
    ttClassName: PropTypes.any,
    data: PropTypes.object,      // staticData for specific object
    type: PropTypes.string,      // object type
    id: PropTypes.any,        // object id
    content: PropTypes.element,  // custom content (optional)
  }

  render() {
    const {containerClassName, type, id, content, data} = this.props;
    const tooltipID = `${type}-${id}`;

    let childComponent = content;

    switch (type) {
      case TOOLTIP_TYPES.RUNE:
        childComponent = (
          <RuneTooltip data={data}/>
        );    
        break;

      // TOOLTIP_TYPES.CUSTOM
      // TOOLTIP_TYPES.SPELL
      // default:
    }

    return(
      <div className={classNames('rc-tooltip', containerClassName)}>
        <a data-tip data-for={tooltipID}>
          {this.props.children}
        </a>
        <ReactTooltip id={tooltipID} className={this.props.ttClassName}>
          {childComponent}
        </ReactTooltip>
      </div>
    );
  }
}

export default Tooltip;
