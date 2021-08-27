import React from "react";
import {Route, Switch} from "react-router-dom";
import EditorContainer from "../../screens/EditorContainer";

const Router: React.FC = () => {
    return (
        <Switch>
            <Route
                path="/:artifactId/:versionId"
                component={EditorContainer} />
        </Switch>
    );
};

export default Router;
