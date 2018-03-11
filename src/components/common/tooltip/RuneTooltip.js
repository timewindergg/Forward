import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles/RuneTooltip.css';

// tooltip content
class RuneTooltip extends Component{
  static defaultProps = {
    data: {
      name: '',
      path: '',
      shortDescription: '',
      isKeystone: false,
      img: ''
    }
  }

  static propTypes = {
    data: PropTypes.object,      // staticData for specific object
  }

  render() {
    const {data} = this.props;
    const {name, path, shortDescription, isKeystone, img} = data;

    return(
      <div className='rc-rune-tooltip'>
        <div className='rune-header'>
          <img className='rune-img' src={img} alt={img}/>
          <div className='rune-name'>
            {name}
          </div>
        </div>
        <div
          className='rune-desc'
          dangerouslySetInnerHTML={{__html: shortDescription}}
        >
        </div>
      </div>
    );
  }
}

export default RuneTooltip;

// function createMarkup() {
//   return {__html: 'First &middot; Second'};
// }

// function MyComponent() {
//   return <div dangerouslySetInnerHTML={createMarkup()} />;
// }
