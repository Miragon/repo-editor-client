import {UserInfoTO} from "../../api/models";
import {CaseReducer} from "@reduxjs/toolkit";
import {SEARCH_USERS} from "../constants";

const initialState = {
    searchedUsers: Array<UserInfoTO>()
}
const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                searchedUsers: action.searchedUsers
            }
    }
    return state;
}
export default reducer;