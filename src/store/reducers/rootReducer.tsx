import {combineReducers} from "@reduxjs/toolkit";
import resultsCountReducer from "./queryResultsReducer";
import usersReducer from "./usersReducer";
import diagramsReducer from "./DiagramsReducer";
import apiResponseReducer from "./apiResponseReducer";
import dataSyncedReducer from "./dataSyncedReducer";
import repoReducer from "./repositoriesReducer";
import versionsReducer from "./versionsReducer";

export const rootReducer = combineReducers({
    repos: repoReducer,
    api: apiResponseReducer,
    dataSynced: dataSyncedReducer,
    diagrams: diagramsReducer,
    versions: versionsReducer,
    user: usersReducer,
    resultsCount: resultsCountReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
