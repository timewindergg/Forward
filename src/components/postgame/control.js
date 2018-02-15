import React, { Component } from 'react';
import classNames from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Event extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const circleSize = [0, 10, 20, 30, 40, 50, 60];

    let len = this.props.events.length;
    if (len === 0){
      return (<div className='event'></div>);
    }

    let colorClass;
    if (this.props.team === 100){
      colorClass = "color100";
    }
    else if (this.props.team === 200){
      colorClass = "color200";
    }

    if (this.props.type === "objs"){
      let event = this.props.events[0];
      if (event.type === "BUILDING_KILL"){
        if (event.buildingType === "INHIBITOR_BUILDING"){
          return (<div className={classNames('event': true, 'icon-inhibitor': true, colorClass: true)}></div>);
        }
        else if (event.buildingType === "TOWER_BUILDING"){
          return (<div className={classNames('event': true, 'icon-tower': true, colorClass: true)}></div>);
        }
      }
      else if (event.type === "ELITE_MONSTER_KILL"){
        if (event.monsterType === "BARON_NASHOR" || event.monsterType === "VILEMAW"){
          return (<div className={classNames('event': true, 'icon-baron': true, colorClass: true)}></div>);
        }
        else if (event.monsterType === "DRAGON") {
          return (<div className={classNames('event': true, 'icon-dragon': true, colorClass: true)}></div>);
        }
        else if (event.monsterType === "RIFTHERALD"){
          return (<div className={classNames('event': true, 'icon-rift-herald': true, colorClass: true)}></div>);
        }
      }
    }
    else if (this.props.type === "kills"){
      let style = {
        'width': circleSize[len],
        'height': circleSize[len],
        '-webkit-border-radius': circleSize[len] / 2,
        '-moz-border-radius': circleSize[len] / 2,
        'border-radius': circleSize[len] / 2,
        'background': '#000'
      };

      return (<div className={classNames('event': true, colorClass: true)} style={style}></div>);
    }

    return (<div className='event'>f</div>);
  }
}

class EventRow extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const eventlist = this.props.events.map((frame) => {
      return (<Event team={this.props.team} type={this.props.type} events={frame[this.props.team][this.props.type]}/>);
    });

    return (
      <div className="eventRow">
        {eventlist}
      </div>
    );
  }
}

class EventLine extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="eventRows">
        <EventRow className="eventRow clear" team="100" type="objs" events={this.props.events}/>
        <EventRow className="eventRow clear" team="100" type="kills" events={this.props.events}/>
        <EventRow className="eventRow clear" team="200" type="kills" events={this.props.events}/>
        <EventRow className="eventRow clear" team="200" type="objs" events={this.props.events}/>
      </div>
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
          <EventLine events={this.props.events}/>
        </div>

      </div>
      
    );
  }
}

export default ControlHeader;