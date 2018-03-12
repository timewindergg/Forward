import React, { Component } from 'react';

import CalendarHeatmap from 'react-calendar-heatmap';

import ReactTooltip from 'react-tooltip';

import { FILTER } from '../../shared/constants.js';

class MatchLawn extends Component {
  render() {
    if (this.props.lawn === undefined) {
      return (<div/>);
    }

    const { lawn } = this.props;

    // Calculate the beginning of 4 months ago.
    const d = new Date();
    d.setDate(1); // sets it to the beginning of the month.
    d.setMonth(d.getMonth() - 4);

    const customTooltipDataAttrs = (value) => ({
      'data-tip': !value.date ? 'no data' : `${value.date}: ${value.wins + value.losses} Records: ${value.wins}w-${value.losses}l`
    });

    const beginningDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDay() + 1;
    return (
      <div className="dashboard-match-heat-map">
        <CalendarHeatmap
          onClick={(value) => {
            if (!!value && value.date) {
              this.props.onFilterSelect(value.date, FILTER.DATE);
            }
          }}
          endDate={new Date()}
          startDate={beginningDate}
          values={lawn}
          showWeekdayLabels={true}
          weekdayLabels={['S','M','T','W','Th','F','S']}
          tooltipDataAttrs={customTooltipDataAttrs}
          classForValue={(value) => {
            if (!value) {
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
