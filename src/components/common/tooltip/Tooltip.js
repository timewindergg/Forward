import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import uuidv4 from 'uuid/v4';

import TOOLTIP_TYPES from '../../../constants/TooltipTypes';

import RuneTooltip from './RuneTooltip';
import ItemTooltip from './ItemTooltip';
import ChampionSkillTooltip from './ChampionSkillTooltip';

import './styles/tooltip.css';

// TODO: classnames for the tooltip itself
class Tooltip extends Component{
  static defaultProps = {
    containerClassName: '',
    ttClassName: '',
    data: {},
    img: '',
    type: TOOLTIP_TYPES.CUSTOM,
    content: (<div></div>),
  }

  static propTypes = {
    containerClassName: PropTypes.any,
    ttClassName: PropTypes.any,
    data: PropTypes.object,      // staticData for specific object
    img: PropTypes.string,
    type: PropTypes.string,      // object type
    content: PropTypes.element,  // custom content (optional)

    version: PropTypes.any.isRequired
  }

  render() {
    const id = uuidv4();
    const {containerClassName, type, content, data, img, version} = this.props;
    const tooltipID = `${type}-${id}`;

    let childComponent = content;

    switch (type) {
      case TOOLTIP_TYPES.RUNE:
        childComponent = (
          <RuneTooltip data={Object.assign({}, data, {img})}/>
        );
        break;
      case TOOLTIP_TYPES.ITEM:
        childComponent = (
          <ItemTooltip data={Object.assign({}, data, {img})}/>
        );
        break;
      case TOOLTIP_TYPES.CHAMPIONSKILL:
        childComponent = (
          <ChampionSkillTooltip data={data} version={version}/>
        );
        break;
      default:
        childComponent = (
          <div></div>
        )

      // TOOLTIP_TYPES.CHAMPIONSKILL - DONT NEED
      // default:
    }

    return(
      <div className={classNames('rc-tooltip', containerClassName)}>
        <a data-tip data-for={tooltipID}>
          {this.props.children}
        </a>
        <ReactTooltip id={tooltipID} className={classNames(this.props.ttClassName, 'tt-text')}>
          {childComponent}
        </ReactTooltip>
      </div>
    );
  }
}

export default Tooltip;
