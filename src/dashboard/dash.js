import React, { Component } from 'react';
import './dash.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <h1>Timewinder</h1>
        <p> Welcome, {this.props.match.params.summonerName}</p>
      </div>
    );
  }
}

export default Dashboard;
