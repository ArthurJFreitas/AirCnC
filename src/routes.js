import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';


import Login from './pages/Login';
import New from './pages/New';
import Dashboard from './pages/Dashboard';

export default function Routes(){
    return(

        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/Dashboard" component={Dashboard} />
                <Route path="/New" component={New} />
            </Switch>
        </BrowserRouter>

    );
}