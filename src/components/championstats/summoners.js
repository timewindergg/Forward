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

class SummonerSet extends Component{
    render (){
      return (
        <div className="summonerSet">
          <Summoner summoner={this.props.set[0]} version={this.props.version} />
          <Summoner summoner={this.props.set[1]} version={this.props.version} />
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
          <SummonerSet set={[summoners[0], summoners[1]]} version={version} />
        </div>
      </div>
    );
  }
}

export default Summoners;
