import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuidv4 from 'uuid/v4';

import {roundWithPrecision} from '../../../shared/helpers/numberHelper.js';

import './styles/LineGraph.css';


import * as d3 from 'd3';

const POS_COLOR = '#4682b4';
const NEG_COLOR = '#ff8c00';

class LineGraph extends Component {
  state = {
    loaded: false
  }

  static propTypes = {
    graphID: PropTypes.string.isRequired,
    label: PropTypes.string,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    graphClass: PropTypes.any,
    valueLabelClass: PropTypes.any,

    data: PropTypes.object.isRequired,
    fillInfo: PropTypes.object
  }

  static defaultProps = {
    label: '',
    isCentered: false,
    graphClass: '',
    valueLabelClass: '',

    fillInfo: {}
  }

  componentDidMount() {
    this.setState({loaded: true});
  }

  // TODO: shouldComponentUpdate when we actually update
  shouldComponentUpdate(newProps) {
    // idk
    return true;
  }

  // axis at y(0)
  render() {
    const {
      graphID,
      label,
      isCentered,
      height,
      width,
      graphClass,
      valueLabelClass,
      data,
      fillInfo
    } = this.props;
    const rawData = data;

    // TODO: split data

    // const posColor = !!fillInfo.pos ? fillInfo.pos : POS_COLOR;
    // const negColor = !!fillInfo.neg ? fillInfo.neg : NEG_COLOR;

    // const graphID = uuidv4();

    const graphRef = `REF-${graphID}`;
    console.log('D3MAGIC LOAD', data);
    if (!!this.refs[graphRef]) {
      console.log('D3MAGIC', data);
      d3.select(`[graph-id='${graphID}']`).remove();

      let graph = d3.select(`#${graphID}`)
        .append('svg')
          .attr('width', width + 110)
          .attr('height', height + 50)
          .attr('graph-id', graphID)
        .append('g')
          .attr("transform",
            "translate(" + 55 + "," + 25 + ")"
          );

      // data is formatted
      let x = d3.scaleLinear()
        .domain(d3.extent(rawData, d => d.key))
        .range([0, width]);
      
      console.log('D3MAGIC', d3.extent(rawData, d => d.value));
      let y = d3.scaleLinear()
        .domain(d3.extent(rawData, d => d.value))
        .range([height, 0]);

      // define the area
      const area = d3.area()
        .x(d => x(d.key))
        .y0(d => d.value < 0 ? y(d.value) : y(0))
        .y1(d => d.value < 0 ? y(0) : y(d.value));

      // add area
      graph.append("path")
        .data([rawData])
        .attr("class", "area")
        .attr("d", area);

      // define the line
      const valueline = d3.line()
        .x(d => x(d.key))
        .y(d => y(d.value));

      // add the valueline path.
      graph.append("path")
        .data([rawData])
        .attr("class", "line")
        .attr("d", valueline);

      // add the X Axis
      graph.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // add the Y Axis
      graph.append("g")
        .call(d3.axisLeft(y));
    }    


    return (
      <div className='rc-line-graph'>
        {label !== '' && <div className='compare-heading'>{label}</div>}
        <div className={classNames(graphClass, 'lg')} id={graphID} ref={graphRef}>

        </div>
      </div>
    );
  }
}

export default LineGraph;
