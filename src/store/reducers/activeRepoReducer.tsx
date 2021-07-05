import { CaseReducer } from "@reduxjs/toolkit";
import { ACTIVE_REPO } from "../constants";

const initialState = {
    activeRepo: null
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVE_REPO:
            return {
                ...state,
                activeRepo: action.activeRepo
            };
    }
    return state;
};

export default reducer;
