import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    const {img, name, totalGold, sellGold, description, plaintext} = data;

    return(
      <div className='rc-item-tooltip'>
        <div className='item-header'>
          <img className='icon item-img' src={img} alt={img} />
          <div className='item-name'>
            {name}
          </div>
        </div>
        <div
          className='item-desc'
          dangerouslySetInnerHTML={{__html: description}}
        >
        </div>
        <div className='item-totalgold'>
          {`Total Gold: `}<span className='item-gold'>{totalGold}</span>
        </div>
        <div className='item-totalgold'>
          {`Sell: `}<span className='item-gold'>{sellGold}</span>
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
