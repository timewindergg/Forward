import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Home from '../../components/home/home';
import {searchSummoner} from '../../actions/navigation';

class HomeContainer extends Component {
  static propTypes = {
    onSearchSummoner: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Home onSearchSummoner={this.props.onSearchSummoner}/>
    );
  }
}

// maps states from the reducers to the component
const mapStateToProps = (state) => ({});

// provides the callback for the component to dispatch an action
// the callback is passed into the component as a property of type func.

const mapDispatchToProps = (dispatch) => ({
  onSearchSummoner: (summoner, region) => dispatch(searchSummoner({
    region, summoner
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
