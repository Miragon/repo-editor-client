import {CaseReducer} from "@reduxjs/toolkit";
import {SYNC_STATUS_ARTIFACT, SYNC_STATUS_MILESTONE, SYNC_STATUS_REPOSITORY} from "../../constants/Constants";

const initialState = {
    repoSynced: false,
    recentSynced: false,
    artifactSynced: false,
    milestoneSynced: false,
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

        case SYNC_STATUS_MILESTONE:
            return {
                ...state,
                milestoneSynced: action.dataSynced
            };

    }
    return state;
};

export default reducer;
