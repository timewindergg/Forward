import React, { Component } from 'react';
import classNames from 'classnames';

import { getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';
import { roundWithPrecision } from '../../shared/helpers/numberHelper.js';
import {getPercentClass} from '../../shared/helpers/cssHelper';

class Summoner extends Component {
  render(){
    return (
      <div className="summoner">
        <div className="summonerImg">
          <img className="summonerIcon icon" src={getSpellIconUrl(this.props.summoner, this.props.version)} alt=""/>
        </div>
      </div>
    );
  }
}

class SummonerSet extends Component{
    render (){
      return (
        <div className='set-wrapper'>
          <div className="summonerSet">
            <Summoner summoner={this.props.set[0]} version={this.props.version} />
            <Summoner summoner={this.props.set[1]} version={this.props.version} />
          </div>
          <span className={classNames('ss-pcnt', getPercentClass(this.props.percent))}>
            {`${this.props.percent}%`}
          </span>
        </div>
      );
    }
}

class Summoners extends Component {

  render() {
    const {summoners, version} = this.props;

    const rawSets = getPercents(summoners);

    const summonerSets = rawSets.map((rs) => (
      <SummonerSet
        set={rs.summoner_set}
        percent={rs.usagePercent}
        version={version}
      />
    ));

    return (
      <div>
        <h3>Most used summoners</h3>
        <div className="champion-stats-champion-summoners">
          {summonerSets}
        </div>
      </div>
    );
  }
}

const getPercents = (summoners) => {
  const total = summoners.reduce((r, v) => r + v.occurence, 0);

  // get top 4 sorted by occurrences
  return summoners.sort((a, b) => {
    if (a.occurence < b.occurence){ return 1; }
    else if (a.occurence > b.occurence) { return -1; }
    return 0;
  }).map((summoner) => {
    return {
      summoner_set: JSON.parse(summoner.summoner_set),
      usagePercent: roundWithPrecision(100*summoner.occurence/total, 1)
    };
  }).slice(0, 5);
};

export default Summoners;
// slice 0 5