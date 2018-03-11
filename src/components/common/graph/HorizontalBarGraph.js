import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles/HorizontalBarGraph.css';

import {roundWithPrecision} from '../../../shared/helpers/numberHelper.js';

import * as d3 from 'd3';

const POS_COLOR = '#4682b4';
const NEG_COLOR = '#ff8c00';

class HorizontalBarGraph extends Component {
  static propTypes = {
    graphID: PropTypes.string.isRequired,
    label: PropTypes.string,
    isCentered: PropTypes.bool,
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

  // TODO: shouldComponentUpdate when we actually update
  shouldComponentUpdate(newProps) {
    // idk
    return true;
  }

  getLabel = (d) => {
    return !!d.label ? d.label : d.key;
  }

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

    const posColor = !!fillInfo.pos ? fillInfo.pos : POS_COLOR;
    const negColor = !!fillInfo.neg ? fillInfo.neg : NEG_COLOR;

    const graphRef = `REF-${graphID}`;
    if (!!this.refs[graphRef]) {
      // console.log('D3MAGIC', data);
      d3.select(`[graph-id='${graphID}']`).remove();

      let maxVal = 0;
      data.forEach(cs => {
        maxVal = Math.max(maxVal, Math.abs(cs.value));
      });

      let graph = d3.select(`#${graphID}`)
        .append('svg')
          .attr('width', width)
          .attr('height', height)
          .attr('graph-id', graphID)
        .append('g');

      // var x = d3.scaleLinear().range([-maxCS, maxCS]);
      var x = d3.scaleLinear()
        .range([0, width]);

      if (isCentered) {
        x.domain([-maxVal, maxVal]);
      } else {
        x.domain([0, maxVal]);
      }

      var y = d3.scaleBand().range([0, height]);
      y.domain(data.map((d) => {
        return this.getLabel(d); 
      })).padding(0.1);

      // TODO: class attr after enter append rect
      let graphInternal = graph.selectAll('.bar')
        .data(data)
        .enter().append('g');
      
      graphInternal.append('rect')
          .attr('x', d => width/2)
          .attr('y', d => y(this.getLabel(d)))
          .attr('width', d => 0)
          .transition().duration(300).ease(d3.easeLinear)
          .attr('x', d => x(Math.min(0, d.value)))
          .attr('width', d => Math.abs(x(d.value) - x(0)))
          .attr('height', y.bandwidth())
          .attr('fill', (d) => {
            return d.value < 0 ? negColor : posColor;
          })

      // graphInternal.append('text')
      //       .attr('class', classNames('value-text', valueLabelClass))
      //       .attr('text-anchor', d => {
      //         // const barLength = Math.abs(x(d.value) - x(0));
      //         return d.value <= 0 ? 'start' : 'end';
      //       })
      //       .attr('font-weight', 600)
      //       .attr('x', d => {
      //         // const padding = d.value <= 0 ? y.bandwidth() / 2 : -y.bandwidth() / 2;
      //         const padding = d.value <= 0 ? 8 : -8;
      //         return x(d.value) + padding;
      //       })
      //       .attr('y', d => y(d.key) + y.bandwidth() / 2)
      //       .attr('dy', '.35em') //vertical align middle
      //       .text((d) => d.value);

      graph.append("g")
        .data(data)
        .attr('class', 'y axis')
        .attr('transform', d => {
          return `translate(${width/2}, 0)`
        })
        .call(
          d3.axisLeft(y)
        );
    }    


    return (
      <div className='rc-horizontal-bar-graph'>
        {label !== '' && <div className='compare-heading'>{label}</div>}
        <div className={classNames(graphClass, 'hbg')} id={graphID} ref={graphRef}>

        </div>
      </div>
    );
  }
}

export default HorizontalBarGraph;
