import React from "react";
import {Route, Switch} from "react-router-dom";
import EditorContainer from "../../screens/EditorContainer";
import RegisterNewUserScreen from "../../screens/RegisterNewUserScreen";

const Router: React.FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/"
                component={EditorContainer} />
        </Switch>
    );
};

export default Router;
