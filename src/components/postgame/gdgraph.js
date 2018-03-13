import React, { Component } from 'react';

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

  render(){
    const data = this.getData(this.props.frameData);
    return(
      <div className="gdContainer">
        <LineGraph
          graphID='PG-TGD'
          label='Team Gold Difference'
          data={data}
          height={235}
          width={340}
          fillInfo={{
            pos: '#E8F1F3',
            neg: '#ffe6e6'
          }}
          strokeInfo={{
            pos: '#8CAFFF',
            neg: '#ff6666' 
          }}
        />
      </div>
    );
  }
}

export default GoldDiffGraph;
