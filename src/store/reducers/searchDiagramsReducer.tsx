import {CaseReducer} from "@reduxjs/toolkit";
import {DiagramTO} from "../../api/models";
import {SEARCH_DIAGRAMS} from "../constants";

const initialState = {
    searchedDiagrams: Array<DiagramTO>()
}
const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_DIAGRAMS:
            return {
                ...state,
                searchedDiagrams: action.searchedDiagrams
            }
    }
    return state;
}
export default reducer;