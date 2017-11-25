import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home/home';
import Dashboard from './components/dashboard/dash';
import Postgame from './components/postgame/post';
import Pregame from './components/pregame/pre';

import configureStore from './stores/configureStore';
const store = configureStore();

const Routes = () => (
  <Provider store={store}>
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/p/:summonerName" component={Dashboard} />
          <Route exact path="/m/:matchId" component={Postgame} />
          <Route exact path="/l/:summonerName" component={Pregame} />
        </Switch>
    </BrowserRouter>
  </Provider>
);

export default Routes;

