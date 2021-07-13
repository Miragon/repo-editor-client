import {CaseReducer} from "@reduxjs/toolkit";
import {
    SYNC_STATUS_ASSIGNMENT,
    SYNC_STATUS_DIAGRAM,
    SYNC_STATUS_MENU,
    SYNC_STATUS_REPOSITORY,
    SYNC_STATUS_VERSION
} from "../constants";

const initialState = {
    repoSynced: false,
    diagramSynced: false,
    versionSynced: undefined,
    assignmentSynced: false,
    menuSynced: false
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SYNC_STATUS_REPOSITORY:
            return {
                ...state,
                repoSynced: action.dataSynced
            };

        case SYNC_STATUS_DIAGRAM:
            return {
                ...state,
                diagramSynced: action.dataSynced
            };

        case SYNC_STATUS_VERSION:
            return {
                ...state,
                versionSynced: action.dataSynced
            };

        case SYNC_STATUS_ASSIGNMENT:
            return {
                ...state,
                assignmentSynced: action.dataSynced
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
