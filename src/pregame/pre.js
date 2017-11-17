import React, { Component } from 'react';
import './pre.css';

class Pregame extends Component {
  render() {
    return (
      <div className="Pregame">
        <div class="content">
          <h1>Timewinder</h1>
          <p> Welcome, {this.props.match.params.summonerName}</p>
        </div>
      </div>
    );
  }
}

export default Pregame;
