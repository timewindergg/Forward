import React, { Component } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';

class LoadingScreen extends Component{
  render(){
    return(
      <div className='loadingScreen'>
        <div className='loader'>
          <ClimbingBoxLoader
            color={'#ff6666'} 
            loading={true} 
          />
          <h4>Grinding elo ...</h4>
        </div>
      </div>
    );
  }
}

export default LoadingScreen;