import React from "react";
import {Route, Switch} from "react-router-dom";
import Overview from "../../screens/Overview";

const Router: React.FC = () => {
    return (
        <Switch>
            <Route
                exact path="/"
                component={Overview}/>

            <Route exact path ="/bpmnrepo"
                   component={Overview}/>
        </Switch>
    );
};

export default Router;
