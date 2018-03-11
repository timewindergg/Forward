import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';



import './styles/CompareCardMiddle.css';

import {roundWithPrecision} from '../../../shared/helpers/numberHelper.js';

import * as d3 from 'd3';

import HorizontalBarGraph from '../../common/graph/HorizontalBarGraph';

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

  fetchCsData = (dataRed, dataBlue) => {
    let labelMap = {
      cs10: '@ 10',
      cs20: '@ 20',
      cs30: '@ 30'
    };

    let csRed = {
      cs10: 0,
      cs20: 0,
      cs30: 0,
      // totalCs: 0,
    };

    let csBlue = {
      cs10: 0,
      cs20: 0,
      cs30: 0,
      // totalCs: 0,
    };

    if (Object.keys(dataRed).length > 0 && !!dataRed.stats) {
      csRed.cs10 = dataRed.stats.cs10;
      csRed.cs20 = dataRed.stats.cs20;
      csRed.cs30 = dataRed.stats.cs30;
      // csRed.totalCs = dataRed.stats.totalCs;
    }

    if (Object.keys(dataBlue).length > 0 && !!dataBlue.stats) {
      csBlue.cs10 = dataBlue.stats.cs10;
      csBlue.cs20 = dataBlue.stats.cs20;
      csBlue.cs30 = dataBlue.stats.cs30;
      // csBlue.totalCs = dataBlue.stats.totalCs;
    }

    let csDiff = {};

    Object.keys(csRed).forEach(cs => {
      csDiff[cs] = roundWithPrecision(csRed[cs] - csBlue[cs], 0);
    })

    return Object.keys(csDiff).map((csKey, idx) => {
      return {
        key: csKey,
        value: csDiff[csKey],
        label: `${Math.abs(csDiff[csKey])} ${labelMap[csKey]}`
      }
    });
  }

  fetchGoldData = (dataRed, dataBlue) => {
    let labelMap = {
      gold10: '@ 10',
      gold20: '@ 20',
      gold30: '@ 30'
    };

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
      goldDiff[cs] = roundWithPrecision(goldRed[cs] - goldBlue[cs], 0);
    })

    return Object.keys(goldDiff).map((csKey, idx) => {
      return {
        key: csKey,
        value: goldDiff[csKey],
        label: `${Math.abs(goldDiff[csKey])} ${labelMap[csKey]}`
      }
    });
  }

  render() {
    const {dataRed, dataBlue} = this.props;

    const csData = this.fetchCsData(dataRed, dataBlue);
    const goldData = this.fetchGoldData(dataRed, dataBlue);

    return (
      <div className='rc-compare-card-middle'>
        <div className='compare-graph'>
          <HorizontalBarGraph
            graphID='ccm-cs'
            label='CS Advantage'
            isCentered={true}

            height={90}
            width={500}

            data={csData}
            fillInfo={{
              pos: '#ff9793',
              neg: '#8CAFFF'
            }}
          />    
        </div>
        <div className='compare-graph'>
          <HorizontalBarGraph
            graphID='ccm-gold'
            label='Gold Advantage'
            isCentered={true}

            height={90}
            width={500}

            data={goldData}
            fillInfo={{
              pos: '#ff9793',
              neg: '#8CAFFF'
            }}
          />    
        </div>
      </div>
    );
  }
}

export default CompareCardMiddle;
