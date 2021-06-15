import {HANDLEDERROR, SUCCESS, UNHANDLEDERROR} from "../actions/diagramAction";
import {CaseReducer} from "@reduxjs/toolkit";

const initialState = {
    errorMessage: "",
    successMessage: "",
    retryMethod: () => console.log("sth"),
}


const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case HANDLEDERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                retryMethod: action.retryMethod
            }
        case UNHANDLEDERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                retryMethod: action.retryMethod
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