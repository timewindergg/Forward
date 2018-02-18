import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import { HorizontalBar } from 'react-chartjs-2';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
    width: 500
  },
});



class ChampionStatsBarGraph extends Component {
  state = {
    value: 0,
  };

  constructor(props) {
    super(props);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {classes, championStats} = this.props;
    const {value} = this.state;

    if (this.props === undefined || Object.keys(championStats).length === 0) {
      return (<div/>);
    }

    const csData = {
      labels: ['CS Diff at 10', 'CS Diff at 20', 'CS Diff at 30'],
      datasets: [{
        data: [championStats.cs_diff10, championStats.cs_diff20, championStats.cs_diff30]
      }]
    }

    const xpData = {
      labels: ['XP Diff at 10', 'XP Diff at 20', 'XP Diff at 30'],
      datasets: [{
        data: [championStats.xp_diff10, championStats.xp_diff20, championStats.xp_diff30]
      }]
    }

    const damageData = {
      labels: ['Damage Taken at 10', 'Damage Taken at 20', 'Damage Taken at 30'],
      datasets: [{
        data: [championStats.dmg_taken10, championStats.dmg_taken20, championStats.dmg_taken30]
      }]
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="CS Diff" />
            <Tab label="XP Diff" />
            <Tab label="Damage Taken"/>
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>{this.renderBarGraph(csData)}</TabContainer>}
        {value === 1 && <TabContainer>{this.renderBarGraph(xpData)}</TabContainer>}
        {value === 2 && <TabContainer>{this.renderBarGraph(damageData)}</TabContainer>}
      </div>
    );
  }

  renderBarGraph(data) {
    return (
      <div className='compare-graph'>
        <HorizontalBar
          data={data}
          legend={{display: false}}
          ref={'GoldGraph'}
          options={{maintainAspectRatio: false}}
        />
      </div>
    );
  }
}

ChampionStatsBarGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChampionStatsBarGraph);