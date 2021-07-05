import {CaseReducer} from "@reduxjs/toolkit";
import {RepositoryTO} from "../../api/models";
import {ACTIVE_REPO, GET_REPOS} from "../constants";

const initialState = {
    repos: Array<RepositoryTO>(),
    activeRepo: null

};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REPOS:
            return {
                ...state,
                repos: action.repos
            };
        case ACTIVE_REPO:
            return {
                ...state,
                activeRepo: action.activeRepo
            };
    }
    return state;
};

export default reducer;
