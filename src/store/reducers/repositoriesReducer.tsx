import { CaseReducer } from "@reduxjs/toolkit";
import { RepositoryTO } from "../../api/models";
import { GET_REPOS } from "../constants";

const initialState = {
    repos: Array<RepositoryTO>()
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REPOS:
            return {
                ...state,
                repos: action.repos
            };
    }
    return state;
};

export default reducer;
