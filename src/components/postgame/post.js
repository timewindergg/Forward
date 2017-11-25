import React, { Component } from 'react';
import './post.css';

class Postgame extends Component {
  render() {
    return (
      <div className="Postgame">
        <div class="content">
          <h1>Timewinder</h1>
          <p> Welcome, {this.props.match.params.summonerName}</p>
        </div>
      </div>
    );
  }
}

export default Postgame;
