import { CaseReducer } from "@reduxjs/toolkit";
import { DiagramTO } from "../../api/models";
import { GET_RECENT } from "../constants";

const initialState = {
    recentDiagrams: Array<DiagramTO>()
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECENT:
            return {
                ...state,
                recentDiagrams: action.recentDiagrams
            };
    }
    return state;
};

export default reducer;
