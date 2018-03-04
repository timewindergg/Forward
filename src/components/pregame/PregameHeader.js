import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import {GameTypes} from '../../constants/GameTypes';

import {getChampionIconUrlByImage} from '../../shared/helpers/staticImageHelper.js';

import './styles/PregameHeader.css';


class PregameTime extends Component {
  constructor(props) {
    super(props);

    const {matchCreationTime} = props;
    const dateDiff = (Date.now() / 1000) - (matchCreationTime);

    this.state = {
      diff: dateDiff,
      timerID: 0
    };
  }

  static propTypes = {
    matchCreationTime: PropTypes.number.isRequired
  }

  componentWillMount() {
    this.setState({
      timerID: setInterval(this.incrementMatchTime, 1000)
    });
  }

  incrementMatchTime = () => {
    this.setState({
      diff: this.state.diff + 1
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerID);
  }

  render() {
    const diffText = new Date(this.state.diff * 1000).toISOString().substr(11, 8);

    return (
      <h4 className='rc-pregame-time'>
        <span className='grey-text'>{`Match Time Elapsed: ${diffText}`}</span>
      </h4>
    );
  }
}


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
          <div className='ban-container'>
          <i className={classNames('fas', 'fa-ban', {'red-ban': isRed, 'blue-ban': !isRed})}></i>
          <img
            key={ban}
            src=''
            alt=''
            className={classNames('ban-champ')}
          />
          </div>
        );
      }

      const imageUrl = getChampionIconUrlByImage(championData[ban].img.split('.')[0], version);

      // <i class="fas fa-ban"></i>
      return (
        <div className='ban-container'>
          <i className={classNames('fas', 'fa-ban', {'red-ban': isRed, 'blue-ban': !isRed})}></i>
          <img
            key={ban}
            src={imageUrl}
            alt=''
            className={classNames('ban-champ')}
          />
        </div>
      );
    });

    return (
      <div className='pregame-header-ban'>
        {banIcons}
      </div>
    );
  }

  renderHeaderText = (gameType, gameMap, matchCreationTime) => {
    return (
      <div className='pregame-header-text'>
        <h2 className='white-text'>{gameType}</h2>
        <h4><span className='white-text'>{gameMap}</span></h4>
        <PregameTime matchCreationTime={matchCreationTime}/>
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
