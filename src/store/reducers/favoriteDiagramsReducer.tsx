import { CaseReducer } from "@reduxjs/toolkit";
import { DiagramTO } from "../../api/models";
import { GET_FAVORITE } from "../constants";

const initialState = {
    favoriteDiagrams: Array<DiagramTO>()
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FAVORITE:
            return {
                ...state,
                favoriteDiagrams: action.favoriteDiagrams
            };
    }
    return state;
};

export default reducer;
