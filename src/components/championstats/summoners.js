import React, { Component } from 'react';
import classNames from 'classnames';

import { getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';

class Summoner extends Component {
  render(){
    return (
      <div className="summoner">
        <div className="summonerImg">
          <img className="summonerIcon icon" src={getSpellIconUrl(this.props.summoner, this.props.version)}/>
        </div>
      </div>
    );
  }
}

class Summoners extends Component {

  render() {
    const {summoners, version} = this.props;

    return (
      <div>
        <h3>Most used summoners</h3>
        <div className="champion-stats-champion-summoners">
          <Summoner summoner={summoners[0]} version={version} />
          <Summoner summoner={summoners[1]} version={version} />
        </div>
      </div>
    );
  }
}

export default Summoners;