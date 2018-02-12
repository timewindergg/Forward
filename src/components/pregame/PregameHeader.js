import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import Avatar from 'material-ui/Avatar';

import {GameTypes} from '../../constants/GameTypes';
import {IMG_VER} from '../../constants/Settings';

import championMappings from '../../shared/championMappings.js';
import {getChampionIconUrl} from '../../shared/helpers/staticImageHelper.js';

import './PregameHeader.css';

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

  renderBans = (bans, isRed) => {
    const banIcons = bans.map((ban) => {
      if (!championMappings[ban]) {
        return (
          <Avatar
            key={ban}
            src=''
            className={classNames('ban-champ', {'red-ban': isRed, 'blue-ban': !isRed})}
          />
        );
      }

      const imageUrl = getChampionIconUrl(ban, IMG_VER);

      return (
        <Avatar
          key={ban}
          src={imageUrl}
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
    const {redBans, blueBans, matchCreationTime, queueID} = this.props;

    const gameMap = GameTypes[queueID]['map'];
    const gameType = GameTypes[queueID].desc;

    return (
      <div className='rc-pregame-header'>
        {this.renderBans(redBans, true)}
        {this.renderHeaderText(gameType, gameMap, matchCreationTime)}
        {this.renderBans(blueBans, false)}
      </div>
    )
  }
}

export default PregameHeader;
