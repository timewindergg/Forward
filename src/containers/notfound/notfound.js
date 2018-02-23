import React, { Component } from 'react';

import { getStaticImage } from '../../shared/helpers/staticImageHelper.js';

import Home from '../../components/home/home';
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';

import './notfound.css';

class NotFound extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <Header />
        <div className="notFoundContainer">
          <div className="notfound">
            <img className="splash" src={getStaticImage("/notfound_image.png")} alt=""></img>
            <h4>Sorry, we ran out of wards and couldn't find the page you are looking for.</h4>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default NotFound;