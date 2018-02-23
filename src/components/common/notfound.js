import React, { Component } from 'react';

import { getStaticImage } from '../../shared/helpers/staticImageHelper.js';

import './styles/notfound.css';

class NotFound extends Component {
  render() {
    return (
      <div className="notFoundContainer">
        <div className="notfound">
          <img className="splash" src={getStaticImage("/notfound_image.png")} alt=""></img>
          <h4>Sorry, we ran out of wards and couldn't find the page you were looking for.</h4>
        </div>
      </div>
    );
  }
}

export default NotFound;