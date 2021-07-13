import {DiagramVersionTO} from "../../api/models";
import {CaseReducer} from "@reduxjs/toolkit";
import {GET_VERSIONS, LATEST_VERSION, TARGETS} from "../constants";

const initialState = {
    targets: Array<string>(),
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case TARGETS:
            return {
                ...state,
                targets: action.targets
            };

    }
    return state;
};

export default reducer;