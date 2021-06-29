import {CaseReducer} from "@reduxjs/toolkit";
import {AssignmentTO} from "../../api/models/assignment-to";
import {ASSIGNED_USERS} from "../constants";

const initialState = {
    assignedUsers: Array<AssignmentTO>()
}

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ASSIGNED_USERS:
            return {
                ...state,
                assignedUsers: action.assignedUsers
            }
    }
    return state;
}
export default reducer;