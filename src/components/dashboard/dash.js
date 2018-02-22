import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import Header from '../common/header';
import Footer from '../common/footer';

import Avatar from 'material-ui/Avatar';

import './styles/dash.css';

import { getMasteryIconUrl, getTierIconUrl, getChampionIconUrl, getProfileIconUrl} from '../../shared/helpers/staticImageHelper.js';
import { numberFormatter } from '../../shared/helpers/numberHelper.js';
import { hasDataLoaded } from '../../shared/helpers/loaderHelper.js';

import Matches from './matches';
import MatchStatsRadar from './radar';
import ChampionTable from './championtable';
import DashboardHeader from './dashboardheader';
import MatchLawn from './matchlawn';

import LoadingScreen from '../common/loadingscreen';

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

  static defaultProps = {
    gotoPregame: () => {console.log('TODO')}
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

  onQueueSelect = (option) => {
    this.setState({
      queueFilter: option.value,
    });
  }

  onChampionSelect = (champion) => {
    this.setState({
      championFilter: champion
    });
  }

  render() {
    const {summoner, matches, currentMatch, staticData} = this.props;
    const {matchesToDisplay, dateFilter, championFilter, queueFilter} = this.state;
    const isSummonerInMatch = Object.keys(currentMatch).length > 0;

    if (!hasDataLoaded([summoner, matches, staticData])){
      return(<LoadingScreen/>);
    }

    return (
      <div className='Dashboard'>
        <Header/>
        <Link to={`/l/${summoner.region}/${summoner.name}`}>
          <button disabled={!isSummonerInMatch}>
            Go to pregame
          </button>
        </Link>
        <div className="content">
          <DashboardHeader summonerInfo={summoner}
            version={staticData.version}/>
          <div className="dashboard-body">
            <div className="dashboard-body-left-container">
              <div className="dashboard-body-graphs">
                <MatchLawn lawn={summoner.lawn} onDateSelect={this.onDateSelect}/>
                <MatchStatsRadar matches={matches}/>
              </div>
              <Matches matches={matches}
                version={staticData.version}
                limit={matchesToDisplay}
                dateFilter={dateFilter}
                championFilter={championFilter}
                queueFilter={queueFilter}/>
              <div className="dashboard-show-more" onClick={(event) => this.setState(prevState => {return {matchesToDisplay: prevState.matchesToDisplay += 10}})}>
                <h2>Load 10 more matches</h2>
              </div>
            </div>
            <div className="dashboard-body-right-container">
              <ChampionTable championStats={summoner.championStats}
                summonerName={summoner.name}
                summonerRegion={summoner.region}
                version={staticData.version}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;