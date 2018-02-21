import React, { Component } from 'react';

import REGION from '../../shared/constants';
import Dropdown from 'react-dropdown'

class MatchFilter extends Component{
  constructor(props){
    super(props);

    this.state = {
      queue: '',
      champion: '',
    };
  }

  _onQueueChange = (option) => {
    this.props.onQueueSelect(option);
    this.setState({
      queue: option.value,
    });
  }

  _onChampionChange = (option) => {

  }

  render(){


    return(
      <div className="regionSelector">
        <Dropdown className="dropdown" options={regions} onChange={this._onChange} value={this.state.region} placeholder="Select an option" />
      </div>
    );
  }
}

export default MatchFilter;