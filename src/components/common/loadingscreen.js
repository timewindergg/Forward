import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClimbingBoxLoader } from 'react-spinners';

class LoadingScreen extends Component {
  static defaultProps = {
    loadingText: 'grinding elo...'
  }

  static propTypes = {
    loadingText: PropTypes.string
  }

  render() {
    return(
      <div className='loadingScreen'>
        <div className='loader'>
          <ClimbingBoxLoader
            color={'#ff6666'} 
            loading={true} 
          />
          <h4>{this.props.loadingText}</h4>
        </div>
      </div>
    );
  }
}

export default LoadingScreen;
