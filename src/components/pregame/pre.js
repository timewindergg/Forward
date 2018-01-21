import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './pre.css';

class Pregame extends Component {
  static propTypes = {
    summoner: PropTypes.object.isRequired,
    currentMatch: PropTypes.object.isRequired,
    currentMatchDetails: PropTypes.object.isRequired,
  }

  render() {
    console.log(this.props);
    return (
      <div className="rc-pregame">
        <h1>Timewinder</h1>
        <p> Welcome PREGAME, {this.props.summoner.name}</p>
      </div>
    );
  }
}

export default Pregame;
