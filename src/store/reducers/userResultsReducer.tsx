import { CaseReducer } from "@reduxjs/toolkit";
import { USERQUERY_EXECUTED } from "../constants";

const initialState = {
    resultsCount: 0
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERQUERY_EXECUTED:
            return {
                ...state,
                resultsCount: action.resultsCount
            };
    }
    return state;
};

export default reducer;
