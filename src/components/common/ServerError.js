import React, { Component } from 'react';

import { getStaticImage } from '../../shared/helpers/staticImageHelper.js';

import './styles/notfound.css';

class ServerError extends Component {
  render() {
    return (
      <div className="notFoundContainer">
        <div className="notfound">
          <img className="splash" src={getStaticImage("/servererror_image.png")} alt=""></img>
          <h4>Sorry, Amumu's puddle fried our servers, please try again later.</h4>
        </div>
      </div>
    );
  }
}

export default ServerError;
