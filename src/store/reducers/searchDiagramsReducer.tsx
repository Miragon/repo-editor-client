import {CaseReducer} from "@reduxjs/toolkit";
import {SEARCH_DIAGRAMS} from "../actions";
import {BpmnDiagramTO} from "../../models";

const initialState = {
    searchedDiagrams: Array<BpmnDiagramTO>()
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