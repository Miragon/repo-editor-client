import { CaseReducer } from "@reduxjs/toolkit";
import { DIAGRAM_UPLOAD } from "../constants";

const initialState = {
    uploadedDiagram: undefined
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case DIAGRAM_UPLOAD:
            return {
                ...state,
                uploadedDiagram: action.uploadedDiagram
            };
    }
    return state;
};

export default reducer;
