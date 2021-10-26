import {combineReducers} from "@reduxjs/toolkit";
import artifactReducer from "./artifactReducer";
import dataSyncedReducer from "./dataSyncedReducer";
import milestonesReducer from "./milestonesReducer";
import repositoryReducer from "./repositoryReducer";
import usersReducer from "./usersReducer";
import fileStatusReducer from "./fileStatusReducer";


export const rootReducer = combineReducers({
    dataSynced: dataSyncedReducer,
    repositories: repositoryReducer,
    artifacts: artifactReducer,
    milestones: milestonesReducer,
    users: usersReducer,
    fileStatus: fileStatusReducer
});

export type RootState = ReturnType<typeof rootReducer>;
