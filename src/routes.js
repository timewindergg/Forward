import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeContainer from './containers/home/home';
import DashboardContainer from './containers/dashboard/dash';
import PostgameContainer from './containers/postgame/post';
import PregameContainer from './containers/pregame/pregame';

import {
  SUMMONER_PARAM,
  REGION_PARAM,
  MATCH_PARAM
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
            path={`/m/:${MATCH_PARAM}/:${REGION_PARAM}`}
            component={PostgameContainer}
          />
          <Route
            path={`/l/:${SUMMONER_PARAM}`}
            component={PregameContainer}
          />
        </Switch>
    </BrowserRouter>
  </Provider>
);

export default Routes;

