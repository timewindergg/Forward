import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CurrentMatchCompare.css';

class CurrentMatchCompare extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  static propTypes = {
    currentMatchDetails: PropTypes.object.isRequired,
  }

  render() {
    const {currentMatchDetails} = this.props;

    return (
      <div className='rc-current-match-compare'>
        <h1>CURMATCHCOMPARE</h1>
      </div>
    );
  }
}

export default CurrentMatchCompare;
