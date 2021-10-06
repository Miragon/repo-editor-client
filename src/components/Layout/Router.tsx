import React from "react";
import {Route, Switch} from "react-router-dom";
import EditorContainer from "../../screens/EditorContainer";

const Router: React.FC = () => {

    //Wrap Router with "BrowserRouter" or add a /#/ after "editor" in the url

    return (
        <Switch>
            <Route
                exact
                path="/"
                component={EditorContainer}/>
            <Route
                exact
                path="/:artifactId/:milestoneNumber"
                component={EditorContainer} />
        </Switch>
    );
};


export default Router;
