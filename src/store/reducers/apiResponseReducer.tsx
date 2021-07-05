import { CaseReducer } from "@reduxjs/toolkit";
import { ActionType } from "../actions/actions";
import { SUCCESS, UNHANDLEDERROR } from "../constants";

const initialState = {
    errorMessage: "",
    successMessage: "",
    retryMethod: ActionType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    retryPayload: Array<any>(),
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case UNHANDLEDERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                retryMethod: action.retryMethod,
                retryPayload: action.retryPayload
            };
        case SUCCESS:
            return {
                ...state,
                successMessage: action.successMessage
            };
    }
    return state;
};

export default reducer;
