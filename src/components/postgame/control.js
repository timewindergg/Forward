import React, { Component } from 'react';
import classNames from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Event extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const circleSize = [0, 8, 11, 14, 17, 20, 23];

    let len = this.props.events.length;

    if (len === 0){
      return (<div className='event'></div>);
    }

    let blueTeam = this.props.team === '100';
    let redTeam = this.props.team === '200';

    if (this.props.type === "objs"){
      let event = this.props.events[0];
      if (event.type === "BUILDING_KILL"){
        if (event.buildingType === "INHIBITOR_BUILDING"){
          return (<div className={classNames({'event': true, 'icon-inhibitor': true, 'color100f': blueTeam, 'color200f': redTeam})}></div>);
        }
        else if (event.buildingType === "TOWER_BUILDING"){
          return (<div className={classNames({'event': true, 'icon-tower': true, 'color100f': blueTeam, 'color200f': redTeam})}></div>);
        }
      }
      else if (event.type === "ELITE_MONSTER_KILL"){
        if (event.monsterType === "BARON_NASHOR" || event.monsterType === "VILEMAW"){
          return (<div className={classNames({'event': true, 'icon-baron': true, 'color100f': blueTeam, 'color200f': redTeam})}></div>);
        }
        else if (event.monsterType === "DRAGON") {
          return (<div className={classNames({'event': true, 'icon-dragon': true, 'color100f': blueTeam, 'color200f': redTeam})}></div>);
        }
        else if (event.monsterType === "RIFTHERALD"){
          return (<div className={classNames({'event': true, 'icon-rift-herald': true, 'color100f': blueTeam, 'color200f': redTeam})}></div>);
        }
      }
    }
    else if (this.props.type === "kills"){
      let killStyle = {
        'width': circleSize[len],
        'height': circleSize[len],
        '-webkit-border-radius': circleSize[len] / 2,
        '-moz-border-radius': circleSize[len] / 2,
        'border-radius': circleSize[len] / 2,
      };

      return (<div style={killStyle} className={classNames({'event': true, 'color100': blueTeam, 'color200': redTeam})}></div>);
    }
  }
}

class EventRow extends Component{
  constructor(props){
    super(props);
  }

  render(){

    const eventlist = this.props.events.map((frame, index) => {
      let offset = (index - 1) / (this.props.events.length - 1) * 100;
      let style = {
        'left': offset + '%',
        'width': 1300 / (this.props.events.length - 1)
      }

      return (
        <div style={style} className="eventContainer">
          <Event offset={offset} team={this.props.team} type={this.props.type} events={frame[this.props.team][this.props.type]}/>
        </div>
      );
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

  render() {
    let marks = {};

    for (var i = 0; i < this.state.maxFrames; i+=5){
      marks[i] = i.toString();
    }

    console.log(marks)

    return(
      <div className="controlHeader">
        <div className="gameSlider" >
          <Slider marks={marks} dots="true" max={this.state.maxFrames - 1} onChange={this.props.onSliderChange}/>
        </div>
        <div className="eventTimeline">
          <EventLine events={this.props.events}/>
        </div>

      </div>
      
    );
  }
}

export default ControlHeader;