import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './home/home';
import Dashboard from './dashboard/dash';
import Postgame from './postgame/post';
import Pregame from './pregame/pre';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/p/:summonerName" component={Dashboard} />
            <Route exact path="/m/:matchId" component={Postgame} />
            <Route exact path="/l/:summonerName" component={Pregame} />
        </Switch>
    </BrowserRouter>
);

export default Routes;