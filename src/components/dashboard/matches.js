import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ClipLoader } from 'react-spinners';

import LoadingState from '../../shared/LoadingState';

// Import required mappings.
import QueueIdMappings from '../../shared/queueIdMappings.js';

import { getChampionIconUrlByImage,
  getItemIconUrl,
  getPerkIconUrl,
  getPerkStyleIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';

import { getKDA, getKillParticipation, strPadLeft, getTeamKDAStat } from '../../shared/helpers/leagueUtilities';
import { roundWithPrecision } from '../../shared/helpers/numberHelper';
import { getKDAColor } from '../../shared/helpers/cssHelper';

import Tooltip from '../common/tooltip/Tooltip';
import TOOLTIP_TYPES from '../../constants/TooltipTypes';

import Moment from 'react-moment';

class Matches extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.matches === undefined || this.props.version === undefined || this.props.limit === undefined) {
      return (<div/>);
    }

    const { matches, loadingState, version, limit, dateFilter, championFilter, queueFilter, championData, runeData, itemData} = this.props;
      let innerComp = (
        <div className='oc-loader'>
          <ClipLoader
            size={50}
            color={'#ff6666'}
            loading={true}
          />
          <h4>{`Loading...`}</h4>
        </div>
      );
    if (loadingState === LoadingState.FINISHED) {
      innerComp = this.renderMatchList(matches, version, limit, dateFilter, championFilter, queueFilter, championData, runeData, itemData);
    }

    return (
      <div className="dashboard-matches">
        {innerComp}
      </div>
    );
  }

  renderMatchList(matches, version, limit, dateFilter, championFilter, queueFilter, championData, runeData, itemData) {
    const matchItems = matches.filter((match) => {
      let passesDateFilter = true;
      let passesChampionFilter = true;
      let passesQueueFilter = true;

      if (dateFilter !== undefined && dateFilter.length !== 0) {
        // The date format is 2018-01-18.
          const d1 = new Date(dateFilter);
          const d1Utc = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(),  d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
          const d2 = new Date(match.timestamp*1000);
          const d2Utc = new Date(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate(),  d2.getUTCHours(), d2.getUTCMinutes(), d2.getUTCSeconds());

          passesDateFilter = d1Utc.toDateString() === d2Utc.toDateString();
      }

      if (championFilter.length !== 0) {
        return championData[match.champ_id].name.toLowerCase() === championFilter.toLowerCase();
      }

      if (queueFilter.length !== 0) {
        passesQueueFilter = QueueIdMappings[match.queue_id].name === queueFilter;
      }

      return passesDateFilter && passesChampionFilter && passesQueueFilter;
    }).slice(0, limit).map((m) => {
      return (
        <div className={"item"} key={m.match_id}>
          <div className={classNames({"result-indicator": true, 'victory': m.team === m.winner, 'defeat': m.team !== m.winner})}></div>
          {this.renderMatchHeader(m)}
          {this.renderMatchBody(m, version, runeData, championData, itemData)}
        </div>
      )
    });

    return matchItems;
  }

  renderMatchHeader(match) {
    // Set up to get relative time.
    const gameDate = new Date(0);
    gameDate.setUTCSeconds(match.timestamp);

    let duration = match.duration;
    // Format the game duration.
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    duration = strPadLeft(minutes, '0', 2) +  ':' + strPadLeft(seconds, '0', 2);

    const team = match.team === 100 ? match.blue_team : match.red_team;

    const teamKDA = getTeamKDAStat(team);

    return (
      <div className="item-header">
        <div className="match-info">
          <span className="queue">{QueueIdMappings[match.queue_id].name}</span>
          <Moment className="timestamp" fromNow>{gameDate}</Moment>
          <span className="duration">{duration}</span>
        </div>
        <div className="team-scores">
          <span>{`${teamKDA[0]}/${teamKDA[1]}/${teamKDA[2]}`}</span>
        </div>
        <div className="team-objectives">
          <div className="icon-baron">
          </div>
          <span>{team.baronKills}</span>
          <div className="icon-dragon">
          </div>
          <span>{team.dragonKills}</span>
          <div className="icon-tower">
          </div>
          <span>{team.towerKills}</span>
        </div>
        <div className="match-postgame">
          <Link to={`/m/${match.region}/${match.match_id}`}>
            <span>Analysis</span>
            <i className="fas fa-angle-right"></i>
          </Link>
        </div>
      </div>
    );
  }

  renderItems(items, trinket, version, itemData) {
    const core = items.map((item) => {
      if (item === 0){
        return (
          <div className="champion-item filler icon"></div>
        );
      }
      return (
        <div className="champion-item">
          <Tooltip
            type={TOOLTIP_TYPES.ITEM}
            data={itemData[item.toString()]}
            img={getItemIconUrl(item, version)}
            version={version}
          >
            <img className="icon" src={getItemIconUrl(item, version)} alt=""/>
          </Tooltip>
        </div>
      );
    });

    return (
      <div className="champion-items">
        <div className="core">
          {core}
        </div>
        <div className="champion-item trinket">
          <Tooltip
            type={TOOLTIP_TYPES.ITEM}
            data={itemData[trinket.toString()]}
            img={getItemIconUrl(trinket, version)}
            version={version}
          >
           <img className="icon" src={getItemIconUrl(trinket, version)} alt=""/>
          </Tooltip>
        </div>
      </div>
    );
  }

  renderMatchBody(match, version, runeData, championData, itemData) {
    // Set user primary and secondary runes.
    const runes = getPlayerRunes(match.team === 100 ? match.blue_team: match.red_team, match.user_id, runeData);
    const team = match.team === 100 ? match.blue_team : match.red_team;
    const teamKDA = getTeamKDAStat(team);
    const kp = getKillParticipation(match.kills, match.assists, teamKDA[0]);
    const matchStats = getUserMatchStats(match);
    const minutes = Math.floor(match.duration / 60);
    // Get the list of participants and their champions.
    const participants = getParticipants(match.blue_team, match.red_team, version, championData);

    const kdaStat = roundWithPrecision(getKDA(match.kills, match.deaths, match.assists), 1);


    return (
      <div className="item-body">
        <div className="champion-info">
          <img className="champion-icon" src={getChampionIconUrlByImage(championData[match.champ_id].img.split('.')[0], version)}/>
          <div className="champion-name">
            <span>{championData[match.champ_id].name}</span>
          </div>
          <div className="champion-level">
            <span>{`Lvl ${match.level}`}</span>
          </div>
        </div>
        <div className="champion-settings">
          <div className="summoners">
            <div className="summoner">
              <img className="icon" src={getSpellIconUrl(match.spell0, version)} alt=""/>
            </div>
            <div className="summoner">
              <img className="icon" src={getSpellIconUrl(match.spell1, version)} alt="" />
            </div>
          </div>
          <div className="perks">
            <div className="perk">
              <Tooltip
                type={TOOLTIP_TYPES.RUNE}
                data={runeData[runes[0].toString()]}
                img={getPerkIconUrl(runes[0], version)}
                version={version}
              >
                <img src={getPerkIconUrl(runes[0], version)} alt=""/>
              </Tooltip>
            </div>
            <div className="perk">
              <img src={getPerkStyleIconUrl(runes[1], version)} alt=""/>
            </div>
          </div>
        </div>
        {this.renderItems([match.item0, match.item1, match.item2, match.item3, match.item4, match.item5], match.item6, version, itemData)}
        <div className="match-stats">
          <div className="match-stats-kda">
            <span>{`${match.kills}/${match.deaths}/${match.assists}`}</span>
            <span className={getKDAColor(kdaStat)}>{`${kdaStat} KDA`}</span>
          </div>
          <div className="match-stats-detailed">
            <div className="match-stat kp">
              <span>{`${kp}% kp`}</span>
            </div>
            <div className="match-stat csm">
              <span>{`${roundWithPrecision(matchStats[0]/minutes, 0)} cs/m`}</span>
            </div>
            <div className="match-stat goldm">
              <span>{`${roundWithPrecision(matchStats[1]/minutes, 0)} gold/m`}</span>
            </div>
            <div className="match-stat gold">
              <span>{`${matchStats[2]} dmg`}</span>
            </div>
            <div className="match-stat visionm">
              <span>{`${roundWithPrecision(matchStats[3], 0)} vs`}</span>
            </div>
          </div>
        </div>
        <div className="match-participants">
          <div className="team">
            {this.renderParticipants(participants[0], version)}
          </div>
          <div className="team">
            {this.renderParticipants(participants[1], version)}
          </div>
        </div>
      </div>
    );
  }

  renderParticipants(participants, version) {
    return participants.map((p) => {
      return (
        <div key={p.summonerId} className="match-participant">
          <div className="champion-image">
            <img src={p.championUrl} alt=""/>
          </div>
          <div className="name">
            {p.summonerName}
          </div>
        </div>
      );
    });
  }
}

// returns [cs, gold, damage to objective, visison score]
const getUserMatchStats = (match) => {
  // set the initial stats to cs, gold and append other ones later.
  const stats = [match.cs, match.gold];

  const team = match.team === 100 ? match.blue_team: match.red_team;

  team.participants.forEach((p) => {
    if (p.summonerId === match.user_id) {
      stats.push(p.stats.damageDealtToObjectives);
      stats.push(p.stats.visionScore);
    }
  });

  return stats;
}

const fetchRoleIconName = (lane, role) => {
  switch (lane) {
    case 'MID_LANE':
      return 'Mid';
    case 'BOT_LANE':
      return role === 'Role.support' ? 'Support' : 'Bot';
    case 'TOP_LANE':
      return 'Top';
    case 'JUNGLE':
      return 'Jungler';

    default:
      return 'Mid';
  }
}

// Takes in team data and return a list of the following structure where the first element is the blue team.
// Note that the players are sorted top -> jungle -> mid -> adc -> support.
/*
  [
    [{
      summonerName: 'doublelift',
      championUrl: 'path_to_image',
      summonerId: 12333
    }]
  ]
*/

const getParticipants = (blueTeam, redTeam, version, championData) => {
  const teams = [];
  const _blueTeam = new Array(5);
  const _redTeam = new Array(5);

  teams.push(_blueTeam);
  teams.push(_redTeam);

  // Create arrays that will store players that have roles that are duplicated.
  const blueDups = [];
  const redDupes = [];

  for (let i = 0; i < blueTeam.participants.length; i++) {
    const bluePlayerEntry = {};
    const redPlayerEntry = {};
    // Fill in the summoner name first.
    bluePlayerEntry['summonerName'] = blueTeam.participants[i].summonerName;
    redPlayerEntry['summonerName'] = redTeam.participants[i].summonerName;
    bluePlayerEntry['summonerId'] = blueTeam.participants[i].summonerId;
    redPlayerEntry['summonerId'] = redTeam.participants[i].summonerId;

    // Fill in the championIcons.
    bluePlayerEntry['championUrl'] = getChampionIconUrlByImage(championData[blueTeam.participants[i].championId].img.split('.')[0], version);
    redPlayerEntry['championUrl'] = getChampionIconUrlByImage(championData[redTeam.participants[i].championId].img.split('.')[0], version);

    // Set the appropriate element in the _blueTeam and _redTeam to the player entry if there's no entry already.
    const bluePlayerPosition = getPlayerPosition(blueTeam.participants[i].timeline.role, blueTeam.participants[i].timeline.lane);
    const redPlayerPosition = getPlayerPosition(redTeam.participants[i].timeline.role, redTeam.participants[i].timeline.lane);

    if (_blueTeam[bluePlayerPosition] === undefined) {
      _blueTeam[bluePlayerPosition] = bluePlayerEntry;
    } else {
      blueDups.push(bluePlayerEntry);
    }

    if (_redTeam[redPlayerPosition] === undefined) {
      _redTeam[redPlayerPosition] = redPlayerEntry;
    } else {
      redDupes.push(redPlayerEntry);
    }
  }

  for (let i = 0; i < blueDups.length; i++) {
    for (let j = 0; j < 5; j++) {
      if (_blueTeam[j] === undefined) {
        _blueTeam[j] = blueDups[i];
        break;
      }
    }
  }

  for (let i = 0; i < redDupes.length; i++) {
    for (let j = 0; j < 5; j++) {
      if (_redTeam[j] === undefined) {
        _redTeam[j] = redDupes[i];
        break;
      }
    }
  }

  return teams;
}

// Helper function for getParticipants which takes in a role and a lane and return the position of the player as [0, 4]
const getPlayerPosition = (role, lane) => {
  switch (lane) {
    case 'MIDDLE':
      return 2;
    case 'BOTTOM':
      return role === 'DUO_SUPPORT' ? 4 : 3;
    case 'TOP':
      return 0;
    case 'JUNGLE':
      return 1;

    default:
      return 2;
  }
}

// Return an array of two elements where the first one is the user's primary runes and the second is the secondary one.
const getPlayerRunes = (team, summonerId, runeData) => {
  const runes = [];
  team.participants.forEach((player) => {
    if (player.summonerId === summonerId) {
      // Loop through user runes and find the keystone.
      for (let key in player.runes) {
        if (!!runeData[key] && runeData[key].isKeystone === true) {
          runes.push(parseInt(key));
        }
      }

      runes.push(player.stats.perkSubStyle);
    }
  });

  return runes;
}

export default Matches;
