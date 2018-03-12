import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuidv4 from 'uuid/v4';

import {roundWithPrecision, getNearestThousand} from '../../../shared/helpers/numberHelper.js';

import './styles/LineGraph.css';


import * as d3 from 'd3';
import * as d3tip from 'd3-tip';

const POS_FILL = '#76A2F4';
const NEG_FILL = '#ffbc55';

const POS_STROKE = '#4682b4';
const NEG_STROKE = '#ff8c00';

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
    fillInfo: PropTypes.object,
    strokeInfo: PropTypes.object
  }

  static defaultProps = {
    label: '',
    isCentered: false,
    graphClass: '',
    valueLabelClass: '',

    fillInfo: {},
    strokeInfo: {}
  }

  componentDidMount() {
    this.setState({loaded: true});
  }

  // TODO: shouldComponentUpdate when we actually update
  shouldComponentUpdate(newProps) {
    // idk
    return true;
  }

  chunkData = (rawData) => {
    let bucket = [];
    let prev = undefined;
    let newData = [];

    rawData.forEach((d, idx) => {
      if (d.value >= 0) {
        // cur is positive
        if (prev !== undefined && prev.value < 0) {
          // interpolate to find point that crosses x axis
          let c = Math.abs(prev.value) / (Math.abs(prev.value) + Math.abs(d.value));
          bucket[0].pos = false;
          bucket.push({
            key: idx - 1 + c,
            value: 0,
            separator: true
          });
          newData.push(bucket);
          bucket = [{
            key: idx - 1 + c,
            value: 0,
            separator: true,
            pos: true,
          }];
        }
        bucket.push(d);
      } else {
        if (prev !== undefined && prev.value >= 0) {
          // interpolate to find point that crosses x axis
          let c = Math.abs(prev.value) / (Math.abs(prev.value) + Math.abs(d.value));
          bucket[0].pos = true;
          bucket.push({
            key: idx - 1 + c,
            value: 0,
            separator: true
          });
          newData.push(bucket);
          bucket = [{
            key: idx - 1 + c,
            value: 0,
            separator: true,
            pos: false,
          }];
        }
        bucket.push(d);
      }
      prev = d;
    });
    newData.push(bucket);

    return newData;
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
      fillInfo,
      strokeInfo
    } = this.props;
    const rawData = data;

    // TODO: split data

    const posFill = !!fillInfo.pos ? fillInfo.pos : POS_FILL;
    const negFill = !!fillInfo.neg ? fillInfo.neg : NEG_FILL;

    const posStroke = !!strokeInfo.pos ? strokeInfo.pos : POS_STROKE;
    const negStroke = !!strokeInfo.neg ? strokeInfo.neg : NEG_STROKE;

    // const graphID = uuidv4();

    const graphRef = `REF-${graphID}`;
    // console.log('D3MAGIC LOAD', data);
    if (!!this.refs[graphRef]) {
      // console.log('D3MAGIC', data);
      d3.select(`[graph-id='${graphID}']`).remove();

      let graph = d3.select(`#${graphID}`)
        .append('svg')
          .attr('width', width + 50)
          .attr('height', height + 10)
          .attr('graph-id', graphID)
        .append('g')
          .attr("transform",
            "translate(" + 45 + "," + 5 + ")"
          );

      // data is formatted
      let x = d3.scaleLinear()
        .domain(d3.extent(rawData, d => d.key))
        .range([0, width]);
      
      // console.log('D3MAGIC', d3.extent(rawData, d => d.value));
      let y = d3.scaleLinear()
        .domain([
          getNearestThousand(d3.min(rawData, d => d.value), false),
          getNearestThousand(d3.max(rawData, d => d.value), true)
        ])
        .range([height, 0]);

      const tip = d3tip()
        .attr('class', 'd3-lg-tip')
        .html(function(d) {
          return `
            ${d.value}
          `; 
        });

      graph.call(tip);

      const newData = this.chunkData(rawData);

      // define the area
      const area = d3.area()
        .x(d => x(d.key))
        .y0(d => y(0))
        .y1(d => y(d.value));

      const valueline = d3.line()
        .x(d => x(d.key))
        .y(d => y(d.value));


      newData.forEach((d) => {
        // console.log('D3MAGIC NWD',d).
        // const fill = (
        //   d[0].value > 0 || 
        //   (d[0].value === 0 && !!d[0].pos)
        // ) ? posFill : negFill;
        const fill = d[0].pos > 0 ? posFill : negFill;

        // const stroke = (
        //   d[0].value > 0 || 
        //   (d[0].value === 0 && !!d[0].pos)
        // ) ? posStroke : negStroke;
        const stroke = d[0].pos > 0 ? posStroke : negStroke;

        graph.append('path')
          .datum(d)
          .attr('class', 'area')
          .attr('fill', fill)
          .attr('d', area);

        graph.append('path')
          .datum(d)
          .attr('class', 'line')
          .attr('stroke', stroke)
          .attr('d', valueline);
      });

      graph.selectAll("dot")
        .data(rawData)
        .enter()
          .append('circle')
            .attr('r', 3.5)
            .attr('fill', d => {
              return d.value >= 0 ? posStroke : negStroke;
            })
            .attr('cx', d => x(d.key))
            .attr('cy', d => y(d.value))
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

      // add the X Axis
      graph.append("g")
        .attr("transform", "translate(0," + y(0) + ")")
        .attr('class', 'axis')
        .call(d3.axisBottom(x));

      // add the Y Axis
      graph.append("g")
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    }    


    return (
      <div className='rc-line-graph'>
        {label !== '' && <h3 className='compare-heading'>{label}</h3>}
        <div className={classNames(graphClass, 'lg')} id={graphID} ref={graphRef}>

        </div>
      </div>
    );
  }
}

export default LineGraph;
