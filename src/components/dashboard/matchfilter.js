import React, { Component } from 'react';

import Dropdown from 'react-dropdown'

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

  _handleKeyPress = (event) => {
    if (event.key === 'Enter'){
      if (this.state.champion.length > 0){
        this._onChampionChange(this.state.champion);
      }
      event.preventDefault();
    }
  }

  render() {
    const { matches, championData, dateFilter} = this.props;
    // Loop through our list of matches and check to see which types there are.
    const queues = [];

    matches.forEach((m) => {
      const queueName = QueueIdMappings[m.queue_id].name
      if (!(queues.indexOf(queueName) > -1)) {
        queues.push(queueName);
      }
    });

    return(
      <div className="dashboard-filter">
        <div className="queue-selector">
          <Dropdown className="dropdown" options={queues} onChange={this._onQueueChange} value={this.state.queue} placeholder="All queues" />
        </div>
        {this.renderChampionSelector(championData)}
        {this.renderUserSelectedFilters(this.props.dateFilter)}
      </div>
    );
  }

  // Using datalists to give auto suggestions
  renderChampionSelector(championData) {
    return (
      <div className="champion-selector">
        <input id="color" list="champion-suggestions" onChange={(event) => this.setState({champion: event.target.value})}
          onKeyPress={this._handleKeyPress}/>
          <datalist id="champion-suggestions">
            {this.generateDataListOptions(championData)}
          </datalist>
      </div>
    )
  }

  generateDataListOptions(championData) {
    return Object.keys(championData).map((key, index) => {
      return (
        <option value={championData[key].name}/>
      )
    });
  }

  renderUserSelectedFilters(dateFilter) {
    let queueSelectedFilter = null;
    let championSelectedFilter = null;
    let dateSelectedFilter = null;

    if (this.state.queue.length !== 0) {
      queueSelectedFilter = <div><button onClick={(event) => {this._resetQueueFilter()}}>{this.state.queue}</button></div>;
    }

    if (this.state.champion.length !== 0) {
      championSelectedFilter = <div><button onClick={(event) => {this._resetChampionFilter()}}>{this.state.champion}</button></div>;
    }

    if (dateFilter.length !== 0) {
      dateSelectedFilter = <div><button onClick={(event) => {this._resetDateFilter()}}>{dateFilter}</button></div>;
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
