import {CaseReducer} from "@reduxjs/toolkit";
import {
    SYNC_STATUS_ARTIFACT, SYNC_STATUS_REPOSITORY,
    SYNC_STATUS_VERSION
} from "../../constants/Constants";

const initialState = {
    repoSynced: false,
    recentSynced: false,
    artifactSynced: false,
    versionSynced: undefined,
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SYNC_STATUS_REPOSITORY:
            return {
                ...state,
                repoSynced: action.dataSynced
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

    }
    return state;
};

export default reducer;
