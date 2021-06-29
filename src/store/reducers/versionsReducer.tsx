import {DiagramVersionTO} from "../../api/models";
import {CaseReducer} from "@reduxjs/toolkit";
import {GET_VERSIONS} from "../constants";

const initialState = {
    versions: Array<DiagramVersionTO>()
}

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VERSIONS:
            return {
                ...state,
                versions: action.versions
            }
    }
    return state;
}
export default reducer;