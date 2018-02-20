import React, { Component } from 'react';

import REGION from '../../shared/constants';
import Dropdown from 'react-dropdown'

class RegionSelector extends Component{
  constructor(props){
    super(props);

    this.state = {
      region: REGION.NA.toUpperCase(),
    };
  }

  _onChange = (option) => {
    this.props.onRegionSelect(option);
    this.setState({
      region: option.value,
    });
  }

  render(){
    let regions = Object.keys(REGION);

    return(
      <div className="regionSelector">
        <Dropdown className="dropdown" options={regions} onChange={this._onChange} value={this.state.region} placeholder="Select an option" />
      </div>
    );
  }
}

export default RegionSelector;