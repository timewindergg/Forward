import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from 'react-router-dom';

class RecentlyPlayedWith extends Component {
  render() {
    const { matches, region } = this.props;

    const players = getTopPlayed(matches, 5);

    return (
      <div className="dashboard-recently-played-with">
        <h3>Recently Played With</h3>
        <ReactTable
          data={players}
          columns={[
            {
              columns: [
                {
                  Header: "Summoner",
                  accessor: "playerName",
                  width: 150,
                  Cell: props => {
                    return (
                      <Link to={`/p/${region.toLowerCase()}/${props.value}`}>
                        <div>
                          {props.value}
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
                  Header: "Played",
                  accessor: "totalGames",
                  width: 50,
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Wins",
                  accessor: "wins",
                  width: 50,
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Losses",
                  accessor: "losses",
                  width: 50,
                }
              ]
            },
            {
              columns: [
                {
                  Header: "WR",
                  accessor: "winRate",
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
          defaultPageSize={players.length}
          showPagination={false}
          resizable={false}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

const getTopPlayed = (matches, limit) => {
  const players = {};

  matches.forEach((m) => {
    const team = m.team;
    const playerId = m.user_id;
    const won = m.won;

    const playerTeamMembers = team === 100 ? m.blue_team : m.red_team;

    playerTeamMembers.participants.forEach((p) => {
      const summonerName = p.summonerName;

      if (p.summonerId !== playerId) {
        if (!players[summonerName]) {
          players[summonerName] = {
            totalGames: 0,
            wins: 0,
            losses: 0,
            playerName: summonerName,
            winRate: 0
          };
        }

        players[summonerName].totalGames += 1;
        m.won ? players[summonerName].wins += 1 : players[summonerName].losses += 1;
        players[summonerName].winRate = Math.round(players[summonerName].wins * 100/ players[summonerName].totalGames);
      }
    });
  });

  // convert the object into an array.
  const playersArray = Object.keys(players).map((key) => {
    return players[key];
  });

  // sort the array by totalGame.
  playersArray.sort((a, b) => {
    return b.totalGames - a.totalGames;
  });

  return playersArray.slice(0, limit);
}


export default RecentlyPlayedWith;