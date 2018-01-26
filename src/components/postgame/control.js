import React, { Component } from 'react';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class EventLine extends Component {
  constructorWillMount(){

  }

  render() {
    return(
      <div/>
    );
  }
}

class ControlHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxFrames: 1,
      currentFrame: 1
    }
  }

  componentWillMount(){
    if (this.props.timeline !== undefined){
      this.setState({
        maxFrames: this.props.timeline.frames.length,
        currentFrame: this.props.timeline.frames.length,
      });
    }
  }

  renderTime(){
    return this.state.currentFrame;
  }


  render() {
    return(
      <div>
        <div className="sliderTime">
          {this.renderTime()}
        </div>
        <div className="gameSlider" >
          <Slider max={this.state.maxFrames - 1} onChange={this.props.onSliderChange}/>
        </div>
        <div className="eventTimeline">
          <EventLine />
        </div>

      </div>
      
    );
  }
}

export default ControlHeader;