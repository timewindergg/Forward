import React, { Component } from 'react';

import { getStaticImage } from '../../shared/helpers/staticImageHelper.js';

import './styles/notfound.css';

class ServerError extends Component {
  render() {
    return (
      <div className="notFoundContainer">
        <div className="notfound">
          <img className="splash" src={getStaticImage("/notfound_image.png")} alt=""></img>
          <h4>Whoops, our Teemo's currently respawning.</h4>
        </div>
      </div>
    );
  }
}

export default NotFound;