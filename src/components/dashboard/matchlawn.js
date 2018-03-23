import React, { Component } from 'react';

import CalendarHeatmap from 'react-calendar-heatmap';

import ReactTooltip from 'react-tooltip';

import { FILTER } from '../../shared/constants.js';

class MatchLawn extends Component {
  render() {
    const { lawn } = this.props;

    const startDate = new Date();
    startDate.setDate(1);
    startDate.setMonth(startDate.getMonth() - 3);

    let cDate = new Date();
    cDate.setDate(1);
    cDate.setMonth(cDate.getMonth() - 4);
    cDate.setHours(0,0,0,0);
    const endDate = new Date();
    endDate.setHours(0,0,0,0);

    let dateString;
    while (cDate <= endDate){
       dateString = [cDate.getFullYear(), ('0' + (cDate.getMonth() + 1)).slice(-2), ('0' + cDate.getDate()).slice(-2)].join('-');
      if (lawn.find((e) => {
        return e.date === dateString;
      }) === undefined){

        lawn.push({
          'date': dateString,
          'wins': 0,
          'losses': 0
        });
      }
      cDate.setDate(cDate.getDate() + 1);
      cDate.setHours(0,0,0,0);
    }
    
    const customTooltipDataAttrs = (value) => ({
      'data-tip': `${value.date}: ${value.wins}W ${value.losses}L`
    });

    return (
      <div className="dashboard-match-heat-map">
        <CalendarHeatmap
          onClick={(value) => {
            if (value && (value.wins > 0 || value.losses > 0)) {
              this.props.onFilterSelect(value.date, FILTER.DATE);
            }
          }}
          endDate={endDate}
          startDate={startDate}
          values={lawn}
          showWeekdayLabels={true}
          weekdayLabels={['S','M','T','W','Th','F','S']}
          tooltipDataAttrs={customTooltipDataAttrs}
          classForValue={(value) => {
            if (!value || value.wins === 0 && value.losses === 0) {
              return 'color-empty';
            }

            let scale = (value.losses > value.wins ? (Math.floor(value.losses / 3) + 1) : Math.floor(value.wins / 3) + 1);

            if (scale > 3) {
              scale = 3;
            }

            let matchOutcome = 'win';

            if (value.losses === value.wins) {
              matchOutcome = 'tie';
            } else if (value.losses > value.wins) {
              matchOutcome = 'loss';
            }

            return `color-scale-${matchOutcome} scale${scale}`;
          }}
        />
        <ReactTooltip/>
      </div>
    )
  }
}

export default MatchLawn;
