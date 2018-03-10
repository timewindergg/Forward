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
        return d.key; 
      })).padding(0.1);

      // TODO: class attr after enter append rect
      //           // .attr('class', (d) =>{ return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
      let graphInternal = graph.selectAll('.bar')
        .data(data)
        .enter().append('g');
      
      graphInternal.append('rect')
          .attr('x', d => x(Math.min(0, d.value)))
          .attr('y', d => y(d.key))
          .attr('width', d => Math.abs(x(d.value) - x(0)))
          .attr('height', y.bandwidth())
          .attr('fill', (d) => {
            return d.value < 0 ? negColor : posColor;
          })

      graphInternal.append('text')
            .attr('class', classNames('value-text', valueLabelClass))
            .attr('text-anchor', d => {
              // const barLength = Math.abs(x(d.value) - x(0));
              return d.value <= 0 ? 'start' : 'end';
            })
            .attr('font-weight', 600)
            .attr('x', d => {
              // const padding = d.value <= 0 ? y.bandwidth() / 2 : -y.bandwidth() / 2;
              const padding = d.value <= 0 ? 8 : -8;
              return x(d.value) + padding;
            })
            .attr('y', d => y(d.key) + y.bandwidth() / 2)
            .attr('dy', '.35em') //vertical align middle
            .text((d) => d.value);

      graph.append("g")
        .attr('class', 'y axis')
        .attr("transform", "translate(" + width/2 + ",0)")
        .call(
          d3.axisLeft(y)
        );
    }    


    return (
      <div className='rc-horizontal-bar-graph'>
        {label !== '' && <h2 >{label}</h2>}
        <div className={classNames(graphClass, 'hbg')} id={graphID} ref={graphRef}>

        </div>
      </div>
    );
  }
}

export default HorizontalBarGraph;











/*
return (
      <div className='rc-compare-card-middle'>
        <div className='compare-graph'>
          <h2>Cs Differentials</h2>
          <div className='graph-wrapper'>

          </div>
        </div>
        <div className='compare-graph'>
          <h2>Gold Differentials</h2>
          <div className='graph-wrapper'>
            
          </div>
        </div>
      </div>
    );

*/
