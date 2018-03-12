import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import { getChampionIconUrlByImage } from '../../shared/helpers/staticImageHelper.js';
import { roundWithPrecision } from '../../shared/helpers/numberHelper.js';
import { getKDAColor } from '../../shared/helpers/cssHelper.js';


const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const createChampionListData = (championLists, championData, version) => {
  const filtered = {};
  const championIndex = {};

  championLists.forEach((champion) => {
    const filteredIndex = championIndex[champion.champ_id];
    if (!(champion.champ_id in filtered)) {
      filtered[champion.champ_id] = {
        'champ_id': champion.champ_id,
        'total_games': 0,
        'total_cs': 0,
        'wins': 0,
        'losses': 0,
        'gold': 0,
        'kills': 0,
        'deaths': 0,
        'assists': 0
      };
    }

    filtered[champion.champ_id].total_games += champion.total_games;
    filtered[champion.champ_id].total_cs += champion.total_cs;
    filtered[champion.champ_id].wins += champion.wins;
    filtered[champion.champ_id].losses += champion.losses;
    filtered[champion.champ_id].gold += champion.gold;
    filtered[champion.champ_id].kills += champion.kills;
    filtered[champion.champ_id].deaths += champion.deaths;
    filtered[champion.champ_id].assists += champion.assists;
  });

  const championArray = Object.keys(filtered).map((key) => {
    return filtered[key];
  });

  championArray.sort((a, b) => {
    if (a.total_games < b.total_games)
     return 1;
    if (a.total_games > b.total_games)
      return -1;
    return 0;
  });

  return championArray.map((c) => {
    return {
      id: c.champ_id,
      name: championData[c.champ_id].name,
      games: c.total_games,
      kda: {'kills': c.kills, 'deaths': c.deaths, 'assists': c.assists, 'games': c.total_games},
      cs: roundWithPrecision(c.total_cs / c.total_games, 0),
      winrate: Math.round(c.wins / c.total_games * 100),
      gold: Math.round(c.gold / c.total_games)
    }
  });
}

class UserChampionList extends Component {
  render() {
    const { championStats, summonerName, summonerRegion, staticData} = this.props;

    const data = createChampionListData(championStats, staticData.champions, staticData.version);

    const version = staticData.version;
    const championData = staticData.champions;

    return (
      <div className="user-champion-list">
        <h3>Champion Stats</h3>
        <ReactTable
          data={data}
          columns={[
            {
              columns: [
                {
                  Header: "Champion",
                  accessor: "name",
                  width: 70,
                  sortMethod: (a, b) => {
                    return a.localeCompare(b);
                  },
                  Cell: props => {
                    let championUrl = "";
                    for (let key in championData) {
                      if (championData[key].name === props.value) {
                        championUrl = getChampionIconUrlByImage(championData[key].img.split('.')[0], version);
                      }
                    }

                    return (
                      <Link to={`/c/${summonerRegion.toLowerCase()}/${summonerName}/${props.value.replace(/\W/g, '')}`}>
                        <div>
                          <img className="champion-table-image" src={championUrl}/>
                          <span>{props.value}</span>
                        </div>
                      </Link>
                    );
                  }
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Games",
                  accessor: "games",
                  width: 48,
                }
              ]
            },
            {
              columns: [
                {
                  Header: "KDA",
                  accessor: "kda",
                  width: 80,
                  Cell: props => {
                    let v = props.value;
                    let kda = roundWithPrecision(v.deaths === 0 ? (v.kills + v.assists) : (v.kills + v.assists) / v.deaths, 2);
                    let k = roundWithPrecision(v.kills/v.games, 1);
                    let d = roundWithPrecision(v.deaths/v.games, 1);
                    let a = roundWithPrecision(v.assists/v.games, 1);
                    return (
                      <div>
                        <span className={getKDAColor(kda)}>{kda}</span>
                        <br/>
                        <span>{k}/{d}/{a}</span>
                      </div>
                    );
                  }
                }
              ]
            },
            {
              columns: [
                {
                  Header: "CS",
                  accessor: "cs",
                  width: 40,
                  Cell: props => {
                    return (
                      <span className="cs">{props.value}</span>
                    );
                  }
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Gold",
                  accessor: "gold",
                  width: 60,
                  Cell: props => {
                    return (
                      <span className="gold">{props.value}</span>
                    );
                  }
                }
              ]
            },
            {
              columns: [
                {
                  Header: "WR",
                  accessor: "winrate",
                  width: 60,
                  Cell: props => {
                    return (
                      <span className="win-rate">
                        {props.value}%
                      </span>
                    );
                  }
                }
              ]
            }
          ]}
          style={{
            height: "500px"
          }}
          defaultPageSize={data.length}
          showPagination={false}
          resizable={false}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default UserChampionList;
