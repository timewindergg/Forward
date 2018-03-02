import React, { Component } from 'react';

import Dropdown from 'react-dropdown'

import ChampionFilter from './championfilter';

import QueueIdMappings from '../../shared/queueIdMappings';

class MatchFilter extends Component{
  constructor(props){
    super(props);

    this.state = {
      queue: '',
      champion: '',
    };
  }

  _onQueueChange = (option) => {
    this.props.onQueueSelect(option.value);
    this.setState({
      queue: option.value,
    });
  }

  _onChampionChange = (champion) => {
    this.props.onChampionSelect(champion);
    this.setState({
      champion: champion,
    });
  }

  _resetQueueFilter = () => {
    this.props.onQueueSelect('');
    this.setState({
      queue: '',
    });
  }

  _resetChampionFilter = () => {
    this.props.onChampionSelect('');
    this.setState({
      champion: ''
    });
  }

  _resetDateFilter = () => {
    this.props.onDateSelect('');
  }

  _handleKeyPress = (value) => {
    this._onChampionChange(value);
  }

  render() {
    const { matches, championData, dateFilter, version } = this.props;
    // Loop through our list of matches and check to see which types there are.
    const queues = [];

    matches.forEach((m) => {
      const queueName = QueueIdMappings[m.queue_id].name
      if (!(queues.indexOf(queueName) > -1)) {
        queues.push(queueName);
      }
    });

    const champions = Object.keys(championData).map((key) => {
      return championData[key];
    });

    return(
      <div className="dashboard-filter">
        <div className="queue-selector">
          <Dropdown className="queue-dropdown" options={queues} onChange={this._onQueueChange} value={this.state.queue} placeholder="All Queues" />
        </div>
        <ChampionFilter champions={champions} version={version} onKeyPress={this._handleKeyPress}/>
        {this.renderUserSelectedFilters(this.props.dateFilter)}
      </div>
    );
  }

  renderUserSelectedFilters(dateFilter) {
    let queueSelectedFilter = null;
    let championSelectedFilter = null;
    let dateSelectedFilter = null;

    if (this.state.queue.length !== 0) {
      queueSelectedFilter = <div><button onClick={(event) => {this._resetQueueFilter()}}><h1>{this.state.queue}</h1> <i className="ion-close-round"></i></button></div>;
    }

    if (this.state.champion.length !== 0) {
      championSelectedFilter = <div><button onClick={(event) => {this._resetChampionFilter()}}><h1>{this.state.champion}</h1> <i className="ion-close-round"></i></button></div>;
    }

    if (dateFilter !== undefined && dateFilter.length !== 0) {
      dateSelectedFilter = <div><button onClick={(event) => {this._resetDateFilter()}}><h1>{dateFilter}</h1> <i className="ion-close-round"></i></button></div>;
    }

    return (
      <div className="dashboard-selected-filters">
        {queueSelectedFilter}
        {championSelectedFilter}
        {dateSelectedFilter}
      </div>
    );

  }
}

export default MatchFilter;
