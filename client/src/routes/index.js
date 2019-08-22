import React from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import NavbarContainer from '../containers/NavbarContainer';
import LoginPage from '../pages/LoginPage';
import UsersPage from '../pages/UsersPage';
import RegistrationPage from '../pages/RegistrationPage';
import RouteAuthNeeded from '../hoc/RouteAuthNeeded';
import RouteAuthNotNeeded from '../hoc/RouteAuthNotNeeded';

export default (props) => {
    return (
        <Router history={props.history}>
            <div>
                <NavbarContainer />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/signin"/>}/>
                    <Route path="/signin" exact component={RouteAuthNotNeeded(LoginPage)}/>
                    <Route path="/signup" exact component={RouteAuthNotNeeded(RegistrationPage)}/>
                    <Route path="/users" exact component={RouteAuthNeeded(UsersPage)}/>
                </Switch>
            </div>
        </Router>
    );
}