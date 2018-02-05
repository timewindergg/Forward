import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import CompareCard from './CompareCard';

import './CurrentMatchCompare.css';

const UNSELECT_ID = -1;

class CurrentMatchCompare extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    currentMatch: PropTypes.object.isRequired,
    currentMatchDetails: PropTypes.object.isRequired,
    selectedRed: PropTypes.number.isRequired,
    selectedBlue: PropTypes.number.isRequired
  }

  combineMatchAndDetails = (currentMatch, currentMatchDetails) => {
    if (Object.keys(currentMatch).length === 0 || Object.keys(currentMatchDetails) === 0) {
      // if one is empty, return empty
      return {};
    }

    const matchAndDetails = {};
    [...currentMatch.red_team, ...currentMatch.blue_team].forEach((summoner) => {
      // for each summoner in the red and blue team
      // create an object that combines the data returned from currentMatch and currentMatchDetails
      matchAndDetails[summoner.id] = Object.assign({}, summoner, currentMatchDetails[summoner.id]);
    });

    return matchAndDetails;
  }

  render() {
    const {currentMatch, currentMatchDetails, selectedRed, selectedBlue} = this.props;

    const matchAndDetails = this.combineMatchAndDetails(currentMatch, currentMatchDetails);

    const compareDataRed = matchAndDetails[selectedRed] ? matchAndDetails[selectedRed] : {};
    const compareDataBlue = matchAndDetails[selectedBlue] ? matchAndDetails[selectedBlue] : {};

    return (
      <div className='rc-current-match-compare'>
        <CompareCard
          isRed={true}
          compareData={compareDataRed}
        />
        <CompareCard
          isRed={false}
          compareData={compareDataBlue}
        />
      </div>
    );
  }
}

export default CurrentMatchCompare;
