import React from "react";
import {Route, Switch} from "react-router-dom";
import TemplateScreen from "../../screens/template/TemplateScreen";
import UserProfileScreen from "../../screens/user/UserProfileScreen";
import RegisterNewUserScreen from "../../screens/user/RegisterNewUserScreen";
import AllRepositoriesScreen from "../../screens/repository/AllRepositoriesScreen";
import CreateNewRepositoryScreen from "../../screens/repository/CreateNewRepositoryScreen";
import CreateNewTemplateScreen from "../../screens/template/CreateNewTemplateScreen";
import RepositoryTemplateScreen from "../../screens/repository/RepositoryTemplateScreen";
import RepositoryMemberScreen from "../../screens/repository/RepositoryMemberScreen";
import RepositorySettingsScreen from "../../screens/repository/RepositorySettingsScreen";

const Router: React.FC = () => {
    return (
        <Switch>
            <Route
                exact path="/"
                component={AllRepositoriesScreen}/>

            <Route
                exact path="/register"
                component={RegisterNewUserScreen}/>

            <Route
                exact path="/user"
                component={UserProfileScreen}/>

            <Route
                exact path="/repositories/"
                component={AllRepositoriesScreen}/>

            <Route
                exact path={"/repository/:repositoryId/templates"}
                component={RepositoryTemplateScreen}/>

            <Route
                exact path={"/repository/:repositoryId/members"}
                component={RepositoryMemberScreen} />

            <Route
                exact path={"/repository/:repositoryId/settings"}
                component={RepositorySettingsScreen} />

            <Route
                exact path="/template/:repositoryId/:templateId"
                component={TemplateScreen}/>

            <Route
                exact path="/create/repository"
                component={CreateNewRepositoryScreen}/>

            <Route
                exact path="/create/:repositoryId/template"
                component={CreateNewTemplateScreen}/>

        </Switch>
    );
};

export default Router;
