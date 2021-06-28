import {HANDLEDERROR, SUCCESS, UNHANDLEDERROR} from "../actions/diagramAction";
import {CaseReducer} from "@reduxjs/toolkit";
import {ActionType} from "../actions/actions";

const initialState = {
    errorMessage: "",
    successMessage: "",
    retryMethod: ActionType,
    retryPayload: Array<any>(),
}


const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case HANDLEDERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                retryMethod: action.retryMethod,
                retryPayload: action.retryPayload
            }
        case UNHANDLEDERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                retryMethod: action.retryMethod,
                retryPayload: action.retryPayload
            }
        case SUCCESS:
            return {
                ...state,
                successMessage: action.successMessage
            }
    }
    return state;
}
export default reducer;