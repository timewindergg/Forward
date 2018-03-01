import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import {GameTypes} from '../../constants/GameTypes';

import {getChampionIconUrlByImage} from '../../shared/helpers/staticImageHelper.js';

import './styles/PregameHeader.css';

class PregameHeader extends Component {
  static propTypes = {
    redBans: PropTypes.array.isRequired,
    blueBans: PropTypes.array.isRequired,
    matchCreationTime: PropTypes.number.isRequired,
    queueID: PropTypes.number.isRequired
  }

  static defaultProps = {
    redBans: [],
    blueBans: [],
    matchCreationTime: 0,
    queueID: 0
  }

  renderBans = (bans, isRed, staticData) => {
    const championData = staticData.champions;
    const version = staticData.version;

    const banIcons = bans.map((ban) => {
      if (!championData[ban]) {
        return (
          <img
            key={ban}
            src=''
            alt=''
            className={classNames('ban-champ', {'red-ban': isRed, 'blue-ban': !isRed})}
          />
        );
      }

      const imageUrl = getChampionIconUrlByImage(championData[ban].img.split('.')[0], version);

      return (
        <img
          key={ban}
          src={imageUrl}
          alt=''
          className={classNames('ban-champ', {'red-ban': isRed, 'blue-ban': !isRed})}
        />
      );
    });

    return (
      <div className='pregame-header-ban'>
        {banIcons}
      </div>
    );
  }

  renderHeaderText = (gameType, gameMap, matchCreationTime) => {
    const dateDiff = Date.now() - (matchCreationTime * 1000);
    const diffText = moment(dateDiff / 1000).format('MM:SS');

    return (
      <div className='pregame-header-text'>
        <h2 className='white-text'>{gameType}</h2>
        <h4><span className='white-text'>{gameMap}</span></h4>
        <h4><span className='grey-text'>{`Match Time Elapsed: ${diffText}`}</span></h4>
      </div>
    );
  }

  render() {
    const {redBans, blueBans, matchCreationTime, queueID, staticData} = this.props;

    const gameMap = GameTypes[queueID]['map'];
    const gameType = GameTypes[queueID].desc;

    return (
      <div className='rc-pregame-header'>
        {this.renderBans(redBans, true, staticData)}
        {this.renderHeaderText(gameType, gameMap, matchCreationTime)}
        {this.renderBans(blueBans, false, staticData)}
      </div>
    )
  }
}

export default PregameHeader;
