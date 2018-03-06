import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import './styles/dash.css';
import './styles/lawn.css';
import './styles/matchlist.css';
import './styles/matchfilter.css';
import './styles/recentlyplayedlist.css';
import './styles/championfilter.css';
import '../common/styles/summonerheader.css';
import '../common/styles/userchampionlist.css';

import { numberFormatter } from '../../shared/helpers/numberHelper.js';
import { hasDataLoaded } from '../../shared/helpers/loaderHelper.js';

import Matches from './matches';
import MatchStatsRadar from './radar';
import MatchLawn from './matchlawn';
import MatchFilter from './matchfilter';
import RecentlyPlayedWith from './recentlyplayedlist';
import SummonerHeader from '../common/summonerheader';
import LoadingScreen from '../common/loadingscreen';
import UserChampionList from '../common/userchampionlist';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matchesToDisplay: 10,
      dateFilter: '',
      championFilter: '',
      queueFilter: ''
    }
  }

  static propTypes = {
    summoner: PropTypes.object.isRequired,
    matches: PropTypes.array.isRequired,
    currentMatch: PropTypes.object.isRequired
  }

  onDateSelect = (date) => {
    this.setState({
      dateFilter: date.date
    });
  }

  onQueueSelect = (queue) => {
    this.setState({
      queueFilter: queue,
    });
  }

  onChampionSelect = (champion) => {
    this.setState({
      championFilter: champion
    });
  }

  render() {
    const {summoner, matches, currentMatch, staticData} = this.props;
    console.log(matches);
    const {matchesToDisplay, dateFilter, championFilter, queueFilter} = this.state;
    const isSummonerInMatch = Object.keys(currentMatch).length > 0;

    if (!hasDataLoaded([summoner, matches, staticData])){
      return(<LoadingScreen/>);
    }

    return (
      <div className='Dashboard'>
        <div className="content">
          <SummonerHeader summonerInfo={summoner}
            staticData={staticData}/>
          <div className="dashboard-body">
            <div className="dashboard-body-left-container">
              <div className="dashboard-body-graphs">
                <MatchLawn lawn={summoner.lawn} onDateSelect={this.onDateSelect}/>
                <MatchStatsRadar matches={matches}/>
              </div>
              <div className="matchlist-container">
                <MatchFilter matches={matches}
                  onQueueSelect={this.onQueueSelect}
                  onChampionSelect={this.onChampionSelect}
                  onDateSelect={this.onDateSelect}
                  championData={staticData.champions}
                  dateFilter={this.state.dateFilter}
                  version={staticData.version}/>
                <Matches matches={matches}
                  version={staticData.version}
                  limit={matchesToDisplay}
                  dateFilter={dateFilter}
                  championFilter={championFilter}
                  queueFilter={queueFilter}
                  championData={staticData.champions}
                  runeData={staticData.runes}/>
                <div className="dashboard-show-more" onClick={(event) => this.setState(prevState => {return {matchesToDisplay: prevState.matchesToDisplay += 10}})}>
                  <h2>Load 10 more matches</h2>
                </div>
              </div>
            </div>
            <div className="dashboard-body-right-container">
              <UserChampionList championStats={summoner.championStats}
                summonerName={summoner.name}
                summonerRegion={summoner.region}
                staticData={staticData}/>
              <RecentlyPlayedWith matches={matches} region={summoner.region}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
