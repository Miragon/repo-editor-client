import React from "react";
import {Route, Switch} from "react-router-dom";
import Container from "../../screens/Container";
import RegisterNewUserScreen from "../../screens/RegisterNewUserScreen";

const Router: React.FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/"
                component={Container} />
        </Switch>
    );
};

export default Router;
