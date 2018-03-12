import React, { Component } from 'react';

import Dropdown from 'react-dropdown'

import ChampionFilter from '../common/championfilter';

import classNames from 'classnames';

import QueueIdMappings from '../../shared/queueIdMappings';

import { FILTER } from '../../shared/constants.js';

class MatchFilter extends Component{
  constructor(props){
    super(props);
  }

  _onQueueSelected = (queue) => {
    this.props.onFilterSelect(queue, FILTER.QUEUE)
  }

  _onChampionChange = (champion) => {
    this.props.onFilterSelect(champion, FILTER.CHAMPION);
  }

  _handleKeyPress = (value) => {
    this._onChampionChange(value);
  }

  _resetFilters = () => {
    this.props.onFilterSelect(null, FILTER.RESET);
  }

  render() {
    const { matches, championData, filters, version } = this.props;
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
        {this.renderQueueSelections(queues, filters.queueFilters)}
        <ChampionFilter champions={champions} version={version} onKeyPress={this._handleKeyPress}/>
        {this.renderUserSelectedFilters(filters)}
      </div>
    );
  }

  renderQueueSelections(queues, queueFilters) {
    const queueSelections = queues.map((queue) => {
      const queueIsSelected = Object.keys(queueFilters).length === 0 ? true : queue in queueFilters === true;
      let queueClick = this._onQueueSelected.bind(this, queue);
      return (
        <div key={queue} className={classNames({'queue-selection': true, 'selected': queueIsSelected === true})} onClick={queueClick}>{queue}</div>
      );
    });

    return (
      <div className="queue-selector">{queueSelections}</div>
    );
  }

  renderUserSelectedFilters(filters) {
    let resetFilter;
    if (filters.dateFilter.length !== 0 || filters.championFilter.length !== 0 || Object.keys(filters.queueFilters).length !== 0) {
      resetFilter = <div className="reset-filter" onClick={(event) => {this._resetFilters()}}>Clear Filter</div>
    }

    return (
      <div className="reset-filter-container">
        {resetFilter}
      </div>
    );
  }
}

export default MatchFilter;
