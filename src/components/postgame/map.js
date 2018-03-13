import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import classNames from 'classnames';

import { getChampionIconUrlByImage, getMapUrl } from '../../shared/helpers/staticImageHelper.js';
import MapBounds from '../../shared/mapConstants.js';

class Minimap extends Component {
  renderDeaths(){
    let currentMapBounds = MapBounds[this.props.mapId];

    let blueDeaths = this.props.deathFrameData['100'].deaths;
    let redDeaths = this.props.deathFrameData['200'].deaths;

    const bd = blueDeaths.map((death) => {
      const id = uuidv4();
      let x = death[0];
      let y = death[1];

      let imgX = x / (currentMapBounds.max.x - currentMapBounds.min.x) * 100;
      let imgY = y / (currentMapBounds.max.y - currentMapBounds.min.y) * 100;
      let style = {
        left: imgX+'%',
        bottom: imgY+'%'
      };
      return (
        <div key={id} style={style} className="death blue"></div>
      );
    });

    const rd = redDeaths.map((death) => {
      const id = uuidv4();
      let x = death[0];
      let y = death[1];

      let imgX = x / (currentMapBounds.max.x - currentMapBounds.min.x) * 100;
      let imgY = y / (currentMapBounds.max.y - currentMapBounds.min.y) * 100;
      let style = {
        left: imgX+'%',
        bottom: imgY+'%'
      };
      return (
        <div key={id} style={style} className="death red"></div>
      );
    });

    return (
      <div>
      {bd}
      {rd}
      </div>
    );
  }

  renderParticipants(championData) {
    let currentMapBounds = MapBounds[this.props.mapId];
    let len = Object.keys(this.props.playerFrameData).length;

    const pt = Object.keys(this.props.playerFrameData).map((key, index) => {
      let player = this.props.playerFrameData[key];

      let imgX = player.x / (currentMapBounds.max.x - currentMapBounds.min.x) * 100;
      let imgY = player.y / (currentMapBounds.max.y - currentMapBounds.min.y) * 100;
      let style = {
        left: imgX+'%',
        bottom: imgY+'%'
      };
      return (
        <img key={player.championId} style={style} className="minimapPortrait" src={getChampionIconUrlByImage(championData[player.championId].img.split('.')[0], this.props.version)} alt="">
        </img>
      );
    });

    return pt;
  }

  render() {
    return(
      <div className="mapContainer">
        <img className="minimap" src={getMapUrl(this.props.mapId, this.props.version)} alt=""></img>
        {this.renderParticipants(this.props.championData)}
        {this.renderDeaths()}
      </div>
    );
  }
}

export default Minimap;