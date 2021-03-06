import React, { Component } from 'react';

import NotFound from '../../components/common/notfound';
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';

class NotFoundContainer extends Component {
  render() {
    return (
      <div>
        <Header />
        <NotFound />
        <Footer />
      </div>
    );
  }
}

export default NotFoundContainer;