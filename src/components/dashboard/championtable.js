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
      kda: roundWithPrecision((c.kills + c.assists) / c.deaths, 2),
      cs: roundWithPrecision(c.total_cs / c.total_games, 0),
      winrate: roundWithPrecision(c.wins / c.total_games, 2),
      gold: Math.round(c.gold / c.total_games),
      lane: capitalize(c.lane.split('_')[0].toLowerCase()),
    }
  });
}

class ChampionTable extends Component {

  render() {
    const { championStats, summonerName, summonerRegion, version, championData} = this.props;

    const data = createChampionListData(championStats, championData, version);

    return (
      <div className="dashboard-champion-table">
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
                  width: 50,
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Games",
                  accessor: "games",
                  width: 50,
                }
              ]
            },
            {
              columns: [
                {
                  Header: "KDA",
                  accessor: "kda",
                  width: 50,
                }
              ]
            },
            {
              columns: [
                {
                  Header: "CS",
                  accessor: "cs",
                  width: 50,
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Gold",
                  accessor: "gold",
                  width: 70,
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
                      <div>
                        {props.value * 100}%
                      </div>
                    );
                  }
                }
              ]
            }
          ]}
          style={{
            height: "600px"
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

export default ChampionTable;
