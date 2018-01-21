import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CurrentMatchOverview.css';

class CurrentMatchOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  static defaultProps = {
    redTeam: [],
    blueTeam: [],
  }

  static propTypes = {
    redTeam: PropTypes.array.isRequired,
    blueTeam: PropTypes.array.isRequired,
  }

  render() {
    const {redTeam, blueTeam} = this.props;

    return (
      <div className='rc-current-match-overview'>
        <h1>CURMATCHOVERVIEW</h1>
      </div>
    );
  }
}

export default CurrentMatchOverview;
