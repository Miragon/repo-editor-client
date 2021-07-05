import {CaseReducer} from "@reduxjs/toolkit";
import {DIAGRAMQUERY_EXECUTED, USERQUERY_EXECUTED} from "../constants";

const initialState = {
    userResultsCount: 0,
    diagramResultsCount: 0
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERQUERY_EXECUTED:
            return {
                ...state,
                userResultsCount: action.userResultsCount
            };
        case DIAGRAMQUERY_EXECUTED:
            return {
                ...state,
                diagramResultsCount: action.diagramResultsCount

            }
    }
    return state;
};

export default reducer;
