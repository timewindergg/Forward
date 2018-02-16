import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { selectSummoner } from '../../actions/pregameActions';
import Header from '../../components/common/header';


class HeaderContainer extends Component {
  static propTypes = {}

  // TODO: fetch recent searches from cookies

  render() {

    return (
      <Header

      />
    );
  }
}

const mapStateToProps = (state) => ({
  // selectedRed: state.pregame.selectedRed,
  // selectedBlue: state.pregame.selectedBlue
});

const mapDispatchToProps = (dispatch) => ({
  // onSelect: (summonerID, isRed) => dispatch(selectSummoner(summonerID, isRed))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
