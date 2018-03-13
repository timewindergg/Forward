import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles/dash.css';
import './styles/lawn.css';
import './styles/matchlist.css';
import './styles/matchfilter.css';
import './styles/recentlyplayedlist.css';
import './styles/userstats.css';
import './styles/lanestats.css';
import '../common/styles/summonerheader.css';
import '../common/styles/userchampionlist.css';
import '../common/styles/championfilter.css';

import { hasDataLoaded } from '../../shared/helpers/loaderHelper.js';
import { FILTER } from '../../shared/constants.js';

import Matches from './matches';
import MatchStatsRadar from './radar';
import MatchLawn from './matchlawn';
import MatchFilter from './matchfilter';
import RecentlyPlayedWith from './recentlyplayedlist';
import UserStats from './userstats';
import LaneStats from './lanestats';
import SummonerHeader from '../common/summonerheader';
import LoadingScreen from '../common/loadingscreen';
import UserChampionList from '../common/userchampionlist';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matchesToDisplay: 10,
      filters: {
        dateFilter: '',
        championFilter: '',
        queueFilters: {}
      }
    }
  }

  static propTypes = {
    summoner: PropTypes.object.isRequired,
    loadingState: PropTypes.any.isRequired,
    matches: PropTypes.array.isRequired,
    currentMatch: PropTypes.object.isRequired,

    staticData: PropTypes.object.isRequired,
    limit: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
  }

  onFilterSelect = (value, filterType) => {
    // Create new object.
    let newFilters = JSON.parse(JSON.stringify(this.state.filters));

    switch(filterType) {
      case FILTER.CHAMPION:
        newFilters.championFilter = value;
        break;
      case FILTER.DATE:
        newFilters.dateFilter = value;
        break;
      case FILTER.RESET:
        newFilters = {
          dateFilter: '',
          championFilter: '',
          queueFilters: {}
        }
        break;
      default:
        if (newFilters.queueFilters[value] === undefined) {
          newFilters.queueFilters[value] = 1;
        } else {
          delete newFilters.queueFilters[value];
        }
    }

    this.setState({
      filters: newFilters
    });
  }

  render() {
    const {summoner, loadingState, matches, currentMatch, staticData, limit} = this.props;
    const {matchesToDisplay} = this.state;

    let loadMore;

    if (matchesToDisplay < limit && matches.length > 0) {
      loadMore =
        <div className="dashboard-show-more" onClick={(event) => this.setState(prevState => {return {matchesToDisplay: prevState.matchesToDisplay += 10}})}>
          <h2>Load 10 more matches</h2>
        </div>
    }

    if (!hasDataLoaded([summoner, staticData])){
      return(<LoadingScreen/>);
    }

    return (
      <div className='Dashboard'>
        <div className="dash-header-container">
          <div className="dash-header">
            <SummonerHeader summonerInfo={summoner}
              staticData={staticData}/>
            <div className="separator"></div>
            <div className="statsHeader">
              <MatchLawn lawn={summoner.lawn} onFilterSelect={this.onFilterSelect}/>
              <div className="dashboard-radar">
                <MatchStatsRadar matches={matches}/>
                <UserStats matches={matches}/>
              </div>
              <LaneStats championStats={summoner.championStats}/>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="dashboard-body">
            <div className="dashboard-body-left-container">
              <div className="matchlist-container">
                <MatchFilter
                  matches={matches}
                  championData={staticData.champions}
                  filters={this.state.filters}
                  version={staticData.version}
                  onFilterSelect={this.onFilterSelect}/>
                <Matches
                  loadingState={loadingState}
                  matches={matches}
                  version={staticData.version}
                  limit={matchesToDisplay}
                  filters={this.state.filters}
                  championData={staticData.champions}
                  runeData={staticData.runes}
                  itemData={staticData.items}
                  region={this.props.region}
                />
              </div>
              {loadMore}
            </div>
            <div className="dashboard-body-right-container">

              <UserChampionList championStats={summoner.championStats}
                summonerName={summoner.name}
                summonerRegion={this.props.region}
                staticData={staticData}/>
              <RecentlyPlayedWith matches={matches} region={this.props.region}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
