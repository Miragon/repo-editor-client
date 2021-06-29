import {CaseReducer} from "@reduxjs/toolkit";
import {CREATED_DIAGRAM} from "../constants";

const initialState = {
    createdDiagram: null
}


const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATED_DIAGRAM:
            return {
                ...state,
                createdDiagram: action.createdDiagram
            }
    }
    return state;
}
export default reducer;