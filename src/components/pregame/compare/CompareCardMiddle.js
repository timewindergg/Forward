import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {HorizontalBar} from 'react-chartjs-2';

import './styles/CompareCardMiddle.css';

import {roundWithPrecision} from '../../../shared/helpers/numberHelper.js';

import * as d3 from 'd3';

class CompareCardMiddle extends Component {
  static propTypes = {
    dataRed: PropTypes.object.isRequired,
    dataBlue: PropTypes.object.isRequired
    // isRed: PropTypes.bool.isRequired,
    // compareData: PropTypes.object.isRequired
  }

  static defaultProps = {
    dataRed: {},
    dataBlue: {}
  }

  // so you can get the underlying graph instance
  // and do weird stuff to it
  fetchCsData = (dataRed, dataBlue) => {
    let csRed = {
      cs10: 0,
      cs20: 0,
      cs30: 0,
      totalCs: 0
    };

    let csBlue = {
      cs10: 0,
      cs20: 0,
      cs30: 0,
      totalCs: 0
    };

    if (Object.keys(dataRed).length > 0 && !!dataRed.stats) {
      csRed.cs10 = dataRed.stats.cs10;
      csRed.cs20 = dataRed.stats.cs20;
      csRed.cs30 = dataRed.stats.cs30;
      csRed.totalCs = dataRed.stats.totalCs;
    }

    if (Object.keys(dataBlue).length > 0 && !!dataBlue.stats) {
      csBlue.cs10 = dataBlue.stats.cs10;
      csBlue.cs20 = dataBlue.stats.cs20;
      csBlue.cs30 = dataBlue.stats.cs30;
      csBlue.totalCs = dataBlue.stats.totalCs;
    }

    let csDiff = {};

    Object.keys(csRed).forEach(cs => {
      csDiff[cs] = roundWithPrecision(-csRed[cs] + csBlue[cs], 2);
    })

    return Object.keys(csDiff).map((csKey, idx) => {
      return {
        key: csKey,
        value: csDiff[csKey],
        idx: idx
      }
    });
  }

  fetchGoldData = (dataRed, dataBlue) => {
    let goldRed = {
      gold10: 0,
      gold20: 0,
      gold30: 0
    };

    let goldBlue = {
      gold10: 0,
      gold20: 0,
      gold30: 0
    };

    if (Object.keys(dataRed).length > 0 && !!dataRed.stats) {
      goldRed.gold10 = dataRed.stats.gold10;
      goldRed.gold20 = dataRed.stats.gold20;
      goldRed.gold30 = dataRed.stats.gold30;
    }

    if (Object.keys(dataBlue).length > 0 && !!dataBlue.stats) {
      goldBlue.gold10 = dataBlue.stats.gold10;
      goldBlue.gold20 = dataBlue.stats.gold20;
      goldBlue.gold30 = dataBlue.stats.gold30;
    }

    let goldDiff = {};

    Object.keys(goldRed).forEach(cs => {
      goldDiff[cs] = roundWithPrecision(-goldRed[cs] + goldBlue[cs], 2);
    })

    return Object.keys(goldDiff).map((csKey, idx) => {
      return {
        key: csKey,
        value: goldDiff[csKey],
        idx: idx
      }
    });
  }

  componentDidMount() {
    const {dataRed, dataBlue} = this.props;

    const csData = this.fetchCsData(dataRed, dataBlue);
    // const goldData = this.fetchGoldData(dataRed, dataBlue);

    if (!!this.refs.CS) {
      console.log('D3MAGIC', csData);

      const width = 500;
      const height = 250;

      let maxCS = 0;
      csData.forEach(cs => {
        maxCS = Math.max(maxCS, Math.abs(cs.value));
      });
        // .padding(0.1);
        // .rangeRoundBands([0, height], 0.1);

      // let xAxis = d3.axisBottom(x);

      // let yAxis = d3.axisLeft(y)
      //   .tickSize(0)
      //   .tickPadding(6);

      let csGraph = d3.select('#cmc-cs')
        .append('svg')
          .attr('width', width)
          .attr('height', height)
        .append('g');

      console.log('D3MAGIC', csGraph);

      // var x = d3.scaleLinear().range([-maxCS, maxCS]);
      var x = d3.scaleLinear()
        .domain([-maxCS, maxCS])
        .range([0, width]);
      var y = d3.scaleBand().range([height, 0]);

      console.log('D3MAGIC', x, y);

      // TODO: class attr after enter append rect
      csGraph.selectAll('.bar')
        .data(csData)
        .enter().append('rect')
        .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
        .attr('x', d => x(Math.min(0, d.value)))
        .attr('y', d => {
          // return y(d.idx * 50);
          return d.idx * y.bandwidth() / 4;
          // return y(d.key);
        })
        .attr('width', d => {
          console.log('D3MAGIC', Math.abs(x(d.value) - x(0)), y.bandwidth());
          return Math.abs(x(d.value) - x(0))
        })
        .attr('height', y.bandwidth() / 4)

      csGraph.append("g")
        .data(csData)
        .attr("class", "x axis")
        // .attr("transform", d => {
        //   console.log('D3MAGIC TRANSFORM', d);
        //   return "translate(0," + d.idx * 50 + ")";
        // })
        .call(d3.axisBottom(x));

      csGraph.append("g")
        .attr("class", "y axis")
        // .attr("transform", "translate(" + x(0) + ",0)")
        .call(d3.axisLeft(y));
    }
  }

  render() {

    // if (!!this.refs.CsGraph) {
    //   this.manipulateCsGraph();
    // }

/*
<div className='compare-graph' id='cmc-gold'>
          <h2>Gold Differentials</h2>
    </div>
*/
    console.log('D3MAGIC', this.refs);
    

    return (
      <div className='rc-compare-card-middle' ref='asdf'>
        <h2 ref='BLAG'>Cs Differentials</h2>
        <div className='compare-graph' id='cmc-cs' ref='CS'>

        </div>
        
      </div>
    );
  }
}

export default CompareCardMiddle;











/*
return (
      <div className='rc-compare-card-middle'>
        <div className='compare-graph'>
          <h2>Cs Differentials</h2>
          <div className='graph-wrapper'>
            <HorizontalBar
              data={csDataParams}
              legend={{display: false}}
              ref={'CsGraph'}

              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>
        <div className='compare-graph'>
          <h2>Gold Differentials</h2>
          <div className='graph-wrapper'>
            <HorizontalBar
              data={goldDataParams}
              legend={{display: false}}
              ref={'GoldGraph'}

              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>
      </div>
    );

*/
