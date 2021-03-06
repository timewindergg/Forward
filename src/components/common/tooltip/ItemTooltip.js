import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles/ItemTooltip.css';

// tooltip content
class ItemTooltip extends Component{
  static defaultProps = {
    data: {
      name: '',
      totalGold: 0,
      sellGold: 0,
      description: '',
      plaintext: '',
      img: ''
    }
  }

  static propTypes = {
    data: PropTypes.object,      // staticData for specific object
  }

  render() {
    const {data} = this.props;
    const {img, name, totalGold, sellGold, description} = data;

    return(
      <div className='rc-item-tooltip'>
        <div className='tt-item-header'>
          <img className='icon tt-item-img' src={img} alt={img} />
          <div className='tt-item-name'>
            {name}
          </div>
        </div>
        <div
          className='tt-item-desc'
          dangerouslySetInnerHTML={{__html: description}}
        >
        </div>
        <div className='tt-item-totalgold'>
          {`Total Gold: `}<span className='tt-item-gold'>{totalGold}</span>
        </div>
        <div className='tt-item-totalgold'>
          {`Sell: `}<span className='tt-item-gold'>{sellGold}</span>
        </div>
      </div>
    );
  }
}

export default ItemTooltip;

// "name":"Faerie Charm",
// "totalGold":125,
// "sellGold":88,
// "description":"<stats><mana>+25% Base Mana Regen </mana></stats>",
// "plaintext":"Slightly increases Mana Regen",


/*
        <div className='item-plaintext'>
          <span className='plaintext'>{plaintext}</span>
        </div>
*/
