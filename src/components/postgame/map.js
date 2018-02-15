import React, { Component } from 'react';
import { getChampionIconUrl, getMapUrl } from '../../shared/helpers/staticImageHelper.js';
import MapBounds from '../../shared/mapConstants.js';

class Minimap extends Component {
  constructor(props) {
    super(props);
  }

  renderDeaths(){

  }

  renderParticipants() {
    let p = this.props.participants;
    let currentFrame = this.props.currentFrame;
    let currentFrameData = this.props.frameData[currentFrame];
    let currentMapBounds = MapBounds[this.props.mapId];

    const pt = Object.values(currentFrameData.players).map((player) => {
      let imgX = player.x / (currentMapBounds.max.x - currentMapBounds.min.x) * 100;
      let imgY = player.y / (currentMapBounds.max.y - currentMapBounds.min.y) * 100;
      let style = {
        left: imgX+'%',
        bottom: imgY+'%'
      };
      return (
        <img key={player.championId} style={style} className="minimapPortrait" src={getChampionIconUrl(player.championId, this.props.staticData.version)}>
        </img>
      );
    });

    return pt;
  }

  render() {
    return(
      <div className="mapContainer">
        <img className="minimap" src={getMapUrl(this.props.mapId, this.props.staticData.version)}></img>
        {this.renderParticipants()}
        {this.renderDeaths()}
      </div>
    );
  }
}

export default Minimap;