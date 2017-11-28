import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dashboard from '../../components/dashboard/dash';

class DashboardContainer extends Component {
  static propTypes = {
    summoner: PropTypes.string.isRequired,
  }

  render() {
    const {summoner} = this.props;

    return (
      <Dashboard
        summoner={summoner}
      />
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({
  summoner: state.context.summoner
});

// we will probably need this later
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
