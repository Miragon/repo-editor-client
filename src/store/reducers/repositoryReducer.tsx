import {CaseReducer} from "@reduxjs/toolkit";
import {REPOSITORIES} from "../../constants/Constants";
import {RepositoryTO} from "../../api";

const initialState = {
    repositories: Array<RepositoryTO>()
}

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case REPOSITORIES:
            return {
                ...state,
                repositories: action.repositories

            }
    }
    return state;
}

export default reducer;
