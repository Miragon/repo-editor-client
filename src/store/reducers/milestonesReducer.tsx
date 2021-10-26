import {CaseReducer} from "@reduxjs/toolkit";
import {MILESTONE} from "../../constants/Constants";

const initialState = {
    milestone: null,
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case MILESTONE:
            return {
                ...state,
                milestone: action.milestone
            }
    }
    return state;
};

export default reducer;
