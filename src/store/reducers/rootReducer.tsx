import {combineReducers} from "@reduxjs/toolkit";
import artifactReducer from "./artifactReducer";
import apiResponseReducer from "./apiResponseReducer";
import dataSyncedReducer from "./dataSyncedReducer";
import repoReducer from "./repositoriesReducer";
import versionsReducer from "./versionsReducer";
import menuReducer from "./menuReducer";

export const rootReducer = combineReducers({
    menuItems: menuReducer,
    repos: repoReducer,
    api: apiResponseReducer,
    dataSynced: dataSyncedReducer,
    artifacts: artifactReducer,
    versions: versionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
