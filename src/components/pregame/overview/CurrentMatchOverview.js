import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OverviewCardContainer from '../../../containers/pregame/OverviewCardContainer';

import './CurrentMatchOverview.css';

class CurrentMatchOverview extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    redTeam: [],
    blueTeam: [],
  }

  static propTypes = {
    redTeam: PropTypes.array.isRequired,
    blueTeam: PropTypes.array.isRequired,
    matchDetails: PropTypes.object.isRequired,
  }

  renderTeamList = (team, isRed) => {
    const listItems = team.map((summoner) => {
      const details = !!this.props.matchDetails[summoner.id] ?
        this.props.matchDetails[summoner.id] : {};

      return (
        <div className='pregame-team-list-item' key={summoner.id}>
          <OverviewCardContainer
            summoner={summoner}
            details={details}
            isRed={isRed}
          />
        </div>
      );
    });

    return(
      <div className='pregame-team-list'>
        {listItems}
      </div>
    );
  }

  render() {
    const {redTeam, blueTeam} = this.props;

    return (
      <div className='rc-current-match-overview'>
        {this.renderTeamList(redTeam, true)}
        <h1>VS.</h1>
        {this.renderTeamList(blueTeam, false)}
      </div>
    );
  }
}

export default CurrentMatchOverview;
