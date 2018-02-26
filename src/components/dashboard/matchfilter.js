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

  _handleKeyPress = (event) => {
    if (event.key === 'Enter'){
      if (event.target.value.length > 0){
        this._onChampionChange(event.target.value);
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
          <Dropdown className="queue-dropdown" options={queues} onChange={this._onQueueChange} value={this.state.queue} placeholder="All Queues" />
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
        <input id="champions" list="champion-suggestions"
          onKeyPress={this._handleKeyPress}/>
          <datalist id="champion-suggestions">
            {this.generateDataListOptions(championData)}
          </datalist>
          <div className="search-icon"><i className="fas fa-search"></i></div>
      </div>
    )
  }

  generateDataListOptions(championData) {
    return Object.keys(championData).map((key, index) => {
      return (
        <option value={championData[key].name} key={key}/>
      )
    });
  }

  renderUserSelectedFilters(dateFilter) {
    let queueSelectedFilter = null;
    let championSelectedFilter = null;
    let dateSelectedFilter = null;

    if (this.state.queue.length !== 0) {
      queueSelectedFilter = <div><button onClick={(event) => {this._resetQueueFilter()}}><h1>{this.state.queue}</h1> <i class="ion-close-round"></i></button></div>;
    }

    if (this.state.champion.length !== 0) {
      championSelectedFilter = <div><button onClick={(event) => {this._resetChampionFilter()}}><h1>{this.state.champion}</h1> <i class="ion-close-round"></i></button></div>;
    }

    if (dateFilter !== undefined && dateFilter.length !== 0) {
      dateSelectedFilter = <div><button onClick={(event) => {this._resetDateFilter()}}><h1>{dateFilter}</h1> <i class="ion-close-round"></i></button></div>;
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
