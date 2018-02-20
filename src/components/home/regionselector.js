import React, { Component } from 'react';

import REGION from '../../shared/constants';
import Dropdown from 'react-dropdown'

class RegionSelector extends Component{
  constructor(props){
    super(props);

    this.state = {
      region: REGION.NA,
    };
  }

  render(){
    let regions = Object.keys(REGION);

    return(
      <div className="regionSelector">
        <Dropdown className="dropdown" options={regions} onChange={this._onSelect} value={regions[0]} placeholder="Select an option" />
      </div>
    );
  }
}

export default RegionSelector;