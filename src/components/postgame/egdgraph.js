import React, { Component } from 'react';

import LineGraph from '../common/graph/LineGraph';

class EffectiveGoldDiffGraph extends Component{
  getData = (frameData) => {
    return frameData.map((frame, index) => {
      let diff = frame.teams['100'].effectiveGold - frame.teams['200'].effectiveGold;
      return ({
        key: index,
        value: diff
      });
    });
  }

  render(){
    const data = this.getData(this.props.frameData);
    return(
      <div className="egdContainer">
        <LineGraph
          graphID='PG-TEGD'
          label='Team Effective Gold Difference'
          data={data}
          height={245}
          width={352}
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

export default EffectiveGoldDiffGraph;