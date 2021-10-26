import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import EditorContainer from "../../screens/EditorContainer";

const Router: React.FC = () => {

    //Wrap Router with "BrowserRouter" or add a /#/ after "editor" in the url

    return (
        <HashRouter>
            <Switch>

                <Route
                    exact
                    path="/:artifactId/:milestoneNumber"
                    component={EditorContainer} />
            </Switch>
        </HashRouter>
    );
};


export default Router;
