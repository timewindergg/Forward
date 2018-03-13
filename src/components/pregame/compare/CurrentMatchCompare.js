import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ClipLoader } from 'react-spinners';

import CompareCardHeader from './CompareCardHeader';
import CompareCardMiddle from './CompareCardMiddle';
import CompareCardBottom from './CompareCardBottom';

import SkillTable from '../../common/skilltable.js';

import './styles/CurrentMatchCompare.css';

import {roundWithPrecision} from '../../../shared/helpers/numberHelper.js';

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
      wr: '--'
    };

    if (!currentMatch.winrates || Object.keys(compareData).length === 0) {
      console.warn('cant fetch winrates, data does not exist');
      return placeholder;
    }

    const {winrates} = currentMatch;
    const ourChamp = compareData.champion_id;
    const ourWinData = winrates[ourChamp];
    if (!ourWinData || !ourWinData[otherChamp]) {
      console.warn('cant fetch winrates: mapping does not exist', winrates, ourChamp, otherChamp);
      return placeholder;
    }

    return {
      wr: ourWinData[otherChamp]
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

    // if either compare data is empty we return loading
    if (!currentMatchDetails[selectedRed] || !currentMatchDetails[selectedBlue]) {
      return (
        <div className='rc-current-match-compare'>
          <div className='cmc-loader'>
            <ClipLoader
              size={80}
              color='#ff6666'
              loading={true}
            />
            <h4>{`Loading...`}</h4>
          </div>
        </div>
      );
    }

    // other champion (blue champ) used for the red team player's compare card
    const otherChampRed = matchAndDetails[selectedBlue] ? compareDataBlue.champion_id : -1;
    // ditto but for the blue team player
    const otherChampBlue = matchAndDetails[selectedRed] ? compareDataRed.champion_id : -1;

    const rankedDetailsRed = this.getRankedDetails(compareDataRed, queueName);
    const rankedDetailsBlue = this.getRankedDetails(compareDataBlue, queueName);

    const winsDataRed = this.getWinsData(currentMatch, compareDataRed, otherChampRed);
    const winsDataBlue = this.getWinsData(currentMatch, compareDataBlue, otherChampBlue);

    if (winsDataRed.wr !== '--') {
      winsDataBlue.wr = 1 - winsDataRed.wr;
    }
    if (winsDataBlue.wr !== '--') {
      winsDataRed.wr = 1 - winsDataBlue.wr;
    }

    return (
      <div className='rc-current-match-compare'>
        <div className='compare-row'>
          <CompareCardHeader
            isBlue={true}
            compareData={compareDataBlue}
            otherChamp={otherChampBlue}
            rankedDetails={rankedDetailsBlue}

            cWinRate={winsDataBlue.wr}
            teamWinRate={this.getTeamWinRate(currentMatch, currentMatchDetails, false)}

            staticData={staticData}
          />
          <CompareCardHeader
            isBlue={false}
            compareData={compareDataRed}
            otherChamp={otherChampRed}
            rankedDetails={rankedDetailsRed}

            cWinRate={winsDataRed.wr}
            teamWinRate={this.getTeamWinRate(currentMatch, currentMatchDetails, true)}

            staticData={staticData}
          />
        </div>
        <div className='compare-row'>
          <CompareCardBottom
            isRed={true}
            compareData={compareDataBlue}
            staticData={staticData}
          />
          <CompareCardMiddle
            dataRed={compareDataRed}
            dataBlue={compareDataBlue}
          />
          <CompareCardBottom
            isRed={false}
            compareData={compareDataRed}
            staticData={staticData}
          />
        </div>

        <div className='compare-row' style={{'borderRadius': '5px'}}>
          <div className='skillProgression'>
            <h3 style={{'textAlign': 'right'}}>Recommended skill order</h3>
            <SkillTable
              isRed={true}
              skillOrder={currentMatch.skill_orders[compareDataBlue.champion_id]}
              skillData={staticData.championSkills[compareDataBlue.champion_id]}
              version={staticData.version}
            />
          </div>
          <div className='skillProgression'>
            <h3>Recommended skill order</h3>
            <SkillTable
              isRed={false}
              skillOrder={currentMatch.skill_orders[compareDataRed.champion_id]}
              skillData={staticData.championSkills[compareDataRed.champion_id]}
              version={staticData.version}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentMatchCompare;
