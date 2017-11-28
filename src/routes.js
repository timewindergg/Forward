import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeContainer from './containers/home/home';
import DashboardContainer from './containers/dashboard/dash';
import Postgame from './components/postgame/post';
import Pregame from './components/pregame/pre';

import configureStore from './stores/configureStore';
const store = configureStore();

const Routes = () => (
  <Provider store={store}>
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/p/:summonerName" component={DashboardContainer} />
          <Route path="/m/:matchId" component={Postgame} />
          <Route path="/l/:summonerName" component={Pregame} />
        </Switch>
    </BrowserRouter>
  </Provider>
);

export default Routes;

