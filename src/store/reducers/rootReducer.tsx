import {combineReducers} from "@reduxjs/toolkit";
import queryResultsReducer from "./queryResultsReducer";
import usersReducer from "./usersReducer";
import activeDiagramsReducer from "./DiagramsReducer";
import apiResponseReducer from "./apiResponseReducer";
import dataSyncedReducer from "./dataSyncedReducer";
import repoReducer from "./repositoriesReducer";
import versionsReducer from "./versionsReducer";

export const rootReducer = combineReducers({
    repos: repoReducer,
    api: apiResponseReducer,
    dataSynced: dataSyncedReducer,
    diagrams: activeDiagramsReducer,
    versions: versionsReducer,
    user: usersReducer,
    resultsCount: queryResultsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
