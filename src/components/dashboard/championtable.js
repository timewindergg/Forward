import React, { Component } from 'react';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import ChampionMappings from '../../shared/championMappings';
import getChampionIconUrl from '../../shared/helpers/staticImageHelper.js';

const createChampionListData = (championLists) => {
  return championLists.map((c) => {
    return {
      id: c.champ_id,
      name: ChampionMappings[c.champ_id].name,
      kills: c.kills,
      deaths: c.deaths,
      assists: c.assists,
      cs: Math.round((c.total_cs/c.total_games))
    }
  });
}

class ChampionTable extends Component {

  render() {
    const { championStats, summonerName, summonerRegion, version } = this.props;

    const data = createChampionListData(championStats);

    return (
      <div className="dashboard-champion-table">
        <ReactTable
          data={data}
          columns={[
            {
              columns: [
                {
                  Header: "Champion",
                  accessor: "name",
                  sortMethod: (a, b) => {
                    return a.localeCompare(b);
                  }
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Kills",
                  accessor: "kills",
                  sortMethod: (a, b) => {
                    if (a < b) {
                      return -1
                    }

                    if ( a > b) {
                      return 1;
                    }

                    return 0;
                  }
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Deaths",
                  accessor: "deaths",
                  sortMethod: (a, b) => {
                    if (a < b) {
                      return -1
                    }

                    if ( a > b) {
                      return 1;
                    }

                    return 0;
                  }
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Assists",
                  accessor: "assists",
                  sortMethod: (a, b) => {
                    if (a < b) {
                      return -1
                    }

                    if ( a > b) {
                      return 1;
                    }

                    return 0;
                  }
                }
              ]
            },
            {
              columns: [
                {
                  Header: "CS",
                  accessor: "cs",
                  sortMethod: (a, b) => {
                    if (a < b) {
                      return -1
                    }

                    if ( a > b) {
                      return 1;
                    }

                    return 0;
                  }
                }
              ]
            }
          ]}
          showPagination={false}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default ChampionTable;
