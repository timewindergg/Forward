import React, { Component } from 'react';
import { getChampionIconUrlByImage, getMapUrl } from '../../shared/helpers/staticImageHelper.js';
import MapBounds from '../../shared/mapConstants.js';

class Minimap extends Component {
  renderDeaths(){

  }

  renderParticipants(championData) {
    let currentMapBounds = MapBounds[this.props.mapId];

    const pt = Object.values(this.props.playerFrameData).map((player) => {
      let imgX = player.x / (currentMapBounds.max.x - currentMapBounds.min.x) * 100;
      let imgY = player.y / (currentMapBounds.max.y - currentMapBounds.min.y) * 100;
      let style = {
        left: imgX+'%',
        bottom: imgY+'%'
      };
      return (
        <img key={player.championId} style={style} className="minimapPortrait" src={getChampionIconUrlByImage(championData[player.championId].img.split('.')[0], this.props.version)}>
        </img>
      );
    });

    return pt;
  }

  render() {
    return(
      <div className="mapContainer">
        <img className="minimap" src={getMapUrl(this.props.mapId, this.props.version)}></img>
        {this.renderParticipants(this.props.championData)}
        {this.renderDeaths()}
      </div>
    );
  }
}

export default Minimap;