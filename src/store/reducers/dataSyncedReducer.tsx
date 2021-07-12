import {CaseReducer} from "@reduxjs/toolkit";
import {
    SYNC_STATUS_ASSIGNMENT,
    SYNC_STATUS_DIAGRAM,
    SYNC_STATUS_MENU,
    SYNC_STATUS_REPOSITORY,
    SYNC_STATUS_VERSION
} from "../constants";

const initialState = {
    dataSynced: true,
    menuSynced: false
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SYNC_STATUS_REPOSITORY:
            return {
                ...state,
                dataSynced: action.dataSynced
            };

        case SYNC_STATUS_DIAGRAM:
            return {
                ...state,
                dataSynced: action.dataSynced
            };

        case SYNC_STATUS_VERSION:
            return {
                ...state,
                dataSynced: action.dataSynced
            };

        case SYNC_STATUS_ASSIGNMENT:
            return {
                ...state,
                dataSynced: action.dataSynced
            };

        case SYNC_STATUS_MENU:
            return {
                ...state,
                menuSynced: action.menuSynced
            };
    }
    return state;
};

export default reducer;
