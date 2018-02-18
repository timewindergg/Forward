import React, { Component } from 'react';
import Moment from 'react-moment';

import {getItemIconUrl} from '../../shared/helpers/staticImageHelper.js';

class Item extends Component {
  render(){
    let id = this.props.id;
    let type = 'item';
    if (this.props.id < 0){
      type += ' sold';
    }

    return(
      <div className='itemContainer'>
        <img className={type} src={getItemIconUrl(Math.abs(id), this.props.version)}></img>
        <span><Moment className='itemTs clear' format='mm:ss'>{this.props.ts}</Moment></span>
      </div>
    );
  }
}


class ItemProgression extends Component {
  renderItems(){
    let items = this.props.itemOrder;

    return items.map((item) => (
      <Item id={item.id} ts={item.ts} version={this.props.version}></Item>
    ));
  }

  render(){
    return(
      <div className="itemProgressContainer">
        {this.renderItems()}
      </div>
    );
  }
}

export default ItemProgression;