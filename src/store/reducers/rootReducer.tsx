import {combineReducers} from "@reduxjs/toolkit";
import artifactReducer from "./artifactReducer";
import dataSyncedReducer from "./dataSyncedReducer";
import versionsReducer from "./versionsReducer";
import repositoryReducer from "./repositoryReducer";
import usersReducer from "./usersReducer";

export const rootReducer = combineReducers({
    dataSynced: dataSyncedReducer,
    repositories: repositoryReducer,
    artifacts: artifactReducer,
    versions: versionsReducer,
    users: usersReducer
});

export type RootState = ReturnType<typeof rootReducer>;
