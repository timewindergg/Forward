import React, { Component } from 'react';
import { getChampionIconUrl, getMapUrl } from '../../shared/helpers/staticImageHelper.js';

class Minimap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participants: [],
    };
  }

  renderParticipants() {
    let p = this.props.participants;
  }

  render() {
    return(
      <div>
        <img className="minimap" src={getMapUrl(this.props.mapId, this.props.staticData.version)}></img>
        {this.renderParticipants()}
      </div>
    );
  }
}

export default Minimap;