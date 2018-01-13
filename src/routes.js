import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeContainer from './containers/home/home';
import DashboardContainer from './containers/dashboard/dash';
import Postgame from './components/postgame/post';
import Pregame from './components/pregame/pre';

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
            component={Postgame}
          />
          <Route
            path={`/l/:${SUMMONER_PARAM}`}
            component={Pregame}
          />
        </Switch>
    </BrowserRouter>
  </Provider>
);

export default Routes;

