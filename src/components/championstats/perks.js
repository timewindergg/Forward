import React, { Component } from 'react';
import classNames from 'classnames';

import { getPerkIconUrl } from '../../shared/helpers/staticImageHelper.js';
import RuneMappings from '../../shared/runeMappings.js';

class Perk extends Component {
  render(){
    return (
      <div className="perk">
        <div className="perkImg">
          <img className={`perkIcon ${this.props.type}`} src={getPerkIconUrl(this.props.perk, this.props.version)}/>
        </div>
        <div className="description">
          <h4>{this.props.perkData.name}</h4>
          <div dangerouslySetInnerHTML={{__html: this.props.perkData.shortDescription}}></div>
        </div>
      </div>
    );
  }
}

class Perks extends Component {
  renderPrimary(keystone, perks){
    return(
      <div className="primaryPerks">
        <Perk type="keystone" perk={keystone} version={this.props.version} perkData={this.props.perkData[keystone]}/>
        <Perk perk={perks[0]} version={this.props.version} perkData={this.props.perkData[perks[0]]}/>
        <Perk perk={perks[1]} version={this.props.version} perkData={this.props.perkData[perks[1]]}/>
        <Perk perk={perks[2]} version={this.props.version} perkData={this.props.perkData[perks[2]]}/>
      </div>
    );
  }

  renderSecondary(perks){
    return(
      <div className="secondaryPerks">
        <Perk perk={perks[0]} version={this.props.version} perkData={this.props.perkData[perks[0]]}/>
        <Perk perk={perks[1]} version={this.props.version} perkData={this.props.perkData[perks[1]]}/>
      </div>
    );
  }

  render() {
    const {perks, perkData, version} = this.props;

    let keystone;
    let primaryPerks = [];
    let secondaryPerks = [];

    //find keystone
    for (var i = 0; i < perks.length; i++){
      if (perkData[perks[i]].isKeystone){
        keystone = perks[i];
        break;
      }
    }

    //categorize perks
    perks.map((r) => {
      if (r != keystone){
        if (perkData[r].path === perkData[keystone].path){
          primaryPerks.push(r);
        }
        else{
          secondaryPerks.push(r);
        }
      }
    });

    return (
      <div>
        <h3>Most used runes</h3>
        <div className="champion-stats-champion-perks">
          {this.renderPrimary(keystone, primaryPerks)}
          {this.renderSecondary(secondaryPerks)}
        </div>
      </div>
    );
  }
}

export default Perks;