import {CaseReducer} from "@reduxjs/toolkit";
import {DiagramTO} from "../../api/models";
import {ACTIVE_DIAGRAMS} from "../constants";

const initialState = {
    activeDiagrams: Array<DiagramTO>()
}

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVE_DIAGRAMS:
            return {
                ...state,
                activeDiagrams: action.activeDiagrams
            }
    }
    return state;
}
export default reducer;