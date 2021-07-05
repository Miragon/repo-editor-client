import { combineReducers } from "@reduxjs/toolkit";
import resultsCount from "./userResultsReducer";
import searchedUsers from "./usersReducer";
import activeDiagramsReducer from "./activeDiagramsReducer";
import activeRepoReducer from "./activeRepoReducer";
import apiResponseReducer from "./apiResponseReducer";
import assignedUsersReducer from "./assignedUsersReducer";
import createdDiagramReducer from "./createdDiagramReducer";
import currentUserReducer from "./currentUserReducer";
import dataSyncedReducer from "./dataSyncedReducer";
import favoriteDiagramReducer from "./favoriteDiagramsReducer";
import diagramReducer from "./recentDiagramsReducer";
import repoReducer from "./repositoriesReducer";
import searchDiagramsReducer from "./searchDiagramsReducer";
import uploadDiagramReducer from "./uploadDiagramReducer";
import versionsReducer from "./versionsReducer";

export const rootReducer = combineReducers({
    recentDiagrams: diagramReducer,
    favoriteDiagrams: favoriteDiagramReducer,
    repos: repoReducer,
    uploadedDiagram: uploadDiagramReducer,
    api: apiResponseReducer,
    dataSynced: dataSyncedReducer,
    activeRepo: activeRepoReducer,
    activeDiagrams: activeDiagramsReducer,
    versions: versionsReducer,
    assignedUsers: assignedUsersReducer,
    currentUserInfo: currentUserReducer,
    searchedUsers: searchedUsers,
    resultsCount: resultsCount,
    searchedDiagrams: searchDiagramsReducer,
    createdDiagram: createdDiagramReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
