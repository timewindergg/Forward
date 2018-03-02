import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import CompareCardHeader from './CompareCardHeader';
import CompareCardMiddle from './CompareCardMiddle';
import CompareCardBottom from './CompareCardBottom';

import './styles/CurrentMatchCompare.css';

import {roundWithPrecision} from '../../../shared/helpers/numberHelper.js';

const UNSELECT_ID = -1;

class CurrentMatchCompare extends Component {
  static propTypes = {
    currentMatch: PropTypes.object.isRequired,
    currentMatchDetails: PropTypes.object.isRequired,
    queueName: PropTypes.string.isRequired,
    selectedRed: PropTypes.number.isRequired,
    selectedBlue: PropTypes.number.isRequired
  }

  getWinsData = (currentMatch, compareData, otherChamp) => {
    const placeholder = {
      wins: 0,
      losses: 0,
      totalGames: 0
    };

    if (!currentMatch.winrates || Object.keys(compareData).length === 0) {
      return placeholder;
    }

    const {winrates} = currentMatch;
    const ourChamp = compareData.champion_id;
    const ourWinData = winrates[ourChamp];
    if (!ourWinData || !ourWinData[otherChamp]) {
      return placeholder;
    }

    return {
      wins: ourWinData[otherChamp].wins__sum,
      losses: ourWinData[otherChamp].losses__sum,
      totalGames: ourWinData[otherChamp].total_games__sum
    };
  }

  getTeamWinRate = (currentMatch, currentMatchDetails, isRed) => {
    if (Object.keys(currentMatch).length === 0) { return 0; }

    const team = isRed ? currentMatch.red_team : currentMatch.blue_team;
    let wins = 0;
    let totalGames = 0;

    team.forEach((s) => {
      const stats = currentMatchDetails[s.id] ? currentMatchDetails[s.id].stats : {
        wins: 0,
        losses: 0
      };

      wins += stats.wins;
      totalGames += stats.wins + stats.losses;
    });

    if (totalGames === 0) {
      return 0;
    }

    return roundWithPrecision(100*wins/totalGames, 2);
  }

  getRankedDetails = (compareData, queueName) => {
    if (!compareData || !compareData.leagues || !compareData.leagues[queueName]) {
      return {
        tier: '',
        division: '',
        points: 0
      };
    }

    const rankedDetails = compareData.leagues[queueName];
    return {
      tier: rankedDetails.tier,
      division: rankedDetails.division,
      points: rankedDetails.points
    };
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
    const {currentMatch, currentMatchDetails, selectedRed, selectedBlue, queueName, staticData} = this.props;

    const matchAndDetails = this.combineMatchAndDetails(currentMatch, currentMatchDetails);

    const compareDataRed = matchAndDetails[selectedRed] ? matchAndDetails[selectedRed] : {};
    const compareDataBlue = matchAndDetails[selectedBlue] ? matchAndDetails[selectedBlue] : {};

    // other champion (blue champ) used for the red team player's compare card
    const otherChampRed = matchAndDetails[selectedBlue] ? compareDataBlue.championID : -1;
    // ditto but for the blue team player
    const otherChampBlue = matchAndDetails[selectedRed] ? compareDataRed.championID : -1;

    const rankedDetailsRed = this.getRankedDetails(compareDataRed, queueName);
    const rankedDetailsBlue = this.getRankedDetails(compareDataBlue, queueName);

    const winsDataRed = this.getWinsData(currentMatch, compareDataRed, otherChampRed);
    const winsDataBlue = this.getWinsData(currentMatch, compareDataBlue, otherChampBlue);

    return (
      <div className='rc-current-match-compare'>
        <div className='compare-row'>
          <CompareCardHeader
            isRed={true}
            compareData={compareDataRed}
            otherChamp={otherChampRed}
            rankedDetails={rankedDetailsRed}

            winsSelf={winsDataRed.wins}
            totalGames={winsDataRed.totalGames}

            teamWinRate={this.getTeamWinRate(currentMatch, currentMatchDetails, true)}

            staticData={staticData}
          />
          <CompareCardHeader
            isRed={false}
            compareData={compareDataBlue}
            otherChamp={otherChampBlue}
            rankedDetails={rankedDetailsBlue}

            winsSelf={winsDataBlue.wins}
            totalGames={winsDataBlue.totalGames}

            teamWinRate={this.getTeamWinRate(currentMatch, currentMatchDetails, false)}

            staticData={staticData}
          />
        </div>
        <div className='compare-row'>
          <CompareCardMiddle
            dataRed={compareDataRed}
            dataBlue={compareDataBlue}
          />
        </div>
        <div className='compare-row'>
          <CompareCardBottom
            isRed={true}
            compareData={compareDataRed}
          />
          <CompareCardBottom
            isRed={false}
            compareData={compareDataBlue}
          />
        </div>
      </div>
    );
  }
}

export default CurrentMatchCompare;
