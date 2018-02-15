import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeContainer from './containers/home/home';
import DashboardContainer from './containers/dashboard/dash';
import PostgameContainer from './containers/postgame/post';
import PregameContainer from './containers/pregame/pregame';
import ChampionStatsContainer from './containers/championstats/championstats';

import {
  SUMMONER_PARAM,
  REGION_PARAM,
  MATCH_PARAM,
  CHAMPION_PARAM
} from './constants/RouteConstants';

import configureStore from './stores/configureStore';
const store = configureStore();


const Routes = () => (
  <Provider store={store}>
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route
            path={`/p/:${SUMMONER_PARAM}/:${REGION_PARAM}`}
            component={DashboardContainer}
          />
          <Route
            path={`/m/:${REGION_PARAM}/:${MATCH_PARAM}`}
            component={PostgameContainer}
          />
          <Route
            path={`/l/:${SUMMONER_PARAM}/:${REGION_PARAM}`}
            component={PregameContainer}
          />
          <Route
            path={`/c/:${REGION_PARAM}/:${SUMMONER_PARAM}/:${CHAMPION_PARAM}`}
            component={ChampionStatsContainer}
          />
        </Switch>
    </BrowserRouter>
  </Provider>
);

export default Routes;

