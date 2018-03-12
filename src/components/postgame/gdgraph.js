import React, { Component } from 'react';

// import { Line } from 'react-chartjs-2';
import LineGraph from '../common/graph/LineGraph';


class GoldDiffGraph extends Component {
  getData = (frameData) => {
    // let data = [];

    return frameData.map((frame, index) => {
      let diff = frame.teams['100'].gold - frame.teams['200'].gold;
      
      return ({
        key: index,
        value: diff
      });
    });
  }
/*
  renderLineGraph(){
    let labels = [];
    let data = [];

    let blueData = [];
    let redData = [];

    this.props.frameData.map((frame, index) => {
      labels.push(index);
      let diff = frame.teams['100'].gold - frame.teams['200'].gold;
      if (diff > 0){
        blueData.push(diff);
        redData.push(0);
      }
      else {
        blueData.push(0);
        redData.push(diff);
      }
    });

    let red = "rgba(255, 151, 147, 0.4)";
    let blue = "rgba(76, 127, 152, 0.4)";

    var data = {
      labels: labels,
      datasets: [
        {
          fillColor: blue,
          strokeColor: blue,
          pointColor: blue,
          backgroundColor: blue,
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: blue,
          data: blueData,
        },
        {
          fillColor: red,
          strokeColor: red,
          pointColor: red,
          backgroundColor: red,
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: red,
          data: redData,
        }
      ],
    };
    
    var options = {
      maintainAspectRatio: false,
      legend:{
        display: false,
      },
      scales: {
        xAxes: [{
          gridLines: {
            display:false
          },
          ticks: {
            fontFamily: "Muli",
            autoSkip: true,
            maxTicksLimit: 10
          }
        }],
        yAxes: [{
          gridLines: {
            display:true
          },
          ticks: {
            fontFamily: "Muli",
          }
        }]
      }
    };

    return(
      <div className="lineGraph">
        <Line className="lineChart" data={data} options={options}/>
      </div>
    );
  }
*/
  


  //         {this.renderLineGraph()}

  render(){
    const data = this.getData(this.props.frameData);
    return(
      <div className="gdContainer">
        <LineGraph
          graphID='PG-TGD'
          label='Team Gold Difference'
          data={data}
          height={250}
          width={380}
        />
      </div>
    );
  }
}

export default GoldDiffGraph;
