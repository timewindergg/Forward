import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {SUMMONER_PARAM, REGION_PARAM} from '../../constants/RouteConstants';
import {getSummonerInfo} from '../../apiutils/summonerAPIUtils';

import Dashboard from '../../components/dashboard/dash';

class DashboardContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // for react router
    getSummonerInfo: PropTypes.func.isRequired
  }

  componentWillMount() {
    const {match, getSummonerInfo} = this.props;
    const summonerName = match.params[SUMMONER_PARAM];
    const region = match.params[REGION_PARAM];
    
    // on page load, fetch info about the summoner
    getSummonerInfo(summonerName, region);
  }


  render() {
    const {match} = this.props;

    return (
      <Dashboard
        summoner={match.params.summonerName}
      />
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({});

// we will probably need this later
const mapDispatchToProps = (dispatch) => ({
  getSummonerInfo: (summonerName, region) => dispatch(getSummonerInfo(summonerName, region)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
