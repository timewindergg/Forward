import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectSummoner } from '../../actions/pregameActions';

import OverviewCard from '../../components/pregame/overview/OverviewCard';

class OverviewCardContainer extends Component {
  static propTypes = {
    summoner: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired,
    isRed: PropTypes.bool.isRequired,

    selectedRed: PropTypes.number.isRequired,
    selectedBlue: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  render() {
    const {summoner, details, isRed, selectedRed, selectedBlue, onSelect} = this.props;
    const isSelected = isRed ?
      summoner.id === selectedRed : summoner.id === selectedBlue;

    return (
      <OverviewCard
        summoner={summoner}
        details={details}
        isRed={isRed}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  selectedRed: state.pregame.selectedRed,
  selectedBlue: state.pregame.selectedBlue
});

const mapDispatchToProps = (dispatch) => ({
  onSelect: (summonerID, isRed) => dispatch(selectSummoner(summonerID, isRed))
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewCardContainer);
