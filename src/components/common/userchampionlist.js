import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import { getChampionIconUrlByImage } from '../../shared/helpers/staticImageHelper.js';
import { roundWithPrecision } from '../../shared/helpers/numberHelper.js';


const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const createChampionListData = (championLists, championData, version) => {
  championLists.sort((a, b) => {
    if (a.total_games < b.total_games)
     return 1;
    if (a.total_games > b.total_games)
      return -1;
    return 0;
  });
  return championLists.map((c) => {
    return {
      id: c.champ_id,
      name: championData[c.champ_id].name,
      games: c.total_games,
      kda: roundWithPrecision(c.deaths === 0 ? (c.kills + c.assists) : (c.kills + c.assists) / c.deaths, 2),
      cs: roundWithPrecision(c.total_cs / c.total_games, 0),
      winrate: Math.round(c.wins / c.total_games * 100),
      gold: Math.round(c.gold / c.total_games),
      lane: capitalize(c.lane.split('_')[0].toLowerCase()),
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
                      <Link to={`/c/${summonerRegion}/${summonerName}/${props.value.replace(/\W/g, '')}`}>
                        <div>
                          <img className="champion-table-image" src={championUrl}/>
                          <p>{props.value}</p>
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
                  Header: "Lane",
                  accessor: "lane",
                  width: 48,
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
                  width: 45,
                }
              ]
            },
            {
              columns: [
                {
                  Header: "CS",
                  accessor: "cs",
                  width: 35,
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Gold",
                  accessor: "gold",
                  width: 55,
                }
              ]
            },
            {
              columns: [
                {
                  Header: "WR",
                  accessor: "winrate",
                  width: 40,
                  Cell: props => {
                    return (
                      <div>
                        {props.value}%
                      </div>
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