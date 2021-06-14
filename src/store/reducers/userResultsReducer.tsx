import {UserInfoTO} from "../../api/models";
import {CaseReducer} from "@reduxjs/toolkit";
import {SEARCH_USERS, USERQUERY_EXECUTED} from "../actions/diagramAction";

const initialState = {
    resultsCount: 0
}
const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {

        case USERQUERY_EXECUTED:
            return {
                ...state,
                resultsCount: action.resultsCount
            }
    }
    return state;
}
export default reducer;