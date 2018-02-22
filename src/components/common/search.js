import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import REGION from '../../shared/constants';
import RegionSelector from './regionselector.js';

class Search extends Component {
  state = {
    summoner: '',
    server: REGION.NA,
  }  

  onRegionSelect = (option) => {
    this.setState({
      server: REGION[option.value],
    });
  }

  _handleKeyPress = (event) => {
    if (event.key === 'Enter'){
      if (this.state.summoner.length > 0){
        window.location.href = `/p/${this.state.server}/${this.state.summoner}`;
      }
      event.preventDefault();
    }
  }

  render() {
    const {summoner, server} = this.state;

    return (
      <div className="lookup">
        <RegionSelector onRegionSelect={this.onRegionSelect}/>
        <input id="searchField" className="textfield" type="text"
          maxLength="25"
          placeholder="Search summoner name"
          value={summoner}
          onChange={(event) => this.setState({summoner: event.target.value})}
          onKeyPress={this._handleKeyPress}
        />
        <Link className={classNames({'inactive': this.state.summoner.length === 0})} to={`/p/${server}/${summoner}`}>
          <div className="searchIcon">
            <i className="fas fa-search"></i>
          </div>
        </Link>
      </div>
    );
  }
}

export default Search;