import React, { Component } from 'react';

import { REGION } from '../../shared/constants';
import Dropdown from 'react-dropdown'

import {
  LAST_SEARCHED_KEY,
  getCookie
} from '../../shared/helpers/cookieHelper';

class RegionSelector extends Component{
  constructor(props){
    super(props);

    // check last searched cookie
    // if doesn't exist, do NA
    const savedRegion = getCookie(LAST_SEARCHED_KEY);

    this.state = {
      region: !REGION[savedRegion] ? REGION.NA.toUpperCase() : savedRegion,
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