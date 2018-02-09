import React, { Component } from 'react';
import { getChampionIconUrl, getMapUrl } from '../../shared/helpers/staticImageHelper.js';
import MapBounds from '../../shared/mapConstants.js';

class Minimap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participants: [],
    };
  }

  renderParticipants() {
    let p = this.props.participants;

    let currentFrame = this.props.currentFrame;

    let currentFrameData = this.props.frameData[currentFrame];

    let currentMapBounds = MapBounds[this.props.mapId];

    console.log(currentFrameData)

    const pt = Object.values(currentFrameData.players).map((player) => {
      let imgX = player.x / (currentMapBounds.max.x - currentMapBounds.min.x);
      let imgY = player.y / (currentMapBounds.max.y - currentMapBounds.min.y);
      let style = {
        left: imgX,
        right: imgY
      };
      return (
        <div style={style}>
          <img className="minimapPortrait" src={getChampionIconUrl(player.championId, this.props.staticData.version)}>
          </img>
        </div>
      );
    });

    return pt;
  }

  render() {
    return(
      <div className="minimap">
        <img src={getMapUrl(this.props.mapId, this.props.staticData.version)}></img>
        {this.renderParticipants()}
      </div>
    );
  }
}

export default Minimap;