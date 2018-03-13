import React, { Component } from 'react';
import classNames from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Event extends Component{
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
          return (<div className={classNames({'event': true, 'icon-inhibitor': true, 'blue-md-txt': blueTeam, 'red-dk-txt': redTeam})}></div>);
        }
        else if (event.buildingType === "TOWER_BUILDING"){
          return (<div className={classNames({'event': true, 'icon-tower': true, 'blue-md-txt': blueTeam, 'red-dk-txt': redTeam})}></div>);
        }
      }
      else if (event.type === "ELITE_MONSTER_KILL"){
        if (event.monsterType === "BARON_NASHOR" || event.monsterType === "VILEMAW"){
          return (<div className={classNames({'event': true, 'icon-baron': true, 'blue-md-txt': blueTeam, 'red-dk-txt': redTeam})}></div>);
        }
        else if (event.monsterType === "DRAGON") {
          return (<div className={classNames({'event': true, 'icon-dragon': true, 'blue-md-txt': blueTeam, 'red-dk-txt': redTeam})}></div>);
        }
        else if (event.monsterType === "RIFTHERALD"){
          return (<div className={classNames({'event': true, 'icon-rift-herald': true, 'blue-md-txt': blueTeam, 'red-dk-txt': redTeam})}></div>);
        }
      }
    }
    else if (this.props.type === "kills"){
      let killStyle = {
        'width': circleSize[len],
        'height': circleSize[len],
        'borderRadius': circleSize[len] / 2,
      };

      return (<div style={killStyle} className={classNames({'event': true, 'blue-md-bg': blueTeam, 'red-dk-bg': redTeam})}></div>);
    }
  }
}

class EventRow extends Component{
  render(){
    const eventlist = this.props.events.map((frame, index) => {
      let offset = (index - 1) / (this.props.events.length - 1) * 100;
      let style = {
        'left': offset + '%',
        'width': 1100 / (this.props.events.length - 1) - 4
      }

      return (
        <div key={index} style={style} className="eventContainer">
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
      currentFrame: 1,
      marks: {},
    }
  }

  componentWillMount(){
    if (this.props.timeline !== undefined){
      let marks = {};

      for (var i = 0; i < this.props.timeline.frames.length; i+=5){
        marks[i] = i.toString();
      }

      this.setState({
        maxFrames: this.props.timeline.frames.length,
        currentFrame: this.props.timeline.frames.length,
        marks: marks,
      });
    }
  }

  render() {

    return(
      <div className="controlHeader">
        <div className="gameSlider" >
          <Slider defaultValue={this.state.currentFrame} marks={this.state.marks} dots={true} max={this.state.maxFrames - 1} onChange={this.props.onSliderChange}/>
        </div>
        <div className="eventTimeline">
          <EventLine events={this.props.events}/>
        </div>

      </div>
      
    );
  }
}

export default ControlHeader;