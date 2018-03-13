import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const {name, shortDescription, img} = data;

    return(
      <div className='rc-rune-tooltip'>
        <div className='tt-rune-header'>
          <img className='tt-rune-img' src={img} alt={img}/>
          <div className='tt-rune-name'>
            {name}
          </div>
        </div>
        <div
          className='tt-rune-desc'
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
