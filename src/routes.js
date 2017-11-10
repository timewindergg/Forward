import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './home/home';
import Dashboard from './dashboard/dash';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dash/:summonerName" component={Dashboard} />
        </Switch>
    </BrowserRouter>
);

export default Routes;