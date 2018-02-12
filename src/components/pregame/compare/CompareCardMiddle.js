import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {HorizontalBar} from 'react-chartjs-2';

import Avatar from 'material-ui/Avatar';

import './CompareCardMiddle.css';

import {roundWithPrecision} from '../../../shared/helpers/numberHelper.js';

class CompareCardMiddle extends Component {
  constructor(props) {
    super(props);
  }

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

  // static propTypes = {
  //   data: PropTypes.oneOfType([
  //     PropTypes.object,
  //     PropTypes.func
  //   ]).isRequired,
  //   getDatasetAtEvent: PropTypes.func,
  //   getElementAtEvent: PropTypes.func,
  //   getElementsAtEvent: PropTypes.func,
  //   height: PropTypes.number,
  //   legend: PropTypes.object,
  //   onElementsClick: PropTypes.func,
  //   options: PropTypes.object,
  //   plugins: PropTypes.arrayOf(PropTypes.object),
  //   redraw: PropTypes.bool,
  //   type: function(props, propName, componentName) {
  //     if(!Chart.controllers[props[propName]]) {
  //       return new Error(
  //         'Invalid chart type `' + props[propName] + '` supplied to' +
  //         ' `' + componentName + '`.'
  //       );
  //     }
  //   },
  //   width: PropTypes.number,
  //   datasetKeyProvider: PropTypes.func
  // }

  // so you can get the underlying graph instance
  // and do weird stuff to it
  manipulateCsGraph = () => {
    console.log(this.refs.CsGraph.chartInstance);
  }

  fetchCsData = (dataRed, dataBlue) => {
    let csRed = [0,0,0,0];
    let csBlue = [0,0,0,0];

    if (Object.keys(dataRed).length > 0 && !!dataRed.stats) {
      csRed[0] = dataRed.stats.cs10;
      csRed[1] = dataRed.stats.cs20;
      csRed[2] = dataRed.stats.cs30;
      csRed[3] = dataRed.stats.totalCs;
    }

    if (Object.keys(dataBlue).length > 0 && !!dataBlue.stats) {
      csBlue[0] = dataBlue.stats.cs10;
      csBlue[1] = dataBlue.stats.cs20;
      csBlue[2] = dataBlue.stats.cs30;
      csBlue[3] = dataBlue.stats.totalCs;
    }

    return csRed.map((cs, idx) => roundWithPrecision(-cs + csBlue[idx], 2));
  }

  fetchGoldData = (dataRed, dataBlue) => {
    let goldRed = [0,0,0];
    let goldBlue = [0,0,0];

    if (Object.keys(dataRed).length > 0 && !!dataRed.stats) {
      goldRed[0] = dataRed.stats.gold10;
      goldRed[1] = dataRed.stats.gold20;
      goldRed[2] = dataRed.stats.gold30;
    }

    if (Object.keys(dataBlue).length > 0 && !!dataBlue.stats) {
      goldBlue[0] = dataBlue.stats.gold10;
      goldBlue[1] = dataBlue.stats.gold20;
      goldBlue[2] = dataBlue.stats.gold30;
    }

    return goldRed.map((g, idx) => roundWithPrecision(-g + goldBlue[idx], 2));
  }

  render() {
    const {dataRed, dataBlue} = this.props;

    const csData = this.fetchCsData(dataRed, dataBlue);
    const goldData = this.fetchGoldData(dataRed, dataBlue);

    const csDataParams = {
      labels: ['Cs 10', 'Cs 20', 'Cs 30', 'Total Cs'],
      datasets: [
        {
          label: '',
          backgroundColor: '#FF8888',
          borderColor: '#FF3333',
          borderWidth: 1,
          data: csData
        }
      ]
    };

    const goldDataParams = {
      labels: ['Gold 10', 'Gold 20', 'Gold 30'],
      datasets: [
        {
          label: '',
          backgroundColor: '#FFEE88',
          borderColor: '#FFDD33',
          borderWidth: 1,
          data: goldData
        }
      ]
    };

    if (!!this.refs.CsGraph) {
      this.manipulateCsGraph();
    }

    return (
      <div className='rc-compare-card-middle'>
        <div className='compare-graph'>
          <h2>Cs Differentials</h2>
          <HorizontalBar
            data={csDataParams}
            legend={{display: false}}
            ref={'CsGraph'}
            height={300}
            width={700}
          />
        </div>
        <div className='compare-graph'>
          <h2>Gold Differentials</h2>
          <HorizontalBar
            data={goldDataParams}
            legend={{display: false}}
            ref={'GoldGraph'}
            height={300}
            width={700}
          />
        </div>
      </div>
    );
  }
}

export default CompareCardMiddle;
