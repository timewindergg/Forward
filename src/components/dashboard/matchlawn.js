import React, { Component } from 'react';

import CalendarHeatmap from 'react-calendar-heatmap';

import ReactTooltip from 'react-tooltip';

class MatchLawn extends Component {
  render() {
    if (this.props.lawn === undefined) {
      return (<div/>);
    }

    const { lawn, onDateSelect} = this.props;

    // Calculate the beginning of 3 months ago.
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
          onClick={(value) => {onDateSelect(value)}}
          endDate={new Date()}
          startDate={beginningDate}
          values={lawn}
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

            return `color-scale-${matchOutcome}-${scale}`;
          }}
        />
        <ReactTooltip/>
      </div>
    )
  }
}

export default MatchLawn;
