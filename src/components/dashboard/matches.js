import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Import required mappings.
import ChampionMappings from '../../shared/championMappings.js';
import QueueIdMappings from '../../shared/queueIdMappings.js';
import RuneMappings from '../../shared/runeMappings.js';

import { getChampionIconUrl,
  getItemIconUrl,
  getPerkIconUrl,
  getPerkStyleIconUrl,
  getSpellIconUrl } from '../../shared/helpers/staticImageHelper.js';

import { getKDA, getKillParticipation } from '../../shared/helpers/leagueUtilities';
import { roundWithPrecision } from '../../shared/helpers/numberHelper';

import Moment from 'react-moment';

class Matches extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.matches === undefined || this.props.version === undefined || this.props.limit === undefined) {
      return (<div/>);
    }

    const { matches, version, limit, dateFilter, championFilter, queueFilter, championData} = this.props;

    return (
      <div className="dashboard-matches">
        {this.renderMatchList(matches, version, limit, dateFilter, championFilter, queueFilter, championData)}
      </div>
    )

  }

  renderMatchList(matches, version, limit, dateFilter, championFilter, queueFilter, championData) {
    const matchItems = matches.filter((match) => {
      let passesDateFilter = true;
      let passesChampionFilter = true;
      let passesQueueFilter = true;

      if (dateFilter.length !== 0) {
        // The date format is 2018-01-18.
          const d1 = new Date(dateFilter);
          const d2 = new Date(match.timestamp*1000);

          passesDateFilter = d1.toDateString() === d2.toDateString();
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
        <div className={"dashboard-matches-item " + (m.team === m.winner ? 'blue-lt-bg' : 'red-lt-bg')} key={m.match_id}>
          {this.renderMatchHeader(m)}
          {this.renderMatchBody(m, version)}
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
      <div className="dashboard-matches-item-header">
        <div className="dashboard-matches-item-header-match-info">
          <span>{QueueIdMappings[match.queue_id].name}</span>
          <Moment fromNow>{gameDate}</Moment>
          <span>{duration}</span>
        </div>
        <div className="dashboard-matches-item-header-match-team-scores">
          <span>{`${teamKDA[0]}/${teamKDA[1]}/${teamKDA[2]}`}</span>
        </div>
        <div className="dashboard-matches-item-header-match-team-objectives">
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
      </div>
    );
  }

  renderMatchBody(match, version) {
    // Set user primary and secondary runes.
    const runes = getPlayerRunes(match.team === 100 ? match.blue_team: match.red_team, match.user_id);
    const team = match.team === 100 ? match.blue_team : match.red_team;
    const teamKDA = getTeamKDAStat(team);
    const kp = getKillParticipation(match.kills, match.assists, teamKDA[0]);
    const matchStats = getUserMatchStats(match);
    const minutes = Math.floor(match.duration / 60);
    // Get the list of participants and their champions.
    const participants = getParticipants(match.blue_team, match.red_team, version);

    return (
      <div className="dashboard-matches-item-body">
        <div className="dashboard-matches-item-body-champion-info">
          <img className="championIcon icon" src={getChampionIconUrl(match.champ_id, version)}/>
          <div className="dashboard-matches-item-body-champion-info-champion-name">
            <span>{ChampionMappings[match.champ_id].name}</span>
          </div>
          <div className="dashboard-matches-item-body-champion-info-champion-level">
            <span>{`Lvl ${match.level}`}</span>
          </div>
        </div>
        <div className="dashboard-matches-item-body-champion-settings">
          <div className="dashboard-matches-item-body-champion-settings-summoners">
            <div className= "dashboard-matches-item-body-champion-settings-summoner">
              <img src={getSpellIconUrl(match.spell0, version)} alt=""/>
            </div>
            <div className= "dashboard-matches-item-body-champion-settings-summoner">
              <img src={getSpellIconUrl(match.spell1, version)} alt="" />
            </div>
          </div>
          <div className="dashboard-matches-item-body-champion-settings-perks">
            <div className="dashboard-matches-item-body-champion-settings-perk">
              <img src={getPerkIconUrl(runes[0], version)} alt=""/>
            </div>
            <div className="dashboard-matches-item-body-champion-settings-perk">
              <img src={getPerkStyleIconUrl(runes[1], version)} alt=""/>
            </div>
          </div>
        </div>
        <div className="dashboard-matches-item-body-champion-items">
          <div className="dashboard-matches-item-body-champion-items-row">
            <div className="dashboard-matches-item-body-champion-item">
              <img src={getItemIconUrl(match.item0, version)} alt=""/>
            </div>
            <div className="dashboard-matches-item-body-champion-item">
              <img src={getItemIconUrl(match.item1, version)} alt=""/>
            </div>
            <div className="dashboard-matches-item-body-champion-item">
              <img src={getItemIconUrl(match.item2, version)} alt=""/>
            </div>
            <div className="dashboard-matches-item-body-champion-item">
              <img src={getItemIconUrl(match.item6, version)} alt=""/>
            </div>
          </div>
          <div className="dashboard-matches-item-body-champion-items-row">
            <div className="dashboard-matches-item-body-champion-item">
              <img src={getItemIconUrl(match.item3, version)} alt=""/>
            </div>
            <div className="dashboard-matches-item-body-champion-item">
              <img src={getItemIconUrl(match.item4, version)} alt=""/>
            </div>
            <div className="dashboard-matches-item-body-champion-item">
              <img src={getItemIconUrl(match.item5, version)} alt=""/>
            </div>
          </div>
        </div>
        <div className="dashboard-matches-item-body-match-stats">
          <div className="dashboard-matches-item-body-match-stats-kda">
            <span>{`${match.kills}/${match.deaths}/${match.assists}`}</span>
            <span>{`${roundWithPrecision(getKDA(match.kills, match.deaths, match.assists), 2)}:KDA`}</span>
          </div>
          <div className="dashboard-matches-item-body-match-stats-detailed">
            <div className="dashboard-matches-item-body-match-stat">
              <span>{`${kp}%`}</span>
            </div>
            <div className="dashboard-matches-item-body-match-stat">
              <span>{`${roundWithPrecision(matchStats[0]/minutes, 0)} cs/m`}</span>
            </div>
            <div className="dashboard-matches-item-body-match-stat">
              <span>{`${roundWithPrecision(matchStats[1]/minutes, 0)} gold/m`}</span>
            </div>
            <div className="dashboard-matches-item-body-match-stat">
              <span>{`${matchStats[2]}`}</span>
            </div>
            <div className="dashboard-matches-item-body-match-stat">
              <span>{`${roundWithPrecision(matchStats[3]/minutes, 0)} vision/m`}</span>
            </div>
          </div>
        </div>
        <div className="dashboard-matches-item-body-match-participants">
          <div className="dashboard-matches-item-body-match-participants-blue">
            {this.renderParticipants(participants[0], version)}
          </div>
          <div className="dashboard-matches-item-body-match-participants-red">
            {this.renderParticipants(participants[1], version)}
          </div>
        </div>
        <div className="dashboard-matches-item-body-match-postgame">
          <Link to={`/m/${match.region}/${match.match_id}`}>
            <button>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  renderParticipants(participants, version) {
    return participants.map((p) => {
      return (
        <div key={p.summonerId} className="dashboard-matches-item-body-match-participant">
          <div className="dashboard-matches-item-body-match-participant-champion-image">
            <img src={p.championUrl} alt=""/>
          </div>
          <div className="dashboard-matches-item-body-match-participant-name">
            <span>{p.summonerName}</span>
          </div>
        </div>
      );
    });
  }
}

const strPadLeft = (string, pad, length) => {
  return (new Array(length+1).join(pad)+string).slice(-length);
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

// Returns an array of the kills, deaths and assists.
const getTeamKDAStat = (team) => {
  let kills = 0;
  let deaths = 0;
  let assists = 0;

  team.participants.forEach((player) => {
    kills += player.stats.kills;
    deaths += player.stats.deaths;
    assists += player.stats.assists;
  });

  return [kills, deaths, assists];
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

const getParticipants = (blueTeam, redTeam, version) => {
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
    bluePlayerEntry['championUrl'] = getChampionIconUrl(blueTeam.participants[i].championId, version);
    redPlayerEntry['championUrl'] = getChampionIconUrl(redTeam.participants[i].championId, version);

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
const getPlayerRunes = (team, summonerId) => {
  const runes = [];
  team.participants.forEach((player) => {
    if (player.summonerId === summonerId) {
      // Loop through user runes and find the keystone.
      for (let key in player.runes) {
        if (RuneMappings[key].keyStone === true) {
          runes.push(parseInt(key));
        }
      }

      runes.push(player.stats.perkSubStyle);
    }
  });

  return runes;
}

export default Matches;