import {CaseReducer} from "@reduxjs/toolkit";
import {ArtifactMilestoneTO} from "../../api";
import {GET_MILESTONE, LATEST_MILESTONE} from "../../constants/Constants";

const initialState = {
    activeMilestones: Array<ArtifactMilestoneTO>(),
    milestone: null,
    latestMilestone: null,
    defaultMilestoneProps: null,
    milestoneProps: null
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case LATEST_MILESTONE:
            return {
                ...state,
                latestMilestone: action.latestMilestone
            }
        case GET_MILESTONE:
            return {
                ...state,
                milestone: action.milestone
            }
    }
    return state;
};

export default reducer;
