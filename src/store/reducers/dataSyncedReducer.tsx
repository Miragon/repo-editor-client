import {CaseReducer} from "@reduxjs/toolkit";
import {
    SYNC_STATUS_ACTIVE_REPOSITORY,
    SYNC_STATUS_ARTIFACT,
    SYNC_STATUS_MENU,
    SYNC_STATUS_VERSION
} from "../../constants/Constants";

const initialState = {
    repoSynced: false,
    activeRepoSynced: false,
    recentSynced: false,
    artifactSynced: false,
    versionSynced: undefined,
    assignmentSynced: false,
    menuSynced: false,
    sharedSynced: false
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SYNC_STATUS_ACTIVE_REPOSITORY:
            return {
                ...state,
                activeRepoSynced: action.dataSynced
            }
        case SYNC_STATUS_ARTIFACT:
            return {
                ...state,
                artifactSynced: action.dataSynced
            };

        case SYNC_STATUS_VERSION:
            return {
                ...state,
                versionSynced: action.dataSynced
            };

        case SYNC_STATUS_MENU:
            return {
                ...state,
                menuSynced: action.dataSynced
            };

    }
    return state;
};

export default reducer;
