import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OverviewCardContainer from '../../../containers/pregame/OverviewCardContainer';

import './styles/CurrentMatchOverview.css';

class CurrentMatchOverview extends Component {
  static defaultProps = {
    redTeam: [],
    blueTeam: [],
  }

  static propTypes = {
    redTeam: PropTypes.array.isRequired,
    blueTeam: PropTypes.array.isRequired,
    matchDetails: PropTypes.object.isRequired,
    queueName: PropTypes.string.isRequired,
    staticData: PropTypes.object.isRequired
  }

  renderTeamList = (team, isRed) => {
    const listItems = team.map((summoner) => {
      const details = !!this.props.matchDetails[summoner.id] ?
        this.props.matchDetails[summoner.id] : {};

      return (
        <div className='pregame-team-list-item' key={summoner.id}>
          <OverviewCardContainer
            staticData={this.props.staticData}
            summoner={summoner}
            details={details}
            isRed={isRed}
            queueName={this.props.queueName}
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
        {this.renderTeamList(blueTeam, false)}
        <div className='vs'><h2>VS.</h2></div>
        {this.renderTeamList(redTeam, true)}
      </div>
    );
  }
}

export default CurrentMatchOverview;
